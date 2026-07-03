import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How BTAV Smart Home collects, uses, and protects your information. We collect only what we need to respond to your inquiry, and never sell your data.',
  alternates: { canonical: '/privacy' },
};

const UPDATED = 'June 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
        title={
          <h1 className="font-heading text-4xl font-bold text-text-primary sm:text-5xl">
            Privacy Policy
          </h1>
        }
        subtext={`Last updated ${UPDATED}`}
      />

      <section className="px-5 py-16 sm:px-8">
        <div className="prose-btav mx-auto max-w-3xl">
          <Block title="What we collect">
            When you submit our contact form, we collect your name, email
            address, city, and the project details you choose to share. For
            security and analytics we store a one-way hashed (SHA-256) version of
            your IP address — never your raw IP — and a basic device type
            (mobile, tablet, or desktop).
          </Block>

          <Block title="How we use it">
            We use your information solely to respond to your inquiry, prepare a
            quote, and provide the services you ask about. We do not sell your
            data, and we do not add you to any marketing list without your
            explicit opt-in.
          </Block>

          <Block title="Where it's stored">
            Form submissions are stored securely in Supabase on US-region
            servers, accessible only to BTAV using a privileged server-side key.
            Our database enforces row-level security so submissions are never
            publicly readable.
          </Block>

          <Block title="Who sees it">
            Only BTAV&apos;s owner sees your submission, at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We never share it
            with third parties except the infrastructure providers required to
            deliver it to us (our email and database providers).
          </Block>

          <Block title="Data retention">
            We keep lead submissions for up to two years so we can serve you
            across a typical project lifecycle, and anonymous page-view records
            for up to 90 days. You can request earlier deletion at any time.
          </Block>

          <Block title="Cookies & analytics">
            We use essential cookies required for the site to function (such as
            session and security tokens). Privacy-friendly analytics run only if
            you accept them via our cookie banner. You can decline analytics with
            no loss of functionality.
          </Block>

          <Block title="Your rights">
            You may request a copy of the information we hold about you, or ask us
            to delete it, by emailing{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We&apos;ll respond
            promptly.
          </Block>

          <Block title="Contact">
            Questions about this policy? Email{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-heading text-xl font-bold text-text-primary">
        {title}
      </h2>
      <p className="mt-2 leading-relaxed text-text-secondary">{children}</p>
    </div>
  );
}
