# Playwright Automation Framework (JavaScript + Cucumber)

Automation testing framework built with **Playwright**, **JavaScript**,
and **Cucumber** for **BDD**, implementing the **Page Object Model
(POM)** and **Page Object Manager** design patterns.

------------------------------------------------------------------------

## Installation

Before executing the tests, install the dependencies:

``` bash
npm install
```

------------------------------------------------------------------------

## Test Execution

### Headless Mode

1.  Run tests only on **Chromium**

``` bash
npm run test:chromium
```

2.  Run tests only on **Firefox**

``` bash
npm run test:firefox
```

3.  Run tests only on **WebKit**

``` bash
npm run test:webkit
```

4.  Run tests on **Chromium, Firefox, and WebKit in parallel**

``` bash
npm run testAll:parallel
```

------------------------------------------------------------------------

### Headed Mode

5.  Run tests only on **Chromium (headed)**

``` bash
npm run test:chromium:headed
```

6.  Run tests only on **Firefox (headed)**

``` bash
npm run test:firefox:headed
```

7.  Run tests only on **WebKit (headed)**

``` bash
npm run test:webkit:headed
```

8.  Run tests on **Chromium, Firefox, and WebKit in parallel (headed)**

``` bash
npm run testAll:parallel:headed
```

------------------------------------------------------------------------

## Allure Report

Generate and visualize the Allure report.

1.  Generate report

``` bash
npm run allure:generate
```

2.  Open report

``` bash
npm run allure:open
```

------------------------------------------------------------------------

## CI/CD Integration

This framework is integrated with a **GitHub Actions CI/CD pipeline**.

-   Tests are executed automatically **after every push to the `main`
    branch**.
-   After execution, an **Allure report is generated and published to
    GitHub Pages**.

You can access the latest report dashboard here:

https://landowolf10.github.io/playwright_framework_js/

Then click **"Open report"** in the **date** row.

**You need to wait a few seconds so last report is loaded.**

------------------------------------------------------------------------

## Important Note

The `.env` file was added **only for demonstration purposes** in this
repository.

In real-world projects, **`.env` files should never be committed to the
repository** and should always be included in `.gitignore`. 
