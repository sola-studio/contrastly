import { termsContent } from '@/content/termsArticles';
import { Metadata } from 'next';
import LegalPageContent from '@/components/legal/LegalPageContent';
import StaticPageWrapper from '@/components/layout/StaticPageWrapper';

export const metadata: Metadata = {
  title: 'Terms of Use – Contrastly | Sola Studio',
  description:
    'Read the terms for using the official hosted version of Contrastly, a free browser-based color contrast checker operated by Sola Studio.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <StaticPageWrapper>
      <LegalPageContent
        id="terms-of-use"
        heading={termsContent.heading}
        description={termsContent.description}
        articles={termsContent.articles}
      />
    </StaticPageWrapper>
  );
}
