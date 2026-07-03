import type { Metadata } from 'next';
import { PageHero, GradientHeadline, SectionLabel } from '@/components/ui';
import { ServiceCard, ProcessStepper, CTABand } from '@/components/sections';
import { getServicesByTier } from '@/data/services';

export const metadata: Metadata = {
  title: 'Smart Home Services: AV, Security, WiFi & Control4',
  description:
    'BTAV installs audio/video, security cameras, WiFi networking, and Control4 automation across Maricopa County — a clear two-tier model from essentials to fully integrated estates.',
  alternates: { canonical: '/services' },
};

const PROCESS: { title: string; description: string }[] = [
  { title: 'Consultation', description: 'We learn how you live and what you want your home to do.' },
  { title: 'Design', description: 'We engineer a system and document every component and run.' },
  { title: 'Proposal', description: 'A transparent, fixed-scope proposal — no surprises.' },
  { title: 'Installation', description: 'Clean, concealed, professional installation by our team.' },
  { title: 'Programming & Handoff', description: 'We tune, program, and teach you to use it with confidence.' },
];

export default function ServicesPage() {
  const essentials = getServicesByTier('essentials');
  const premium = getServicesByTier('premium');

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        label="What We Install"
        title={
          <GradientHeadline as="h1" className="text-4xl sm:text-6xl">
            What We Install
          </GradientHeadline>
        }
        subtext="Every installation is engineered for reliability, scalability, and the exact experience you envision — whether that's a single great room or a fully integrated estate."
      />

      {/* ESSENTIALS TIER */}
      <section className="relative px-5 py-20 sm:px-8" style={{ background: 'rgba(95,190,178,0.025)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <SectionLabel color="#5FBEB2">Essentials</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary">
              Foundational systems, professionally installed
            </h2>
            <p className="mt-2 max-w-2xl text-text-secondary">
              The reliable, high-quality installations that make everyday life
              better — and a clean foundation you can build on.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {essentials.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Tier divider */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(203,164,108,0.4), transparent)',
        }}
      />

      {/* PREMIUM TIER */}
      <section className="relative px-5 py-20 sm:px-8" style={{ background: 'rgba(203,164,108,0.03)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <SectionLabel color="#CBA46C">Premium / Control4</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary">
              Fully integrated, custom-programmed systems
            </h2>
            <p className="mt-2 max-w-2xl text-text-secondary">
              For homes where every system works as one. Designed and programmed
              by a Control4 Specialist.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {premium.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              From first call to final handoff
            </h2>
          </div>
          <ProcessStepper steps={PROCESS} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
