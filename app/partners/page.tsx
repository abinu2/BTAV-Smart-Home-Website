import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui';
import { Breadcrumb } from '@/components/ui';
import { BrandExplorer } from '@/components/brand/BrandExplorer';
import { CTABand } from '@/components/sections';
import { brands } from '@/data/brands';

export const metadata: Metadata = {
  title: 'Brand Partners: Control4, Lutron, Savant & More',
  description:
    'BTAV partners with the world’s finest AV and automation brands — Control4, Lutron, Crestron, Savant, Sony, Kaleidescape, and more. Manufacturer-certified installation across Maricopa County.',
  alternates: { canonical: '/partners' },
};

const STAT_BADGES = [
  `${brands.length} Premium Brands`,
  'Control4 Platinum Dealer',
  'Certified Installers',
];

export default function PartnersPage() {
  return (
    <>
      {/* Hero with animated mesh gradient */}
      <header className="btav-mesh relative overflow-hidden border-b border-border px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Partners' }]}
          />
          <div className="mt-6">
            <SectionLabel>Our Brand Ecosystem</SectionLabel>
          </div>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="text-text-primary">Featured Home </span>
            <span
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #5FBEB2 0%, #7B2FFF 50%, #CBA46C 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              Automation Brands
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-text-secondary">
            We partner exclusively with the world&apos;s finest AV and automation
            brands. Every product we install is backed by BTAV&apos;s expertise and
            manufacturer-certified installation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {STAT_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-border bg-[var(--glass-bg)] px-4 py-2 font-mono text-[12px] uppercase tracking-wide text-text-secondary backdrop-blur-glass"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Filter + grid + color flood */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <BrandExplorer />
        </div>
      </section>

      <CTABand />
    </>
  );
}
