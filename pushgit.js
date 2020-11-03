const puppeteer = require('puppeteer');
const xlsx = require("xlsx");
async function scrapeJadwal(url) {


    //for config file setup
    var CONFIG = require('./config.json');
    var Username = CONFIG.Username;
    var Password = CONFIG.Password;

    //launch puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    //optimization
    page.on('request', request => {
        if (request.resourceType() === 'img')
            request.abort();
        else
            request.continue();
    });

    await page.goto(url);
    await page.type('#Username', Username)
    await page.type('#Password', Password)
    page.click('#btnSubmit')
    await page.waitFor(3000)


    // delete useless element
    let div_selector_to_remove = ".trTemplate";
    await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }, div_selector_to_remove)

    let div_selector_to_remove1 = ".loaderRow";
    await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }, div_selector_to_remove1)

    let div_selector_to_remove2 = ".iRoom";
    await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }, div_selector_to_remove2)

    let div_selector_to_remove3 = ".iCampus";
    await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }, div_selector_to_remove3)

    let div_selector_to_remove4 = ".iAction";
    await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }, div_selector_to_remove4)

    let div_selector_to_remove5 = ".iWeek";
    await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }, div_selector_to_remove5)

    let div_selector_to_remove6 = ".iSession";
    await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }, div_selector_to_remove6)



    //entering the data to .txt file
    const data1 = await page.$$eval('.viconTable tbody tr td.iDate', trs1 => trs1.map((tr1) => {
        return tr1.innerText;
    }));
    console.log(data1);
    const aoalinks1 = data1.map(l1 => [l1]);
    const wb1 = xlsx.utils.book_new();
    const ws1 = xlsx.utils.aoa_to_sheet(aoalinks1);
    xlsx.utils.book_append_sheet(wb1, ws1);
    xlsx.writeFile(wb1, "1. outputdate.txt");

    const data2 = await page.$$eval('.viconTable tbody tr td.iTime', trs2 => trs2.map((tr2) => {
        return tr2.innerText;
    }));
    console.log(data2);
    const aoalinks2 = data2.map(l2 => [l2]);
    const wb2 = xlsx.utils.book_new();
    const ws2 = xlsx.utils.aoa_to_sheet(aoalinks2);
    xlsx.utils.book_append_sheet(wb2, ws2);
    xlsx.writeFile(wb2, "2. outputtime.txt");

    const data3 = await page.$$eval('.viconTable tbody tr td.iClass', trs3 => trs3.map((tr3) => {
        return tr3.innerText;
    }));
    console.log(data3);
    const aoalinks3 = data3.map(l3 => [l3]);
    const wb3 = xlsx.utils.book_new();
    const ws3 = xlsx.utils.aoa_to_sheet(aoalinks3);
    xlsx.utils.book_append_sheet(wb3, ws3);
    xlsx.writeFile(wb3, "3. outputclass.txt");

    const data4 = await page.$$eval('.viconTable tbody tr td.iDeliveryMode', trs4 => trs4.map((tr4) => {
        return tr4.innerText;
    }));
    console.log(data4);
    const aoalinks4 = data4.map(l4 => [l4]);
    const wb4 = xlsx.utils.book_new();
    const ws4 = xlsx.utils.aoa_to_sheet(aoalinks4);
    xlsx.utils.book_append_sheet(wb4, ws4);
    xlsx.writeFile(wb4, "4. outputmode.txt");

    const data5 = await page.$$eval('.viconTable tbody tr td.iCourse', trs5 => trs5.map((tr5) => {
        return tr5.innerText;
    }));
    console.log(data5);
    const aoalinks5 = data5.map(l5 => [l5]);
    const wb5 = xlsx.utils.book_new();
    const ws5 = xlsx.utils.aoa_to_sheet(aoalinks5);
    xlsx.utils.book_append_sheet(wb5, ws5);
    xlsx.writeFile(wb5, "5. outputcourse.txt");

    const data6 = await page.$$eval('.viconTable tbody tr td.iMeetingID', trs6 => trs6.map((tr6) => {
        return tr6.innerText;
    }));
    console.log(data6);
    const aoalinks6 = data6.map(l6 => [l6]);
    const wb6 = xlsx.utils.book_new();
    const ws6 = xlsx.utils.aoa_to_sheet(aoalinks6);
    xlsx.utils.book_append_sheet(wb6, ws6);
    xlsx.writeFile(wb6, "6. outputmeetid.txt");

    const data7 = await page.$$eval('.viconTable tbody tr td.iMeetingPassword', trs7 => trs7.map((tr7) => {
        return tr7.innerText;
    }));
    console.log(data7);
    const aoalinks7 = data7.map(l7 => [l7]);
    const wb7 = xlsx.utils.book_new();
    const ws7 = xlsx.utils.aoa_to_sheet(aoalinks7);
    xlsx.utils.book_append_sheet(wb7, ws7);
    xlsx.writeFile(wb7, "7. outputmeetpass.txt");

    const data8 = await page.$$eval('.viconTable tbody tr', trs8 => trs8.map((tr8) => {
        return tr8.innerText;
    }));
    console.log(data8);
    const aoalinks8 = data8.map(l8 => [l8]);
    const wb8 = xlsx.utils.book_new();
    const ws8 = xlsx.utils.aoa_to_sheet(aoalinks8);
    xlsx.utils.book_append_sheet(wb8, ws8);
    xlsx.writeFile(wb8, "8. outputrow.txt");



}
scrapeJadwal('https://myclass.apps.binus.ac.id/Home/Index');