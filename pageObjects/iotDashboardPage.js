class IotDashboardPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Main dashboard CTAs and cards
        this.contactUsButton = page.locator('a:has-text(" Contact us ")');
        this.contactUsDetails = page.locator('.details').first();
        this.learnMoreButton = page.locator('a:has-text(" Learn more ")');
        this.learnMoreDetails = page.locator('.details').last();

        // Device toggles as an array of locators
        this.deviceCards = page.locator('ngx-status-card'); 
        //this.deviceIcons = page.locator('nb-card'); 
        //this.deviceStatuses = page.locator('.status');

        // IoT device toggles and controls (examples)
        this.lightCardTitle = page.locator('.title.h5:has-text("Light")');
        this.rollerShadesCardTitle = page.locator('.title.h5:has-text("Roller Shades")');
        this.wirelessAudioCardTitle = page.locator('.title.h5:has-text("Wireless Audio")');
        this.coffeeMakerCardTitle = page.locator('.title.h5:has-text("Coffee Maker")');
        
        // Temperature and Humidity control
        this.tempCard = page.locator('ngx-temperature');
        this.tempTab = page.locator('ngx-temperature a').first();
        this.humidTab = page.locator('ngx-temperature a').last();
        this.tempDragger = page.locator("(//*[name()='circle'])[9]");
        this.humidDragger = page.locator("(//*[name()='circle'])[10]");
        this.tempButton = page.locator('ngx-temperature button').first();
        this.humidButton = page.locator('ngx-temperature button').last();

        // Room Management
        this.roomSelector = page.locator('ngx-room-selector');
        this.roomManagementTitle = this.roomSelector.filter({hasText : 'Room Management'});

        this.bedroom = this.roomSelector.locator('g:has-text("Bedroom")');
        this.kitchen = this.roomSelector.locator('g:has-text("Kitchen")');
        this.hallway = this.roomSelector.locator('g:has-text("Hallway")');
        this.livingRoom = this.roomSelector.locator('g:has-text("Living Room")');

        // My Playlist
        this.playerCard = this.page.locator('ngx-player');
        this.playerCardTitle = this.playerCard.locator('nb-card-header');
        this.songName = this.playerCard.locator('h4');
        this.singerName = this.playerCard.locator('span');
        this.backgroundImage = this.page.locator('.cover');
        this.playerControls = this.playerCard.locator('.controls');
        this.randomButton = this.playerCard.locator('.controls button').nth(0);
        this.backwardButton = this.playerCard.locator('.controls button').nth(1);
        this.playButton = this.playerCard.locator('.controls button').nth(2);
        this.forwardButton = this.playerCard.locator('.controls button').nth(3);
        this.repeatButton = this.playerCard.locator('.controls button').nth(4);
        this.minVolume = this.playerCard.locator('.footer button').first();
        this.maxVolume = this.playerCard.locator('.footer button').last();

        // Security Cameras
        this.contactsCard = page.locator('ngx-security-cameras');
        this.contactsCardTitle = this.contactsCard.locator('nb-card-header');
        this.sinleViewButton = this.contactsCard.locator('.single-view-button');
        this.gridViewButton = this.contactsCard.locator('.grid-view-button');
        this.gridContainer = this.contactsCard.locator('.grid-container');
        this.camera = this.gridContainer.locator('.camera');  
        
        
        


        
        
      

        // Canvases (charts, graphs, etc.)
        this.energyChartCanvas = page.locator('canvas'); // update selector if more specific needed
    }

    async goto() {
        await this.page.goto('https://demo.akveo.com/ngx-admin/pages/iot-dashboard');
    }


    async toggleDevice(index) {
        await this.deviceCards.nth(index).click();
    }

    getDeviceIcon(index) {
        return this.deviceCards.nth(index).locator('nb-card');
    }

    getDeviceStatus(index) {
        return this.deviceCards.nth(index).locator('.status');

    }

    async dragTempKnob(pxl){
        const box = await this.tempDragger.boundingBox();
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(box.x + box.width / 2 + pxl, box.y + box.height / 2, { steps: (pxl/10) });
        await this.page.mouse.up();

    }

    async dragHumidKnob(pxl){
        const box = await this.humidDragger.boundingBox();
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(box.x + box.width / 2 + pxl, box.y + box.height / 2, { steps: (pxl/10) });
        await this.page.mouse.up();

    }

    async clickTempButton() {
        await this.tempButton.click();
    }

    async clickHumidButton() {
        await this.humidButton.click();
    }

    async tapTempTab(){
        await this.tempTab.click();
    }
    async tapHumidTab(){
        await this.humidTab.click();
    }
    async selectRoom(roomName) {
        await this.roomSelector.locator(`g:has-text("${roomName}")`).click();
    }

    async getSelectedRoom(roomName) {
        return this.roomSelector.locator(`g:has-text("${roomName}")`);
    }

    async clickPlayerButton(buttonName) {
        let button;
        switch (buttonName.toLowerCase()) {
            case 'random':
                button = this.randomButton;
                break;
            case 'backward':
                button = this.backwardButton;
                break;
            case 'play':
                button = this.playButton;
                break;
            case 'forward':
                button = this.forwardButton;
                break;
            case 'repeat':
                button = this.repeatButton;
                break;
            default:
                throw new Error(`Unknown player button: ${buttonName}`);
        }
        await button.click();
    }

    async clickMinVolume() {
        await this.minVolume.click();
    }
    async clickMaxVolume() {
        await this.maxVolume.click();
    }

    async clickSingleView() {
        await this.sinleViewButton.click();
    }
    async clickGridView() {
        await this.gridViewButton.click();
    }





}

module.exports = { IotDashboardPage };
