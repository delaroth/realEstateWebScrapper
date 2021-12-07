const puppeteer = require("puppeteer");

async function searchRedfin(addresses) {

    addresses.forEach(async (address) => {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: false
        })

        const page = await browser.newPage()
        await page.goto("https://www.redfin.com/")

        await page.type("#search-box-input", address)
        await page.click("#tabContentId0 > div > div > form > div > button")
        await page.waitForNavigation();

        let agentsName = await page.evaluate(() => {
            let el = document.querySelector("#sideBarContent > div > div > div.primaryBody > div.padding-top-medium > div.font-weight-bold")
            return el ? el.innerText : ""
        })
        let brokerage = await page.evaluate(() => {
            let el = document.querySelector("#sideBarContent > div > div > div.primaryBody > div.padding-top-medium > div:nth-child(2)")
            return el ? el.innerText : ""
        })
        let phone = await page.evaluate(() => {
            let el = document.querySelector("#sideBarContent > div > div > div.primaryBody > div.padding-top-medium > div:nth-child(3) > a")
            return el ? el.innerText : ""
        })

        let email = await page.evaluate(() => {
            let el = document.querySelector("#sideBarContent > div > div > div.primaryBody > div.padding-top-medium > div:nth-child(4) > a")
            return el ? el.innerText : ""
        })

        browser.close()

        // console.log(`|Address : ${address}|`, `|Name : ${agentsName}| `, `|Brokerage : ${brokerage}|`, `|Phone : ${phone}|`, `|Email : ${email}|`)


        
    })
}


console.log(searchRedfin(["3737 Meramec St st louis", "3649 Koeln Ave st louis", "4053 Connecticut st louis"]))

