const puppeteer = require("puppeteer");

(async () => {
    let address = "3737 Meramec St"
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    })


    const page = await browser.newPage()
    await page.goto("https://www.redfin.com/MO/St-Louis/3737-Meramec-St-63116/home/62721400")

    await page.type("#search-box-input", address, {
        delay: 100
    })
    await page.click("#tabContentId0 > div > div > form > div > button")
    await page.waitForNavigation();


    const name = await page.$eval("#sideBarContent > div > div > div.primaryBody > div.padding-top-medium > div.font-weight-bold", el => el.textContent)
    const brokerage = await page.$eval("#sideBarContent > div > div > div.primaryBody > div.padding-top-medium > div:nth-child(2)", el => el.textContent)
    const phone = await page.$eval("#sideBarContent > div > div > div.primaryBody > div.padding-top-medium > div:nth-child(3) > a", el => el.textContent)
    const email = await page.$eval("#sideBarContent > div > div > div.primaryBody > div.padding-top-medium > div:nth-child(4) > a", el => el.textContent)
    console.log(`name:${name}, brokerage:${brokerage} Phone Number:${phone} email:${email}`)




})()