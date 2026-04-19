import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.role}`,
    short_name: siteConfig.name,
    description: 'Senior Frontend Engineer portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1020',
    theme_color: '#0b1020',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  };
}
