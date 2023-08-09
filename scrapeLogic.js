const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res, list) => {
  const browser = await puppeteer.launch({
    headless:'new'
  });
  const result = [];
  try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');

    list.forEach(async (element) => {
      const url = element.url;
      await page.goto('https://chartink.com/screener/weekly-rsi-overbought-oversold-scan', { waitUntil: 'domcontentloaded' });
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
    });
      await page.close();
      res.json(result);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
