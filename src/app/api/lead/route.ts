import { NextRequest, NextResponse } from 'next/server';

export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  interest: string;
  currency?: string;
  utms?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    gclid?: string;
    fbclid?: string;
  };
  metadata?: {
    pageUrl?: string;
    referrer?: string;
    userAgent?: string;
    timestamp?: string;
    formMode?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json();

    // Validação básica dos campos obrigatórios
    if (!body.name || !body.phone || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios não preenchidos (nome, telefone, email).' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const userAgent = req.headers.get('user-agent') || '';
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';

    const enrichedLead = {
      ...body,
      metadata: {
        ...body.metadata,
        timestamp,
        userAgent,
        ip,
      },
    };

    // 1. Envio para Webhook Externo (Zapier, Make, n8n, CRM, etc.)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL || process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(enrichedLead),
        });

        if (!webhookResponse.ok) {
          console.error('[LEAD API] Webhook retornou status:', webhookResponse.status);
        }
      } catch (webhookError) {
        console.error('[LEAD API] Erro ao disparar webhook:', webhookError);
        // Não quebra a resposta para o usuário final caso o webhook falhe
      }
    } else {
      console.log('[LEAD API] Novo lead recebido (Simulação - configure LEAD_WEBHOOK_URL no .env.local):', enrichedLead);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead recebido com sucesso.',
      leadId: `lead_${Date.now()}`,
    });
  } catch (error) {
    console.error('[LEAD API] Erro interno:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar lead.' },
      { status: 500 }
    );
  }
}
