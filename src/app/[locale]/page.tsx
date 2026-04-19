import { setRequestLocale } from 'next-intl/server';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Experience } from '@/components/sections/experience';
import { Headline } from '@/components/sections/headline';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Talks } from '@/components/sections/talks';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Headline />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Talks />
      <Contact />
    </>
  );
}
