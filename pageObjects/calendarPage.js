class CalendarPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // Calendar containers
        this.calendar1 = page.locator('.calendar-container').nth(0);
        this.calendar2 = page.locator('.calendar-container').nth(1);
        this.calendar3 = page.locator('.calendar-container').nth(2);
        // First Calendar
        this.firstSubtitle = this.calendar1.locator('.subtitle');
        this.dayCells = this.calendar1.locator('nb-calendar-day-cell');
        
        // Second Calendar
        this.secondSubtitle = this.calendar2.locator('.subtitle');
        this.dayRangeCells = this.calendar2.locator('nb-calendar-range-day-cell');

        // Third Calendar
        this.thirdSubtitle = this.calendar3.locator('.subtitle');
        this.ngxDayCells = this.calendar3.locator('ngx-day-cell');
        
    }
    async goto() {
        await this.page.goto('https://demo.akveo.com/ngx-admin/pages/extra-components/calendar');
    }

    async clickViewButton(calendarIndex){
        const cldr = this.page.locator('.calendar-container').nth(calendarIndex);
        const viewButton = cldr.locator('nb-calendar-view-mode button');
        await viewButton.click();

    }

    async clickDayCell( date) {
        const dayCell = this.dayCells.nth(date-1);
        await dayCell.click();
    }

    async clickYearCell(calendar, year) {
        const cldr = this.page.locator('.calendar-container').nth(calendar -1);
        const yearCell = cldr.locator('nb-calendar-year-cell div').filter({ hasText: year.toString() });
        await yearCell.click();
    }

    async clickRangeYearCell(year) {
        const yearCell = this.calendar2.locator('nb-calendar-range-year-cell div').filter({ hasText: year.toString() });
        await yearCell.click();
    }

    async clickRangeDayCell(startDate, endDate) {
        const startCell = this.dayRangeCells.nth(startDate-1);
        const endCell = this.dayRangeCells.nth(endDate-1);
        await startCell.click();
        await endCell.click();
    }

    async clickNgxDayCell(date) {
        const ngxDayCell = this.ngxDayCells.nth(date-1);
        await ngxDayCell.click();
    }

    
}

module.exports = { CalendarPage };
