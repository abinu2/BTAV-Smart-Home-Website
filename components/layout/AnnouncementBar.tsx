'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { SITE } from '@/lib/constants';

const STORAGE_KEY = 'btav_announce_dismissed';

/**
 * AnnouncementBar — thin top strip promoting BTAV's Control4 Specialist status.
 * Dismissible; the dismissal persists for the browser session via
 * sessionStorage. On small screens the copy scrolls as a marquee.
 *
 * Renders nothing until mount-time hydration resolves the dismissed flag, so
 * there is no flash-then-hide (and no CLS — it reserves no space when hidden).
 */
export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      setDismissed(sessionStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* sessionStorage unavailable — dismiss for this render only */
    }
  }

  if (!mounted || dismissed) return null;

  const message = `Control4 ${SITE.control4Tier} · ${SITE.serviceArea}`;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative z-50 flex h-9 items-center overflow-hidden border-b border-[rgba(95,190,178,0.18)] bg-[rgba(95,190,178,0.08)]"
    >
      {/* Desktop: centered static. Mobile: scrolling marquee. */}
      <div className="hidden w-full items-center justify-center px-10 sm:flex">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
          {message}
        </p>
      </div>

      <div className="flex w-full overflow-hidden sm:hidden" aria-hidden>
        <div className="btav-marquee flex shrink-0 items-center whitespace-nowrap">
          <span className="px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            {message}
          </span>
          <span className="px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            {message}
          </span>
        </div>
      </div>
      {/* Screen-reader copy for mobile (marquee is aria-hidden) */}
      <p className="sr-only sm:hidden">{message}</p>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-accent transition-colors hover:bg-[rgba(95,190,178,0.15)]"
      >
        <X size={14} />
      </button>

      <style jsx>{`
        .btav-marquee {
          animation: btav-marquee 18s linear infinite;
        }
        @keyframes btav-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .btav-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default AnnouncementBar;
