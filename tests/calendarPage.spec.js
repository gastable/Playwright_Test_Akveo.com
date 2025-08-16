const { test, expect } = require('@playwright/test');
const { CalendarPage } = require('../pageObjects/calendarPage');
const { ThemePage } = require('../pageObjects/themePage');

test.describe('Calendar Page', () => {
    test.beforeEach(async ({ page }) => {
        // Go to theme page and select Light theme
        const themePage = new ThemePage(page);
        await themePage.goto();
        await themePage.selectLightTheme();
        // Now navigate to Calendar page
        const calendarPage = new CalendarPage(page);
        await calendarPage.goto();
    });

    test('All calendar locators are visible', async ({ page }) => {
        const calendarPage = new CalendarPage(page);
        await expect(calendarPage.calendar1).toBeVisible();
        await expect(calendarPage.calendar2).toBeVisible();
        await expect(calendarPage.calendar3).toBeVisible();
        await expect(calendarPage.firstSubtitle).toBeVisible();
        await expect(calendarPage.secondSubtitle).toBeVisible();
        await expect(calendarPage.thirdSubtitle).toBeVisible();
    });

    test('Verify Fisrt Calendar', async ({ page }) => {
        const calendarPage = new CalendarPage(page, 1); // Use first calendar
        const year = 2023;
        const month = 'Jan';
        const date = 24;

        // Select Jan 24, 2023 from Videw Mode
        await calendarPage.clickViewMode();
        await calendarPage.selectYear(year);
        await calendarPage.selectMonth(month); 
        await calendarPage.selectDate(date);
        await expect(calendarPage.firstSubtitle).toHaveText(` Selected date: ${month} ${date}, ${year} `);
        // Seelect Mar 3, 2023
        
        await calendarPage.clickNextView();
        await calendarPage.clickNextView();
        await calendarPage.clickNextView();
        await calendarPage.clickPrevView();
        await calendarPage.selectDate(13);
        await expect(calendarPage.firstSubtitle).toHaveText(' Selected date: Mar 13, 2023 ');

        
    });

    test('Verify Second Calendar', async ({ page }) => {
        const calendarPage = new CalendarPage(page, 2); // Use second calendar
        const year = 2018;
        const month = 'Aug';
        const startDate = 10;
        const endDate = 27;

        // Select Jan 24, 2023 from Videw Mode
        await calendarPage.clickViewMode();
        await calendarPage.selectRangeYear(year);
        await calendarPage.selectRangeMonth(month); 
        await calendarPage.selectDateRange(startDate, endDate);
        await expect(calendarPage.secondSubtitle).toHaveText(` Selected range: ${month} ${startDate}, ${year} - ${month} ${endDate}, ${year} `);

        // Seelect Mar 3, 2023
        await calendarPage.clickNextView();
        await calendarPage.clickNextView();
        await calendarPage.clickNextView();
        await calendarPage.clickPrevView();
        await calendarPage.selectDateRange(startDate, endDate);
        await expect(calendarPage.secondSubtitle).toHaveText(` Selected range: Oct ${startDate}, ${year} - Oct ${endDate}, ${year} `);

    });

    test.only('Verify Third Calendar', async ({ page }) => {
        const calendarPage = new CalendarPage(page, 3); // Use third calendar
        const year = 2023;
        const month = 'Jan';
        const date = 24;

        // Select Jan 24, 2023 from Videw Mode
        await calendarPage.clickViewMode();
        await page.pause();
        await calendarPage.selectYear(year);
        await calendarPage.selectMonth(month); 
        await calendarPage.selectDGXDate(date);
        await expect(calendarPage.thirdSubtitle).toHaveText(` Selected date: ${month} ${date}, ${year} `);
        // Seelect Mar 3, 2023
        
        await calendarPage.clickNextView();
        await calendarPage.clickNextView();
        await calendarPage.clickNextView();
        await calendarPage.clickPrevView();
        await calendarPage.selectDGXDate(13);
        await expect(calendarPage.thirdSubtitle).toHaveText(' Selected date: Mar 13, 2023 ');
        //akveo.com has bug - can't click on the date in the third calendar

    });


});
