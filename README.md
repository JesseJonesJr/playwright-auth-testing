# Auth UI Testing — Playwright + TypeScript

## Overview

End-to-end test suite for a production authentication system built with Next.js, TypeScript, and SCSS. Tests cover 4 complete authentication flows across 2 browsers (Chromium and Firefox), validating frontend functionality, input validation, UI behavior, and cross-browser compatibility.

This project demonstrates real-world QA engineering: writing a structured test plan, automating test cases with Playwright, and testing an application I built myself — not a demo site.

---

## What's Tested

| Flow | Tests | Coverage |
|------|-------|----------|
| **Email/Password Login** | 7 | Empty field validation, password toggle, OAuth buttons, navigation links |
| **Phone Login** | 7 | Country auto-detection, manual selection, search, input validation, OTP timer |
| **Forgot Password** | 11 | Multi-step flow: email → code → reset → success, strength indicator, mismatch validation |
| **Sign Up** | 11 | Empty fields, invalid email, password strength, confirm match/mismatch, OAuth, navigation |

**Total: 36 unique test cases × 2 browsers = 72 test executions**

---

## Test Results

```
Running 72 tests using 6 workers
72 passed (1.1m)
```

- ✅ All 72 tests passing
- ✅ Chromium — 36/36
- ✅ Firefox — 36/36

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Playwright** | Browser automation and test runner |
| **TypeScript** | Test scripts |
| **Next.js** | Application under test |
| **Chromium + Firefox** | Cross-browser coverage |

---

## Project Structure

```
playwright-auth-testing/
├── tests/
│   └── e2e/
│       ├── login.spec.ts           # Flow 1 — Email/Password Login
│       ├── phone-login.spec.ts     # Flow 2 — Phone Login
│       ├── forgot-password.spec.ts # Flow 3 — Forgot Password
│       └── signup.spec.ts          # Flow 4 — Sign Up
├── results/                        # Test execution results
├── bugs/                           # Bug reports
├── TEST_PLAN.md                    # Comprehensive test plan (50 test cases)
├── playwright.config.ts            # Playwright configuration
├── package.json
└── README.md
```

---

## How to Run

### Prerequisites

- Node.js 18+
- The application under test running on `http://localhost:3000`

### Setup

```bash
git clone https://github.com/JesseJonesJr/playwright-auth-testing.git
cd playwright-auth-testing
npm install
npx playwright install
sudo npx playwright install-deps  # Linux only
```

### Run all tests

```bash
npx playwright test
```

### Run with visible browser

```bash
npx playwright test --headed
```

### Run a specific flow

```bash
npx playwright test tests/e2e/login.spec.ts --headed
npx playwright test tests/e2e/phone-login.spec.ts --headed
npx playwright test tests/e2e/forgot-password.spec.ts --headed
npx playwright test tests/e2e/signup.spec.ts --headed
```

### Run in a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

---

## Test Plan

The full test plan is documented in [TEST_PLAN.md](./TEST_PLAN.md) and includes:

- **50 test cases** across 5 flows
- **30 testable now** (frontend validation, UI behavior)
- **14 blocked** (awaiting backend integration)
- **6 partially testable**
- Risk assessment and known issues
- Severity classification for all identified bugs

---

## Key Testing Approaches

**Frontend-first testing:** Backend not yet integrated, so all tests validate frontend behavior independently — input validation, UI state changes, navigation flows, and cross-browser rendering.

**Multi-step flow testing:** The forgot password flow spans 4 screens (email → code → reset → success) within a single URL. Tests navigate the complete flow programmatically.

**Cross-browser validation:** Every test runs in both Chromium and Firefox, catching browser-specific rendering and interaction differences.

**Real application testing:** Unlike tutorial-based demo site testing, this suite tests a production authentication system with real components including OTP input, country code selection with search, password strength indicators, and rate-limit-aware UI states.

---

## Author

**Jesse Jones** — QA Engineer & Frontend Developer

- [GitHub](https://github.com/JesseJonesJr)
- [QA Portfolio](https://github.com/JesseJonesJr/qa-portfolio)
