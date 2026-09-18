# Relatório final — SEO, GEO, Lighthouse e performance

**Projeto:** Oxford Cove by IMAN — glemO internacional  
**Data:** 17 de setembro de 2026  
**Escopo:** landing page principal e endpoints técnicos locais  
**Restrições respeitadas:** a imagem principal da hero, o preloader, a experiência visual do mapa e o fluxo de leads não foram alterados. USD continua sendo a moeda inicial e a referência canônica; AED e BRL permanecem secundárias.

## Resultado executivo

A home é agora a única página pública de conteúdo. A rota antiga `/design-system` foi removida e responde 404. O build de produção passou, a página inicial caiu de **179 kB para 162 kB de JavaScript inicial**, e o maior problema de bloqueio mobile foi reduzido de forma expressiva.

O Lighthouse final marcou **63 em performance mobile** e **95 em desktop**, ante 36 e 74. Acessibilidade, boas práticas e SEO ficaram em **100/100** nas duas modalidades. O mobile ainda requer outra rodada para chegar ao alvo de 75–85, concentrada em hidratação e animações restantes, sem mexer na hero ou no preloader.

## Lighthouse: antes e depois

| Métrica | Mobile antes | Mobile final | Desktop antes | Desktop final |
|---|---:|---:|---:|---:|
| Performance | 36 | **63** | 74 | **95** |
| Acessibilidade | 100 | **100** | 100 | **100** |
| Boas práticas | 93 | **100** | 96 | **100** |
| SEO | 100 | **100** | 100 | **100** |
| FCP | 4,0 s | **1,9 s** | 1,3 s | **0,5 s** |
| LCP | 4,7 s | **4,1 s** | 2,3 s | **1,2 s** |
| TBT | 5.640 ms | **760 ms** | 130 ms | **0 ms** |
| CLS | 0,001 | **0,001** | 0,003 | **0,022** |
| Speed Index | 12,9 s | **5,3 s** | 4,5 s | **1,5 s** |

Os relatórios brutos estão em `lighthouse-mobile-prod.json`, `lighthouse-mobile-after.json`, `lighthouse-desktop-prod.json` e `lighthouse-desktop-after.json`. O Lighthouse terminou as medições corretamente; no Windows, a limpeza posterior do diretório temporário do Chrome registrou `EPERM`, sem invalidar os JSONs gerados.

## Implementações concluídas

### SEO técnico

- Canonical centralizada por `NEXT_PUBLIC_SITE_URL`, com fallback atual para `https://oxfordcove.vercel.app`.
- `robots.txt` liberando a landing, preservando recursos do Next.js e bloqueando `/api/`.
- `sitemap.xml` contendo somente a home canônica.
- Favicon e Apple Touch Icon derivados do ícone branco existente no projeto.
- Metadados Open Graph e Twitter atualizados.
- Imagem OG dedicada em 1200 × 630, sem alterar a imagem da hero.
- Dados estruturados JSON-LD para `Organization`, `WebSite`, `ApartmentComplex`, `WebPage` e `FAQPage`.
- Verificação do Bing preparada por `BING_SITE_VERIFICATION`.
- Chave e script de submissão ao IndexNow adicionados; o envio só deve ocorrer depois de configurar o domínio público definitivo.

### GEO e conteúdo verificável

- Seção “Oxford Cove em resumo” com localização, incorporadora, preço inicial, valor contratual, tipologias e entrega.
- USD permanece como referência inicial; AED aparece como valor contratual e BRL segue como conversão secundária.
- Data de atualização visível.
- FAQ visível com sete perguntas e respostas também representadas em JSON-LD.
- Uma única fonte externa permanece: a página oficial da IMAN Developers. O link do Property Finder foi removido para evitar um caminho concorrente de conversão.
- A seção factual e o FAQ foram movidos para depois do formulário final e antes do rodapé.
- Foi criado `SEARCH_VISIBILITY.md` com o processo de Bing Webmaster, IndexNow e acompanhamento periódico de citações em buscas generativas.

### Performance

- Lenis passou a ser importado sob demanda apenas em desktop sem touch.
- GSAP e ScrollTrigger da localização passaram a carregar somente quando o mapa fica pronto.
- O mapa agora agrupa eventos por `requestAnimationFrame`, evita atualizações de estado quando as coordenadas não mudam, inicializa animações uma única vez e limpa timers/listeners.
- Seções abaixo da dobra usam `content-visibility: auto`.
- Blur e `will-change` permanentes foram reduzidos no mobile.
- Oito imagens do plano de pagamento que tinham extensão WebP mas conteúdo PNG foram convertidas para WebP real, reduzindo o conjunto para aproximadamente 239 kB.
- A imagem do CTA final foi convertida para WebP e os PNGs duplicados e arquivos públicos sem referência foram removidos.

### Acessibilidade e legibilidade

- Adicionado link “Pular para o conteúdo principal”; o teste manual confirmou que o foco chega ao `<main>`.
- Todo texto visível abaixo de 12 px passou a ter mínimo de 12 px em todos os breakpoints.
- Rótulos, números e textos pequenos abaixo desse limite usam Manrope.
- Toda a seção de informações do empreendimento, incluindo títulos, valores e FAQ, usa Manrope.
- O FAQ usa controles nativos `<details>/<summary>`; abertura, estado expandido e resposta foram validados na árvore de acessibilidade.
- Em viewport 390 × 844: zero textos visíveis abaixo de 12 px, nenhum overflow horizontal e os sete controles do FAQ presentes.
- Formulários expõem nome acessível para nome, WhatsApp, e-mail e seletor de interesse. Nenhum envio de lead foi feito durante os testes.

## Endpoints verificados

| Endpoint | Resultado |
|---|---:|
| `/` | 200 |
| `/robots.txt` | 200 |
| `/sitemap.xml` | 200 |
| `/icon.png` | 200 |
| `/apple-icon.png` | 200 |
| `/images/og/oxford-cove-og.jpg` | 200 |
| `/c96030c0fda6442798b55a9337e408c0.txt` | 200 |
| `/design-system` | 404, conforme esperado |

## Pendências externas antes de publicar

1. Definir o domínio público definitivo em `NEXT_PUBLIC_SITE_URL`. Canonical, sitemap, Open Graph e JSON-LD derivam dessa variável.
2. Inserir o código real do Bing em `BING_SITE_VERIFICATION` e validar a propriedade no Bing Webmaster Tools.
3. Após a publicação, executar `npm run indexnow` para submeter a URL canônica. O script recusa localhost por segurança.
4. Conectar Search Console/Bing e acompanhar Core Web Vitals reais. Lighthouse é laboratório; INP depende de usuários reais.
5. Confirmar comercialmente preço, disponibilidade e plano 40/60 antes de tráfego pago. A página já mostra ressalva e data, mas a fonte contratual deve continuar sendo a tabela vigente.

## Próxima rodada recomendada para mobile

O gargalo remanescente é o trabalho da thread principal: TBT de 760 ms e LCP de 4,1 s. A próxima rodada deve converter mais seções estáticas em Server Components e isolar filtros, galerias e animações em ilhas pequenas. Também vale renderizar progressivamente cards não visíveis e adiar a consulta cambial até interação ou servi-la com cache no backend.

Essas mudanças podem buscar performance mobile acima de 75 sem alterar a hero, o preloader ou o mapa visual. Como o fluxo de leads ainda não está confirmado, sua lógica foi mantida intacta.

