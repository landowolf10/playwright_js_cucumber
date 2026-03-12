module.exports = {
  default: {
    paths: ["src/tests/**/*.feature"],
    require: ["src/hooks/**/*.js", "src/steps/**/*.js"],
    parallel: 3,
    format: [
      "progress",
      "html:reports/cucumber-report.html",
      "allure-cucumberjs/reporter"
    ],
    formatOptions: {
      resultsDir: process.env.ALLURE_RESULTS || "reports/allure-results"
    },
    publishQuiet: true
  }
};