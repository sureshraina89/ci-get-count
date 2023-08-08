const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res, list) => {
  const browser = await puppeteer.launch({
    headless:'new'
  });
  const result = [];
  try {
      const page = await browser.newPage();

    // list.forEach(async (element) => {
      await page.goto('https://chartink.com/screener/all-cross-91', { timeout: 60000 });
      // Set screen size
      //await page.setViewport({ width: 1080, height: 1024 });

      // Wait for the page to load
      //await page.waitForLoadState('domcontentloaded');

      await page.waitForSelector('#DataTables_Table_0_info');
          // Get the value of an input element using its selector
      const inputValue = await page.$eval('#DataTables_Table_0_info', (input) => {
        const text = input.textContent;
        return text.split(' ')[1] ? text.split(' ')[1].replace(',', ''): text.split(' ')[1];
      });
      result.push({name: element.name, count: inputValue});
    //});
      await page.close();
      res.send(result);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
