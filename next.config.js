/** @type {import('next').NextConfig} */

// Content Security Policy. 'unsafe-inline' on style-src is required by styled-jsx
// and inline brand-accent styles; on script-src it is required for Next.js's
// inline bootstrap. Connect-src is scoped to the backends BTAV actually calls.
// `next dev` relies on eval() for HMR and source maps, so 'unsafe-eval' is
// required in development only. Production never uses eval — keep it out there.
const isDev = process.env.NODE_ENV !== 'production';
const scriptSrc = [
  "script-src 'self' 'unsafe-inline'",
  isDev ? "'unsafe-eval'" : '',
  'https://www.googletagmanager.com https://maps.googleapis.com',
]
  .filter(Boolean)
  .join(' ');

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com",
  // Resend + Upstash are called server-side only, so they are intentionally
  // NOT in connect-src — the browser never talks to them directly.
  "connect-src 'self' https://*.supabase.co",
  "frame-src https://www.google.com",
  // Clickjacking defense-in-depth alongside X-Frame-Options.
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), payment=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // API responses must never be cached.
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
