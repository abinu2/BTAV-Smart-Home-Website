// /data/services.ts
// BTAV Smart Home — Canonical service registry.
// Powers the homepage bento (2C), the services index (3A), and the
// per-service detail pages (3B). Import from here; never duplicate service copy.

import type { LucideIcon } from 'lucide-react';
import {
  Cpu,
  Speaker,
  ShieldCheck,
  Wifi,
  Lightbulb,
  Sun,
  Network,
  Projector,
} from 'lucide-react';

export type ServiceTier = 'essentials' | 'premium';

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  tier: ServiceTier;
  /** Category accent (hex) — used for the icon and category gradient placeholder. */
  accentColor: string;
  icon: LucideIcon;
  /** One-line hook. */
  tagline: string;
  /** Short blurb for compact cards (bento, footer). */
  short: string;
  /** 2–3 sentence overview for the detail-page hero/body. */
  overview: string;
  /** "What's included" checklist. */
  features: string[];
  /** Rough guide only — pricing is project-dependent (AGENTS.md §6.3). */
  priceHint?: string;
  /** Brand slugs (from data/brands.ts) most relevant to this service. */
  brands: string[];
  faqs: ServiceFAQ[];
}

export const services: Service[] = [
  // ── ESSENTIALS TIER ───────────────────────────────────────────
  {
    slug: 'audio-video',
    name: 'Audio / Video Installation',
    tier: 'essentials',
    accentColor: '#6E86B8',
    icon: Speaker,
    tagline: 'Immersive sound. Stunning picture.',
    short: 'TV mounting, home theater, and multi-room audio done right.',
    overview:
      'From a single flawlessly mounted television to a dedicated Dolby Atmos theater, BTAV engineers audio and video systems that disappear into your space and perform on demand. Clean cabling, calibrated picture, balanced sound — every time.',
    features: [
      'Flush TV & display mounting with concealed wiring',
      'Dedicated home theater design & acoustic treatment',
      'Multi-room and whole-home distributed audio',
      'Soundbar, in-wall, and in-ceiling speaker installation',
      'Universal remote and app-based control setup',
    ],
    priceHint: 'Projects from $1,500',
    brands: ['sonos', 'kef', 'bowers-wilkins', 'triad', 'klipsch'],
    faqs: [
      {
        q: 'Can you mount a TV over a fireplace?',
        a: 'Yes — we assess heat exposure and use articulating mounts and heat-rated cabling where needed. We will tell you honestly if a location risks the display.',
      },
      {
        q: 'Do you hide all the wiring?',
        a: 'In nearly every case, yes. We run cabling in-wall to a concealed equipment location for a clean, wire-free finish.',
      },
      {
        q: 'Can I control everything from my phone?',
        a: 'Absolutely. We configure app and voice control so your AV, and optionally your lights and shades, respond from a single interface.',
      },
    ],
  },
  {
    slug: 'security-cameras',
    name: 'Security & Cameras',
    tier: 'essentials',
    accentColor: '#C77B63',
    icon: ShieldCheck,
    tagline: 'Always watching. Always protected.',
    short: 'HD cameras, smart doorbells, and NVR systems with remote viewing.',
    overview:
      'Protect what matters with professionally installed camera coverage, smart doorbells, and recording systems you can check from anywhere. BTAV designs coverage that eliminates blind spots and keeps footage secure on local storage you control.',
    features: [
      'High-resolution IP camera coverage & blind-spot analysis',
      'Smart video doorbells with two-way audio',
      'Network video recorder (NVR) with local storage',
      'Remote viewing and motion alerts on any device',
      'Integration with Control4, UniFi, and access control',
    ],
    priceHint: 'Projects from $2,000',
    brands: ['ubiquiti', 'control4'],
    faqs: [
      {
        q: 'Is footage stored in the cloud?',
        a: 'By default we record to a local NVR you own — no monthly cloud fee and full control of your data. Cloud backup is available if you want it.',
      },
      {
        q: 'Can cameras handle Arizona heat?',
        a: 'Yes. We specify cameras rated for our climate and mount them to avoid direct, prolonged sun exposure where possible.',
      },
    ],
  },
  {
    slug: 'wifi-networking',
    name: 'WiFi & Networking',
    tier: 'essentials',
    accentColor: '#6FB39C',
    icon: Wifi,
    tagline: 'Enterprise grade. Residential price.',
    short: 'Mesh networks, structured cabling, and rock-solid coverage.',
    overview:
      'A smart home is only as reliable as the network beneath it. BTAV installs business-grade wireless and structured cabling that blankets every corner of your property — no dead zones, no buffering, no rebooting the router.',
    features: [
      'Whole-property WiFi design with no dead zones',
      'Structured Cat6/fiber cabling and patch panels',
      'Managed switches, VLANs, and guest networks',
      'Hardwired backhaul for 4K streaming & automation',
      'Remote network monitoring and proactive support',
    ],
    priceHint: 'Projects from $1,200',
    brands: ['ruckus', 'access-networks', 'ubiquiti'],
    faqs: [
      {
        q: 'Why not just use the router from my internet provider?',
        a: 'ISP routers are not built for the device load of a modern smart home. Professional access points and managed switching deliver the reliability automation and 4K streaming require.',
      },
      {
        q: 'Can you cover the backyard and casita?',
        a: 'Yes — we extend coverage to patios, pools, casitas, and detached structures with weather-rated outdoor access points.',
      },
    ],
  },
  {
    slug: 'smart-devices',
    name: 'Smart Device Setup',
    tier: 'essentials',
    accentColor: '#5FBEB2',
    icon: Lightbulb,
    tagline: 'A smarter home, one step at a time.',
    short: 'Thermostats, smart plugs, and entry-level lighting, configured properly.',
    overview:
      'New to smart home? BTAV gets the essentials working together the way they should. We install and configure thermostats, lighting, and connected devices, then teach you to use them — a clean foundation you can build on later.',
    features: [
      'Smart thermostat installation & scheduling',
      'Entry-level smart lighting and dimmers',
      'Smart plugs, locks, and garage control',
      'Voice assistant configuration (Alexa / Google / Siri)',
      'A clear walkthrough so the whole household can use it',
    ],
    priceHint: 'Projects from $500',
    brands: ['lutron', 'control4'],
    faqs: [
      {
        q: 'Can I start small and add more later?',
        a: 'That is exactly how we recommend approaching it. We build a foundation that scales cleanly into full Control4 automation when you are ready.',
      },
    ],
  },

  // ── PREMIUM / CONTROL4 TIER ───────────────────────────────────
  {
    slug: 'control4-automation',
    name: 'Control4 Smart Home Automation',
    tier: 'premium',
    accentColor: '#CBA46C',
    icon: Cpu,
    tagline: 'One tap controls every system in your home.',
    short: 'Unified control of lighting, climate, AV, security, and shades.',
    overview:
      'As a Control4 Authorized Platinum Dealer, BTAV designs and programs whole-home automation that unifies lighting, climate, audio, video, security, and shades into one elegant interface. Custom scenes, voice control, and remote access — engineered and tuned to your home.',
    features: [
      'Whole-home Control4 system design & programming',
      'Custom lighting and "good night" / "away" scenes',
      'Unified control of AV, climate, shades, and security',
      'Touchscreens, keypads, remotes, and voice control',
      'Remote diagnostics and ongoing system support',
    ],
    priceHint: 'Projects from $15,000',
    brands: ['control4', 'lutron', 'triad', 'sonos'],
    faqs: [
      {
        q: 'What does "Authorized Platinum Dealer" mean?',
        a: 'Platinum is Control4’s highest dealer tier, reflecting certified training and a track record of complex installations. It means BTAV can design, install, and program any Control4 system.',
      },
      {
        q: 'Can Control4 integrate my existing equipment?',
        a: 'In most cases, yes. Control4 integrates thousands of third-party devices. We audit your gear and tell you what carries over and what is worth upgrading.',
      },
      {
        q: 'What happens if something needs adjustment later?',
        a: 'We provide remote diagnostics and support. Many changes are made without a truck roll, and we are local for anything that needs hands on site.',
      },
    ],
  },
  {
    slug: 'whole-home-av',
    name: 'Whole-Home AV Integration',
    tier: 'premium',
    accentColor: '#A66B84',
    icon: Projector,
    tagline: 'Reference performance in every room.',
    short: 'Distributed audio/video and dedicated theaters, perfectly tuned.',
    overview:
      'BTAV integrates audio and video across the entire residence — a Kaleidescape movie server feeding a calibrated theater, distributed audio that follows you room to room, and reference projection that rivals a commercial cinema. Engineered end to end, calibrated by hand.',
    features: [
      'Distributed 4K HDR video to every display',
      'Dedicated home theater with reference projection',
      'Lossless movie servers and matrix switching',
      'Acoustic calibration and room correction',
      'Seamless control through Control4 or Savant',
    ],
    priceHint: 'Projects from $25,000',
    brands: ['kaleidescape', 'sony', 'marantz', 'anthem', 'bowers-wilkins'],
    faqs: [
      {
        q: 'What makes a dedicated theater worth it?',
        a: 'Controlled acoustics, calibrated projection, and isolation from the rest of the home deliver an experience streaming on a TV simply cannot match. We design the room, not just the gear.',
      },
      {
        q: 'Can I watch the same content in multiple rooms?',
        a: 'Yes — matrix switching and distributed audio let any source play in any room, independently or in sync.',
      },
    ],
  },
  {
    slug: 'network-infrastructure',
    name: 'Custom Network Infrastructure',
    tier: 'premium',
    accentColor: '#4F8C8C',
    icon: Network,
    tagline: 'The backbone luxury automation depends on.',
    short: 'Enterprise-grade managed networks engineered for large estates.',
    overview:
      'Large estates and complex automation demand a network designed like a commercial deployment. BTAV builds managed, monitored, multi-VLAN infrastructure with redundancy and remote management — the dependable backbone every premium system relies on.',
    features: [
      'Enterprise managed switching and routing',
      'Segmented VLANs for AV, IoT, cameras, and guests',
      'Fiber backbone and redundant uplinks',
      'Rack design, cable management, and labeling',
      '24/7 remote monitoring with proactive alerts',
    ],
    priceHint: 'Projects from $8,000',
    brands: ['access-networks', 'ruckus', 'ubiquiti'],
    faqs: [
      {
        q: 'Why segment the network into VLANs?',
        a: 'Isolating cameras, IoT devices, and guests improves both security and performance — a compromised smart plug can never reach your private devices.',
      },
      {
        q: 'Do you monitor the network after install?',
        a: 'Yes. With managed platforms like Access Networks and OvrC, we often resolve issues remotely before you notice them.',
      },
    ],
  },
];

// Outdoor AV is presented on the homepage bento as its own category; it maps to
// the audio-video detail page with an outdoor focus.
export const OUTDOOR_ACCENT = '#C79A5B';

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByTier(tier: ServiceTier): Service[] {
  return services.filter((s) => s.tier === tier);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

/** Shared icon used for the "Outdoor AV" bento tile. */
export const OutdoorIcon = Sun;
