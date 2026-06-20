import { privacyContent } from '@/content/privacy';
import { Metadata } from 'next';
import StaticPageWrapper from '@/components/layout/StaticPageWrapper';
import LegalPageContent from '@/components/legal/LegalPageContent';

export const metadata: Metadata = {
  title: 'Privacy Policy – Contrastly | Sola Studio',
  description:
    'See how Contrastly handles color data, cookies, and analytics, including local browser processing and Google Analytics based on your consent choices.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <StaticPageWrapper>
      <LegalPageContent
        id="privacy-policy"
        heading={privacyContent.heading}
        description={privacyContent.description}
        articles={privacyContent.articles}
      />
    </StaticPageWrapper>
  );
}
