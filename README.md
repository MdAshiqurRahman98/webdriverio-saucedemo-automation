# saucedemo UI Automation

saucedemo website UI automation using WebdriverIO

Website URL: https://www.saucedemo.com

Packages: wdio, mocha-framework, chai, chromedriver, allure-reporter

Language: JavaScript

## Run Locally

Clone the project. 
```bash
  git clone https://github.com/MdAshiqurRahman98/webdriverio-saucedemo-automation.git
```

Then, go to the project directory and select the branch webdriverio-saucedemo-automation.

```bash
  cd webdriverio-saucedemo-automation
```

Install dependencies

```bash
  npm install
```

Run test for Feature-1: saucedemo login feature test for locked_out_user

NOTE: Login with Username: locked_out_user and Password: secret_sauce

```bash
  npm run login
```

Run test for Feature-2: saucedemo checkout flow test for standard_user

NOTE: Login with Username: standard_user and Password: secret_sauce

```bash
  npm run checkout
```

Run test for Feature-3: saucedemo purchase journey test for performance_glitch_user

NOTE: Login with Username: performance_glitch_user and Password: secret_sauce

```bash
  npm run glitchUserCheckout
```

Run the all the features as suite

```bash
  npm run saucedemo
```

Run all the features parallelly

```bash
  npm run test
```

Get report

```bash
  npm run getReport
```