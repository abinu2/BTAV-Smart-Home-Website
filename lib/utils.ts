import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn — merge conditional class names and de-dupe conflicting Tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * hexToRgba — convert a #RRGGBB hex string to an rgba() string at a given alpha.
 * Used to derive brand-accent tints, borders, and glows from a single hex token.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * jsonLd — serialize structured data for a <script type="application/ld+json">
 * tag, escaping `<` so a value can never break out of the script element
 * (defense-in-depth even though our LD data is static, not user input).
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Relative luminance (WCAG) of a #RRGGBB color. */
function relativeLuminance(hex: string): number {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const channels = [0, 2, 4].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

/**
 * readableTextColor — given a solid background hex, return whichever of dark
 * (#0A0C10) or white (#FFFFFF) text has the higher contrast against it. Used so
 * filled brand-accent buttons always meet WCAG contrast, since brand colors
 * range from bright (Control4 gold, electric blue) to dark (Savant navy).
 */
export function readableTextColor(bgHex: string): string {
  const bg = relativeLuminance(bgHex);
  const darkContrast = (bg + 0.05) / (relativeLuminance('#0A0C10') + 0.05);
  const whiteContrast = (1.0 + 0.05) / (bg + 0.05);
  return whiteContrast >= darkContrast ? '#FFFFFF' : '#0A0C10';
}

function parseHex(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function toHex(r: number, g: number, b: number): string {
  const h = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

const DARK_BG_LUM = relativeLuminance('#0A0C10');

/**
 * accentReadable — brand colors are used as page-wide accents on BTAV's dark
 * theme, but several (Sonos #000000, Savant navy, Anthem indigo) are too dark
 * to read as text/logotype on the near-black background. This lightens a color
 * toward white only as far as needed to clear a ~4:1 contrast target, keeping
 * its hue. Bright accents (Control4 gold, electric blue) pass and are unchanged.
 */
export function accentReadable(hex: string, target = 4): string {
  let [r, g, b] = parseHex(hex);
  const contrast = () => {
    const l = relativeLuminance(toHex(r, g, b));
    return (Math.max(l, DARK_BG_LUM) + 0.05) / (Math.min(l, DARK_BG_LUM) + 0.05);
  };
  let guard = 0;
  while (contrast() < target && guard < 24) {
    // Lerp 8% toward white each step.
    r += (255 - r) * 0.08;
    g += (255 - g) * 0.08;
    b += (255 - b) * 0.08;
    guard += 1;
  }
  return toHex(r, g, b);
}
