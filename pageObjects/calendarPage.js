class CalendarPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, calendar = 1) {
        this.page = page;
        this.calendar = calendar;
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

    async clickViewButton() {
        const cldr = this.page.locator('.calendar-container').nth(this.calendar - 1);
        const viewButton = cldr.locator('nb-calendar-view-mode button');
        await viewButton.click();

    }

    async selectDate(date) {
        const dayCell = this.dayCells.nth(await this.findDateIndex (this.dayCells, date));
        await dayCell.click();
    }

    async findDateIndex(cells, date) {
        const count = await cells.count();
        const daysArray = new Array(count);
        for (let i = 0; i < count; i++) {
            daysArray[i] = await cells.nth(i).textContent();
        }
        const norm = v => {
            const n = Number(String(v).trim());
            return Number.isFinite(n) ? n : null;
        };

        const target = norm(date);
        if (target == null) return -1;
        // 1) find the first reset point (first "1" after trimming)
        let resetIndex = -1;
        for (let i = 0; i < daysArray.length; i++) {
            if (norm(daysArray[i]) === 1) {
                resetIndex = i;
                break;
            }
        }
        if (resetIndex === -1) return -1;

        // 2) from reset onward, find the first occurrence of target date
        for (let i = resetIndex; i < daysArray.length; i++) {
            if (norm(daysArray[i]) === target) {
                return i;
            }
        }
        return -1;
    }



    async selectYear(year) {
        const cldr = this.page.locator('.calendar-container').nth(this.calendar - 1);
        const yearCell = cldr.locator('nb-calendar-year-cell div').filter({ hasText: year.toString() });
        await yearCell.click();
    }

    async selectMonth(month) {
        const cldr = this.page.locator('.calendar-container').nth(this.calendar - 1);

        const monthCell = cldr.locator('nb-calendar-month-cell').filter({ hasText: month.toUpperCase() });
        await monthCell.click();
    }

    async selectRangeYear(year) {
        const yearCell = this.calendar2.locator('nb-calendar-range-year-cell div').filter({ hasText: year.toString() });
        await yearCell.click();
    }

    async selectRangeMonth(month) {
        const cldr = this.page.locator('.calendar-container').nth(this.calendar - 1);
    
        const monthCell = cldr.locator('nb-calendar-range-month-cell').filter({ hasText: month.toUpperCase() });
        await monthCell.click();
    }

    async selectDateRange(startDate, endDate) {

        const startCell = this.dayRangeCells.nth(await this.findDateIndex(this.dayRangeCells, startDate));
        const endCell = this.dayRangeCells.nth(await this.findDateIndex(this.dayRangeCells, endDate));
        await startCell.click();
        await endCell.click();
    }

    async selectDGXDate(date) {
        const ngxDayCell = this.ngxDayCells.nth(await this.findDateIndex(this.ngxDayCells, date));
        await ngxDayCell.click();
    }

    async clickViewMode() {
        const cldr = this.page.locator('.calendar-container').nth(this.calendar - 1);
        const viewModeButton = cldr.locator(`nb-calendar-view-mode`);
        await viewModeButton.click();
    }

    async clickPrevView() {
        const cldr = this.page.locator('.calendar-container').nth(this.calendar - 1);
        const prevButton = cldr.locator('.prev-month');
        await prevButton.click();
    }

    async clickNextView() {
        const cldr = this.page.locator('.calendar-container').nth(this.calendar - 1);
        const nextButton = cldr.locator('.next-month');
        await nextButton.click();
    }


}

module.exports = { CalendarPage };
