import { Before, After } from "@cucumber/cucumber";
import { PageObjectManager } from "../pages/PageObjectManager.js";
import { getBrowser, getBrowserName } from "./browser.hooks.js";

Before(async function () {
    const browser = getBrowser();

    this.browserName = getBrowserName();

    this.context = await browser.newContext({
        baseURL: process.env.BASE_URL || "https://www.saucedemo.com",
        ignoreHTTPSErrors: true,
        recordVideo: {
            dir: "reports/videos"
        }
    });

    this.page = await this.context.newPage();

    this.pageObjectManager = new PageObjectManager(this.page);

    // Lazy load (puedes incluso quitar esto si quieres hacerlo más limpio)
    this.loginPage = this.pageObjectManager.getLoginPage();
    this.dashboardPage = this.pageObjectManager.getDashBoardPage();
    this.cartPage = this.pageObjectManager.getCartPage();
});

After({ order: 100 }, async function (scenario) {
  let videoPath;

  if (this.page && this.page.video()) {
    videoPath = await this.page.video().path();
  }

  if (this.context) {
    await this.context.close();
  }

  //Attach video AFTER closing context
  if (scenario.result?.status === "FAILED" && videoPath) {
    const fs = await import("fs");

    if (fs.existsSync(videoPath)) {
      const buffer = fs.readFileSync(videoPath);
      this.attach(buffer, "video/webm");
    }
  }
});