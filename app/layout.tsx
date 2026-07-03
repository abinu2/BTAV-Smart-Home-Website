import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AnnouncementBar, Navbar, Footer } from '@/components/layout';
import { CookieConsent } from '@/components/CookieConsent';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btav.tech';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | BTAV Smart Home Phoenix',
    default: 'BTAV Smart Home — Phoenix AV & Automation Specialists',
  },
  description:
    'BTAV installs Control4 smart home automation, audio/video, security cameras, and enterprise WiFi across Maricopa County, Arizona. Control4 Specialist.',
  applicationName: 'BTAV Smart Home',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    siteName: 'BTAV Smart Home',
    locale: 'en_US',
    type: 'website',
    url: SITE_URL,
    title: 'BTAV Smart Home — Phoenix AV & Automation Specialists',
    description:
      'Control4 Specialist serving all of Maricopa County. Smart home automation, premium AV, security, and enterprise networking.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTAV Smart Home — Phoenix AV & Automation Specialists',
    description:
      'Control4 Specialist serving all of Maricopa County, Arizona.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0C10',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-body text-text-primary antialiased">
        {/* Ambient living background + grain — fixed, full screen, behind content */}
        <div className="ambient" aria-hidden />
        <div className="grain" aria-hidden />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <div className="relative z-10 flex min-h-screen flex-col">
          <AnnouncementBar />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
