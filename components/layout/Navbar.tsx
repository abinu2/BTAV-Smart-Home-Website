'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from './Logo';

/** Is `href` the active route? Exact for "/", prefix-match otherwise. */
function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Glass intensifies after 60px of scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change + lock body scroll while open.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-[rgba(95,190,178,0.3)] bg-[rgba(8,12,20,0.92)] backdrop-blur-glass-heavy'
          : 'border-transparent bg-[rgba(8,12,20,0.6)] backdrop-blur-glass',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Logo />

        {/* Center links (desktop) */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative inline-flex flex-col items-center px-3.5 py-2 font-body text-[15px] transition-colors duration-200',
                    active
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary',
                  )}
                >
                  <span className="transition-transform duration-200 group-hover:scale-[1.02]">
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'mt-1 h-1 w-1 rounded-full bg-accent transition-opacity duration-200',
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster (desktop) */}
        <div className="hidden items-center lg:flex">
          <QuoteCTA reduce={reduce} />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-text-primary lg:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile full-screen overlay (mounted only while open) */}
      {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-0 z-30 flex flex-col bg-[rgba(8,12,20,0.97)] backdrop-blur-glass-heavy lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-24">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.06 * i + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'block border-b border-border py-4 font-heading text-2xl font-medium',
                          active ? 'text-accent' : 'text-text-primary',
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-border p-6">
              <Link
                href="/contact"
                className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-accent font-body font-medium text-background"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
    </header>
  );
}

/** Primary "Get a Quote" CTA with a periodic pulsing ring. */
function QuoteCTA({ reduce }: { reduce: boolean }) {
  return (
    <Link
      href="/contact"
      className="group relative inline-flex min-h-[44px] items-center rounded-full p-[1px]"
      style={{ background: 'linear-gradient(135deg, #5FBEB2 0%, #2E7D74 100%)' }}
    >
      {!reduce && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-accent animate-pulse-ring"
        />
      )}
      <span className="relative inline-flex items-center gap-1.5 rounded-full bg-background px-6 py-2.5 font-body text-[15px] font-medium text-accent transition-colors duration-300 group-hover:bg-transparent group-hover:text-white">
        Get a Quote
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

export default Navbar;
