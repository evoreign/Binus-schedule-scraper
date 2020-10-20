const puppeteer = require('puppeteer');
const xlsx = require("xlsx");
async function scrapeJadwal(url){

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    await page.type('#Username', 'username bimay')
    await page.type('#Password', 'password bimay')
    await Promise.all([
        page.waitForNavigation(),
        page.click('#btnSubmit')
    ])
    page.waitForTimeout(1000)
    const data = await page.$$eval(' .viconTable tbody tr', trs => trs.map((tr) => {
        return tr.innerText;
      }));
    console.log(data);
    const aoalinks = data.map(l => [l]);
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet(aoalinks);
    xlsx.utils.book_append_sheet(wb,ws);
    xlsx.writeFile(wb,"output.txt");

}
scrapeJadwal('https://myclass.apps.binus.ac.id/Home/Index');