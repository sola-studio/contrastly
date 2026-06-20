/**
 * Google Consent Mode v2 Integration
 * https://developers.google.com/tag-platform/security/guides/consent
 */

/**
 * Initialize dataLayer if not already present
 */
export function initializeDataLayer(): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }
}

/**
 * Set default consent state before user interaction.
 * Analytics and advertising-related storage are denied by default.
 */
export function setDefaultConsent(): void {
  if (typeof window === 'undefined') return;

  initializeDataLayer();

  window.gtag?.('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });
}

/**
 * Update consent based on the user's analytics choice.
 * Contrastly does not use advertising cookies or personalized advertising,
 * so advertising-related consent signals remain denied.
 */
export function updateConsent(consent: { analytics: boolean }): void {
  if (typeof window === 'undefined') return;

  initializeDataLayer();

  window.gtag?.('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}
