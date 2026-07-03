// /data/projects.ts
// BTAV Smart Home — Portfolio registry.
//
// PLACEHOLDER DATA — these projects describe representative BTAV work in
// realistic terms but use gradient placeholders instead of photos. Replace
// `image` with real /public/assets/projects/*.webp paths as photos arrive
// (AGENTS.md §13). Locations are general Maricopa County areas, no client names.

export interface Project {
  id: string;
  title: string;
  location: string;
  /** Display category + the accent color driving its gradient placeholder. */
  category: string;
  accentColor: string;
  services: string[];
  brands: string[];
  /** Real photo path once available; null → gradient placeholder. */
  image: string | null;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'paradise-valley-estate',
    title: 'Whole-Home Control4 Estate',
    location: 'Paradise Valley',
    category: 'Automation',
    accentColor: '#FFB800',
    services: ['Control4 Automation', 'Lighting', 'Whole-Home AV'],
    brands: ['control4', 'lutron', 'triad'],
    image: null,
    featured: true,
  },
  {
    id: 'scottsdale-theater',
    title: 'Reference Home Theater',
    location: 'Scottsdale',
    category: 'Audio / Video',
    accentColor: '#7B2FFF',
    services: ['Home Theater', 'Whole-Home AV'],
    brands: ['sony', 'kaleidescape', 'bowers-wilkins'],
    image: null,
    featured: true,
  },
  {
    id: 'tempe-network',
    title: 'Smart Residence Network & Security',
    location: 'Tempe',
    category: 'Networking',
    accentColor: '#00E5A0',
    services: ['Networking', 'Security & Cameras'],
    brands: ['access-networks', 'ubiquiti'],
    image: null,
    featured: true,
  },
  {
    id: 'arcadia-outdoor',
    title: 'Outdoor Living Audio',
    location: 'Arcadia',
    category: 'Outdoor',
    accentColor: '#FF8C00',
    services: ['Outdoor AV', 'Lighting'],
    brands: ['sonance', 'coastal-source'],
    image: null,
    featured: false,
  },
  {
    id: 'chandler-av-lighting',
    title: 'Family Home AV & Lighting',
    location: 'Chandler',
    category: 'Audio / Video',
    accentColor: '#00A8FF',
    services: ['Audio / Video', 'Smart Lighting'],
    brands: ['sonos', 'lutron', 'kef'],
    image: null,
    featured: false,
  },
  {
    id: 'gilbert-new-build',
    title: 'New-Build Full Integration',
    location: 'Gilbert',
    category: 'Automation',
    accentColor: '#AD1457',
    services: ['Control4 Automation', 'Networking', 'Security & Cameras'],
    brands: ['control4', 'ruckus', 'ubiquiti'],
    image: null,
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
