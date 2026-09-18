# Monitoramento de busca e mecanismos generativos

## Configuração antes da publicação

1. Definir `NEXT_PUBLIC_SITE_URL` com o domínio canônico público, sem barra final.
2. Definir `BING_SITE_VERIFICATION` com o valor fornecido pelo Bing Webmaster Tools.
3. Publicar e confirmar que `/robots.txt`, `/sitemap.xml` e `/c96030c0fda6442798b55a9337e408c0.txt` respondem com status 200.
4. Cadastrar o domínio no Google Search Console e no Bing Webmaster Tools.
5. Enviar o sitemap nos dois serviços.
6. Executar `npm run indexnow` depois de cada publicação que alterar conteúdo indexável.

## Acompanhamento semanal

- Google Search Console: impressões, consultas, CTR, posição e Core Web Vitals.
- Bing Webmaster Tools: indexação, consultas, erros de rastreamento e URLs enviadas por IndexNow.
- Analytics: criar um segmento para referências com `utm_source=chatgpt.com` e origens de Perplexity, Bing/Copilot e mecanismos de IA relevantes.
- Confirmar que `OAI-SearchBot`, Googlebot e Bingbot recebem status 200 e não encontram bloqueios de CSS ou JavaScript.

## Consultas de referência

Registrar semanalmente presença, URL citada e precisão factual para:

- Oxford Cove by IMAN
- Oxford Cove JVC Dubai
- apartamentos Oxford Cove Dubai
- investimento imobiliário em JVC para brasileiros
- lançamento IMAN Developers JVC
- imóveis em Dubai com atendimento em português

Respostas generativas variam por localização, conta e momento. O acompanhamento deve registrar data, mecanismo, consulta e a fonte citada; uma única busca não comprova indexação ou ausência permanente.

