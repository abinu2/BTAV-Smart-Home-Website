import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/data/brands';
import { getAllServiceSlugs } from '@/data/services';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btav.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1.0, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE_URL}/services`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/partners`, priority: 0.85, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/work`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE_URL}/about`, priority: 0.7, changeFrequency: 'yearly', lastModified: now },
    { url: `${SITE_URL}/contact`, priority: 0.9, changeFrequency: 'yearly', lastModified: now },
    { url: `${SITE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
    { url: `${SITE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    priority: 0.75,
    changeFrequency: 'monthly',
  }));

  const brandRoutes: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${SITE_URL}/partners/${slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  return [...staticRoutes, ...serviceRoutes, ...brandRoutes];
}
