import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from './site-config';
import { absoluteUrl, getSiteUrl } from './utils';

type BuildMetadataArgs = {
  title?: string;
  description: string;
  path?: string;
  locale: string;
  keywords?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = '/',
  locale,
  keywords,
  image,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(`/${locale}${path === '/' ? '' : path}`);
  const ogImage = image ?? absoluteUrl('/og/default.png');

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, absoluteUrl(`/${l}${path === '/' ? '' : path}`)]),
  );

  return {
    metadataBase: new URL(getSiteUrl()),
    title: title ? `${title} · ${siteConfig.name}` : `${siteConfig.name} — Portfolio`,
    description,
    keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical: url,
      languages: { ...languages, 'x-default': absoluteUrl('/en') },
    },
    openGraph: {
      type: 'website',
      url,
      title: title ?? `${siteConfig.name} — Portfolio`,
      description,
      siteName: siteConfig.name,
      locale: locale === 'es' ? 'es_UY' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? `${siteConfig.name} — Portfolio`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export function personJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: absoluteUrl(`/${locale}`),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    jobTitle: siteConfig.role,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montevideo',
      addressCountry: 'UY',
    },
    sameAs: [siteConfig.socials.linkedin, siteConfig.socials.github],
    knowsAbout: [
      'Angular',
      'React',
      'Next.js',
      'TypeScript',
      'NgRx',
      'Clean Architecture',
      'AI Integration',
      'Microfrontends',
      'Web Performance',
    ],
  } as const;
}
