import type { Metadata } from 'next';
import { PageHero, GradientHeadline } from '@/components/ui';
import { CTABand } from '@/components/sections';
import { WorkGallery } from '@/components/work/WorkGallery';

export const metadata: Metadata = {
  title: 'Smart Home Installation Portfolio | Phoenix',
  description:
    'See BTAV’s smart home installations across Maricopa County — Control4 automation, home theaters, distributed audio, networking, and outdoor AV.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Our Work' }]}
        label="Portfolio"
        title={
          <GradientHeadline as="h1" className="text-4xl sm:text-6xl">
            Our Work
          </GradientHeadline>
        }
        subtext="Every project is a collaboration. Here's what we've built across the Valley — from single-room theaters to fully integrated estates."
      />

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <WorkGallery />
        </div>
      </section>

      <CTABand
        heading="Have a project in mind?"
        subtext="Tell us what you're imagining. We'll help you scope it, design it, and build it right."
        primaryLabel="Start Your Project"
      />
    </>
  );
}
