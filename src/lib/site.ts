const FALLBACK_SITE_URL = 'https://oxfordcove.vercel.app';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, '');

export const SITE_NAME = 'Oxford Cove — glemO internacional';
export const SITE_TITLE = 'Oxford Cove by IMAN em JVC, Dubai | glemO internacional';
export const SITE_DESCRIPTION =
  'Conheça o Oxford Cove by IMAN em Jumeirah Village Circle, Dubai. Residências boutique, condições de pré-lançamento e atendimento em português pela glemO internacional.';

