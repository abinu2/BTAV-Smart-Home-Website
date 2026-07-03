'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'btav_cookie_consent';

/**
 * CookieConsent — minimal, privacy-first consent banner. Essential cookies
 * (session, CSRF) are always on; analytics is opt-in. The choice is stored in
 * localStorage so the banner appears only on first visit. Renders nothing until
 * mount so there is no SSR/CSR mismatch or layout shift.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* localStorage blocked — don't show the banner */
    }
  }, []);

  function choose(value: 'analytics' | 'essential') {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-[var(--glass-bg-heavy)] p-5 backdrop-blur-glass-heavy sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-secondary">
          We use essential cookies to run this site. With your permission we also
          use privacy-friendly analytics to improve it.{' '}
          <Link href="/privacy" className="text-accent underline hover:opacity-80">
            Privacy Policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="min-h-[44px] rounded-full border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => choose('analytics')}
            className="min-h-[44px] rounded-full bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
