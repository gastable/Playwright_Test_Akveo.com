

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

    test.only('All calendar locators are visible', async ({ page }) => {
        const calendarPage = new CalendarPage(page);
        await expect(calendarPage.calendar1).toBeVisible();
        await expect(calendarPage.calendar2).toBeVisible();
        await expect(calendarPage.calendar3).toBeVisible();
        await expect(calendarPage.firstSubtitle).toBeVisible();
        await expect(calendarPage.secondSubtitle).toBeVisible();
        await expect(calendarPage.thirdSubtitle).toBeVisible();
    });
});