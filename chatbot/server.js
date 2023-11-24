import { WebSocketServer as Server } from 'ws';
import { launch } from 'puppeteer';

const wss = new Server({
    port: 3000
});

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        const request = JSON.parse(message);

        if (request.action === 'search') {
            const screenshotData = await performGoogleSearch(request.query);
            ws.send(JSON.stringify({
                action: 'search',
                screenshotData
            }));
        }
    });
});

async function performGoogleSearch(query) {
    const browser = await launch();
    const page = await browser.newPage();

    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    await page.waitForSelector('h3');

    const screenshotData = await page.screenshot({
        encoding: 'base64'
    });

    await browser.close();

    return screenshotData;
}