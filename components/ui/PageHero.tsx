import { type ReactNode } from 'react';
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb';
import { SectionLabel } from './SectionLabel';
import { hexToRgba } from '@/lib/utils';

export interface PageHeroProps {
  breadcrumb: BreadcrumbItem[];
  label?: string;
  /** Heading content. Pass a GradientHeadline or plain text. */
  title: ReactNode;
  subtext?: string;
  /** Accent hex driving the radial glow + label. Defaults to electric blue. */
  color?: string;
  /** Extra content under the subtext (e.g. stat badges, sub-brand pills). */
  children?: ReactNode;
}

/**
 * PageHero — consistent inner-page header with breadcrumb, section label,
 * title, optional subtext, and an accent radial glow. Server component.
 */
export function PageHero({
  breadcrumb,
  label,
  title,
  subtext,
  color = '#5FBEB2',
  children,
}: PageHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-border px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14">
      {/* Layered radial glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-20 -top-24 h-[420px] w-[420px] rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${hexToRgba(color, 0.16)} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 70% 100% at 50% 0%, black 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 100% at 50% 0%, black 30%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Breadcrumb items={breadcrumb} />
        {label && (
          <div className="mt-6">
            <SectionLabel color={color}>{label}</SectionLabel>
          </div>
        )}
        <div className="mt-4 max-w-3xl">{title}</div>
        {subtext && (
          <p className="mt-5 max-w-2xl text-lg text-text-secondary">{subtext}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

export default PageHero;
