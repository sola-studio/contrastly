import type { ConsentText } from '@/types/consent';

export const consentText: ConsentText = {
  consentModal: {
    title: 'We use cookies and similar technologies',
    description:
      'We use necessary cookies or similar browser-side storage technologies to keep the App working and remember your privacy choices. We also use Google Analytics with consent mode to understand aggregate usage and improve the App. Google tags may load before you make a choice, but analytics cookies and full analytics measurement are enabled only when you accept analytics.',
    acceptAllBtn: 'Accept analytics',
    acceptNecessaryBtn: 'Reject optional',
    showPreferencesBtn: 'Manage preferences',
  },
  preferencesModal: {
    title: 'Privacy Preferences',
    acceptAllBtn: 'Accept analytics',
    acceptNecessaryBtn: 'Reject optional',
    savePreferencesBtn: 'Save preferences',
    closeIconLabel: 'Close',
    sections: [
      {
        title: 'Cookies and Similar Technologies',
        description:
          'You can choose whether to allow optional analytics cookies and related measurement technologies. The core contrast checking features work without optional analytics.',
      },
      {
        title: 'Strictly Necessary',
        description:
          'These cookies or similar browser-side storage technologies are needed for basic site functionality, security, accessibility, and remembering your privacy preferences. They cannot be disabled through this preferences panel.',
        linkedCategory: 'necessary',
      },
      {
        title: 'Analytics',
        description:
          'These optional technologies help Sola Studio understand aggregate usage of Contrastly, such as pages viewed, approximate engagement, device or browser information, and general geographic region. This includes Google Analytics with consent mode. When analytics consent is denied, Google Analytics may still receive cookieless pings or similar non-cookie signals that do not read or write analytics cookies. Analytics cookies and full analytics measurement are enabled only when you accept analytics. We do not use analytics data for targeted advertising, and we do not intentionally send selected colors, custom color values, or contrast results to analytics.',
        linkedCategory: 'analytics',
      },
    ],
  },
};
