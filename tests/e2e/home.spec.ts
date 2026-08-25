import { expect, test, type Page } from '@playwright/test';

async function waitForConsentBannerToClose(page: Page) {
  await expect(
    page.getByRole('dialog', {
      name: 'We use cookies and similar technologies',
    })
  ).toBeHidden();
}

async function getConsentCategories(page: Page): Promise<string[]> {
  const consentCookie = (await page.context().cookies()).find(
    ({ name }) => name === 'cc_cookie'
  );
  expect(consentCookie).toBeDefined();

  const value = JSON.parse(decodeURIComponent(consentCookie?.value ?? '')) as {
    categories: string[];
  };
  return value.categories;
}

test.describe('contrast checker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Reject optional' }).click();
  });

  test('shows the default colors and contrast result', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Contrastly - Tailwind color contrast checker',
      })
    ).toBeVisible();

    await expect(
      page.getByRole('radiogroup', { name: 'Color Selector' })
    ).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Foreground' })).toBeChecked();
    await expect(
      page.getByRole('radio', { name: 'Background' })
    ).not.toBeChecked();
    await expect(page.getByLabel('Foreground hex value')).toHaveValue(
      '#FFFFFF'
    );
    await expect(page.getByLabel('Background hex value')).toHaveValue(
      '#2563EB'
    );
    await expect(page.getByText('5.16:1', { exact: true })).toBeVisible();
  });

  test('normalizes a shorthand hex value and updates the result', async ({
    page,
  }) => {
    const result = page.getByText(/^[0-9]+\.[0-9]{2}:1$/).first();
    const initialResult = await result.textContent();
    const foreground = page.getByLabel('Foreground hex value');

    await foreground.fill('#000');
    await foreground.press('Enter');

    await expect(foreground).toHaveValue('#000000');
    await expect(result).not.toHaveText(initialResult ?? '');
  });

  test('accepts a full hex value and announces the updated result', async ({
    page,
  }) => {
    const foreground = page.getByLabel('Foreground hex value');

    await foreground.fill('#000000');
    await foreground.press('Enter');

    await expect(foreground).toHaveValue('#000000');
    await expect(page.getByText('4.06:1', { exact: true })).toBeVisible();
    await expect(
      page.getByRole('status').filter({ hasText: 'Contrast ratio 4.06 to 1.' })
    ).toHaveText(
      'Contrast ratio 4.06 to 1. Normal text: AA fail, AAA fail. Large text: AA pass, AAA fail.'
    );
  });

  test('restores the last valid color after invalid input', async ({
    page,
  }) => {
    const foreground = page.getByLabel('Foreground hex value');

    await foreground.fill('not-a-color');
    await foreground.press('Enter');

    await expect(foreground).toHaveValue('#FFFFFF');
  });

  test('switches the active color selector with arrow keys', async ({
    page,
  }) => {
    const foreground = page.getByRole('radio', { name: 'Foreground' });
    const background = page.getByRole('radio', { name: 'Background' });

    await foreground.focus();
    await foreground.press('ArrowRight');

    await expect(background).toBeChecked();
    await expect(background).toBeFocused();
    await expect(page.getByLabel('Foreground hex value')).toHaveAttribute(
      'tabindex',
      '-1'
    );
    await expect(page.getByLabel('Background hex value')).toHaveAttribute(
      'tabindex',
      '0'
    );
  });

  test('applies a palette swatch to the selected background', async ({
    page,
  }) => {
    await page.locator('label[for="selector-bg-radio"]').click();
    const swatch = page.getByRole('button', {
      name: 'Select red 700 (#b91c1c)',
    });
    const shadeLabel = swatch.locator('span');

    await expect(shadeLabel).toHaveCSS('opacity', '0');
    await swatch.hover();
    await expect(shadeLabel).toHaveCSS('opacity', '1');

    await swatch.click();

    await expect(page.getByLabel('Background hex value')).toHaveValue(
      '#B91C1C'
    );
    await expect(swatch).toHaveAttribute('aria-current', 'true');
  });

  test('moves through the palette with the keyboard and announces selection', async ({
    page,
  }) => {
    const slate50 = page.getByRole('button', {
      name: 'Select slate 50 (#f8fafc)',
    });
    const gray100 = page.getByRole('button', {
      name: 'Select gray 100 (#f3f4f6)',
    });

    await slate50.focus();
    await slate50.press('ArrowRight');
    await expect(
      page.getByRole('button', { name: 'Select gray 50 (#f9fafb)' })
    ).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(gray100).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(gray100).toHaveAttribute('aria-current', 'true');
    await expect(
      page.getByRole('status').filter({
        hasText: 'Selected foreground color gray-100-#f3f4f6.',
      })
    ).toBeVisible();
  });

  test('shows pass and fail results that match the calculated ratio', async ({
    page,
  }) => {
    const results = page.getByRole('region', {
      name: 'Contrast Check Results',
    });

    await expect(results.getByText('5.16:1', { exact: true })).toBeVisible();
    await expect(results.getByText('Pass', { exact: true })).toHaveCount(3);
    await expect(results.getByText('Fail', { exact: true })).toHaveCount(1);

    const foreground = page.getByLabel('Foreground hex value');
    await foreground.fill('#2563EB');
    await foreground.press('Enter');

    await expect(results.getByText('1:1', { exact: true })).toBeVisible();
    await expect(results.getByText('Fail', { exact: true })).toHaveCount(4);
  });
});

test.describe('consent choices', () => {
  test('stores rejected consent and reopens preferences', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Reject optional' }).click();
    await waitForConsentBannerToClose(page);

    await expect(getConsentCategories(page)).resolves.toEqual(['necessary']);

    await page.getByRole('button', { name: 'Cookie Settings' }).click();
    await expect(
      page.getByRole('dialog', { name: 'Privacy Preferences' })
    ).toBeVisible();
  });

  test('stores analytics consent and hides the banner', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Accept analytics' }).click();
    await waitForConsentBannerToClose(page);

    await expect(getConsentCategories(page)).resolves.toEqual([
      'necessary',
      'analytics',
    ]);
  });

  test('saves and restores the analytics preference', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Manage preferences' }).click();

    const preferencesDialog = page.getByRole('dialog', {
      name: 'Privacy Preferences',
    });
    const analyticsToggle = page.getByRole('checkbox', { name: 'Analytics' });
    await expect(analyticsToggle).not.toBeChecked();
    await analyticsToggle.check();
    await page.getByRole('button', { name: 'Save preferences' }).click();
    await expect(preferencesDialog).toBeHidden();

    await expect(getConsentCategories(page)).resolves.toEqual([
      'necessary',
      'analytics',
    ]);

    await page.getByRole('button', { name: 'Cookie Settings' }).click();
    await expect(
      page.getByRole('checkbox', { name: 'Analytics' })
    ).toBeChecked();
  });
});

test.describe('navigation and focus', () => {
  test('moves focus to the skip link targets', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Reject optional' }).click();

    const contentLink = page.getByRole('link', { name: 'Skip to content' });
    await contentLink.focus();
    await contentLink.press('Enter');
    await expect(page.locator('#main')).toBeFocused();

    const paletteLink = page.getByRole('link', {
      name: 'Skip to color palette',
    });
    await paletteLink.focus();
    await paletteLink.press('Enter');
    await expect(page.locator('#color-palette')).toBeFocused();
  });

  test('mobile floating navigation moves between the palette and top', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('button', { name: 'Reject optional' }).click();

    await page.getByRole('button', { name: 'Go to color palette' }).click();
    const backToTop = page.getByRole('button', {
      name: 'Back to top, where contrast results are displayed',
    });
    await expect(backToTop).toBeVisible();
    await backToTop.click();
    await expect(
      page.getByRole('button', { name: 'Go to color palette' })
    ).toBeVisible();
  });
});

test.describe('site navigation', () => {
  for (const pageDetails of [
    { path: '/privacy', heading: 'Privacy Policy' },
    { path: '/terms', heading: 'Terms of Use' },
  ]) {
    test(`opens ${pageDetails.heading}`, async ({ page }) => {
      await page.goto(pageDetails.path);
      await expect(
        page.getByRole('heading', { level: 1, name: pageDetails.heading })
      ).toBeVisible();
    });
  }
});
