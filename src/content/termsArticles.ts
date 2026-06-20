import { LegalArticleProps } from '@/components/legal/LegalArticle';

const termsArticles: LegalArticleProps[] = [
  {
    id: 'terms-introduction',
    title: '1. Introduction',
    content:
      'These Terms of Service ("Terms") govern your use of the official hosted version of Contrastly (the "App"), a browser-based color contrast checking tool operated by Sola Studio. By accessing or using the App, you agree to these Terms.',
  },
  {
    id: 'terms-open-source',
    title: '2. Open Source Code',
    content: [
      'The source code for the App may be made available in a public repository under the open source license specified in that repository.',
      'These Terms apply to your use of the official hosted version of the App operated by Sola Studio. Use, copying, modification, distribution, or self-hosting of the source code is governed by the applicable open source license file in the repository.',
      'Third-party forks, copies, modified versions, or self-hosted deployments of the App are operated by their respective maintainers or users. Sola Studio is not responsible for third-party versions unless they are expressly operated by Sola Studio.',
      'If there is any difference between these Terms and the open source license for the source code, the open source license applies to the source code, and these Terms apply to the official hosted App.',
    ],
  },
  {
    id: 'terms-no-account',
    title: '3. No Account Required',
    content:
      'The App does not require you to create an account, log in, or provide personal information in order to use its core color contrast checking features.',
  },
  {
    id: 'terms-purpose',
    title: '4. Purpose of the App',
    content:
      'Contrastly is provided for frontend, design, educational, and accessibility-related purposes, specifically to help check color contrast ratios. The App is a helpful reference tool but is not a substitute for official accessibility testing, certification, legal advice, or compliance audits.',
  },
  {
    id: 'terms-user-responsibility',
    title: '5. User Responsibility',
    content:
      'You are responsible for how you use the App and for independently verifying any results where accuracy, accessibility compliance, publication, or professional decision-making is important.',
  },
  {
    id: 'terms-analytics-and-cookies',
    title: '6. Analytics and Cookies',
    content: [
      'The App may use Google Analytics with consent mode to understand general usage patterns and improve product quality, usability, and accessibility.',
      'The App may also use cookies or similar browser-side storage technologies, such as localStorage, to remember analytics consent choices and related privacy preferences.',
      'Where consent mode is used, Google tags may load before a user makes a choice in the App’s cookie banner or cookie settings interface. In that case, consent is handled according to the default consent state and the user’s later consent choices.',
      'Analytics cookies and full analytics measurement are enabled according to the consent choices available through the App.',
      'When analytics consent is denied, Google Analytics may still receive cookieless pings or similar non-cookie signals that do not read or write analytics cookies.',
      'Sola Studio does not intentionally collect or send names, email addresses, account credentials, payment information, color selections, custom color values, contrast results, or project-specific design data through Google Analytics.',
      'For more details about analytics, cookies, browser-side storage, and consent choices, please refer to our Privacy Policy.',
    ],
  },
  {
    id: 'terms-no-warranty',
    title: '7. No Warranty',
    content:
      'The App is provided "as is" and "as available" without warranties of any kind, whether express or implied. Sola Studio does not guarantee that the App will be accurate, complete, uninterrupted, secure, error-free, or suitable for any particular purpose.',
  },
  {
    id: 'terms-limitation-liability',
    title: '8. Limitation of Liability',
    content:
      'To the maximum extent permitted by applicable law, Sola Studio shall not be liable for any damages, losses, claims, accessibility errors, design decisions, compliance failures, business interruptions, or other issues arising from or related to your use of, or inability to use, the App.',
  },
  {
    id: 'terms-changes',
    title: '9. Changes to These Terms',
    content:
      'Sola Studio may update or revise these Terms from time to time. If changes are made, the updated Terms will be posted within the App. Continued use of the App after changes are posted means that you accept the updated Terms.',
  },
  {
    id: 'terms-applicable-laws',
    title: '10. Applicable Laws',
    content:
      'These Terms are provided as general terms for a lightweight browser-based tool and are not tailored to every jurisdiction. You are responsible for ensuring that your use of the App complies with any laws, regulations, or accessibility requirements that may apply to you.',
  },
];

export const termsContent = {
  heading: 'Terms of Use',
  description:
    'These terms apply to the official hosted version of Contrastly, a free browser-based color contrast checking tool operated by Sola Studio. By using the App, you agree to the following terms.',
  articles: termsArticles,
};
