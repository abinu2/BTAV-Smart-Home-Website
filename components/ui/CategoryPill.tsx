import { cn, hexToRgba } from '@/lib/utils';

export interface CategoryPillProps {
  label: string;
  /** Hex color used for text, background tint, and border. */
  color: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES: Record<NonNullable<CategoryPillProps['size']>, string> = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-[11px] px-3 py-1',
  lg: 'text-[12px] px-4 py-1.5',
};

/**
 * CategoryPill — rounded mono label for brand/service categories.
 * Text in `color`, background at 10% opacity, border at 30% opacity.
 */
export function CategoryPill({
  label,
  color,
  size = 'md',
  className,
}: CategoryPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-mono uppercase tracking-pill leading-none',
        SIZES[size],
        className,
      )}
      style={{
        color,
        backgroundColor: hexToRgba(color, 0.1),
        borderColor: hexToRgba(color, 0.3),
      }}
    >
      {label}
    </span>
  );
}

export default CategoryPill;
