const {test,expect}=require('@playwright/test');

test("Website validation", async({page})=>{
    await page.goto("https://www.flightnetwork.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Cheap Flights: Save up to 60% on Airline Tickets & Airfare | Flight Network");

})

test("Verify Search flight functionality", async({page})=>{
    await page.goto("https://www.flightnetwork.com/");
    const fromInput = (await page).locator("#searchForm-singleBound-origin-input");
    await fromInput.fill("London");
    await page.locator("//span[normalize-space(text())='London (All Airports)']").click();
    const ToInput = (await page).locator('#searchForm-singleBound-destination-input');
    await ToInput.fill("Frankfurt");
    await page.locator("//span[normalize-space(text())='Frankfurt (All Airports)']").click();
    await page.locator("//button[@type= 'submit']").click();
    await page.waitForSelector("(//span[text() = 'Filter by'])[2]");
    await expect(page.locator("(//span[text() = 'Filter by'])[2]")).toBeVisible();
    await page.locator("(//span[text() = 'Filter by'])[2]").click();
})

test ("Filter Validation Part", async({page})=>{
    await page.goto("https://www.flightnetwork.com/");
    const fromInput = (await page).locator("#searchForm-singleBound-origin-input");
    await fromInput.fill("London");
    await page.locator("//span[normalize-space(text())='London (All Airports)']").click();
    const ToInput = (await page).locator('#searchForm-singleBound-destination-input');
    await ToInput.fill("Frankfurt");
    await page.locator("//span[normalize-space(text())='Frankfurt (All Airports)']").click();
    await page.locator("//button[@type= 'submit']").click();
    await page.waitForSelector("(//span[text() = 'Filter by'])[2]");
    await expect(page.locator("(//span[text() = 'Filter by'])[2]")).toBeVisible();
    await page.locator("(//span[text() = 'Filter by'])[2]").click();
    await page.locator("//div[@class='etiRadioGroup css-1g3q6ba']//label[contains(text(),'Nonstop flights')]").click();
    // Airlines filter
    await page.locator("//input[@id = 'airlines-SK']").click();
    // Slider handle
    const element = await page.locator("//div[@class='slider-tracks']/following-sibling::div[contains(text(),'CA$4,832.10')]");
    const sliderHandle = await page.locator("(//div[@data-testid = 'handle-1'])[1]");
    const boundingBox = await sliderHandle.boundingBox();
    const startX = boundingBox.x + boundingBox.width / 2;
    const startY = boundingBox.y + boundingBox.height / 2;
    const endX = startX - 190; 
    const endY = startY;
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 10 });
    await page.mouse.up();
    const text = element.textContent();
    if(text === "CA$4,832.10")
        {
            console.log(text);
        }
        else {
            console.log("Text does not match");
        }
    await page.locator("//span[text() = 'Done']").click();
    await expect(page).toHaveTitle("Flight Network");
    await page.waitForSelector("//a[@href='/rf/start']"); 
        
})

test ("Stop Reset Filter", async({page})=>{
    await page.goto("https://www.flightnetwork.com/");
    const fromInput = (await page).locator("#searchForm-singleBound-origin-input");
    await fromInput.fill("London");
    await page.locator("//span[normalize-space(text())='London (All Airports)']").click();
    const ToInput = (await page).locator('#searchForm-singleBound-destination-input');
    await ToInput.fill("Frankfurt");
    await page.locator("//span[normalize-space(text())='Frankfurt (All Airports)']").click();
    await page.locator("//button[@type= 'submit']").click();
    await page.waitForSelector("(//span[text() = 'Filter by'])[2]");
    await page.locator("(//span[text() = 'Filter by'])[2]").click();
    await page.locator("//div[@class='etiRadioGroup css-1g3q6ba']//label[contains(text(),'Nonstop flights')]").click();
    //Reset filter
    await page.locator("//button[@data-testid = 'resultPage-filterHeader-MAX_STOPSFilterResetButton-button']//span[text() = 'Reset filter']").click();
    await expect (page.locator("//div[@data-testid = 'resultPage-filterHeader-selectedFiltersIndicator']")).toHaveCount(0);   
    
})

test.only ("Airlines Reset Filter", async({page})=>{
    await page.goto("https://www.flightnetwork.com/");
    const fromInput = (await page).locator("#searchForm-singleBound-origin-input");
    await fromInput.fill("London");
    await page.locator("//span[normalize-space(text())='London (All Airports)']").click();
    const ToInput = (await page).locator('#searchForm-singleBound-destination-input');
    await ToInput.fill("Frankfurt");
    await page.locator("//span[normalize-space(text())='Frankfurt (All Airports)']").click();
    await page.locator("//button[@type= 'submit']").click();
    await page.waitForSelector("(//span[text() = 'Filter by'])[2]");
    await page.locator("(//span[text() = 'Filter by'])[2]").click();
    await page.locator("//input[@id = 'airlines-SK']").click();
    //Reset filter
    await page.locator("//button[@data-testid = 'resultPage-filterHeader-AIRLINESFilterResetButton-button']").click();
    await expect (page.locator("//div[@data-testid = 'resultPage-filterHeader-selectedFiltersIndicator']")).toHaveCount(0);    
})
   