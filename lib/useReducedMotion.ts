'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * useReducedMotion — thin wrapper over Framer Motion's hook so components
 * import motion preferences from one place. Returns `true` when the user has
 * requested reduced motion via the OS / browser setting.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
