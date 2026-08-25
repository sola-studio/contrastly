import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, type TestInfo } from '@playwright/test';

export async function expectNoAxeViolations(
  page: Page,
  testInfo: TestInfo
) {
  const cookieConsent = page.locator('#cc-main');
  if (await cookieConsent.count()) {
    await cookieConsent.evaluate(async (element) => {
      const animations = element.getAnimations({ subtree: true });
      await Promise.all(
        animations.map((animation) =>
          animation.finished.catch(() => undefined)
        )
      );
    });
  }

  const results = await new AxeBuilder({ page }).analyze();

  await testInfo.attach('axe-results', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });

  if (results.incomplete.length > 0) {
    const ruleIds = results.incomplete.map(({ id }) => id).join(', ');
    testInfo.annotations.push({
      type: 'axe-incomplete',
      description: `${results.incomplete.length} result(s) require manual review: ${ruleIds}`,
    });
  }

  const violations = results.violations.map(
    ({ id, impact, help, helpUrl, nodes }) => ({
      id,
      impact,
      help,
      helpUrl,
      nodes: nodes.map(({ target, html, failureSummary }) => ({
        target,
        html,
        failureSummary,
      })),
    })
  );

  expect(
    violations,
    'Expected no automatically detectable accessibility violations. See the axe-results attachment for the complete scan.'
  ).toEqual([]);
}
