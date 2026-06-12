const { chromium } = require("playwright");

async function generatePDF(html) {
    const browser = await chromium.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: "networkidle"
    });

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "20px",
            bottom: "20px",
            left: "20px",
            right: "20px"
        }
    });

    await browser.close();

    return pdf;
}

module.exports = generatePDF;