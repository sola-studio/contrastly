import { expect, test, type Page } from '@playwright/test';
import { expectNoAxeViolations } from './support/accessibility';

const homeHeading = 'Contrastly - Tailwind color contrast checker';

async function rejectOptionalCookies(page: Page) {
  await page.getByRole('button', { name: 'Reject optional' }).click();
  await expect(
    page.getByRole('dialog', {
      name: 'We use cookies and similar technologies',
    })
  ).toBeHidden();
}

test.describe('automated accessibility checks', () => {
  test('@a11y desktop initial state with cookie banner', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { level: 1, name: homeHeading })
    ).toBeVisible();
    await expect(
      page.getByRole('dialog', {
        name: 'We use cookies and similar technologies',
      })
    ).toBeVisible();

    await expectNoAxeViolations(page, testInfo);
  });

  test('@a11y mobile initial state and floating navigation', async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(
      page.getByRole('button', { name: 'Go to color palette' })
    ).toBeVisible();
    await expect(
      page.getByRole('dialog', {
        name: 'We use cookies and similar technologies',
      })
    ).toBeVisible();

    await expectNoAxeViolations(page, testInfo);
  });

  test('@a11y cookie preferences dialog', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Manage preferences' }).click();
    await expect(
      page.getByRole('dialog', { name: 'Privacy Preferences' })
    ).toBeVisible();

    await expectNoAxeViolations(page, testInfo);
  });

  test('@a11y rejected consent and reopened preferences', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    await rejectOptionalCookies(page);
    await page.getByRole('button', { name: 'Cookie Settings' }).click();
    await expect(
      page.getByRole('dialog', { name: 'Privacy Preferences' })
    ).toBeVisible();

    await expectNoAxeViolations(page, testInfo);
  });

  test('@a11y background selector and color picker', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    await rejectOptionalCookies(page);
    await page.locator('label[for="selector-bg-radio"]').click();
    await page.getByRole('button', { name: 'Use Color Picker' }).last().click();
    await expect(page.getByLabel('Background color picker')).toBeVisible();

    await expectNoAxeViolations(page, testInfo);
  });

  test('@a11y selected palette color and live status', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    await rejectOptionalCookies(page);
    const swatch = page.getByRole('button', {
      name: 'Select slate 50 (#f8fafc)',
    });
    await swatch.click();
    await expect(swatch).toHaveAttribute('aria-current', 'true');
    await expect(
      page.getByRole('status').filter({
        hasText: 'Selected foreground color slate-50-#f8fafc.',
      })
    ).toBeVisible();

    await expectNoAxeViolations(page, testInfo);
  });

  test('@a11y visible contrast guidance tooltip', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    await rejectOptionalCookies(page);
    await page
      .getByRole('button', { name: 'What counts as normal text?' })
      .hover();
    await expect(page.getByRole('tooltip')).toBeVisible();

    await expectNoAxeViolations(page, testInfo);
  });

  test('@a11y copy success toast', async ({ page, context }, testInfo) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await rejectOptionalCookies(page);
    await page.getByRole('button', { name: 'Copy white #FFFFFF' }).click();
    await expect(page.getByText('Copied to clipboard!')).toBeVisible();

    await expectNoAxeViolations(page, testInfo);
  });

  for (const pageDetails of [
    { path: '/privacy', heading: 'Privacy Policy' },
    { path: '/terms', heading: 'Terms of Use' },
  ]) {
    test(`@a11y ${pageDetails.path} content`, async ({ page }, testInfo) => {
      await page.goto(pageDetails.path);
      await rejectOptionalCookies(page);
      await expect(
        page.getByRole('heading', { level: 1, name: pageDetails.heading })
      ).toBeVisible();

      await expectNoAxeViolations(page, testInfo);
    });
  }
});
