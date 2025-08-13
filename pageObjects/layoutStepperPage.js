class StepperPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // Steppers
        this.firstStepper = page.locator('nb-card').nth(0);
        this.secondStepper = page.locator('nb-card').nth(1);
        this.thirdStepper = page.locator('nb-card').nth(2);
        // First Stepper
        this.firstStepperTitle = this.firstStepper.locator('h3');
        this.firstPrevButton = this.firstStepper.locator('button:has-text("prev")');
        this.firstNextButton = this.firstStepper.locator('button:has-text("next")');
        // Second Stepper
        this.secondInput = this.secondStepper.locator('input');
        this.secondNextButton = this.secondStepper.locator('button:has-text("next")');
        this.secondPrevButton = this.secondStepper.locator('button:has-text("prev")');
        this.secondConfirmButton = this.secondStepper.locator('button:has-text("Confirm")');
        this.secondTryAgainButton = this.secondStepper.locator('button:has-text("Try again")');
        this.secondCompleteMsg = this.secondStepper.locator('h3');
        // Third Stepper
        this.thirdStepperTitle = this.thirdStepper.locator('h3');
        this.thirdPrevButton = this.thirdStepper.locator('button:has-text("prev")');
        this.thirdNextButton = this.thirdStepper.locator('button:has-text("next")');
        
    }
    async goto() {
        await this.page.goto('https://demo.akveo.com/ngx-admin/pages/layout/stepper');
    }

    async clickFirstPrevButton() {
        await this.firstPrevButton.click();
    }

    async clickFirstNextButton() {
        await this.firstNextButton.click();
    }

    async clickSecondPrevButton() {
        await this.secondPrevButton.click();
    }

    async clickSecondNextButton() {
        await this.secondNextButton.click();
    }

    async clickSecondConfirmButton() {
        await this.secondConfirmButton.click();
    }

    async clickSecondTryAgainButton() {
        await this.secondTryAgainButton.click();
    }

    async clickThirdPrevButton() {
        await this.thirdPrevButton.click();
    }

    async clickThirdNextButton() {
        await this.thirdNextButton.click();
    }

    async selectStep(stepperIndex, step) {
        const stepper = this.page.locator('nb-card').nth(stepperIndex - 1);
        await stepper.locator('.step').nth(step - 1).click();
    }
}

module.exports = { StepperPage };
