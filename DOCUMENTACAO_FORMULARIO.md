# Guia de Configuração e Integração do Formulário de Leads
**Oxford Cove by IMAN | glemO international**

Este documento detalha como conectar o formulário de captura de leads da landing page ao seu CRM, Webhook, Planilha Google, ferramenta de automação ou WhatsApp.

---

## 1. Onde os arquivos do formulário estão localizados

| Arquivo | Função |
| :--- | :--- |
| **`src/app/api/lead/route.ts`** | Endpoint backend Next.js que recebe os dados do lead, enriquece com metadados (IP, User-Agent, Data/Hora) e repassa para o Webhook configurado. |
| **`src/components/form/FixedLeadForm.tsx`** | Componente visual do formulário (validação, máscaras, captura de UTMs e envio). |
| **`src/components/form/PersistentLeadDrawer.tsx`** | Drawer lateral deslizante que renderiza o formulário ao clicar nos botões de CTA da página. |

---

## 2. Configuração Rápida em 1 Minuto (Via Variáveis de Ambiente)

A forma mais rápida de conectar o formulário a qualquer ferramenta (Zapier, Make, n8n, CRM, etc.) é configurar a variável `LEAD_WEBHOOK_URL`.

### Passo a passo:
1. Na raiz do projeto, crie ou edite o arquivo **`.env.local`** (ou configure nas variáveis de ambiente da **Vercel / Netlify / VPS**):
   ```bash
   # URL do seu Webhook (Zapier, Make, n8n, RD Station, Google Sheets, etc.)
   LEAD_WEBHOOK_URL="https://hook.eu1.make.com/seu-webhook-aqui"
   ```
2. Pronto! Toda vez que um visitante preencher o formulário no site, a API do Next.js fará um `POST` automático em formato JSON para esta URL.

---

## 3. Estrutura do Payload JSON Enviado

O webhook receberá os dados no seguinte formato:

```json
{
  "name": "João da Silva",
  "phone": "+55 11 99999-9999",
  "email": "joao.silva@exemplo.com",
  "interest": "studio",
  "utms": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "lancamento_dubai_2026",
    "utm_content": "anuncio_01",
    "utm_term": "imoveis dubai",
    "gclid": "Cj0KCQjw...",
    "fbclid": "IwAR3..."
  },
  "metadata": {
    "pageUrl": "https://oxfordcove.glemo.com/?utm_source=google",
    "referrer": "https://www.google.com/",
    "formMode": "inline",
    "timestamp": "2026-09-16T17:20:00.000Z",
    "userAgent": "Mozilla/5.0 ...",
    "ip": "200.100.50.25"
  }
}
```

### Opções do Campo de Interesse (`interest`):
- `studio`: Studio
- `1-quarto`: 1 quarto
- `1-quarto-escritorio`: 1 quarto + escritório
- `2-quartos`: 2 quartos
- `2-quartos-escritorio`: 2 quartos + escritório
- `duplex`: Duplex
- `loja`: Loja comercial
- `avaliando`: Ainda estou avaliando

---

## 4. Exemplos de Integração

### Opção A: Make.com (Integromat) ou Zapier (Recomendado)
1. Crie um novo cenário no **Make.com** ou **Zapier**.
2. Adicione o módulo **Custom Webhook** (Catch Hook).
3. Copie a URL gerada e cole no seu `.env.local` em `LEAD_WEBHOOK_URL`.
4. Faça um envio de teste no formulário.
5. Conecte o módulo seguinte para:
   - Enviar notificação no **WhatsApp** / **Telegram** da equipe comercial.
   - Cadastrar no **CRM** (HubSpot, RD Station, Kommo / amoCRM, ActiveCampaign, Salesforce).
   - Inserir uma linha na **Planilha Google (Google Sheets)**.

---

### Opção B: RD Station CRM / Marketing
Se você usa RD Station Marketing:
1. No RD Station, vá em **Integrações** > **Webhooks** > **Criar Webhook** (Entrada) ou use a URL de Conversão de Eventos.
2. Ou adicione uma chamada direta em `src/app/api/lead/route.ts`:
   ```typescript
   await fetch('https://api.rd.services/platform/conversions?api_key=SEU_TOKEN', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       event_type: 'CONVERSION',
       event_family: 'CDP',
       payload: {
         conversion_identifier: 'lead-oxford-cove',
         name: body.name,
         email: body.email,
         mobile_phone: body.phone,
         cf_interesse: body.interest,
         traffic_source: body.utms?.utm_source,
       }
     })
   });
   ```

---

### Opção C: Google Sheets (Planilhas Google) sem ferramentas pagas
Você pode usar um **Google Apps Script** gratuito para salvar diretamente em uma planilha:
1. Crie uma nova Planilha no Google Drive.
2. Vá em **Extensões** > **Apps Script**.
3. Cole o código:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     
     sheet.appendRow([
       new Date(),
       data.name,
       data.phone,
       data.email,
       data.interest,
       data.utms ? data.utms.utm_source : '',
       data.utms ? data.utms.utm_campaign : '',
       data.metadata ? data.metadata.pageUrl : ''
     ]);
     
     return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
4. Clique em **Implantar** > **Nova Implantação** > Tipo: **App da Web** > Quem tem acesso: **Qualquer pessoa**.
5. Copie a URL gerada e coloque no `LEAD_WEBHOOK_URL` do seu `.env.local`.

---

### Opção D: Disparo Automático de WhatsApp para o Corretor / Lead
Se deseja enviar notificação instantânea para o corretor ou mensagem de boas-vindas para o cliente:
- Utilize plataformas como **Evolution API**, **Z-API** ou **Twilio**.
- No Make/n8n/Zapier, adicione a ação de envio de mensagem de WhatsApp logo após receber o webhook do lead.

---

## 5. Rastreamento e UTMs (Tráfego Pago)
O formulário já possui captura automática e transparente de:
- `utm_source` (Origem: google, facebook, instagram, linkedin, etc.)
- `utm_medium` (Mídia: cpc, stories, feed, email)
- `utm_campaign` (Nome da campanha)
- `utm_content` (Criativo ou anúncio)
- `utm_term` (Palavra-chave)
- `gclid` (Identificador de clique do Google Ads)
- `fbclid` (Identificador de clique do Meta Ads)

Se você anunciar com links parametrizados (Ex: `https://seusite.com/?utm_source=meta&utm_campaign=dubai2026`), os dados serão transmitidos automaticamente no payload do lead.

---

## 6. Checklist de Testes

1. Abra a página em modo local (`http://localhost:3000`) ou em homologação.
2. Preencha o formulário na Hero ou pelo Drawer lateral com dados de teste.
3. Verifique o terminal do servidor (ou os logs da Vercel/servidor) para confirmar o recebimento do JSON.
4. Verifique se o seu webhook/CRM recebeu o payload com todos os campos preenchidos.
