import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing use of the BTAV Smart Home website. Content is informational; pricing and availability are confirmed in a written proposal.',
  alternates: { canonical: '/terms' },
};

const UPDATED = 'June 2026';

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
        title={
          <h1 className="font-heading text-4xl font-bold text-text-primary sm:text-5xl">
            Terms of Service
          </h1>
        }
        subtext={`Last updated ${UPDATED}`}
      />

      <section className="px-5 py-16 sm:px-8">
        <div className="prose-btav mx-auto max-w-3xl">
          <Block title="Use of this website">
            This website is provided for general information about BTAV Smart
            Home and the services we offer. By using it, you agree to these
            terms. If you do not agree, please do not use the site.
          </Block>

          <Block title="Information is not a binding offer">
            Service descriptions, brand listings, and any pricing guidance on
            this site are informational only. They do not constitute a binding
            offer. Project scope, pricing, and timelines are confirmed only in a
            written proposal provided directly by BTAV.
          </Block>

          <Block title="No guarantee of results">
            While we describe typical capabilities of the systems we install,
            actual performance depends on your home, existing infrastructure, and
            the specific equipment selected. We make no guarantee of a specific
            outcome based on website content alone.
          </Block>

          <Block title="Brand names & trademarks">
            All third-party brand names, logos, and trademarks referenced on this
            site are the property of their respective owners and are used to
            describe the products BTAV installs and supports. Their use does not
            imply endorsement beyond BTAV&apos;s stated dealer and installer
            relationships.
          </Block>

          <Block title="Intellectual property">
            The design, text, and original graphics on this site are the property
            of BTAV Smart Home and may not be reproduced without permission.
          </Block>

          <Block title="Limitation of liability">
            BTAV is not liable for any indirect or consequential damages arising
            from use of this website. Your sole remedy for dissatisfaction with
            the site is to stop using it.
          </Block>

          <Block title="Changes to these terms">
            We may update these terms from time to time. Continued use of the
            site after changes are posted constitutes acceptance of the revised
            terms.
          </Block>

          <Block title="Contact">
            Questions about these terms? Email{' '}
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
