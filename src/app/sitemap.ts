import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date('2026-09-17T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}

