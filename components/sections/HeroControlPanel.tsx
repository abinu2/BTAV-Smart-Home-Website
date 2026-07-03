'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  Home,
  Layers,
  ShieldCheck,
  Thermometer,
  Lightbulb,
  Tv,
  Blinds,
  Wind,
} from 'lucide-react';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * HeroControlPanel — a restrained preview of a real control interface.
 *
 * Three stacked glass cards (rooms, scenes, status) parallax subtly to the
 * cursor for depth. Rotations and motion are intentionally gentle — this reads
 * as a professional dashboard, not a gimmick. Motion is disabled under
 * prefers-reduced-motion.
 */
export function HeroControlPanel() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 110, damping: 20, mass: 0.5 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto h-[420px] w-full max-w-md sm:h-[460px]"
      aria-hidden
    >
      {/* Soft ambient glow behind the stack */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(95,190,178,0.16) 0%, transparent 70%)',
        }}
      />

      {/* CARD A — back: rooms */}
      <ParallaxCard sx={sx} sy={sy} depth={20} reduce={reduce}
        className="left-0 top-4 w-[78%]" rotate={-3} floatDelay={0}>
        <div className="glass-heavy rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 font-heading text-sm font-bold text-text-primary">
              <Home size={15} className="text-accent" /> Home
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
              4 zones
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Lightbulb, label: 'Living', on: true },
              { icon: Tv, label: 'Theater', on: true },
              { icon: Blinds, label: 'Shades', on: false },
              { icon: Wind, label: 'Climate', on: true },
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between rounded-lg border border-border bg-[rgba(255,255,255,0.02)] px-2.5 py-2"
              >
                <span className="flex items-center gap-1.5 text-[11px] text-text-secondary">
                  <r.icon size={13} className={r.on ? 'text-accent' : 'text-text-muted'} />
                  {r.label}
                </span>
                <Toggle on={r.on} />
              </div>
            ))}
          </div>
        </div>
      </ParallaxCard>

      {/* CARD B — middle: scenes (Control4-relevant) */}
      <ParallaxCard sx={sx} sy={sy} depth={36} reduce={reduce}
        className="right-0 top-[152px] w-[62%]" rotate={-1} floatDelay={0.7}>
        <div className="glass rounded-2xl p-4">
          <div className="mb-3 flex items-center gap-2">
            <Layers size={13} className="text-accent" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
              Scenes
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { label: 'Good Morning', on: false },
              { label: 'Movie Night', on: true },
              { label: 'Away', on: false },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between rounded-lg border px-3 py-1.5"
                style={{
                  borderColor: s.on ? 'rgba(95,190,178,0.35)' : 'var(--color-border)',
                  background: s.on ? 'rgba(95,190,178,0.08)' : 'transparent',
                }}
              >
                <span
                  className="text-[12px]"
                  style={{ color: s.on ? 'var(--color-signal)' : 'var(--color-text-2)' }}
                >
                  {s.label}
                </span>
                {s.on && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </ParallaxCard>

      {/* CARD C — front: status */}
      <ParallaxCard sx={sx} sy={sy} depth={54} reduce={reduce}
        className="bottom-2 left-8 w-[56%]" rotate={2} floatDelay={1.3}>
        <div className="rounded-2xl border border-border bg-[var(--glass-bg)] p-4 backdrop-blur-glass">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary">
              <ShieldCheck size={13} className="text-accent" /> Security
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Armed
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <Thermometer size={15} className="text-accent" />
            <span className="font-heading text-xl font-bold text-text-primary">
              72°
            </span>
            <span className="ml-auto font-mono text-[10px] text-text-muted">
              Climate
            </span>
          </div>
        </div>
      </ParallaxCard>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className="flex h-3.5 w-6 items-center rounded-full p-0.5 transition-colors"
      style={{
        backgroundColor: on ? 'var(--color-accent)' : 'rgba(255,255,255,0.12)',
      }}
    >
      <span
        className="h-2.5 w-2.5 rounded-full bg-white transition-transform"
        style={{ transform: on ? 'translateX(10px)' : 'translateX(0)' }}
      />
    </span>
  );
}

function ParallaxCard({
  sx,
  sy,
  depth,
  reduce,
  className,
  rotate,
  floatDelay,
  children,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  depth: number;
  reduce: boolean;
  className: string;
  rotate: number;
  floatDelay: number;
  children: React.ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);

  return (
    <motion.div
      className={`absolute ${className}`}
      style={reduce ? { rotate } : { x, y, rotate }}
    >
      <div
        className={reduce ? '' : 'btav-float'}
        style={{ animationDelay: `${floatDelay}s` }}
      >
        {children}
      </div>
      <style jsx>{`
        .btav-float {
          animation: btav-float 6s ease-in-out infinite;
        }
        @keyframes btav-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .btav-float {
            animation: none;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default HeroControlPanel;
