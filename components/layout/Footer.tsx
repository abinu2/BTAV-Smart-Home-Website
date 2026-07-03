import Link from 'next/link';
import { Mail, Clock } from 'lucide-react';
import {
  SITE,
  SOCIAL_LINKS,
  FOOTER_SERVICES,
  FOOTER_COMPANY,
} from '@/lib/constants';
import { getBrandBySlug } from '@/data/brands';
import { accentReadable } from '@/lib/utils';
import { Logo } from './Logo';

/** Brand mini-logos shown in the footer trust strip. */
const TRUST_BRANDS = [
  'control4',
  'lutron',
  'crestron',
  'savant',
  'sony',
  'ruckus',
] as const;

function SocialIcon({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
  } as const;
  switch (name) {
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H17V4.6c-.3 0-1.3-.1-2.45-.1-2.43 0-4.05 1.48-4.05 4.2v2.2H7.7V14h2.8v8h3z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common}>
          <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.7a2.85 2.85 0 0 0-.68-1.06 2.85 2.85 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.15-.62a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common}>
          <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.2 8.5h3.5V22H3.2V8.5zM9.4 8.5h3.35v1.84h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V22h-3.5v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V22H9.4V8.5z" />
        </svg>
      );
    case 'houzz':
      return (
        <svg {...common}>
          <path d="M5 2h3.2v6.3L16 11v11h-4.6v-5.2H8.2V22H3V2h2z" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Footer — layered 4-column footer with brand, services, company, and contact
 * columns, plus a brand mini-logo trust strip and legal bottom bar.
 * Server component (no interactivity beyond CSS hover).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-background to-surface">
      {/* Top accent hairline: transparent → blue → transparent */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(95,190,178,0.5) 50%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div className="lg:pr-6">
            <Logo size="lg" />
            <p className="mt-5 max-w-xs font-heading text-base text-text-primary">
              {SITE.tagline}
            </p>
            <p className="mt-3 text-sm text-text-secondary">{SITE.serviceArea}</p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-[var(--glass-bg)] text-text-secondary transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-background"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <FooterColumn title="Services" links={FOOTER_SERVICES} />

          {/* Column 3 — Company */}
          <FooterColumn title="Company" links={FOOTER_COMPANY} />

          {/* Column 4 — Contact */}
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 break-all text-text-secondary transition-colors hover:text-accent"
                >
                  <Mail size={16} className="shrink-0 text-accent" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-text-secondary">
                <Clock size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {SITE.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-background"
            >
              Schedule a Consultation →
            </Link>
          </div>
        </div>

        {/* Trust strip — brand mini-logos */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border pt-10">
          {TRUST_BRANDS.map((slug) => {
            const brand = getBrandBySlug(slug);
            if (!brand) return null;
            return (
              <Link
                key={slug}
                href={`/partners/${slug}`}
                className="group font-heading text-sm font-bold uppercase tracking-wide text-text-muted transition-colors duration-200"
                style={{ ['--brand' as string]: accentReadable(brand.accentColor) }}
              >
                <span className="transition-colors duration-200 group-hover:text-[var(--brand)]">
                  {brand.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="font-mono text-xs text-text-muted">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-5 font-mono text-xs">
            <Link
              href="/privacy"
              className="text-text-muted transition-colors hover:text-text-secondary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-text-muted transition-colors hover:text-text-secondary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        {title}
      </h2>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
