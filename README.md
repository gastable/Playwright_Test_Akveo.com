## Playwright Test Suite for Akveo (ngx-admin)

End-to-end UI tests for the **Akveo ngx-admin demo** site. This repo uses **Playwright** with the Page Object Model to keep locators and actions clean and reusable.

> Demo under test: https://demo.akveo.com/ngx-admin

---

## 📦 Tech Stack
- **Node.js** + **npm**
- **Playwright** (test runner, Chromium/Firefox/WebKit)
- **Page Object Model (POM)** for maintainable locators/actions

---

## 🗂️ Project Structure
```
Playwright_Test_Akveo.com/
├─ pageObjects/ # Reusable page objects (locators + actions)
├─ tests/ # Your spec files
├─ tests-examples/ # Sample tests from Playwright (optional)
├─ playwright.config.js # Global config (baseURL, projects, reporter, retries)
├─ package.json # Scripts and dependencies
└─ package-lock.json
```

---
## ✨ Features
- **Page Object Model (POM)** — clean separation of locators and actions for maintainable tests
- **Cross-browser testing** — runs on Chromium, Firefox, and WebKit
- **End-to-end coverage** — navigates through ngx-admin dashboards and validates UI components
- **Reusable locators** — single source for element selectors to reduce maintenance
- **Visual and state assertions** — checks UI visibility, text, class names, and attributes
- **Trace, video, and screenshot artifacts** — auto-collected for failed tests
- **Configurable base URL** — switch test target with an environment variable
- **CI/CD ready** — includes example GitHub Actions workflow for automated runs
