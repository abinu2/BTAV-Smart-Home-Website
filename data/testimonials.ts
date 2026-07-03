// /data/testimonials.ts
//
// ⚠️ PLACEHOLDER — REPLACE WITH REAL REVIEWS BEFORE LAUNCH (AGENTS.md §6.3).
// These read as genuine in tone and the layout is designed to work with real
// Google reviews when they arrive. No real client names are fabricated;
// attribution is area-only. Do NOT present these as "verified" publicly until
// they are replaced with actual reviews.

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'From the first consultation to final programming, BTAV treated our home like their own. The Control4 system simply works — every lighting scene, every room, every day.',
    author: 'BTAV Client',
    location: 'Paradise Valley, AZ',
    rating: 5,
  },
  {
    quote:
      'Our theater is genuinely better than the local cinema. They calibrated everything by hand and walked us through how to use it. Worth every dollar.',
    author: 'BTAV Client',
    location: 'Scottsdale, AZ',
    rating: 5,
  },
  {
    quote:
      'We finally have WiFi that reaches the casita and the pool. No more dead zones, no more rebooting the router. The network has not hiccuped once.',
    author: 'BTAV Client',
    location: 'Tempe, AZ',
    rating: 5,
  },
  {
    quote:
      'Clean install, hidden wiring, and a remote my parents can actually use. BTAV thought about details I would never have considered.',
    author: 'BTAV Client',
    location: 'Chandler, AZ',
    rating: 5,
  },
  {
    quote:
      'The outdoor audio disappears into the landscaping and sounds incredible at a backyard party. They understood our Arizona summers and specified gear that holds up.',
    author: 'BTAV Client',
    location: 'Gilbert, AZ',
    rating: 5,
  },
];
