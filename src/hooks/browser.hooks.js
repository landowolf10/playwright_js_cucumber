import { BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
setDefaultTimeout(60 * 1000);

let browser;
let browserName;

const browsers = { chromium, firefox, webkit };

// Exportamos para que otros hooks lo usen
export function getBrowser() {
    return browser;
}

export function getBrowserName() {
    return browserName;
}

BeforeAll(async () => {
    browserName = process.env.BROWSER || "chromium";

    const selectedBrowser = browsers[browserName];

    if (!selectedBrowser) {
        throw new Error(`Browser "${browserName}" not supported`);
    }

    browser = await selectedBrowser.launch({
        headless: process.env.HEADLESS !== "false",
        slowMo: parseInt(process.env.SLOW_MO) || 0,
    });
});

AfterAll(async () => {
    if (browser) {
        await browser.close();
    }
});