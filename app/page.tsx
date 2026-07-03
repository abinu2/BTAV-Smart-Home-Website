import type { Metadata } from 'next';
import {
  Hero,
  StatsBar,
  ServicesBento,
  ConsultationFlow,
  SystemDesignShowcase,
  BrandStrip,
  ProjectShowcase,
  Testimonials,
  CTABand,
} from '@/components/sections';
import { SITE } from '@/lib/constants';
import { jsonLd } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Control4 Smart Home Automation & AV Installation | Phoenix AZ',
  description:
    'BTAV is a Control4 Specialist in Tempe, AZ — smart home automation, premium audio/video, security cameras, and enterprise WiFi across Maricopa County.',
  alternates: { canonical: '/' },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btav.tech';

/** LocalBusiness structured data for local SEO (Prompt 8A). */
const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE_URL,
  name: SITE.name,
  image: `${SITE_URL}/opengraph-image`,
  url: SITE_URL,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tempe',
    addressLocality: 'Tempe',
    addressRegion: 'AZ',
    postalCode: '85281',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 33.4255, longitude: -111.94 },
  areaServed: { '@type': 'AdministrativeArea', name: 'Maricopa County' },
  priceRange: '$$-$$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '15:00',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessLd) }}
      />
      <Hero />
      <StatsBar />
      <ConsultationFlow />
      <ServicesBento />
      <SystemDesignShowcase />
      <ProjectShowcase />
      <BrandStrip />
      <Testimonials />
      <CTABand />
    </>
  );
}
