'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';

export interface LogoProps {
  /** Overall scale. 'md' for navbar, 'lg' for footer. */
  size?: 'md' | 'lg';
  /** Show the "SMART HOME" mono sub-label beneath the wordmark. */
  showSubLabel?: boolean;
  className?: string;
}

/**
 * Logo — "BT" (white) + "AV" (electric blue) wordmark preceded by an animated
 * three-bar equalizer mark. Bars idle-equalize on a loop; on hover they speed
 * up. Motion is suppressed under prefers-reduced-motion (bars sit static).
 */
export function Logo({ size = 'md', showSubLabel = true, className }: LogoProps) {
  const reduce = useReducedMotion();

  const wordSize = size === 'lg' ? 'text-3xl' : 'text-2xl';
  const barHeights = [0.55, 1, 0.4]; // resting fraction of full height

  return (
    <Link
      href="/"
      aria-label="BTAV Smart Home — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      {/* Equalizer mark */}
      <span
        aria-hidden
        className={cn(
          'flex items-end gap-[3px]',
          size === 'lg' ? 'h-8' : 'h-6',
        )}
      >
        {barHeights.map((h, i) => (
          <span
            key={i}
            className={cn(
              'w-[3px] rounded-full bg-accent',
              !reduce && 'btav-eq-bar',
            )}
            style={{
              height: `${h * 100}%`,
              // staggered phase so the three bars never move in lockstep
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </span>

      <span className="flex flex-col leading-none">
        <span className={cn('font-heading font-bold', wordSize)}>
          <span className="text-text-primary">BT</span>
          <span className="text-accent">AV</span>
        </span>
        {showSubLabel && (
          <span className="mt-1 font-mono text-[9px] uppercase text-text-muted tracking-[0.3em]">
            Smart Home
          </span>
        )}
      </span>

      <style jsx>{`
        .btav-eq-bar {
          transform-origin: bottom;
          animation: btav-eq 1.1s ease-in-out infinite alternate;
        }
        .group:hover .btav-eq-bar {
          animation-duration: 0.45s;
        }
        @keyframes btav-eq {
          0% {
            transform: scaleY(0.45);
          }
          100% {
            transform: scaleY(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .btav-eq-bar {
            animation: none;
          }
        }
      `}</style>
    </Link>
  );
}

export default Logo;
