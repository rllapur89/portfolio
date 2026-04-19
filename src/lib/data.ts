import type { LucideIcon } from 'lucide-react';
import {
  Atom,
  Braces,
  Cloud,
  Cpu,
  Database,
  FlaskConical,
  Layers,
  Paintbrush,
  Shield,
  Sparkles,
  TestTube,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  siAngular, siReact, siNextdotjs, siTypescript, siJavascript, siHtml5, siSass,
  siTailwindcss, siMaterialdesign, siNgrx, siRedux, siReactquery, siNestjs,
  siNodedotjs, siExpress, siPrisma, siPhp, siLaravel, siSymfony, siDrupal,
  siWordpress, siMysql, siMongodb, siPostgresql, siOctobercms, siDocker,
  siJest, siJasmine, siVitest, siPrimeng,
  siFigma, siJira, siBitbucket, siGit, siVite, siWebpack, siVercel,
  type SimpleIcon,
} from 'simple-icons';

// Angular classic logo (red #DD0031) — simple-icons uses the new dark rebrand
const siAngularClassic: SimpleIcon = {
  ...siAngular,
  hex: 'DD0031',
  path: 'M12 2.5L2 6.9l1.5 13.1L12 24l8.5-4 1.5-13.1L12 2.5zm0 2.1l7.1 3.3-1.3 11.1L12 21.5l-5.8-2.5-1.3-11.1L12 4.6zM8.6 16.3l.9-2.3h5l.9 2.3H17l-4-10.1h-2L7 16.3h1.6zm5.2-3.7H10.2l1.8-4.6 1.8 4.6z',
};

// JWT doesn't exist in simple-icons — hexagon logo from jwt.io
const siJwt: SimpleIcon = {
  title: 'JWT',
  slug: 'jwt',
  hex: 'FB015B',
  source: 'https://jwt.io',
  path: 'M12.539 17.577a.69.69 0 0 1-.692-.001l-5.557-3.21a.69.69 0 0 1-.346-.598V7.347a.69.69 0 0 1 .346-.598l5.557-3.21a.69.69 0 0 1 .692 0l5.557 3.21a.69.69 0 0 1 .346.598v6.421a.69.69 0 0 1-.346.598zM12 0L2 5.76v11.52L12 23.04l10-5.76V5.76zm-.48 6.72h.96v3.84h1.44v.96H12v-1.44h-.48zm.48 8.16a.72.72 0 1 1 0-1.44.72.72 0 0 1 0 1.44z',
  svg: '',
};

// Microsoft doesn't exist in simple-icons — official 4-square logo
const siMicrosoft: SimpleIcon = {
  title: 'Microsoft',
  slug: 'microsoft',
  hex: '00A4EF',
  source: 'https://microsoft.com',
  path: 'M11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4zM11.4 24H0V12.6h11.4V24zm12.6 0H12.6V12.6H24V24z',
  svg: '',
};

// RxJS doesn't exist in simple-icons — path from official rxjs.dev logo
const siRxjs: SimpleIcon = {
  title: 'RxJS',
  slug: 'rxjs',
  hex: 'B7178C',
  source: 'https://rxjs.dev',
  path: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10S17.523 22 12 22 2 17.523 2 12 6.477 2 12 2zm-1 4v4.586l-3.293-3.293-1.414 1.414L9.586 12l-3.293 3.293 1.414 1.414L11 13.414V18h2v-4.586l3.293 3.293 1.414-1.414L14.414 12l3.293-3.293-1.414-1.414L13 10.586V6h-2z',
  svg: '',
};

// AWS doesn't exist in simple-icons — inline SVG fallback using official icon
const siAws: SimpleIcon = {
  title: 'AWS',
  slug: 'amazonaws',
  hex: 'FF9900',
  source: 'https://aws.amazon.com',
  path: 'M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.030-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.224a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.184-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.184.024.35.056.518.088.16.04.312.08.455.128.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.97-9.722 2.97-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.025-.527.272-.352 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.502-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.152.319-.79 1.03-2.57.695-2.993z',
  svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.030-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586z"/></svg>',
};


/** Central map: tech label → SimpleIcon. Used by both Skills and Experience. */
export const skillIconMap: Record<string, SimpleIcon> = {
  Angular: siAngularClassic,
  'Angular Universal (SSR)': siAngularClassic,
  React: siReact,
  'Next.js': siNextdotjs,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  HTML5: siHtml5,
  'CSS3 / SASS': siSass,
  'Tailwind CSS': siTailwindcss,
  'Angular Material': siMaterialdesign,
  'Material UI': siMaterialdesign,
  PrimeNG: siPrimeng,
  NgRx: siNgrx,
  RxJS: siRxjs,
  'Redux Toolkit': siRedux,
  Redux: siRedux,
  'React Query': siReactquery,
  NestJS: siNestjs,
  'Node.js': siNodedotjs,
  Express: siExpress,
  Prisma: siPrisma,
  PHP: siPhp,
  'PHP (Laravel, Symfony)': siPhp,
  Laravel: siLaravel,
  Symfony: siSymfony,
  Drupal: siDrupal,
  WordPress: siWordpress,
  MySQL: siMysql,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  'October CMS': siOctobercms,
  Docker: siDocker,
  'AWS (Cognito, EC2, Lambda, S3)': siAws,
  'AWS Cognito': siAws,
  'Azure AD (MSAL)': siMicrosoft,
  'JWT / MFA': siJwt,
  Jest: siJest,
  'Karma / Jasmine': siJasmine,
  Vitest: siVitest,
  Figma: siFigma,
  Jira: siJira,
  Bitbucket: siBitbucket,
  Git: siGit,
  Vite: siVite,
  Webpack: siWebpack,
  Vercel: siVercel,
};

/** Returns the SimpleIcon for a given tech label, or undefined if not mapped. */
export function iconFor(label: string): SimpleIcon | undefined {
  return skillIconMap[label];
}

export type ExperienceKey = 'switch' | 'twoinnovate' | 'arnaldo' | 'desoft';

export const experienceOrder: ExperienceKey[] = ['switch', 'twoinnovate', 'arnaldo', 'desoft'];

export const experienceMeta: Record<
  ExperienceKey,
  { website?: string; stack: string[]; current?: boolean }
> = {
  switch: {
    website: 'https://www.switch-software.com',
    current: true,
    stack: [
      'Angular',
      'RxJS',
      'NgRx',
      'Signals',
      'React',
      'Next.js',
      'NestJS',
      'AWS Cognito',
      'Azure AD',
      'LLMs',
      'Vercel',
    ],
  },
  twoinnovate: {
    website: 'https://2innovateit.com',
    stack: ['Angular', 'NgRx', 'Redux', 'TypeScript', 'Angular Material', 'Nebular'],
  },
  arnaldo: { stack: ['PHP', 'Laravel', 'October CMS', 'MySQL', 'MongoDB'] },
  desoft: { stack: ['PHP', 'Symfony', 'Drupal', 'WordPress', 'PostgreSQL', 'MySQL'] },
};

export type ProjectKey = 'miAuto' | 'paseLibre' | 'verifone' | 'bcie' | 'bancoEstado' | 'tata';

export const projectOrder: ProjectKey[] = ['miAuto', 'paseLibre', 'verifone', 'bcie', 'bancoEstado', 'tata'];

export const projectMeta: Record<ProjectKey, { accent: string; slug: string; live: string; image: string }> = {
  miAuto: { accent: 'emerald', slug: 'mi-auto', live: 'https://miauto.sbi.uy/', image: '/images/mi-auto.webp' },
  paseLibre: { accent: 'violet', slug: 'pase-libre', live: 'https://panel.paselibre.uy/public/login', image: '/images/paselibre.webp' },
  verifone: { accent: 'sky', slug: 'verifone-merchant-order-portal', live: 'https://us.vfmerchantportal.com/', image: '/images/verifone.webp' },
  bcie: { accent: 'emerald', slug: 'bcie', live: 'https://www.bcie.org/', image: '/images/bcie.webp' },
  bancoEstado: { accent: 'violet', slug: 'banco-estado', live: 'https://www.bancoestado.cl', image: '/images/bancoestado.webp' },
  tata: { accent: 'sky', slug: 'tata-proveedores', live: 'https://portal-proveedores.tata.com.uy/public/login', image: '/images/tata.webp' },
};

export type SkillGroupKey = 'frontend' | 'state' | 'backend' | 'infra' | 'testing' | 'practices' | 'tools';

export type SkillItem = {
  label: string;
  icon?: SimpleIcon;
};

export type SkillGroup = {
  key: SkillGroupKey;
  icon: LucideIcon;
  items: SkillItem[];
};

const s = (label: string): SkillItem => ({ label, icon: skillIconMap[label] });

export const skillGroups: SkillGroup[] = [
  {
    key: 'frontend',
    icon: Paintbrush,
    items: [
      s('Angular'),
      s('Angular Universal (SSR)'),
      s('React'),
      s('Next.js'),
      s('TypeScript'),
      s('JavaScript'),
      s('HTML5'),
      s('CSS3 / SASS'),
      s('Tailwind CSS'),
      s('Angular Material'),
      s('PrimeNG'),
      s('Material UI'),
    ],
  },
  {
    key: 'state',
    icon: Layers,
    items: [s('NgRx'), s('Signals'), s('RxJS'), s('Redux Toolkit'), s('React Query'), s('Zustand')],
  },
  {
    key: 'backend',
    icon: Braces,
    items: [s('NestJS'), s('Node.js'), s('Express'), s('Prisma'), s('REST APIs'), s('PHP (Laravel, Symfony)'), s('AI Integration / LLMs'), s('AI Agents')],
  },
  {
    key: 'infra',
    icon: Cloud,
    items: [
      s('AWS (Cognito, EC2, Lambda, S3)'),
      s('Azure AD (MSAL)'),
      s('Docker'),
      s('Vercel'),
      s('CI/CD Pipelines'),
      s('OAuth2 / OIDC'),
      s('JWT / MFA'),
    ],
  },
  {
    key: 'testing',
    icon: TestTube,
    items: [s('Jest'), s('Karma / Jasmine'), s('Vitest'), s('Playwright'), s('Testing Library')],
  },
  {
    key: 'practices',
    icon: Sparkles,
    items: [
      s('Clean Architecture'),
      s('Hexagonal Architecture'),
      s('Atomic Design'),
      s('Microfrontends'),
      s('Monorepos'),
      s('SCRUM / Agile'),
      s('Mentoring & Interviews'),
    ],
  },
  {
    key: 'tools',
    icon: Workflow,
    items: [s('Git'), s('Figma'), s('Jira'), s('Bitbucket'), s('Vite'), s('Webpack'), s('Docker'), s('CI/CD Pipelines')],
  },
];

export type Certification = {
  title: string;
  issuer: string;
  year: number;
  url?: string;
  download?: boolean;
};

export const certifications: Certification[] = [
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    year: 2026,
    url: 'https://verify.skilljar.com/c/keb4zn4v24s3',
  },
  {
    title: 'Iniciación al Desarrollo con IA',
    issuer: 'BIG school',
    year: 2026,
    url: '/cv/bigschool-ia-certificate.pdf',
    download: true,
  },
  {
    title: 'Scrum Foundation Professional Certification (SFPC™)',
    issuer: 'CertiProf',
    year: 2021,
    url: 'https://www.credly.com/badges/c6d2ff20-39c7-4753-b754-ada127922877',
  },
  {
    title: 'B1 English for Developers',
    issuer: 'freeCodeCamp',
    year: 2020,
    url: 'https://www.freecodecamp.org/certification/rllapur/b1-english-for-developers',
  },
];

export const iconRegistry = {
  architecture: Layers,
  performance: Zap,
  mentoring: Sparkles,
  frontend: Paintbrush,
  state: Workflow,
  backend: Braces,
  infra: Cloud,
  testing: FlaskConical,
  practices: Cpu,
  db: Database,
  atom: Atom,
  shield: Shield,
} as const;
