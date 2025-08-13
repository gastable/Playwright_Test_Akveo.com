// navigationPage.spec.js
// Playwright test file for NavigationPage

const { test, expect } = require('@playwright/test');
const { ThemePage } = require('../pageObjects/themePage');
const { NavigationPage } = require('../pageObjects/navigationPage');

test.describe('Sidebar Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to theme page and select Light theme to land on dashboard
        const themePage = new ThemePage(page);
        await themePage.goto();
        await themePage.selectLightTheme();
        // Wait for dashboard to load
        await expect(page).toHaveURL('https://demo.akveo.com/ngx-admin/pages/dashboard?theme=default');
  });

  test('Logo is visible and clickable', async ({ page }) => {
    const nav = new NavigationPage(page);
    await expect(nav.logo).toBeVisible();
    await nav.clickLogo();
    // Optionally check for navigation or reload
    await expect(nav.logo).toBeVisible();
  });

  test.only('Select Theme', async ({ page }) => {
    const nav = new NavigationPage(page);
    await expect(nav.themeSelector).toBeVisible();
   
await nav.selectTheme('Dark');
await expect(nav.currentTheme).toHaveText('Dark');
  });

  test('Navigate to E-commerce Dashboard', async ({ page }) => {
    const nav = new NavigationPage(page);
    await nav.navigateToEcommerce();
    await expect(page).toHaveURL(/e-commerce/);
  });



  test('All sidebar navigation items are visible', async ({ page }) => {
    const nav = new NavigationPage(page);
    await expect(nav.ecommerceNav).toBeVisible();
    await expect(nav.iotNav).toBeVisible();
    await expect(nav.layoutNav).toBeVisible();
    await expect(nav.formsNav).toBeVisible();
    await expect(nav.uiFeaturesNav).toBeVisible();
    await expect(nav.modalOverlaysNav).toBeVisible();
    await expect(nav.extraComponentsNav).toBeVisible();
    await expect(nav.tablesNav).toBeVisible();
    await expect(nav.authNav).toBeVisible();
    await expect(nav.mapsNav).toBeVisible();
    await expect(nav.chartsNav).toBeVisible();
    await expect(nav.editorsNav).toBeVisible();
    await expect(nav.miscellaneousNav).toBeVisible();
  });
});
