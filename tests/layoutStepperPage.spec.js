// layoutStepperPage.spec.js
// Playwright test file for Akveo ngx-admin Layout > Stepper page using StepperPage page object

const { test, expect } = require('@playwright/test');
const { ThemePage } = require('../pageObjects/themePage');
const { StepperPage } = require('../pageObjects/layoutStepperPage');


test.describe('Layout Stepper Page', () => {
    test.beforeEach(async ({ page }) => {
        // Go to theme page and select Light theme to land on e-commencePage
        const themePage = new ThemePage(page);
        await themePage.goto();
        await themePage.selectLightTheme();
        // Now navigate to IoT Dashboard
        const stepper = new StepperPage(page);
        await stepper.goto();
    });

    test.only('Stepper Regression', async ({ page }) => {
        const stepper = new StepperPage(page);
        // First Stepper elements
        await expect(stepper.firstStepper).toBeVisible();
        await expect(stepper.firstStepperTitle).toBeVisible();
        await expect(stepper.firstPrevButton).toBeVisible();
        await expect(stepper.firstNextButton).toBeVisible();

        // Second Stepper elements
        await expect(stepper.secondStepper).toBeVisible();
        await expect(stepper.secondInput).toBeVisible();
        await expect(stepper.secondNextButton).toBeVisible();
        // Third Stepper elements
        await expect(stepper.thirdStepper).toBeVisible();
        await expect(stepper.thirdStepperTitle).toBeVisible();
        await expect(stepper.thirdPrevButton).toBeVisible();
        await expect(stepper.thirdNextButton).toBeVisible();


        // Click next on first stepper
        await stepper.clickFirstNextButton();
        await expect(stepper.firstStepperTitle).toHaveText('Step content #2');
        await stepper.clickFirstNextButton();
        await expect(stepper.firstStepperTitle).toHaveText('Step content #3');
        await stepper.clickFirstNextButton();
        await expect(stepper.firstStepperTitle).toHaveText('Step content #4');
        await stepper.clickFirstPrevButton();
        await expect(stepper.firstStepperTitle).toHaveText('Step content #3');

        // Select steps
        await stepper.selectStep(1, 1);
        await expect(stepper.firstStepperTitle).toHaveText('Step content #1');
        await stepper.selectStep(1, 2);
        await expect(stepper.firstStepperTitle).toHaveText('Step content #2');

        // Click next on second stepper
        await stepper.secondInput.fill('Test Input #1');
        await stepper.clickSecondNextButton();
        await stepper.secondInput.fill('Test Input #2');
        await stepper.clickSecondNextButton();
        await stepper.secondInput.fill('Test Input #3');
        await stepper.clickSecondConfirmButton();
        await expect(stepper.secondCompleteMsg).toHaveText('Wizard completed!');
        await stepper.clickSecondTryAgainButton();

        //Select steps
        await stepper.secondInput.fill('Test Input #4');
        await stepper.clickSecondNextButton();
        await stepper.secondInput.fill('Test Input #5');
        await stepper.clickSecondNextButton();
        await stepper.secondInput.fill('Test Input #6');
        await stepper.selectStep(2, 1);
        await expect(stepper.secondInput).toHaveValue('Test Input #4');

    });

    test('First Stepper', async ({ page }) => {
        const stepper = new StepperPage(page);
        // Click next on first stepper
        await stepper.clickFirstNextButton();
        await expect(stepper.firstStepperTitle).toHaveText('Step content #2');
        await stepper.clickFirstNextButton();
        await expect(stepper.firstStepperTitle).toHaveText('Step content #3');
        await stepper.clickFirstNextButton();
        await expect(stepper.firstStepperTitle).toHaveText('Step content #4');
        await stepper.clickFirstPrevButton();
        await expect(stepper.firstStepperTitle).toHaveText('Step content #3');

        // Select steps
        await stepper.selectStep(1, 1);
        await expect(stepper.firstStepperTitle).toHaveText('Step content #1');
        await stepper.selectStep(1, 2);
        await expect(stepper.firstStepperTitle).toHaveText('Step content #2');

    });


     test('Second Stepper', async ({ page }) => {
        const stepper = new StepperPage(page);
        // Click next on second stepper
        await stepper.secondInput.fill('Test Input #1');
        await stepper.clickSecondNextButton();
        await stepper.secondInput.fill('Test Input #2');
        await stepper.clickSecondNextButton();
        await stepper.secondInput.fill('Test Input #3');
        await stepper.clickSecondConfirmButton();
        await expect(stepper.secondCompleteMsg).toHaveText('Wizard completed!');
        await stepper.clickSecondTryAgainButton();

        //Select steps
        await stepper.secondInput.fill('Test Input #4');
        await stepper.clickSecondNextButton();
        await stepper.secondInput.fill('Test Input #5');
        await stepper.clickSecondNextButton();
        await stepper.secondInput.fill('Test Input #6');
        await stepper.selectStep(2, 1);
        await expect(stepper.secondInput).toHaveValue('Test Input #4');
        

    });
});
