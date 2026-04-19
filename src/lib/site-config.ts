import { getSiteUrl } from './utils';

export const siteConfig = {
  name: 'Rene Llapur',
  role: 'Senior Frontend Engineer',
  location: 'Montevideo, Uruguay',
  email: 'rene.llapur@gmail.com',
  phone: '+59897977635',
  url: getSiteUrl(),
  cvPath: '/cv/rene-llapur-cv.pdf',
  socials: {
    linkedin: 'https://www.linkedin.com/in/rllapur',
    github: 'https://github.com/rllapur89',
    email: 'mailto:rene.llapur@gmail.com',
  },
  navSections: [
    'about',
    'experience',
    'projects',
    'skills',
    'talks',
    'contact',
  ] as const,
} as const;

export type NavSection = (typeof siteConfig.navSections)[number];
