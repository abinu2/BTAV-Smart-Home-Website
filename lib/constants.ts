/**
 * lib/constants.ts — Site-wide constants for BTAV.
 *
 * Single source of truth for business info, navigation, social links, and
 * service-area data. Import from here; never hardcode these values in
 * components. (AGENTS.md §11 — constants live in /lib/constants.ts.)
 */

// ⚠️ PLACEHOLDER PHONE — replace with BTAV's real number before launch.
// Uses the reserved 555-01xx fictional range so it is obviously a placeholder.
export const SITE = {
  name: 'BTAV Smart Home',
  shortName: 'BTAV',
  tagline: 'Intelligent Spaces. Exceptional Experiences.',
  description:
    'BTAV designs and installs bespoke smart home systems across the Phoenix metro area — Control4 automation, premium AV, security, and enterprise-grade networking.',
  email: 'btavservices4@gmail.com',
  serviceArea: 'Serving All of Maricopa County, Arizona',
  region: 'Tempe, Arizona',
  hours: [
    { days: 'Mon–Fri', time: '8:00am – 6:00pm' },
    { days: 'Saturday', time: '9:00am – 3:00pm' },
    { days: 'Sunday', time: 'By appointment' },
  ],
  // Marketing claims confirmed in AGENTS.md §6.3.
  control4Tier: 'Smart Home Specialist',
} as const;

/** Primary navigation — keep ≤ 7 items (AGENTS.md §6.1). */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our Work', href: '/work' },
  { label: 'Partners', href: '/partners' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Houzz', href: 'https://houzz.com', icon: 'houzz' },
] as const;

/** Footer "Services" column — maps to /services/[slug] where a page exists. */
export const FOOTER_SERVICES = [
  { label: 'Audio / Video Installation', href: '/services/audio-video' },
  { label: 'Security & Cameras', href: '/services/security-cameras' },
  { label: 'WiFi & Networking', href: '/services/wifi-networking' },
  { label: 'Control4 Automation', href: '/services/control4-automation' },
  { label: 'Whole-Home AV', href: '/services/whole-home-av' },
  { label: 'Outdoor AV', href: '/services/audio-video' },
] as const;

export const FOOTER_COMPANY = [
  { label: 'About BTAV', href: '/about' },
  { label: 'Our Work', href: '/work' },
  { label: 'Partners & Brands', href: '/partners' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
] as const;

/** Maricopa County cities BTAV serves (About + Contact service-area lists). */
export const SERVICE_CITIES = [
  'Phoenix',
  'Scottsdale',
  'Tempe',
  'Chandler',
  'Gilbert',
  'Mesa',
  'Glendale',
  'Peoria',
  'Surprise',
  'Cave Creek',
  'Paradise Valley',
  'Fountain Hills',
  'Ahwatukee',
  'Laveen',
  'Goodyear',
  'Avondale',
  'Buckeye',
  'Queen Creek',
  'San Tan Valley',
] as const;
