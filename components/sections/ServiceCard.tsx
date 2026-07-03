import Link from 'next/link';
import { Check } from 'lucide-react';
import { GlassCard, TechBadge, BrandAccentButton } from '@/components/ui';
import { hexToRgba } from '@/lib/utils';
import type { Service } from '@/data/services';

/**
 * ServiceCard — detail card for the services index. Premium-tier cards get a
 * gold "Control4 Certified" badge + gold-tinted border; essentials use the
 * service's category accent. The whole card is glass with an accent glow.
 */
export function ServiceCard({ service }: { service: Service }) {
  const isPremium = service.tier === 'premium';
  const accent = service.accentColor;
  const Icon = service.icon;

  return (
    <GlassCard
      hover
      glowColor={accent}
      className="h-full"
      // Premium cards carry a gold-tinted border for the elevated tier.
    >
      <div
        className="flex h-full flex-col p-6 sm:p-7"
        style={
          isPremium
            ? { borderRadius: '1rem', boxShadow: `inset 0 0 0 1px ${hexToRgba('#CBA46C', 0.25)}` }
            : undefined
        }
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              background: hexToRgba(accent, 0.12),
              border: `1px solid ${hexToRgba(accent, 0.3)}`,
            }}
          >
            <Icon size={24} style={{ color: accent }} />
          </span>
          {isPremium && <TechBadge label="Control4 Certified" variant="dealer" />}
        </div>

        <h3 className="mt-5 font-heading text-xl font-bold text-text-primary">
          {service.name}
        </h3>
        <p className="mt-2 text-sm text-text-secondary">{service.overview}</p>

        <ul className="mt-5 space-y-2">
          {service.features.slice(0, 5).map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <Check
                size={16}
                className="mt-0.5 shrink-0"
                style={{ color: accent }}
              />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          {service.priceHint && (
            <p className="mb-4 font-mono text-[12px] uppercase tracking-wide text-text-muted">
              {service.priceHint}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <BrandAccentButton
              label={isPremium ? 'Request Consultation' : 'Get a Quote'}
              href={`/contact?service=${service.slug}&tier=${service.tier}`}
              color={isPremium ? '#CBA46C' : accent}
              variant="filled"
              size="sm"
            />
            <Link
              href={`/services/${service.slug}`}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: accent }}
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default ServiceCard;
