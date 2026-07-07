'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Router,
  Speaker,
  Projector,
  Lightbulb,
  ShieldCheck,
  Thermometer,
  Sun,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface SystemNode {
  id: string;
  label: string;
  /** Percentage coordinates within the diagram box. */
  x: number;
  y: number;
  icon: LucideIcon;
  /** Cinematic accent for this subsystem. */
  color: string;
  blurb: string;
  detail: string;
  brands: string[];
  service?: string;
}

const CORE: SystemNode = {
  id: 'core',
  label: 'Control Core',
  x: 50,
  y: 46,
  icon: Cpu,
  color: '#CBA46C',
  blurb: 'The brain that unifies every system.',
  detail:
    'Every BTAV install is orchestrated by a central controller — Control4 or Savant — that we program to your routines. One tap arms the house, dims the theater, and cues the music.',
  brands: ['Control4', 'Savant', 'Crestron'],
  service: 'control4-automation',
};

const NODES: SystemNode[] = [
  {
    id: 'network',
    label: 'Network Backbone',
    x: 50,
    y: 88,
    icon: Router,
    color: '#5FBEB2',
    blurb: 'The foundation everything runs on.',
    detail:
      'We engineer enterprise-grade, segmented networking first — because no smart home is more reliable than the network beneath it. Wired backbone, managed switching, and Wi-Fi that reaches every corner.',
    brands: ['Ruckus', 'Access Networks', 'Ubiquiti'],
    service: 'network-infrastructure',
  },
  {
    id: 'audio',
    label: 'Audio Zones',
    x: 19,
    y: 19,
    icon: Speaker,
    color: '#5FBEB2',
    blurb: 'Distributed sound, tuned by hand.',
    detail:
      'Architectural speakers in every zone, driven by amplification we size and calibrate to the room — seamless from kitchen to primary suite, all controlled from one interface.',
    brands: ['Sonos', 'Triad', 'KEF', 'Bowers & Wilkins'],
    service: 'audio-video',
  },
  {
    id: 'video',
    label: 'Video & Theater',
    x: 81,
    y: 19,
    icon: Projector,
    color: '#CBA46C',
    blurb: 'Reference picture in every room.',
    detail:
      'From distributed 4K to a dedicated, acoustically-treated theater with a lossless movie server and reference projection — engineered end to end and calibrated by eye.',
    brands: ['Sony', 'Kaleidescape', 'Marantz', 'Anthem'],
    service: 'whole-home-av',
  },
  {
    id: 'lighting',
    label: 'Lighting & Shades',
    x: 90,
    y: 50,
    icon: Lightbulb,
    color: '#CBA46C',
    blurb: 'Light that follows your day.',
    detail:
      'Tunable, scene-based lighting and motorized shades that shift with circadian rhythm and routine — the layer guests feel before they understand why a room feels right.',
    brands: ['Lutron', 'Ketra'],
    service: 'smart-devices',
  },
  {
    id: 'security',
    label: 'Security & Cameras',
    x: 75,
    y: 78,
    icon: ShieldCheck,
    color: '#5FBEB2',
    blurb: 'Always watching, always yours.',
    detail:
      'Blind-spot-free camera coverage, smart entry, and local recording you control — integrated so a single "away" scene locks, arms, and watches the whole property.',
    brands: ['Ubiquiti Protect', 'Control4'],
    service: 'security-cameras',
  },
  {
    id: 'climate',
    label: 'Climate',
    x: 10,
    y: 50,
    icon: Thermometer,
    color: '#5FBEB2',
    blurb: 'Comfort, automated quietly.',
    detail:
      'Thermostats and sensors woven into the system so temperature follows occupancy and schedule — efficient in the Arizona heat, invisible in operation.',
    brands: ['Control4', 'Nest', 'Ecobee'],
    service: 'smart-devices',
  },
  {
    id: 'outdoor',
    label: 'Outdoor AV',
    x: 25,
    y: 78,
    icon: Sun,
    color: '#CBA46C',
    blurb: 'Built for desert extremes.',
    detail:
      'Landscape audio that disappears into the yard and weather-sealed gear rated for Arizona heat, dust, and monsoon — the patio becomes another zone of the system.',
    brands: ['Sonance', 'Coastal Source'],
    service: 'audio-video',
  },
];

const ALL = [CORE, ...NODES];

/** Quadratic path from the core to a node, bowed for a clean arc. */
function pathTo(node: SystemNode): string {
  const midX = (CORE.x + node.x) / 2;
  const midY = (CORE.y + node.y) / 2;
  // Bow the control point perpendicular-ish for an organic curve.
  const cx = midX + (CORE.y - node.y) * 0.12;
  const cy = midY + (node.x - CORE.x) * 0.12;
  return `M ${CORE.x} ${CORE.y} Q ${cx} ${cy} ${node.x} ${node.y}`;
}

/**
 * SystemDesignShowcase — the signature interactive feature. A live schematic of
 * a custom BTAV install: a control core wired to every subsystem over animated
 * signal paths. Selecting a node lights its path and updates the detail panel,
 * letting visitors explore exactly how an expert system is architected.
 */
export function SystemDesignShowcase() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState('core');
  const [hoverId, setHoverId] = useState<string | null>(null);
  const active = ALL.find((n) => n.id === activeId)!;
  const lit = hoverId ?? activeId;

  return (
    <section id="system" className="relative scroll-mt-20 overflow-hidden px-5 py-24 sm:px-8">
      {/* Blueprint backdrop */}
      <div
        aria-hidden
        className="blueprint-grid blueprint-fade pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(95,190,178,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionLabel>System Architecture</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">
            <span className="text-text-primary">Engineered as one </span>
            <span className="text-cinematic">system.</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            We don&apos;t install gadgets — we architect a system. Explore how every
            subsystem connects to a single control core. Tap a node to see how
            BTAV engineers it.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          {/* Interactive schematic */}
          <div className="cinematic-vignette relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-[var(--glass-bg)] backdrop-blur-glass sm:aspect-[4/3]">
            {/* Signal paths */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              {NODES.map((node) => {
                const isLit = lit === node.id || lit === 'core';
                return (
                  <g key={node.id}>
                    <path
                      d={pathTo(node)}
                      fill="none"
                      stroke={node.color}
                      strokeWidth={isLit ? 0.6 : 0.35}
                      strokeOpacity={isLit ? 0.9 : 0.25}
                      vectorEffect="non-scaling-stroke"
                    />
                    {!reduce && isLit && (
                      <path
                        d={pathTo(node)}
                        fill="none"
                        stroke={node.color}
                        strokeWidth={0.8}
                        strokeDasharray="2 8"
                        vectorEffect="non-scaling-stroke"
                        className="animate-signal-flow"
                        style={{ filter: `drop-shadow(0 0 2px ${node.color})` }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {ALL.map((node) => {
              const isCore = node.id === 'core';
              const isActive = activeId === node.id;
              const Icon = node.icon;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveId(node.id)}
                  onMouseEnter={() => setHoverId(node.id)}
                  onMouseLeave={() => setHoverId(null)}
                  aria-label={node.label}
                  aria-pressed={isActive}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <span
                    className="flex items-center justify-center rounded-xl border backdrop-blur-glass transition-all duration-300"
                    style={{
                      width: isCore ? 60 : 46,
                      height: isCore ? 60 : 46,
                      borderColor: isActive
                        ? node.color
                        : 'rgba(255,255,255,0.12)',
                      background: isActive
                        ? `${node.color}22`
                        : 'rgba(10,12,16,0.7)',
                      boxShadow: isActive ? `0 0 24px ${node.color}66` : 'none',
                      transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <Icon
                      size={isCore ? 26 : 20}
                      style={{ color: node.color }}
                    />
                  </span>
                  <span
                    className="hidden whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide transition-colors duration-300 sm:block sm:text-[10px]"
                    style={{
                      color: isActive ? node.color : 'var(--color-text-2)',
                      background: isActive ? 'rgba(10,12,16,0.8)' : 'transparent',
                    }}
                  >
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel — keyed so it remounts (and re-animates) on select. */}
          <div className="min-h-[320px]">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="rounded-2xl border bg-[var(--glass-bg-heavy)] p-7 backdrop-blur-glass-heavy"
                style={{ borderColor: `${active.color}55` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: `${active.color}1f`,
                      border: `1px solid ${active.color}55`,
                    }}
                  >
                    <active.icon size={24} style={{ color: active.color }} />
                  </span>
                  <div>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: active.color }}
                    >
                      {active.id === 'core' ? 'Control Layer' : 'Subsystem'}
                    </p>
                    <h3 className="font-heading text-2xl font-bold text-text-primary">
                      {active.label}
                    </h3>
                  </div>
                </div>

                <p className="mt-5 leading-relaxed text-text-secondary">
                  {active.detail}
                </p>

                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                    Brands we deploy
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {active.brands.map((b) => (
                      <span
                        key={b}
                        className="rounded-full border px-3 py-1 text-[12px] text-text-secondary"
                        style={{ borderColor: `${active.color}40` }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {active.service && (
                  <Link
                    href={`/services/${active.service}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ color: active.color }}
                  >
                    Explore this service
                    <ArrowRight size={15} />
                  </Link>
                )}
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SystemDesignShowcase;
