import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: absoluteUrl(`/${locale}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  }
  return entries;
}
