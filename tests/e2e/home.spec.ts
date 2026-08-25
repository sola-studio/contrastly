import { expect, test } from '@playwright/test';

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

    await swatch.click();

    await expect(page.getByLabel('Background hex value')).toHaveValue(
      '#B91C1C'
    );
    await expect(swatch).toHaveAttribute('aria-current', 'true');
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
