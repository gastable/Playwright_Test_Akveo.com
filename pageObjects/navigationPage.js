// e-commencePage.js
// Page Object for Akveo ngx-admin E-Commerce Dashboard
// Add Playwright locators and methods for interactable components here

class NavigationPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // Sidebar navigation
        this.logo = page.locator('.logo');
        this.themeSelector = page.locator('.theme-select');
        this.currentTheme = this.themeSelector.locator('span');
        this.themeOptionBox = page.locator('#cdk-overlay-0');
        this.ecommerceNav = page.locator("[title='E-commerce']");
        this.iotNav = page.locator("text=IoT Dashboard");
        this.layoutNav = page.locator("[title='Layout']");
        this.formsNav = page.locator("[title='Forms']");
        this.uiFeaturesNav = page.locator("[title='UI Features']");
        this.modalOverlaysNav = page.locator("[title='Modal & Overlays']");
        this.extraComponentsNav = page.locator("[title='Extra Components']");
        this.tablesNav = page.locator("[title='Tables & Data']");
        this.authNav = page.locator("[title='Auth']");
        this.mapsNav = page.locator("[title='Maps']");
        this.chartsNav = page.locator("[title='Charts']");
        this.editorsNav = page.locator("[title='Editors']");
        this.miscellaneousNav = page.locator("[title='Miscellaneous']");



    }
    async clickLogo() {
        await this.logo.click();
    }

    async selectTheme(themeName) {
        let index;
        switch (themeName.toLowerCase()) {
            case 'light':
                index = 0;
                break;
            case 'dark':
                index = 1;
                break;
            case 'cosmic':
                index = 2;
                break;
            case 'corporate':
                index = 3;
                break;
            case 'material light':
                index = 4;
                break;
            case 'material dark':
                index = 5;
                break;
            default:
                throw new Error(`Unknown theme: ${themeName}`);
        }
        await this.themeSelector.click();
        await this.page.locator(`.cdk-overlay-container nb-option`).nth(index).click();
        
    }


    async navigateToEcommerce() {
        await this.ecommerceNav.click();
    }

    async navigateToIotDashboard() {
        await this.iotNav.click();
    }

    async navigateToLayout() {
        await this.layoutNav.click();
    }

    async navigateToForms() {
        await this.formsNav.click();
    }

    async navigateToUiFeatures() {
        await this.uiFeaturesNav.click();
    }

    async navigateToModalOverlays() {
        await this.modalOverlaysNav.click();
    }

    async navigateToExtraComponents() {
        await this.extraComponentsNav.click();
    }

    async navigateToTables() {
        await this.tablesNav.click();
    }

    async navigateToAuth() {
        await this.authNav.click();
    }

    async navigateToMaps() {
        await this.mapsNav.click();
    }

    async navigateToCharts() {
        await this.chartsNav.click();
    }

    async navigateToEditors() {
        await this.editorsNav.click();
    }

    async navigateToMiscellaneous() {
        await this.miscellaneousNav.click();
    }

}

module.exports = { NavigationPage };
