// iotDashboardPage.spec.js
// Playwright test file for Akveo ngx-admin IoT Dashboard using IotDashboardPage page object

const { test, expect } = require('@playwright/test');
const { IotDashboardPage } = require('../pageObjects/iotDashboardPage');
const { ThemePage } = require('../pageObjects/themePage');
const { NavigationPage } = require('../pageObjects/navigationPage');


test.describe('IoT Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        // Go to theme page and select Light theme to land on e-commencePage
        const themePage = new ThemePage(page);
        await themePage.goto();
        await themePage.selectLightTheme();
        // Now navigate to IoT Dashboard
        const iotPage = new IotDashboardPage(page);
        await iotPage.goto();
    });

    test.only('IOTDashboard Regression', async ({ page }) => {
        const iotPage = new IotDashboardPage(page);
        const nav = new NavigationPage(page);

        //Change theme to Material Light and verify
        await nav.selectTheme('Corporate');
        await expect(nav.currentTheme).toHaveText('Corporate');


        /* IOT Switch Status */
        const deviceCount = await iotPage.deviceCards.count();
        for (let i = 0; i < deviceCount; i++) {
            await iotPage.toggleDevice(i);
            await expect(iotPage.getDeviceIcon(i)).toHaveClass('mat-ripple off');
            await expect(iotPage.getDeviceStatus(i)).toHaveText('OFF');
            await iotPage.toggleDevice(i);
            await expect(iotPage.getDeviceIcon(i)).toHaveClass('mat-ripple');
            await expect(iotPage.getDeviceStatus(i)).toHaveText('ON');
        }

        /* Drag IoT temperature knob */
        await expect(iotPage.tempCard).toBeVisible();
        await expect(iotPage.tempDragger).toBeVisible();
        await iotPage.dragTempKnob(-200);
        await iotPage.dragTempKnob(200);
        await iotPage.clickTempButton();
        await iotPage.clickTempButton();
        await iotPage.tapHumidTab();
        await expect(iotPage.humidDragger).toBeVisible();
        await iotPage.dragHumidKnob(-200);
        await iotPage.dragHumidKnob(200);
        await iotPage.clickHumidButton();
        await iotPage.clickHumidButton();

        /* Select rooms */
        await expect(iotPage.bedroom).toBeVisible();
        await expect(iotPage.kitchen).toBeVisible();
        await expect(iotPage.hallway).toBeVisible();
        await expect(iotPage.livingRoom).toBeVisible();
        await expect(iotPage.roomManagementTitle).toBeVisible();
        await iotPage.selectRoom("Bedroom");
        await expect(await iotPage.getSelectedRoom("Bedroom")).toHaveClass('ng-star-inserted selected-room');
        await iotPage.selectRoom("Kitchen");
        await expect(await iotPage.getSelectedRoom("Kitchen")).toHaveClass('ng-star-inserted selected-room');
        await iotPage.selectRoom("Hallway");
        await expect(await iotPage.getSelectedRoom("Hallway")).toHaveClass('ng-star-inserted selected-room');
        await iotPage.selectRoom("Living Room");
        await expect(await iotPage.getSelectedRoom("Living Room")).toHaveClass('ng-star-inserted selected-room');

        /* My player */
        await expect(iotPage.playerCard).toBeVisible();
        await expect(iotPage.songName).toBeVisible();
        await expect(iotPage.singerName).toBeVisible();
        await expect(iotPage.backgroundImage).toBeVisible();
        await expect(iotPage.playerCardTitle).toHaveText('My Playlist');
        //await page.pause();
        await iotPage.clickPlayerButton('play');
        await iotPage.clickPlayerButton('random');
        await iotPage.clickPlayerButton('repeat');
        const styleAttr = await iotPage.backgroundImage.getAttribute('style');
        expect(styleAttr).toContain('url("assets/images/cover1.jpg")');
        expect(await iotPage.songName.textContent()).toBe("Don't Wanna Fight");
        expect(await iotPage.singerName.textContent()).toBe('Alabama Shakes');
        await iotPage.clickMinVolume();
        await iotPage.clickMaxVolume();

        /* Security Cameras */
        await expect(iotPage.contactsCard).toBeVisible();
        await expect(iotPage.contactsCardTitle).toBeVisible();
        await iotPage.clickSingleView();
        const camera = await iotPage.camera.count();
        expect(camera).toBe(1);
        await iotPage.clickGridView();
        const cameras = await iotPage.camera.count();
        expect(cameras).toBe(4);


    });




    test('IOT Switch Status', async ({ page }) => {
        const iotPage = new IotDashboardPage(page);

        const deviceCount = await iotPage.deviceCards.count();

        for (let i = 0; i < deviceCount; i++) {
            await iotPage.toggleDevice(i);
            await expect(iotPage.getDeviceIcon(i)).toHaveClass('mat-ripple off');
            await expect(iotPage.getDeviceStatus(i)).toHaveText('OFF');
            await iotPage.toggleDevice(i);
            await expect(iotPage.getDeviceIcon(i)).toHaveClass('mat-ripple');
            await expect(iotPage.getDeviceStatus(i)).toHaveText('ON');

        }
    });

    test('Drag IoT temperature knob', async ({ page }) => {
        const iotPage = new IotDashboardPage(page);
        // 
        await expect(iotPage.tempCard).toBeVisible();
        await expect(iotPage.tempDragger).toBeVisible();
        
        await iotPage.dragTempKnob(-200);
        await iotPage.dragTempKnob(200);
       
        await iotPage.clickTempButton();

        await iotPage.clickTempButton();

        await iotPage.tapHumidTab();
        await expect(iotPage.humidDragger).toBeVisible();

        await iotPage.dragHumidKnob(-200);
        await iotPage.dragHumidKnob(200);
        await iotPage.clickHumidButton();
        await iotPage.clickHumidButton();

        // Pause for debugging
    });

    test('Select rooms', async ({ page }) => {
        const iotPage = new IotDashboardPage(page);
        // 
        await expect(iotPage.bedroom).toBeVisible();
        await expect(iotPage.kitchen).toBeVisible();
        await expect(iotPage.hallway).toBeVisible();
        await expect(iotPage.livingRoom).toBeVisible();
        await expect(iotPage.roomManagementTitle).toBeVisible();
        

        await iotPage.selectRoom("Bedroom");
        await expect(await iotPage.getSelectedRoom("Bedroom")).toHaveClass('ng-star-inserted selected-room');
        await iotPage.selectRoom("Kitchen");
        await expect(await iotPage.getSelectedRoom("Kitchen")).toHaveClass('ng-star-inserted selected-room');
        await iotPage.selectRoom("Hallway");    
        await expect(await iotPage.getSelectedRoom("Hallway")).toHaveClass('ng-star-inserted selected-room');
        await iotPage.selectRoom("Living Room");
        await expect(await iotPage.getSelectedRoom("Living Room")).toHaveClass('ng-star-inserted selected-room');

        // Pause for debugging
    });

    //// Data-driven test for song selection
    test('My player', async ({ page }) => {
        const iotPage = new IotDashboardPage(page);
        // Assert player card and its elements
        await expect(iotPage.playerCard).toBeVisible();
        await expect(iotPage.songName).toBeVisible();
        await expect(iotPage.singerName).toBeVisible();
        await expect(iotPage.backgroundImage).toBeVisible();
        await expect(iotPage.playerCardTitle).toHaveText('My Playlist');
        
        await iotPage.clickPlayerButton('play');
        await iotPage.clickPlayerButton('random');
        await iotPage.clickPlayerButton('repeat');
        
        // Assert background image and song details
        const styleAttr = await iotPage.backgroundImage.getAttribute('style');
        expect(styleAttr).toContain('url("assets/images/cover1.jpg")'); 
        expect(await iotPage.songName.textContent()).toBe("Don't Wanna Fight");
        expect(await iotPage.singerName.textContent()).toBe('Alabama Shakes');

        await iotPage.clickMinVolume();
        await iotPage.clickMaxVolume();
        

        
    });

    test('Security Cameras', async ({ page }) => {
        const iotPage = new IotDashboardPage(page);
        // Assert player card and its elements
        await expect(iotPage.contactsCard).toBeVisible();
        await expect(iotPage.contactsCardTitle).toBeVisible();

        // Assert camera controls and views
        await iotPage.clickSingleView();
        const camera = await iotPage.camera.count();
        expect(camera).toBe(1);

        await iotPage.clickGridView();
        const cameras = await iotPage.camera.count();
        expect(cameras).toBe(4);
        
        
    });

});
