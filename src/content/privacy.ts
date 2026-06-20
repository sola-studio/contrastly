import { LegalArticleProps } from '@/components/legal/LegalArticle';

const privacyArticles: LegalArticleProps[] = [
  {
    id: 'privacy-policy_no-directly-provided-data',
    title: '1. Information We Do Not Ask You to Provide',
    content: [
      'Sola Studio does not ask you to provide directly identifying information such as your name, email address, account credentials, or payment information when using this App.',
      'We do not provide user accounts, login features, or member-only areas in this App.',
      'We do not upload, save, or store the colors you select, custom color values you enter, or contrast results on our servers.',
    ],
  },
  {
    id: 'privacy-policy_local-processing',
    title: '2. Local Processing of Color Data',
    content: [
      'Color selections, custom color values, contrast checks, and related calculations are processed within your browser.',
      'Your color combinations, contrast results, and design-related inputs are not transmitted to Sola Studio servers.',
      'Because this App is a browser-based tool, information visible on your screen may still be accessible to anyone who can access your device, browser, or screen.',
    ],
  },
  {
    id: 'privacy-policy_cookies-and-consent',
    title: '3. Cookies, Browser Storage, and Consent',
    content: [
      'This App uses a consent mechanism to let you accept, reject, or manage non-essential analytics cookies and similar browser-side storage technologies.',
      'If the consent banner or consent settings interface is enabled, your consent choices may be stored on your device using cookies, localStorage, or similar browser-side storage technologies so that your preferences can be remembered across visits.',
      'Where consent mode is used, Google tags may load before you make a choice in the cookie banner or cookie settings interface. In that case, consent is handled according to the default consent state and your later consent choices.',
      'Analytics cookies and full analytics measurement are enabled only according to the consent choices available through the cookie banner or cookie settings interface.',
      'You may change or withdraw your analytics preferences through the cookie settings interface where available, or by adjusting your browser settings.',
      'Some browser-based functionality may operate without analytics cookies. Disabling analytics cookies does not prevent you from using the core contrast checking features of the App.',
    ],
  },
  {
    id: 'privacy-policy_analytics',
    title: '4. Analytics',
    content: [
      'We use Google Analytics with consent mode to understand aggregate usage of the App, such as pages viewed, approximate engagement, device or browser information, and general geographic region.',
      'Analytics helps Sola Studio understand how the App is used and improve product quality, usability, and accessibility.',
      'When analytics consent is denied, Google Analytics may still receive cookieless pings or similar non-cookie signals that do not read or write analytics cookies.',
      'When analytics consent is granted, Google Analytics may use first-party cookies or similar technologies to measure usage.',
      'We do not use Google Analytics to identify individual users, and we do not intentionally send names, email addresses, account credentials, color selections, custom color values, contrast results, or project-specific design data to Google Analytics.',
      'We do not use analytics data for targeted advertising, and we do not share analytics data with advertisers.',
    ],
  },
  {
    id: 'privacy-policy_third-party-services',
    title: '5. Third-Party Services',
    content: [
      'Google Analytics is provided by Google and may process analytics data according to Google’s own terms, policies, and technical settings.',
      'The consent banner or consent management library used in this App may store your consent choice locally in your browser.',
      'Your browser, device, extensions, privacy settings, and cookie preferences may affect how analytics and consent-related storage operate.',
      'You can also limit analytics tracking through browser privacy controls, cookie settings, tracking protection tools, or Google’s available opt-out tools.',
    ],
  },

  {
    id: 'privacy-policy_data-minimization',
    title: '6. Data Minimization and App Scope',
    content: [
      'Sola Studio aims to keep this App minimal and privacy-conscious by avoiding accounts, uploads, server-side storage of color data, and advertising-based tracking.',
      'This App is provided as a lightweight color contrast checking tool for frontend, design, educational, and accessibility-related use.',
      'This policy applies to the official hosted version of the App operated by Sola Studio.',
      'This policy does not cover third-party forks, copies, modified versions, self-hosted deployments, other websites, services, repositories, or projects unless they are expressly operated by Sola Studio or link to this policy directly.',
    ],
  },
  {
    id: 'privacy-policy_policy-changes',
    title: '7. Changes to This Policy',
    content:
      'We may revise this policy from time to time. If we make significant changes, we will update this page or provide a notice within the App where appropriate.',
  },
];

export const privacyContent = {
  heading: 'Privacy Policy',
  description:
    'This policy explains how the official hosted version of Contrastly handles color data, cookies, browser-side storage, consent mode, analytics, and related browser-based information. Contrastly processes color checks locally in your browser and uses Google Analytics with consent mode according to your consent choices.',
  articles: privacyArticles,
};
