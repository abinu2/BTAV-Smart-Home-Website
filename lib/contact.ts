/**
 * lib/contact.ts — Shared contact-form contract.
 *
 * One Zod schema validates both client-side (react-hook-form) and server-side
 * (the API route), so the two can never drift. Select option lists are exported
 * for the form UI. Import the schema in both places; never duplicate it.
 */
import { z } from 'zod';

export const SERVICE_OPTIONS = [
  { value: 'audio-video', label: 'Audio / Video Installation' },
  { value: 'security-cameras', label: 'Security & Cameras' },
  { value: 'wifi-networking', label: 'WiFi & Networking' },
  { value: 'smart-devices', label: 'Smart Device Setup' },
  { value: 'control4-automation', label: 'Control4 Automation' },
  { value: 'whole-home-av', label: 'Whole-Home AV' },
  { value: 'network-infrastructure', label: 'Network Infrastructure' },
  { value: 'multiple', label: 'Multiple Services' },
  { value: 'unsure', label: 'Not Sure Yet' },
] as const;

export const TIER_OPTIONS = [
  { value: 'essentials', label: 'Essentials' },
  { value: 'premium', label: 'Premium / Control4' },
  { value: 'unsure', label: 'Not Sure' },
] as const;

export const BUDGET_OPTIONS = [
  { value: 'under_2k', label: 'Under $2,000' },
  { value: '2k_10k', label: '$2,000 – $10,000' },
  { value: '10k_50k', label: '$10,000 – $50,000' },
  { value: '50k_plus', label: '$50,000+' },
  { value: 'unsure', label: 'Not Sure' },
] as const;

export const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As Soon As Possible' },
  { value: '1_3mo', label: '1 – 3 Months' },
  { value: '3_6mo', label: '3 – 6 Months' },
  { value: '6mo_plus', label: '6+ Months' },
  { value: 'planning', label: 'Just Planning' },
] as const;

const serviceValues = SERVICE_OPTIONS.map((o) => o.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(100),
  email: z.string().email('Enter a valid email').max(254),
  city: z.string().min(2, 'Please enter your city').max(100),
  zip: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Enter a valid ZIP')
    .optional()
    .or(z.literal('')),
  service: z.enum(serviceValues, {
    errorMap: () => ({ message: 'Please choose a service' }),
  }),
  tier: z.enum(['essentials', 'premium', 'unsure']),
  description: z.string().max(2000).optional().or(z.literal('')),
  budget_range: z
    .enum(['under_2k', '2k_10k', '10k_50k', '50k_plus', 'unsure'])
    .optional()
    .or(z.literal('')),
  timeline: z
    .enum(['asap', '1_3mo', '3_6mo', '6mo_plus', 'planning'])
    .optional()
    .or(z.literal('')),
  source: z.string().max(100).optional().or(z.literal('')),
  /** Honeypot — must be empty. Bots that fill it are silently dropped. */
  honeypot: z.string().max(0).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
