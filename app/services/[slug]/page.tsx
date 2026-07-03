import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import {
  PageHero,
  GradientHeadline,
  SectionLabel,
  GlassCard,
  FaqAccordion,
} from '@/components/ui';
import { ProcessStepper, CTABand } from '@/components/sections';
import {
  getServiceBySlug,
  getAllServiceSlugs,
  type Service,
} from '@/data/services';
import { getBrandBySlug } from '@/data/brands';
import { hexToRgba, accentReadable, jsonLd } from '@/lib/utils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btav.tech';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | BTAV Phoenix AZ`,
    description: service.overview.slice(0, 155),
    alternates: { canonical: `/services/${service.slug}` },
  };
}

const MINI_PROCESS = [
  { title: 'Consult', description: 'We assess your space and goals.' },
  { title: 'Design', description: 'We engineer the right system.' },
  { title: 'Install', description: 'Clean, professional installation.' },
  { title: 'Support', description: 'Tuning and ongoing support.' },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const accent = service.accentColor;
  const serviceLd = buildServiceLd(service);

  const brands = service.brands
    .map((s) => getBrandBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceLd) }}
      />

      <PageHero
        color={accent}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
        label={service.tier === 'premium' ? 'Premium / Control4' : 'Essentials'}
        title={
          <GradientHeadline
            as="h1"
            from="#F2F1EC"
            to={accent}
            className="text-4xl sm:text-5xl lg:text-6xl"
          >
            {service.name}
          </GradientHeadline>
        }
        subtext={service.tagline}
      />

      {/* Overview */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xl leading-relaxed text-text-secondary">
            {service.overview}
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionLabel color={accent}>What&apos;s Included</SectionLabel>
          <GlassCard className="mt-5">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 p-6 sm:grid-cols-2 sm:p-8">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: accent }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Featured brands */}
      {brands.length > 0 && (
        <section className="px-5 pb-16 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionLabel color={accent}>Featured Brands</SectionLabel>
            <div className="mt-5 flex flex-wrap gap-3">
              {brands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/partners/${b.slug}`}
                  className="rounded-xl border px-4 py-3 font-heading text-sm font-bold uppercase tracking-wide transition-all duration-300"
                  style={{
                    color: accentReadable(b.accentColor),
                    borderColor: hexToRgba(accentReadable(b.accentColor), 0.3),
                    backgroundColor: hexToRgba(b.accentColor, 0.08),
                  }}
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mini process */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionLabel color={accent}>Our Process</SectionLabel>
          <div className="mt-8">
            <ProcessStepper steps={MINI_PROCESS} color={accent} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionLabel color={accent}>Frequently Asked</SectionLabel>
            <div className="mt-6">
              <FaqAccordion items={service.faqs} color={accent} />
            </div>
          </div>
        </section>
      )}

      <CTABand
        color={service.tier === 'premium' ? '#CBA46C' : accent}
        heading={`Ready for ${service.name}?`}
        primaryLabel={
          service.tier === 'premium' ? 'Request a Consultation' : 'Get a Free Quote'
        }
        primaryHref={`/contact?service=${service.slug}&tier=${service.tier}`}
      />
    </>
  );
}

function buildServiceLd(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.overview,
    serviceType: service.name,
    provider: {
      '@type': 'LocalBusiness',
      name: 'BTAV Smart Home',
      '@id': SITE_URL,
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Maricopa County' },
    url: `${SITE_URL}/services/${service.slug}`,
  };
}
