const { test, expect } = require('@playwright/test');
const { ECommencePage } = require('../pageObjects/e-commencePage');
const { ThemePage } = require('../pageObjects/themePage');
const { NavigationPage } = require('../pageObjects/navigationPage');

test.describe('E-Commerce Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        // Go to theme page and select Light theme to land on dashboard
        const themePage = new ThemePage(page);
        await themePage.goto();
        await themePage.selectLightTheme();
        // Wait for dashboard to load
        const eCommPage = new ECommencePage(page);
        await eCommPage.goto();
        
    });

    test.only('Ecommence Regression', async ({ page }) => {
        const eCommPage = new ECommencePage(page);
        const nav = new NavigationPage(page);
        await nav.selectTheme('Dark');
        await expect(nav.currentTheme).toHaveText('Dark');
        // Assert visibility of main dashboard components
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

        // Assert visibility and functionality of Contact Us button
        await expect(eCommPage.contactUsButton).toBeVisible();
        await eCommPage.contactUsButton.click();
        await expect(page).toHaveURL(/^https:\/\/www\.akveo\.com\/contact\?/);
        await page.goBack(); 
        
        // Change theme to Cosmic and verify
        await nav.selectTheme('Cosmic');
        await expect(nav.currentTheme).toHaveText('Cosmic');

        // Assert visibility and functionality of Learn More button
        await expect(eCommPage.learnMoreButton).toBeVisible();
        await eCommPage.learnMoreButton.click();
        await expect(page).toHaveURL(/^https:\/\/akveo\.github\.io\/ngx-admin\/\?/);
        await page.goBack();

        //Change theme to Material Light and verify
        await nav.selectTheme('Material Light');
        await expect(nav.currentTheme).toHaveText('Material Light');

        // Assert visibility of profit card and its elements
        await expect(eCommPage.profitCard).toBeVisible();
        await expect(page.locator('ngx-stats-card-front .title')).toHaveText('Profit');
        await eCommPage.flipProfitCard();
        await expect(page.locator('ngx-stats-card-back .title')).toHaveText('Profit');
        await eCommPage.flipProfitCardBack();

        // Assert visibility of earnings card and its elements
        await expect(eCommPage.earningsCard).toBeVisible();
        await expect(eCommPage.earningsCardFlipIcon.first()).toBeVisible();
        await expect(eCommPage.currencyButton).toBeVisible();

        // Flip the earnings card
        await eCommPage.flipEarningsCard();
        await eCommPage.flipEarningsCardBack();

        // Select a currency option
        await eCommPage.selectCurrency(0);
        await expect(page.locator('ngx-earning-card button span')).toHaveText('Bitcoin');
        await eCommPage.selectCurrency(1);
        await expect(page.locator('ngx-earning-card button span')).toHaveText('Tether');
        await eCommPage.selectCurrency(2);
        await expect(page.locator('ngx-earning-card button span')).toHaveText('Ethereum');

         // Assert visibility of traffic reveal card and its elements
        await expect(eCommPage.trafficRevealCard).toBeVisible();
        await expect(eCommPage.trafficRevealCardFlipIcon.last()).toBeVisible();
        await expect(eCommPage.trafficPeriodButton).toBeVisible();
        await eCommPage.flipTrafficRevealCard();
        await eCommPage.flipTrafficRevealCardBack();
        // Select traffic period as week
        await eCommPage.selectTrafficPeriod(0);
        const days = await page.locator('nb-card-front nb-list-item').count();
        expect(days).toEqual(7);
        // Select traffic period as month
        await eCommPage.selectTrafficPeriod(1);
        const months = await page.locator('nb-card-front nb-list-item').count();
        expect(months).toEqual(12);
        // Select traffic period as year
        await eCommPage.selectTrafficPeriod(2);
        const years = await page.locator('nb-card-front nb-list-item').count();
        expect(years).toEqual(9);

        // Assert visibility of ECommence chart and its elements
        await expect(eCommPage.ecommerceChartOrders).toBeVisible();
        await expect(eCommPage.ecommerceChartProfit).toBeVisible();

        // Change to Orders chart and change periods
        await eCommPage.clickEcommerceOrders();
        await expect(eCommPage.ecommerceChartOrdersPeriodButton).toBeVisible();
        await eCommPage.ecommerceChartOrdersPeriodButton.click();
        await eCommPage.ecommerceChartPeriodOptions.nth(1).click();
        await eCommPage.ecommerceChartOrdersPeriodButton.click();
        await eCommPage.ecommerceChartPeriodOptions.nth(2).click();

        // Change to Profit chart and change periods
        await eCommPage.clickEcommerceProfit();
        await eCommPage.selectEcommerceProfitPeriod(1);
        await eCommPage.selectEcommerceProfitPeriod(2);

         // Assert visibility of country orders statistics card and its elements
        await expect(eCommPage.countryOrdersStatisticsCard).toBeVisible();
        await expect(eCommPage.countryOrdersStatisticsCardHeader).toBeVisible();
        await expect(eCommPage.countryChartZoomInBtn).toBeVisible();
        await expect(eCommPage.countryChartZoomOutBtn).toBeVisible();
        await eCommPage.countryChartZoomIn();
        await eCommPage.countryChartZoomIn();
        await eCommPage.selectCountry();

         // Assert Progress Section
        await expect(eCommPage.progressSection).toBeVisible();
        await expect(eCommPage.todaysProfit).toBeVisible();
        await expect(eCommPage.newOrders).toBeVisible();
        await expect(eCommPage.newComments).toBeVisible();
        // Assert progress bar and text value
        expect(await eCommPage.todaysProfitBarValue(0)).toBe(await eCommPage.getTodaysProfitTextValue(0));
        expect(await eCommPage.todaysProfitBarValue(1)).toBe(await eCommPage.getTodaysProfitTextValue(1));
        expect(await eCommPage.todaysProfitBarValue(2)).toBe(await eCommPage.getTodaysProfitTextValue(2));
        
         // Assert visibility of visitors analytics card and its elements
        await expect(eCommPage.visitorsAnalyticsCard).toBeVisible();
        await expect( eCommPage.visitorsAnalyticsCardHeader).toBeVisible();
        await eCommPage.visitorsAnalyticsShowToggle.click();
        await eCommPage.visitorsAnalyticsShowToggle.click();
        await expect(eCommPage.visitorsAnalyticsCardHeader).toHaveText("Visitors Analytics");

         // Assert visibility of user activity card and its elements
        await expect(eCommPage.userActivityCard).toBeVisible();
        await expect(eCommPage.userActivityCardHeader).toBeVisible();
        await expect(eCommPage.userActivityPeriodButton).toBeVisible();
        await eCommPage.selectUserActivityPeriod(1);
        await eCommPage.selectUserActivityPeriod(2);


    });


    test('Verify Contact Us Link', async ({ page }) => {
        const eCommPage = new ECommencePage(page);
        // Assert visibility and functionality of Contact Us button
        await expect(eCommPage.contactUsButton).toBeVisible();
        await eCommPage.contactUsButton.click();
        await expect(page).toHaveURL(/^https:\/\/www\.akveo\.com\/contact\?/);


    });

    test('Verify Learn More Link', async ({ page }) => {
        const eCommPage = new ECommencePage(page);
        // Assert visibility and functionality of Learn More button
        await expect(eCommPage.learnMoreButton).toBeVisible();
        await eCommPage.learnMoreButton.click();
        await expect(page).toHaveURL(/^https:\/\/akveo\.github\.io\/ngx-admin\/\?/);

    });

    test('Verify Profit Card', async ({ page }) => {
        const eCommPage = new ECommencePage(page);

        // Assert visibility of profit card and its elements
        await expect(eCommPage.profitCard).toBeVisible();
        await expect(page.locator('ngx-stats-card-front .title')).toHaveText('Profit');
        await eCommPage.flipProfitCard();
        await expect(page.locator('ngx-stats-card-back .title')).toHaveText('Profit');
        await eCommPage.flipProfitCardBack();

    });

    test('Verify Earnings Card', async ({ page }) => {
        const eCommPage = new ECommencePage(page);

        // Assert visibility of earnings card and its elements
        await expect(eCommPage.earningsCard).toBeVisible();
        await expect(eCommPage.earningsCardFlipIcon.first()).toBeVisible();
        await expect(eCommPage.currencyButton).toBeVisible();

        // Flip the earnings card
        await eCommPage.flipEarningsCard();
        await eCommPage.flipEarningsCardBack();

        // Select a currency option
        await eCommPage.selectCurrency(0);
        await expect(page.locator('ngx-earning-card button span')).toHaveText('Bitcoin');
        await eCommPage.selectCurrency(1);
        await expect(page.locator('ngx-earning-card button span')).toHaveText('Tether');
        await eCommPage.selectCurrency(2);
        await expect(page.locator('ngx-earning-card button span')).toHaveText('Ethereum');


    });

    test('Verify Traffic Reveal Card', async ({ page }) => {
        const eCommPage = new ECommencePage(page);

        // Assert visibility of traffic reveal card and its elements
        await expect(eCommPage.trafficRevealCard).toBeVisible();
        await expect(eCommPage.trafficRevealCardFlipIcon.last()).toBeVisible();
        await expect(eCommPage.trafficPeriodButton).toBeVisible();
        await eCommPage.flipTrafficRevealCard();
        await eCommPage.flipTrafficRevealCardBack();
        // Select traffic period as week
        await eCommPage.selectTrafficPeriod(0);
        const days = await page.locator('nb-card-front nb-list-item').count();
        expect(days).toEqual(7);
        // Select traffic period as month
        await eCommPage.selectTrafficPeriod(1);
        const months = await page.locator('nb-card-front nb-list-item').count();
        expect(months).toEqual(12);
        // Select traffic period as year
        await eCommPage.selectTrafficPeriod(2);
        const years = await page.locator('nb-card-front nb-list-item').count();
        expect(years).toEqual(9);

    });

    test('Verify ECommence Chart', async ({ page }) => {
        const eCommPage = new ECommencePage(page);

        // Assert visibility of ECommence chart and its elements
        await expect(eCommPage.ecommerceChartOrders).toBeVisible();
        await expect(eCommPage.ecommerceChartProfit).toBeVisible();

        // Change to Orders chart and change periods
        await eCommPage.clickEcommerceOrders();
        await expect(eCommPage.ecommerceChartOrdersPeriodButton).toBeVisible();
        await eCommPage.ecommerceChartOrdersPeriodButton.click();
        await eCommPage.ecommerceChartPeriodOptions.nth(1).click();
        await eCommPage.ecommerceChartOrdersPeriodButton.click();
        await eCommPage.ecommerceChartPeriodOptions.nth(2).click();

        // Change to Profit chart and change periods
        await eCommPage.clickEcommerceProfit();
        await eCommPage.selectEcommerceProfitPeriod(1);
        await eCommPage.selectEcommerceProfitPeriod(2);


    });

    test('interact with Country Orders Statistics', async ({ page }) => {
        const eCommPage = new ECommencePage(page);
        // Assert visibility of country orders statistics card and its elements
        await expect(eCommPage.countryOrdersStatisticsCard).toBeVisible();
        await expect(eCommPage.countryOrdersStatisticsCardHeader).toBeVisible();
        await expect(eCommPage.countryChartZoomInBtn).toBeVisible();
        await expect(eCommPage.countryChartZoomOutBtn).toBeVisible();
        await eCommPage.countryChartZoomIn();
        await eCommPage.countryChartZoomIn();
        await eCommPage.selectCountry();
        // Add assertion to verify country selection
    });

    test('progress section', async ({ page }) => {
        const eCommPage = new ECommencePage(page);

        // Assert Progress Section
        await expect(eCommPage.progressSection).toBeVisible();
        await expect(eCommPage.todaysProfit).toBeVisible();
        await expect(eCommPage.newOrders).toBeVisible();
        await expect(eCommPage.newComments).toBeVisible();
        // Assert progress bar and text value
        expect(await eCommPage.todaysProfitBarValue(0)).toBe(await eCommPage.getTodaysProfitTextValue(0));
        expect(await eCommPage.todaysProfitBarValue(1)).toBe(await eCommPage.getTodaysProfitTextValue(1));
        expect(await eCommPage.todaysProfitBarValue(2)).toBe(await eCommPage.getTodaysProfitTextValue(2));
        
    });

     test('verify Visitor Analytics', async ({ page }) => {
        const eCommPage = new ECommencePage(page);
        // Assert visibility of visitors analytics card and its elements
        await expect(eCommPage.visitorsAnalyticsCard).toBeVisible();
        await expect( eCommPage.visitorsAnalyticsCardHeader).toBeVisible();
        await eCommPage.visitorsAnalyticsShowToggle.click();
        await eCommPage.visitorsAnalyticsShowToggle.click();
        await expect(eCommPage.visitorsAnalyticsCardHeader).toHaveText("Visitors Analytics");

    });

    test('verify User Activity', async ({ page }) => {
        const eCommPage = new ECommencePage(page);
        // Assert visibility of user activity card and its elements
        await expect(eCommPage.userActivityCard).toBeVisible();
        await expect(eCommPage.userActivityCardHeader).toBeVisible();
        await expect(eCommPage.userActivityPeriodButton).toBeVisible();
        await eCommPage.selectUserActivityPeriod(1);
        await eCommPage.selectUserActivityPeriod(2);

    });

});
