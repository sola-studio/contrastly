'use client';

import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type * as CookieConsentType from 'vanilla-cookieconsent';
import { consentText } from '@/lib/consent/consentText';
import {
  setDefaultConsent,
  updateConsent,
} from '@/lib/consent/googleConsentMode';
import { loadAnalyticsScripts } from '@/lib/consent/analyticsLoader';

/**
 * Enhance cookie consent modal accessibility
 * - Add clear labels to toggle inputs
 */
function enhanceCookieConsentAccessibility() {
  // Add descriptive labels to toggle inputs if missing
  const toggleInputs = document.querySelectorAll<HTMLInputElement>(
    '#cc-main .section__toggle'
  );
  toggleInputs.forEach((toggle) => {
    // Only add label if not already present
    if (!toggle.getAttribute('aria-label')) {
      const section = toggle.closest('.pm__section--toggle');
      const title = section
        ?.querySelector('.pm__section-title')
        ?.textContent?.trim();
      if (title) {
        toggle.setAttribute('aria-label', title);
      }
    }
  });
}

/**
 * Schedule accessibility enhancements with robust timing
 * - Run immediately if DOM exists
 * - Run on next frame
 * - Run after short delay (catches lazy-loaded preferences modal)
 * - Observe DOM changes for when modal opens/changes
 */
function scheduleAccessibilityEnhancements() {
  // Run immediately
  enhanceCookieConsentAccessibility();

  // Run on next animation frame
  window.requestAnimationFrame(() => {
    enhanceCookieConsentAccessibility();
  });

  // Run after short delay to catch lazy-loaded preferences modal
  setTimeout(() => {
    enhanceCookieConsentAccessibility();
  }, 200);

  // Watch for DOM changes in cookie consent container
  // Re-run enhancement when preferences modal opens or content changes
  const observer = new MutationObserver(() => {
    enhanceCookieConsentAccessibility();
  });

  const targetNode = document.querySelector('#cc-main');
  if (targetNode) {
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });
  }

  // Clean up observer after 30 seconds (modal interactions should be done by then)
  setTimeout(() => {
    observer.disconnect();
  }, 30000);
}

export function CookieConsentManager() {
  const pathname = usePathname();
  const isInitialized = useRef(false);
  const cookieConsent = useRef<typeof CookieConsentType | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const setup = async () => {
      const [CookieConsent] = await Promise.all([
        import('vanilla-cookieconsent'),
      ]);

      if (isCancelled) {
        return;
      }

      cookieConsent.current = CookieConsent;

      // Initialize Cookie Consent only once
      if (!isInitialized.current) {
        // Initialize Google Consent Mode with default denied state
        setDefaultConsent();

        CookieConsent.run({
          // Revision number for cookie reset
          revision: 1,

          // Categories
          categories: {
            necessary: {
              enabled: true,
              readOnly: true,
            },
            analytics: {
              enabled: false,
              readOnly: false,
            },
          },

          // Language
          language: {
            default: 'en',
            translations: {
              en: {
                consentModal: consentText.consentModal,
                preferencesModal: consentText.preferencesModal,
              },
            },
          },

          // GUI options
          guiOptions: {
            consentModal: {
              layout: 'box inline',
              position: 'bottom right',
            },
          },

          // Callbacks
          onConsent: ({ cookie }) => {
            const consent = {
              analytics: cookie.categories.includes('analytics'),
            };

            // Update Google Consent Mode (GA script already loaded)
            updateConsent(consent);
          },

          onChange: ({ cookie }) => {
            const consent = {
              analytics: cookie.categories.includes('analytics'),
            };

            // Update Google Consent Mode (GA script already loaded)
            updateConsent(consent);
          },
        });

        // CRITICAL: Check for existing consent before loading analytics
        // If user already accepted, update consent BEFORE loading GA script
        const savedCookie = CookieConsent.getCookie();
        const savedCategories = Array.isArray(savedCookie?.categories)
          ? savedCookie.categories
          : [];

        if (savedCategories.length > 0) {
          const existingConsent = {
            analytics: savedCategories.includes('analytics'),
          };

          // Update consent to 'granted' state BEFORE loading GA
          updateConsent(existingConsent);
        }

        // Load GA script AFTER checking existing consent
        // This ensures config runs with correct consent state
        loadAnalyticsScripts();

        // Accessibility enhancements (post-render)
        // Run with robust timing to catch lazy-loaded preferences modal
        scheduleAccessibilityEnhancements();

        isInitialized.current = true;
      }
    };

    void setup();

    return () => {
      isCancelled = true;
    };
  }, [pathname]);

  return null;
}
