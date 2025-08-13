class ThemePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    // Theme cards: locate the clickable divs by their text
    this.materialLight = page.locator('div:has-text("Material Light")');
    this.materialDark = page.locator('div:has-text("Material Dark")');
    this.light = page.locator('div:has-text("Light")');
    this.dark = page.locator('div:has-text("Dark")');
    this.corporate = page.locator('div:has-text("Corporate")');
    this.cosmic = page.locator('div:has-text("Cosmic")');
    // Theme images (optional, for clicking on images)
    this.materialLightImg = page.locator('img[alt="Material Light Theme"]');
    this.materialDarkImg = page.locator('img[alt="Material Dark Theme"]');
    this.lightImg = page.locator('img[alt="Light Theme"]');
    this.darkImg = page.locator('img[alt="Dark Theme"]');
    this.corporateImg = page.locator('img[alt="Corporate Theme"]');
    this.cosmicImg = page.locator('img[alt="Cosmic Theme"]');
    }

    async goto() {
        await this.page.goto('https://demo.akveo.com/ngx-admin/themes');
    }

    async selectLightTheme() {
        await this.lightImg.click();
    }

    async selectMaterialLightTheme() {
        await this.materialLightImg.click();
    }

    async selectMaterialDarkTheme() {
        await this.materialDarkImg.click();
    }

    async selectDarkTheme() {
        await this.darkImg.click();
    }

    async selectCorporateTheme() {
        await this.corporateImg.click();
    }

    async selectCosmicTheme() {
        await this.cosmicImg.click();
    }
}

module.exports = { ThemePage };
