import { expect, test } from '@playwright/test';
import { expectNoAxeViolations } from './support/accessibility';

test.describe('automated accessibility checks', () => {
  for (const pageDetails of [
    { path: '/', heading: 'Contrastly - Tailwind color contrast checker' },
    { path: '/privacy', heading: 'Privacy Policy' },
    { path: '/terms', heading: 'Terms of Use' },
  ]) {
    test(`@a11y ${pageDetails.path} has no detectable axe violations`, async ({
      page,
    }, testInfo) => {
      await page.goto(pageDetails.path);
      await expect(
        page.getByRole('heading', { level: 1, name: pageDetails.heading })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Reject optional' })
      ).toBeVisible();

      await expectNoAxeViolations(page, testInfo);
    });
  }

  test('@a11y cookie preferences dialog has no detectable axe violations', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Manage preferences' }).click();
    await expect(
      page.getByRole('heading', { name: 'Privacy Preferences' })
    ).toBeVisible();

    await expectNoAxeViolations(page, testInfo);
  });
});
