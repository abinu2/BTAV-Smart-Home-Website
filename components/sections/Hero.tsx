'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Award, ShieldCheck, MapPin } from 'lucide-react';
import { SectionLabel, BrandAccentButton } from '@/components/ui';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { HeroControlPanel } from './HeroControlPanel';

const HEADLINE_LINES: { text: string; gradient?: boolean }[] = [
  { text: 'Intelligent Spaces,' },
  { text: 'Flawlessly' },
  { text: 'Integrated.', gradient: true },
];

const TRUST = [
  { icon: Award, label: 'Control4 Specialist', warm: true },
  { icon: ShieldCheck, label: 'Locally Owned · Tempe', warm: false },
  { icon: MapPin, label: 'Maricopa County', warm: false },
];

export function Hero() {
  const reduce = useReducedMotion();
  const words = HEADLINE_LINES.map((line) => line.text.split(' '));
  let wordIndex = 0;

  return (
    <section
      id="hero"
      className="cinematic-vignette relative flex min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden"
    >
      <HeroBackground />

      {/* Cinematic letterbox bars */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[55fr_45fr] lg:gap-8">
        {/* LEFT */}
        <div>
          <SectionLabel>Maricopa County&apos;s Premier AV Integrator</SectionLabel>

          <h1 className="mt-5 font-heading text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="block">
                {words[li].map((w) => {
                  const idx = wordIndex++;
                  return (
                    <motion.span
                      key={`${w}-${idx}`}
                      className={line.gradient ? 'mr-[0.18em] inline-block text-cinematic' : 'mr-[0.18em] inline-block'}
                      initial={reduce ? false : { y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: reduce ? 0 : idx * 0.06 + 0.1,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                      style={line.gradient ? undefined : { color: '#F2F1EC' }}
                    >
                      {w}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-lg text-lg text-text-secondary sm:text-xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.6, duration: 0.5 }}
          >
            BTAV engineers bespoke smart homes across the Phoenix metro — Control4
            automation, cinema-grade AV, security, and enterprise networking,
            designed and tuned as a single system.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.7, duration: 0.5 }}
          >
            <BrandAccentButton
              label="Get a Free Quote"
              href="/contact"
              color="#CBA46C"
              variant="filled"
              size="lg"
            />
            <BrandAccentButton
              label="See the System"
              href="#system"
              color="#5FBEB2"
              variant="outlined"
              size="lg"
            />
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.9, duration: 0.6 }}
          >
            {TRUST.map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide"
                style={{ color: t.warm ? '#CBA46C' : '#5FBEB2' }}
              >
                <t.icon size={14} />
                <span>{t.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT — cinematic command surface */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: reduce ? 0 : 0.4, duration: 0.7, ease: 'easeOut' }}
        >
          <HeroControlPanel />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#stats"
        aria-label="Scroll to explore"
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-text-muted sm:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          Scroll to explore
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}

/** Hero backdrop: a structural blueprint grid over the global ambient field. */
function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="blueprint-grid blueprint-fade absolute inset-0 opacity-70" />
    </div>
  );
}

export default Hero;
