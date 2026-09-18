const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '');
const key = process.env.INDEXNOW_KEY || 'c96030c0fda6442798b55a9337e408c0';

if (!siteUrl || siteUrl.includes('localhost')) {
  throw new Error('Defina NEXT_PUBLIC_SITE_URL com o domínio público antes de enviar ao IndexNow.');
}

const url = new URL(siteUrl);
const payload = {
  host: url.host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: [siteUrl],
};

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  throw new Error(`IndexNow respondeu com status ${response.status}.`);
}

console.log(`IndexNow aceitou ${payload.urlList.length} URL(s) para ${payload.host}.`);

