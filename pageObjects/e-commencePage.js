class ECommencePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Dashboard CTAs and cards
        this.contactUsButton = page.locator('a:has-text(" Contact us ")');
        this.contactUsDetails = page.locator('.details').first();
        this.learnMoreButton = page.locator('a:has-text(" Learn more ")');
        this.learnMoreDetails = page.locator('.details').last();


        // Profit card
        this.profitCard = page.locator('ngx-profit-card');
        this.profitCardFlipIcon = page.locator('ngx-profit-card rect');
        // Digital Currency Earnings
        this.earningsCard = page.locator('ngx-earning-card');
        this.earningsCardFlipIcon = page.locator('ngx-earning-card rect');
        this.currencyButton = page.locator('ngx-earning-card button');
        this.currencyOptions = page.locator('nb-option');

        // Traffic Reveal Card
        this.trafficRevealCard = page.locator('ngx-traffic-reveal-card');
        this.trafficRevealCardFlipIcon = page.locator('ngx-traffic-reveal-card rect');
        this.trafficPeriodButton = page.locator('ngx-traffic-reveal-card button').first();
        this.trafficPeriodOptions = page.locator('nb-option');

        //Ecommerce Chart
        this.ecommerceChartOrders = page.locator('ngx-ecommerce-charts a span:has-text("Orders")');
        this.ecommerceChartProfit = page.locator('ngx-ecommerce-charts a span:has-text("Profit")');
        this.ecommerceChartOrdersPeriodButton = page.locator('ngx-ecommerce-charts button').first();
        this.ecommerceChartProfitPeriodButton = page.locator('ngx-ecommerce-charts button').last();
        this.ecommerceChartPeriodOptions = page.locator('nb-option');

        // Country Orders Statistics
        this.countryOrdersStatisticsCard = page.locator('ngx-country-orders');
        this.countryOrdersStatisticsCardHeader = this.countryOrdersStatisticsCard.locator('nb-card-header');
        this.countryChart = page.locator('.leaflet-container');
        this.countryList = page.locator('.leaflet-interactive')
        this.countryChartZoomInBtn = page.getByRole('button', { name: 'Zoom in' });
        this.countryChartZoomOutBtn = page.getByRole('button', { name: 'Zoom out' });

        // Progress Section
        this.progressSection = page.locator('ngx-progress-section');
        this.todaysProfit = this.progressSection.getByText(/Today.?s Profit/i);
        this.newOrders = page.locator(".subtitle:has-text('New Orders')");
        this.newComments = page.locator(".subtitle:has-text('New Comments')");
        this.todaysProfitProgessBar = this.progressSection.locator('.progress-value');
        this.todaysProfitTextValue = this.progressSection.locator('bdi');

        // Visitors Analytics
        this.visitorsAnalyticsCard = page.locator('ngx-ecommerce-visitors-analytics');
        this.visitorsAnalyticsCardHeader = page.locator('ngx-ecommerce-visitors-analytics h3');
        this.visitorsAnalyticsShowToggle = page.locator('.show-hide-toggle');
        // User Activity
        this.userActivityCard = page.locator('ngx-user-activity');
        this.userActivityCardHeader = page.locator('ngx-user-activity span:has-text("User Activity")');
        this.userActivityPeriodButton = page.locator('ngx-user-activity button');
        this.userActivityPeriodOptions = page.locator('nb-option');

    }

    async goto() {
        await this.page.goto('https://demo.akveo.com/ngx-admin/pages/dashboard');
    }

    async navigateToContactUs() {
        await this.contactUsButton.click();
    }

    async navigateToLearnMore() {
        await this.learnMoreButton.click();
    }

    async flipProfitCard() {
        await this.profitCardFlipIcon.first().click();
    }

    async flipProfitCardBack() {
        await this.profitCardFlipIcon.last().click();
    }

    async flipEarningsCard() {
        await this.earningsCardFlipIcon.nth(2).click();
    }

    async flipEarningsCardBack() {
        await this.earningsCardFlipIcon.nth(3).click();
    }

    async selectCurrency(nthOption) {
        await this.currencyButton.click();
        await this.currencyOptions.nth(nthOption).click();
    }

    async flipTrafficRevealCard() {
        await this.trafficRevealCardFlipIcon.nth(8).click();
    }

    async flipTrafficRevealCardBack() {
        await this.trafficRevealCardFlipIcon.nth(10).click();
    }

    async selectTrafficPeriod(nthOption) {
        await this.trafficPeriodButton.click();
        await this.trafficPeriodOptions.nth(nthOption).click();
    }

    async clickEcommerceOrders() {
        await this.ecommerceChartOrders.click();
    }

    async clickEcommerceProfit() {
        await this.ecommerceChartProfit.click();
    }


    async selectEcommerceOrdersPeriod(nthOption) {
        await this.ecommerceChartOrfdersPeriodButton.click();
        await this.ecommerceChartPeriodOptions.nth(nthOption).click();
    }
    async selectEcommerceProfitPeriod(nthOption) {
        await this.ecommerceChartProfitPeriodButton.click();
        await this.ecommerceChartPeriodOptions.nth(nthOption).click();

    }

    async todaysProfitBarValue(nth) {
        // Assert Today's Profit progress bar and text value
        const todaysProfitBarValue = await this.todaysProfitProgessBar.nth(nth).evaluate(el => {
            return el.style.width.trim(); // e.g., "70%"
        });
        console.log(`Today's Profit Bar Value: ${todaysProfitBarValue}`);
        return todaysProfitBarValue;

    }

    async getTodaysProfitTextValue(nth) {
        const todaysProfitText = await this.todaysProfitTextValue.nth(nth).textContent();
        const match = todaysProfitText.match(/\((\d+)%\)/);
        const textPercentage = match ? `${match[1]}%` : null;
        console.log(`Today's Profit Text Value: ${todaysProfitText}, Percentage: ${textPercentage}`);
        return textPercentage;
    }

    async selectUserActivityPeriod(nth){
        await this.userActivityPeriodButton.click();
        await this.userActivityPeriodOptions.nth(nth).click();
    }


    async countryChartZoomIn() {
        await this.countryChartZoomInBtn.click();
    }

    async countryChartZoomOut() {
        await this.countryChartZoomOutBtn.click();
    }

    async selectCountry() {
        // Bring widget into view
        await this.countryOrdersStatisticsCard.scrollIntoViewIfNeeded();
        await this.countryChart.waitFor({ state: 'visible' });

        // Use UI controls (stable) to adjust map
        await this.countryChartZoomInBtn.click();
        await this.countryChartZoomInBtn.click();

        // Click inside the visible map (center point)
        const box = await this.countryChart.boundingBox();
        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2;
        await this.page.mouse.click(cx, cy);
    }
}

module.exports = { ECommencePage };
