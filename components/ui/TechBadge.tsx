import { Star, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TechBadgeProps {
  label: string;
  variant: 'dealer' | 'certified' | 'partner';
  className?: string;
}

/**
 * TechBadge — credential badge.
 *  - 'dealer'    gold tint + gold border + star  (Control4 Platinum)
 *  - 'certified' blue tint + blue border + check
 *  - 'partner'   glass + white border + white text
 */
export function TechBadge({ label, variant, className }: TechBadgeProps) {
  const base =
    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-pill leading-none';

  if (variant === 'dealer') {
    return (
      <span
        className={cn(base, 'text-gold', className)}
        style={{
          backgroundColor: 'rgba(203,164,108,0.15)',
          borderColor: 'rgba(203,164,108,0.4)',
        }}
      >
        <Star size={12} className="fill-gold text-gold" aria-hidden />
        {label}
      </span>
    );
  }

  if (variant === 'certified') {
    return (
      <span
        className={cn(base, 'text-accent', className)}
        style={{
          backgroundColor: 'rgba(95,190,178,0.15)',
          borderColor: 'rgba(95,190,178,0.4)',
        }}
      >
        <Check size={12} className="text-accent" aria-hidden />
        {label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        base,
        'glass border-border-lit text-text-primary',
        className,
      )}
    >
      {label}
    </span>
  );
}

export default TechBadge;
