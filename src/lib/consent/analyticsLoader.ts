import { initializeDataLayer } from './googleConsentMode';

/**
 * Load Google Analytics 4 (GA4) with Consent Mode v2
 * Script loads immediately, but respects consent state
 * Prevents duplicate script injection
 */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const SCRIPT_ID = 'ga4-script';
let isGA4Loaded = false;

/**
 * Initialize and load GA4 script
 * Called after default consent is set and any saved consent is restored.
 * Consent Mode controls data collection behavior.
 */
export function loadAnalyticsScripts(): void {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV !== 'production') {
    // Exclude GA4 from local environment access
    // Comment out this return statement if you want to test locally
    return;
  }

  if (!GA_MEASUREMENT_ID) {
    console.warn('GA4: NEXT_PUBLIC_GA_MEASUREMENT_ID not configured');
    return;
  }

  // Prevent duplicate loading
  if (isGA4Loaded || document.getElementById(SCRIPT_ID)) {
    return;
  }

  // Ensure dataLayer and gtag are initialized
  initializeDataLayer();

  // Load Google Analytics 4
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

  script.onload = () => {
    // Initialize GA4 using existing gtag
    window.gtag?.('js', new Date());
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });

    isGA4Loaded = true;
  };

  script.onerror = () => {
    console.error('Failed to load Google Analytics script');
  };

  document.head.appendChild(script);
}
