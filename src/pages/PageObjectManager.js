import { LoginPage } from "./LoginPage.js";
import { DashboardPage } from "./DashboardPage.js";
import { CartPage } from "./CartPage.js";

/**
 * PageObjectManager
 * ------------------
 * Centralized class responsible for creating and managing
 * instances of all Page Objects in the framework.
 * 
 * This prevents multiple instantiations of the same page
 * and allows lazy initialization when a page is first needed.
 */
export class PageObjectManager {
    //Constructor receives the Playwright page instance
    //so it can be shared across all Page Objects.
    constructor(page) {
        this.page = page;

        //Private references to Page Object instances (lazy loaded)
        this._loginPage = null;
        this._dashboardPage = null;
        this._cartPage = null;
    }

    //All the following returns the pages instances.
    getLoginPage() {
        if (!this._loginPage) {
            this._loginPage = new LoginPage(this.page);
        }

        return this._loginPage;
    }

    getDashBoardPage() {
        if (!this._dashboardPage) {
            this._dashboardPage = new DashboardPage(this.page);
        }

        return this._dashboardPage;
    }

    getCartPage() {
        if (!this._cartPage) {
            this._cartPage = new CartPage(this.page);
        }

        return this._cartPage;
    }
}