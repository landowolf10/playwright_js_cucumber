import { BeforeAll, AfterAll, After } from "@cucumber/cucumber";
import { logger } from "../helpers/logger.js";
import fs from "fs";
import path from "path";

let passedScenarios = 0;
let failedScenarios = 0;
let skippedScenarios = 0;
let executionStart;

BeforeAll(() => {
  executionStart = Date.now();

  if (!fs.existsSync("reports/logs")) {
    fs.mkdirSync("reports/logs", { recursive: true });
  }

  if (!fs.existsSync("reports/videos")) {
    fs.mkdirSync("reports/videos", { recursive: true });
  }

  const allureResultsDir = path.join("reports", "allure-results");

  if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
  }
});

After({ order: 1 }, async function (scenario) {
  if (scenario.result?.status === "PASSED") passedScenarios++;
  if (scenario.result?.status === "FAILED") failedScenarios++;
  if (scenario.result?.status === "SKIPPED") skippedScenarios++;

  if (scenario.result?.status === "FAILED") {
    logger.error(`Scenario failed: ${scenario.pickle.name}`);

    const dir = "reports/screenshots";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      const pages = this.context?.pages();
      const activePage = pages?.length ? pages[pages.length - 1] : this.page;

      if (activePage) {
        const screenshot = await activePage.screenshot({ fullPage: true });
        this.attach(screenshot, "image/png");
      }
    } catch (e) {
      logger.error(`Screenshot failed: ${e.message}`);
    }
  }
});

AfterAll(() => {
  const executionTime = (Date.now() - executionStart) / 1000;

  logger.info("=================================");
  logger.info("TEST EXECUTION SUMMARY");
  logger.info("=================================");

  logger.info(`PASSED: ${passedScenarios}`);
  logger.info(`FAILED: ${failedScenarios}`);
  logger.info(`SKIPPED: ${skippedScenarios}`);

  const total = passedScenarios + failedScenarios + skippedScenarios;

  logger.info(`TOTAL: ${total}`);
  logger.info(`TIME: ${executionTime}s`);
});