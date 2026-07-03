// /data/brands.ts
// BTAV Smart Home — Partner Brand Registry
// Updated with CE Pro 100 Brand Analysis 2025 + CEDIA Expo 2024/2025 data
// Source: CE Pro, Residential Systems, CEDIA Expo coverage

export type BrandCategory =
  | 'Automation'
  | 'Lighting & Shading'
  | 'Audio'
  | 'Video & Media'
  | 'Networking'
  | 'Outdoor';

export interface Brand {
  name: string;
  slug: string;
  category: BrandCategory;
  accentColor: string;        // Hex — used as page-wide accent on /partners/[slug]
  tagline: string;
  productCount: number;
  badge?: string;             // Special badge text (e.g. "Authorized Platinum Dealer")
  subBrands?: string[];       // Sub-product lines (e.g. Lutron's family)
  tier: 'flagship' | 'premium' | 'standard';
  website: string;
  description: string;        // Short description for the brand card tooltip / page header
  keyProducts: string[];      // Featured product names for brand detail page
}

export const brands: Brand[] = [

  // ─────────────────────────────────────────────
  // AUTOMATION (4 brands)
  // ─────────────────────────────────────────────

  {
    name: 'Control4',
    slug: 'control4',
    category: 'Automation',
    accentColor: '#FFB800',
    tagline: 'The World\'s #1 Smart Home Platform',
    productCount: 12,
    badge: 'AUTHORIZED PLATINUM DEALER',
    tier: 'flagship',
    website: 'https://www.control4.com',
    description:
      'Control4 is the gold standard in residential automation, voted #1 by CE Pro dealers ' +
      'for ten consecutive years. BTAV is an Authorized Platinum Dealer — the highest ' +
      'dealer tier — certified to design, install, and program any Control4 system.',
    keyProducts: [
      'CORE Series Controllers',
      'T4 Series Touchscreens',
      'Halo & Halo Touch Remotes',
      'CA-10 Audio Matrix',
      'DS2 Mini Door Station',
      'C4 Lux Keypads',
      'NEEO Remote',
    ],
  },

  {
    name: 'Crestron',
    slug: 'crestron',
    category: 'Automation',
    accentColor: '#CC2200',
    tagline: 'Professional Automation for Unlimited Scale',
    productCount: 10,
    tier: 'flagship',
    website: 'https://www.crestron.com',
    description:
      'Crestron is the benchmark for large-scale luxury estates and commercial-grade ' +
      'installations. When a project demands custom programming, dozens of AV zones, ' +
      'and enterprise-level reliability, Crestron is the platform of choice.',
    keyProducts: [
      'CP4-R Control Processor',
      'TSW-770 Touchscreen',
      'DM NVX AV-over-IP',
      'Pyng Hub',
      'MPC3 Control Surface',
      'HR-310 Remote',
    ],
  },

  {
    name: 'Savant',
    slug: 'savant',
    category: 'Automation',
    accentColor: '#1A3A6B',
    tagline: 'Luxury Smart Home Intelligence',
    productCount: 9,
    tier: 'flagship',
    website: 'https://www.savant.com',
    description:
      'Savant delivers unparalleled UI and deep Apple ecosystem integration for the ' +
      'most discerning luxury homeowners. Its TrueImage interface lets you tap a live ' +
      'photo of any fixture to control it — an experience no other platform matches.',
    keyProducts: [
      'Savant Host',
      'Pro Remote X2',
      'Smart Power Distribution Unit',
      'PoE Touch Panels',
      'Savant Essentials App',
      '8×8 4K/60 Matrix Switcher',
    ],
  },

  {
    name: 'Lutron',
    slug: 'lutron',
    category: 'Lighting & Shading',
    accentColor: '#C8952A',
    tagline: 'The Gold Standard in Lighting & Shading Control',
    productCount: 10,
    subBrands: ['RadioRA 3', 'Homeworks QS', 'Sunnata', 'Ketra', 'Palladiom Shading'],
    tier: 'flagship',
    website: 'https://www.lutron.com',
    description:
      'Lutron is the perennial category leader in lighting control, dominating the CE Pro ' +
      '100 rankings year after year. Its Ketra circadian lighting system and Palladiom ' +
      'motorized shading are now standard in luxury residential design — specified by ' +
      'interior designers in 56% of high-end projects.',
    keyProducts: [
      'RadioRA 3 Smart Bridge',
      'Homeworks QS Processor',
      'Ketra Tunable White & Color',
      'Sunnata Touch Dimmer',
      'Palladiom Motorized Shades',
      'Pico Wireless Remote',
      'Grafik T Dimmer',
    ],
  },

  // ─────────────────────────────────────────────
  // AUDIO — DISTRIBUTED & WHOLE-HOME (3 brands)
  // ─────────────────────────────────────────────

  {
    name: 'Sonos',
    slug: 'sonos',
    category: 'Audio',
    accentColor: '#000000',
    tagline: 'The Whole-Home Audio Standard',
    productCount: 9,
    tier: 'standard',
    website: 'https://www.sonos.com',
    description:
      'Sonos dominates the distributed audio category among CE Pro 100 integrators — ' +
      'the most-specified whole-home audio platform in the industry. It integrates ' +
      'natively with Control4, Crestron, Savant, and Lutron for seamless scene control.',
    keyProducts: [
      'Era 300 (Spatial Audio)',
      'Era 100',
      'Arc Ultra Soundbar',
      'Sub Mini',
      'Amp (8-Zone Amplifier)',
      'Port (Component Integration)',
      'In-Wall by Sonance',
      'In-Ceiling by Sonance',
    ],
  },

  {
    name: 'Triad',
    slug: 'triad',
    category: 'Audio',
    accentColor: '#1565C0',
    tagline: 'Architectural Audio Engineered for Integration',
    productCount: 8,
    tier: 'premium',
    website: 'https://www.triadloudspeakers.com',
    description:
      'Triad (a Snap One / Control4 brand) designs architectural loudspeakers built ' +
      'specifically for professional integration. From in-wall and in-ceiling to ' +
      'standalone home theater systems, Triad is the preferred audio brand for ' +
      'Control4 dealers worldwide.',
    keyProducts: [
      'Gold Series In-Ceiling',
      'Silver Series In-Wall LCR',
      'One Reference LCR',
      'Bronze Micro sub',
      'OmniSub In-Wall Subwoofer',
      'LCR One In-Wall',
      'Gold Nano On-Wall',
    ],
  },

  {
    name: 'AudioControl',
    slug: 'audiocontrol',
    category: 'Audio',
    accentColor: '#C62828',
    tagline: 'Premium Amplification & Signal Processing',
    productCount: 8,
    tier: 'premium',
    website: 'https://www.audiocontrol.com',
    description:
      'AudioControl is a top-ranked amplifier brand in the CE Pro 100 and a CEDIA ' +
      'Expo 2025 standout. Its Bijou Series compact eARC amplifiers and Hyperion Series ' +
      'home theater processors set a new standard for performance in a rack-mounted ' +
      'integration environment.',
    keyProducts: [
      'Hyperion APR-16 Processor',
      'Bijou Compact eARC Amp',
      'Maestro M-9 Receiver',
      'Concert Series Amplifiers',
      'DM-608 DSP Amplifier',
      'Rialto 600 Integrated Amp',
    ],
  },

  // ─────────────────────────────────────────────
  // AUDIO — PREMIUM SPEAKERS (3 brands)
  // ─────────────────────────────────────────────

  {
    name: 'KEF',
    slug: 'kef',
    category: 'Audio',
    accentColor: '#00897B',
    tagline: 'Reference-Grade Speaker Design Since 1961',
    productCount: 8,
    tier: 'premium',
    website: 'https://www.kef.com',
    description:
      'KEF has defined high-fidelity speaker design for over six decades. Its Uni-Q ' +
      'coaxial driver — placing the tweeter at the acoustic center of the midrange cone — ' +
      'creates a point-source soundstage that architectural and freestanding speakers ' +
      'from any other manufacturer cannot replicate.',
    keyProducts: [
      'Blade Two Meta (Flagship)',
      'Reference 1 Meta (Bookshelf)',
      'LS60 Wireless',
      'R3 Meta',
      'Ci Series In-Wall/In-Ceiling',
      'Mu7 Wireless Headphones',
      'KC62 Subwoofer',
    ],
  },

  {
    name: 'Bowers & Wilkins',
    slug: 'bowers-wilkins',
    category: 'Audio',
    accentColor: '#C79B3B',
    tagline: 'The Speaker of Choice for Abbey Road Studios',
    productCount: 9,
    tier: 'flagship',
    website: 'https://www.bowerswilkins.com',
    description:
      'Bowers & Wilkins holds the #1 position in the floorstanding/bookshelf speaker ' +
      'category in the 2025 CE Pro 100 Brand Analysis — a position it has grown ' +
      'consistently. The official studio reference loudspeaker at Abbey Road Studios, ' +
      'B&W delivers unrivaled sonic accuracy in both architectural and freestanding forms.',
    keyProducts: [
      '800 D4 Series (Reference)',
      '700 Series',
      '600 S3 Series',
      'Formation Flex (Wireless)',
      'CCM Series In-Ceiling',
      'CWM Series In-Wall',
      'DB1D Subwoofer',
      'Px8 Wireless Headphones',
    ],
  },

  {
    name: 'Klipsch',
    slug: 'klipsch',
    category: 'Audio',
    accentColor: '#8B1A1A',
    tagline: 'Legendary Horn-Loaded Efficiency Since 1946',
    productCount: 8,
    tier: 'premium',
    website: 'https://www.klipsch.com',
    description:
      'Klipsch is one of the most recognized speaker brands in the world, with a top-five ' +
      'CE Pro 100 position in the floorstanding/bookshelf speaker category. Known for its ' +
      'horn-loaded technology and exceptional efficiency, Klipsch delivers concert-hall ' +
      'impact in both freestanding and architectural configurations.',
    keyProducts: [
      'Heritage Klipschorn (Iconic)',
      'Jubilee',
      'Reference Premier Series',
      'THX Series Home Theater',
      'PRO-180RPC In-Ceiling',
      'PRO-160RPW In-Wall LCR',
      'SPL-150 Subwoofer',
    ],
  },

  // ─────────────────────────────────────────────
  // AV COMPONENTS — RECEIVERS & PROCESSORS (3 brands)
  // ─────────────────────────────────────────────

  {
    name: 'Marantz',
    slug: 'marantz',
    category: 'Video & Media',
    accentColor: '#8B1538',
    tagline: 'Cinematic Sound. Audiophile Soul.',
    productCount: 7,
    tier: 'premium',
    website: 'https://www.marantz.com',
    description:
      'Marantz ranks #2 in the AV receiver category in the 2025 CE Pro 100 Brand ' +
      'Analysis, behind only Sony. Its Cinema series AVRs are the definitive choice ' +
      'for home theater installations requiring reference-grade Dolby Atmos and DTS:X ' +
      'processing with audiophile-level musicality.',
    keyProducts: [
      'Cinema 40 AV Receiver (11.4ch)',
      'Cinema 30 (9.4ch)',
      'AV10 Surround Preamplifier',
      'MM8077 Power Amplifier',
      'Grand Horizon Speakers',
      'MODEL 30 Integrated Amp',
    ],
  },

  {
    name: 'Anthem',
    slug: 'anthem',
    category: 'Video & Media',
    accentColor: '#1A237E',
    tagline: 'Reference Home Theater Processing',
    productCount: 6,
    tier: 'premium',
    website: 'https://www.anthemav.com',
    description:
      'Anthem consistently places in the top five of the CE Pro 100 AV receiver and ' +
      'processor category. Its proprietary ARC Genesis room correction technology is ' +
      'one of the most sophisticated auto-calibration systems in the industry, making ' +
      'it the preferred choice for dedicated home theater rooms.',
    keyProducts: [
      'AVM 90 16-Channel Processor',
      'MRX 1140 Receiver',
      'MCA 525 Power Amplifier',
      'STR Integrated Amplifier',
      'ARC Genesis Room Correction',
    ],
  },

  {
    name: 'Sony',
    slug: 'sony',
    category: 'Video & Media',
    accentColor: '#1565C0',
    tagline: 'The Benchmark in 4K & 8K Display & Projection',
    productCount: 8,
    tier: 'flagship',
    website: 'https://pro.sony',
    description:
      'Sony is the #1 ranked AV receiver brand in the CE Pro 100 and the definitive ' +
      'leader in ultra-premium projection with the VPL-GTZ380 4K laser projector. ' +
      'Its BRAVIA 9 and Z9K QLED mini-LED displays set the benchmark for picture quality ' +
      'in custom installations worldwide.',
    keyProducts: [
      'VPL-GTZ380 4K Laser Projector',
      'BRAVIA 8 Laser Projector',
      'Z9K 8K QLED Television',
      'BRAVIA 9 Mini-LED',
      'ES5000 STR AV Receiver',
      'A95L QD-OLED Television',
      'HT-A9M2 Wireless Home Theater',
    ],
  },

  // ─────────────────────────────────────────────
  // VIDEO & MEDIA — SPECIALTY (2 brands)
  // ─────────────────────────────────────────────

  {
    name: 'Kaleidescape',
    slug: 'kaleidescape',
    category: 'Video & Media',
    accentColor: '#AD1457',
    tagline: 'The Ultimate Movie Experience',
    productCount: 5,
    tier: 'flagship',
    website: 'https://www.kaleidescape.com',
    description:
      'Kaleidescape leads the movie server category in the CE Pro 100 — the undisputed ' +
      'best lossless 4K playback system available. It is the only platform that delivers ' +
      'studio master-quality video and immersive audio without compression, transcoding, ' +
      'or streaming degradation.',
    keyProducts: [
      'Terra Movie Server (96TB)',
      'Strato 4K Player',
      'Strato V (Entry Strato)',
      'Strato C Player',
      'Cinema One Server',
    ],
  },

  {
    name: 'Epson',
    slug: 'epson',
    category: 'Video & Media',
    accentColor: '#0D47A1',
    tagline: '4K Pro Cinema Projection for Every Space',
    productCount: 6,
    tier: 'premium',
    website: 'https://epson.com/pro-cinema',
    description:
      'Epson Pro Cinema projectors are a CEDIA Expo 2025 standout, anchoring high-performance ' +
      'home theater rooms across every budget tier. The QL 7000 4K laser projector was ' +
      'featured in Trinnov\'s reference room demo at CEDIA 2025 — a testament to its ' +
      'positioning among the industry\'s most discerning installers.',
    keyProducts: [
      'QL 7000 4K Laser Projector',
      'LS12000 4K PRO-UHD Laser',
      'LS11000 4K Projector',
      'EH-LS800B Short Throw',
      'Pro Cinema 4050 UHD',
    ],
  },

  // ─────────────────────────────────────────────
  // NETWORKING (3 brands)
  // ─────────────────────────────────────────────

  {
    name: 'Ruckus Networks',
    slug: 'ruckus',
    category: 'Networking',
    accentColor: '#E55A00',
    tagline: 'Enterprise WiFi Built for Smart Homes',
    productCount: 7,
    tier: 'premium',
    website: 'https://www.ruckusnetworks.com',
    description:
      'Ruckus Networks delivers carrier-grade WiFi access points designed for high-density ' +
      'environments. Its BeamFlex+ adaptive antenna technology and interference mitigation ' +
      'make it the preferred networking platform for smart homes with dozens of connected ' +
      'devices, 4K streaming, and critical automation systems.',
    keyProducts: [
      'R760 WiFi 6 Access Point',
      'R750 Indoor AP',
      'T750SE Outdoor AP (IP67)',
      'ICX Switching Portfolio',
      'Unleashed Controller Software',
      'SmartZone Controller',
    ],
  },

  {
    name: 'Access Networks',
    slug: 'access-networks',
    category: 'Networking',
    accentColor: '#00838F',
    tagline: 'Managed WiFi for Luxury Residences',
    productCount: 6,
    tier: 'premium',
    website: 'https://www.accessnetworks.com',
    description:
      'Access Networks is the specialist in managed residential networking, engineered ' +
      'specifically for high-end homes. It integrated OvrC remote monitoring in 2024 — ' +
      'enabling BTAV to proactively manage client networks, resolve issues remotely, ' +
      'and guarantee performance uptime across every installation.',
    keyProducts: [
      'A750 WiFi 6 Access Point',
      'A350 Indoor Access Point',
      'B350 Outdoor Access Point (OvrC)',
      'Managed Network Switches',
      'OvrC Cloud Management',
      'Residential Firewall Appliances',
    ],
  },

  {
    name: 'Ubiquiti',
    slug: 'ubiquiti',
    category: 'Networking',
    accentColor: '#0559C8',
    tagline: 'Professional-Grade Network Infrastructure',
    productCount: 8,
    tier: 'standard',
    website: 'https://www.ui.com',
    description:
      'Ubiquiti\'s UniFi ecosystem consistently ranks in the top five of the CE Pro 100 ' +
      'cybersecurity and networking categories. Its unified controller platform — managing ' +
      'access points, switches, routers, and security cameras from one dashboard — makes ' +
      'it the go-to infrastructure layer for scalable smart home networks.',
    keyProducts: [
      'UniFi Dream Machine Pro',
      'UniFi U7 Pro WiFi 7 AP',
      'UniFi U6 Enterprise AP',
      'UniFi 24-Port PoE Switch',
      'UniFi Protect Camera System',
      'UniFi Network Controller',
      'Cloud Key Gen 2+',
    ],
  },

  // ─────────────────────────────────────────────
  // OUTDOOR AV (2 brands)
  // ─────────────────────────────────────────────

  {
    name: 'Sonance',
    slug: 'sonance',
    category: 'Outdoor',
    accentColor: '#37474F',
    tagline: 'Invisible Audio. Anywhere.',
    productCount: 10,
    tier: 'premium',
    website: 'https://www.sonance.com',
    description:
      'Sonance is the category leader in outdoor audio in the CE Pro 100, pioneering ' +
      'landscape speaker systems that blend invisibly into the environment. From in-ground ' +
      'subwoofers to rock speakers and invisible garden satellites, Sonance outdoor systems ' +
      'perform regardless of Arizona\'s extreme heat.',
    keyProducts: [
      'Landscape Series Rock Speakers',
      'Garden Series Satellite Speakers',
      'In-Ground Subwoofer (PS-S8T)',
      'Professional Outdoor Series',
      'PATIO Series Pendant Speakers',
      'MARINER Series Marine Grade',
      'Outdoor Sub 10T',
      'Sonos-Powered Outdoor System',
    ],
  },

  {
    name: 'Coastal Source',
    slug: 'coastal-source',
    category: 'Outdoor',
    accentColor: '#006064',
    tagline: 'Outdoor AV Built for the Most Demanding Environments',
    productCount: 6,
    tier: 'premium',
    website: 'https://www.coastalsource.com',
    description:
      'Coastal Source ranked 2nd in the CE Pro 100 outdoor audio category in 2025, ' +
      'leapfrogging competitors with its fully weather-proof, UV-stabilized systems ' +
      'designed for coastal, desert, and tropical climates. Perfect for Arizona\'s ' +
      'heat, dust, and monsoon conditions.',
    keyProducts: [
      'Bullet Landscape Speaker',
      'Bollard Speaker with LED',
      'Mega Bollard Subwoofer',
      'Amplified Bollard',
      'Outdoor LED Pathway Speaker',
      'IP67-Rated Amplifier',
    ],
  },

];

// ─────────────────────────────────────────────
// CATEGORY FILTER CONFIGURATION
// ─────────────────────────────────────────────

export const categories = [
  { label: 'All',               value: 'all' },
  { label: 'Automation',        value: 'Automation' },
  { label: 'Lighting & Shading',value: 'Lighting & Shading' },
  { label: 'Audio',             value: 'Audio' },
  { label: 'Video & Media',     value: 'Video & Media' },
  { label: 'Networking',        value: 'Networking' },
  { label: 'Outdoor',           value: 'Outdoor' },
] as const;

// ─────────────────────────────────────────────
// UTILITY HELPERS
// ─────────────────────────────────────────────

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandsByCategory(category: BrandCategory | 'all'): Brand[] {
  if (category === 'all') return brands;
  return brands.filter((b) => b.category === category);
}

export function getFlagshipBrands(): Brand[] {
  return brands.filter((b) => b.tier === 'flagship');
}

export function getAllSlugs(): string[] {
  return brands.map((b) => b.slug);
}

// Brand count per category (for filter pill sub-labels)
export function getCategoryCounts(): Record<string, number> {
  return categories.reduce((acc, cat) => {
    if (cat.value === 'all') {
      acc[cat.value] = brands.length;
    } else {
      acc[cat.value] = brands.filter((b) => b.category === cat.value).length;
    }
    return acc;
  }, {} as Record<string, number>);
}
