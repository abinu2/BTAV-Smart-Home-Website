import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ExternalLink } from 'lucide-react';
import {
  Breadcrumb,
  CategoryPill,
  SectionLabel,
  BrandAccentButton,
} from '@/components/ui';
import {
  getBrandBySlug,
  getAllSlugs,
  type Brand,
} from '@/data/brands';
import { SITE } from '@/lib/constants';
import { hexToRgba, accentReadable } from '@/lib/utils';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} Smart Home Systems | BTAV Phoenix AZ`,
    description: `${brand.name} — ${brand.tagline}. ${brand.description.slice(0, 120)}`,
    alternates: { canonical: `/partners/${brand.slug}` },
  };
}

/** Infer a neutral role label from a product name (no fabricated specs). */
function productRole(name: string): string {
  const n = name.toLowerCase();
  if (/(controller|processor|host|hub|bridge|brain|core)/.test(n)) return 'Control';
  if (/(amp|amplifier|receiver|avr)/.test(n)) return 'Amplification';
  if (/(speaker|in-ceiling|in-wall|soundbar|sub|loudspeaker|lcr|satellite)/.test(n))
    return 'Loudspeaker';
  if (/(projector|tv|oled|display|bravia|laser)/.test(n)) return 'Display';
  if (/(server|player|terra|strato)/.test(n)) return 'Media Server';
  if (/(access point|ap|switch|router|network|unifi|firewall|wifi)/.test(n))
    return 'Networking';
  if (/(dimmer|shade|keypad|tunable|remote|touch|pico|panel|station)/.test(n))
    return 'Interface';
  return 'Featured';
}

const WHY_REASONS = (brand: Brand) => [
  {
    title: 'Brand Specialists',
    body: `Our team specializes in designing, installing, and supporting ${brand.name} the way it's meant to perform.`,
  },
  {
    title: 'Designed, Not Just Installed',
    body: `We engineer ${brand.name} into a cohesive system tuned to your home — not a box bolted to a wall.`,
  },
  {
    title: 'Local Support That Lasts',
    body: `BTAV is based in Tempe and stands behind every ${brand.name} install with responsive, ongoing support.`,
  },
];

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  // Lighten very-dark brand colors so headings, borders, and accents stay
  // legible on the near-black page while keeping each brand's hue.
  const accent = accentReadable(brand.accentColor);
  const isControl4 = brand.slug === 'control4';
  const tierLabel =
    brand.tier === 'flagship'
      ? 'Specialty Brand'
      : brand.tier === 'premium'
        ? 'Installation Partner'
        : 'Supported Brand';

  return (
    <>
      {/* Back link + breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} style={{ color: accent }} />
          All Partners
        </Link>
        <div className="mt-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Partners', href: '/partners' },
              { label: brand.name },
            ]}
          />
        </div>
      </div>

      {/* Brand hero */}
      <header className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full blur-2xl"
            style={{
              background: `radial-gradient(circle, ${hexToRgba(accent, 0.18)} 0%, transparent 70%)`,
            }}
          />
          {isControl4 && (
            <div className="btav-mesh-gold absolute inset-0 opacity-60" />
          )}
        </div>

        {/* Watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-heading text-[22vw] font-bold leading-none"
          style={{ color: accent, opacity: 0.03 }}
        >
          {brand.name.split(' ')[0]}
        </span>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          {isControl4 && brand.badge && (
            <span
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-gold animate-shimmer"
              style={{
                borderColor: hexToRgba('#CBA46C', 0.45),
                backgroundImage:
                  'linear-gradient(110deg, rgba(203,164,108,0.12) 0%, rgba(228,199,154,0.35) 50%, rgba(203,164,108,0.12) 100%)',
                backgroundSize: '200% 100%',
              }}
            >
              <Star size={13} className="fill-gold text-gold" />
              {brand.badge}
            </span>
          )}

          <h1
            className="font-heading text-6xl font-bold uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl"
            style={{ color: accent }}
          >
            {brand.name}
          </h1>

          <div className="mt-6">
            <CategoryPill label={brand.category} color={accent} size="lg" />
          </div>

          <p className="mt-6 font-heading text-xl italic text-text-secondary sm:text-2xl">
            {brand.tagline}
          </p>

          {/* Lutron sub-brand pills */}
          {brand.subBrands && brand.subBrands.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {brand.subBrands.map((sub, i) => (
                <span
                  key={sub}
                  className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide"
                  style={{
                    // slightly varied shade per sub-brand
                    color: accent,
                    borderColor: hexToRgba(accent, 0.3 + (i % 3) * 0.08),
                    backgroundColor: hexToRgba(accent, 0.08),
                  }}
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Partnership note */}
      <section className="px-5 pb-16 sm:px-8">
        <div
          className="mx-auto max-w-4xl rounded-2xl border bg-[var(--glass-bg)] p-7 backdrop-blur-glass sm:p-9"
          style={{ borderColor: hexToRgba(accent, 0.4) }}
        >
          <SectionLabel color={accent}>Our Partnership</SectionLabel>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            {brand.description}
          </p>
          <div className="mt-5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide"
              style={{
                color: accent,
                backgroundColor: hexToRgba(accent, 0.1),
                border: `1px solid ${hexToRgba(accent, 0.3)}`,
              }}
            >
              {tierLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel color={accent}>Featured Products</SectionLabel>
          <h2
            className="mt-4 font-heading text-3xl font-bold sm:text-4xl"
            style={{ color: accent }}
          >
            What We Install
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brand.keyProducts.map((product) => (
              <div
                key={product}
                className="group flex flex-col rounded-2xl border border-border bg-[var(--glass-bg)] p-5 backdrop-blur-glass transition-colors duration-300"
                style={{ ['--accent' as string]: accent }}
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: accent }}
                >
                  {productRole(product)}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-text-primary">
                  {product}
                </h3>
                <div className="mt-3 flex items-start gap-2 text-sm text-text-secondary">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: accent }}
                  />
                  Professionally installed, configured, and supported by BTAV.
                </div>
              </div>
            ))}
          </div>

          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: accent }}
          >
            Explore the full {brand.name} range
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Why BTAV */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 rounded-2xl border border-border bg-[var(--glass-bg)] p-7 backdrop-blur-glass sm:grid-cols-[auto_1fr] sm:p-10">
          <div
            aria-hidden
            className="hidden select-none font-heading text-7xl font-bold leading-tight sm:block"
            style={{ color: accent, opacity: 0.15 }}
          >
            01.
            <br />
            02.
            <br />
            03.
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              Why BTAV for {brand.name}
            </h2>
            <ul className="mt-6 space-y-5">
              {WHY_REASONS(brand).map((reason, i) => (
                <li key={reason.title} className="flex gap-4">
                  <span
                    className="font-heading text-xl font-bold"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-text-primary">
                      {reason.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {reason.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Color-matched CTA */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${hexToRgba(accent, 0.2)} 0%, transparent 70%)`,
          }}
        />
        <div
          className="relative mx-auto max-w-3xl rounded-3xl border-t-[3px] bg-[var(--glass-bg-heavy)] px-6 py-12 text-center backdrop-blur-glass-heavy sm:px-12"
          style={{
            borderTopColor: accent,
            borderInline: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            Ready to Experience {brand.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Contact BTAV for a personalized consultation and system design.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <BrandAccentButton
              label="Schedule a Consultation"
              href={`/contact?brand=${brand.slug}&service=${categoryToService(brand.category)}`}
              color={accent}
              variant="filled"
              size="lg"
            />
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-[44px] items-center gap-2 font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Email BTAV
            </a>
          </div>
          <p className="mt-6 font-mono text-[11px] text-text-muted">
            <a
              href={`mailto:${SITE.email}`}
              className="underline hover:text-text-secondary"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

/** Map a brand category to the closest contact-form service value. */
function categoryToService(category: Brand['category']): string {
  switch (category) {
    case 'Automation':
      return 'control4-automation';
    case 'Lighting & Shading':
      return 'smart-devices';
    case 'Audio':
    case 'Video & Media':
      return 'audio-video';
    case 'Networking':
      return 'wifi-networking';
    case 'Outdoor':
      return 'audio-video';
    default:
      return 'unsure';
  }
}
