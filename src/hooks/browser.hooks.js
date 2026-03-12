import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "@playwright/test";
import { PageObjectManager } from "../pages/PageObjectManager.js";
import dotenv from "dotenv";
import { logger } from "../helpers/logger.js";
import fs from "fs";
import path from "path";

dotenv.config();
setDefaultTimeout(60 * 1000);

let browser;
let browserName;
let passedScenarios = 0;
let failedScenarios = 0;
let skippedScenarios = 0;
let executionStart;

const browsers = { chromium, firefox, webkit };

BeforeAll(async () => {
    executionStart = Date.now();

    //Creates logs folder.
    if (!fs.existsSync("reports/logs")) {
        fs.mkdirSync("reports/logs", { recursive: true });
    }

    //Creates videos folder.
    if (!fs.existsSync("reports/videos")) {
        fs.mkdirSync("reports/videos", { recursive: true });
    }

    //Selected browser by env variable.
    browserName = process.env.BROWSER || "chromium";

    const selectedBrowser = browsers[browserName];
    if (!selectedBrowser) {
        throw new Error(`Browser "${browserName}" not supported`);
    }

    //Launch browsers
    browser = await selectedBrowser.launch({
        headless: process.env.HEADLESS !== "false",
        slowMo: parseInt(process.env.SLOW_MO) || 0,
    });

    //Creates allure-results folder if not exists
    // to generate ALlure report.
    const allureResultsDir = path.join("reports", "allure-results");

    if (!fs.existsSync(allureResultsDir)) {
        fs.mkdirSync(allureResultsDir, { recursive: true });
    }
});

//Closes browser after all scenarios executed.
AfterAll(async () => {
    const executionTime = (Date.now() - executionStart) / 1000;

    if (browser) 
        await browser.close();

    logger.info("=================================");
    logger.info("TEST EXECUTION SUMMARY");
    logger.info("=================================");

    logger.info(`PASSED SCENARIOS : ${passedScenarios}`);
    logger.info(`FAILED SCENARIOS : ${failedScenarios}`);
    logger.info(`SKIPPED SCENARIOS: ${skippedScenarios}`);

    const total = passedScenarios + failedScenarios + skippedScenarios;

    logger.info(`TOTAL SCENARIOS  : ${total}`);
    logger.info(`TOTAL EXECUTION TIME: ${executionTime} seconds`);
    logger.info("=================================");
});

Before(async function (scenario) {
    this.browserName = browserName;

    //Print logs before each scenario.
    logger.info(`[${this.browserName}] Starting scenario: ${scenario.pickle.name}`);

    //Creates browser context for each scenario.
    this.context = await browser.newContext({
        baseURL: process.env.BASE_URL || "https://www.saucedemo.com",
        ignoreHTTPSErrors: true,
        recordVideo: {
            dir: "reports/videos"
        }
    });

    this.page = await this.context.newPage(); //Initialize the page object
    this.pageObjectManager = new PageObjectManager(this.page); //Initialize page object manager

    //Instantiates all the pages before each exection
    //to no repeat initialization of objects in each step definition.
    this.loginPage = this.pageObjectManager.getLoginPage();
    this.dashboardPage = this.pageObjectManager.getDashBoardPage();
    this.cartPage = this.pageObjectManager.getCartPage();
});

After(async function (scenario) {
    if (scenario.result?.status === "PASSED") {
        passedScenarios++;
    }

    if (scenario.result?.status === "FAILED") {
        failedScenarios++;
    }

    if (scenario.result?.status === "SKIPPED") {
        skippedScenarios++;
    }

    const video = this.page.video();

    //Creates screenshots of each failed scenario after
    //all executions ends.
    if (scenario.result?.status === "FAILED") {
        logger.error('Scenario failed');
        logger.error(`Browser: ${this.browserName}`);
        logger.error(`Scenario: ${scenario.pickle.name}`);

        if (scenario.result?.exception) {
            logger.error(`Error message: ${scenario.result.exception.message}`);
            logger.error(`Stack trace: ${scenario.result.exception.stack}`);
        }

        const dir = "reports/screenshots";
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir, { recursive: true });

        const screenshot = await this.page.screenshot({ fullPage: true });
        this.attach(screenshot, "image/png");

    }
    
    //Close context so Playwright can finish video generation
    if (this.context) {
        await this.context.close();
    }

    //Attach video to report if scenario failed.
    if (scenario.result?.status === "FAILED" && video) {
        const videoPath = await video.path();

        //Wait until file exists
        let retries = 10;
        while (!fs.existsSync(videoPath) && retries > 0) {
            await new Promise(r => setTimeout(r, 200));
            retries--;
        }

        if (fs.existsSync(videoPath)) {
            const videoBuffer = fs.readFileSync(videoPath);
            this.attach(videoBuffer, "video/webm");
        }
    }
});