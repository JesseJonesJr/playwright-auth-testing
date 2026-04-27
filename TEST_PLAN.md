# Test Plan — Authentication System

## Project Information

| Field | Detail |
|-------|--------|
| **Project** | Client Project A — Authentication UI |
| **Author** | Jesse Jones |
| **Date** | April 2026 |
| **Version** | 1.0 |
| **Status** | In Progress |

---

## Objective

Validate the complete authentication flow of a production web application, covering email/password login, phone-based authentication with OTP, password recovery, and account creation. Testing covers functional correctness, input validation, UI responsiveness, error handling, and cross-browser compatibility across all authentication screens.

---

## Scope

### In Scope
- Email/password login
- Google and Microsoft OAuth login
- Phone number login with OTP verification
- Forgot password and reset flow
- Account creation / sign up
- Session management (remember me, persistence)
- Input validation and edge cases
- Responsive design (desktop, tablet, mobile)
- Cross-browser testing (Chrome, Firefox, Chromium-based)
- Keyboard accessibility

### Out of Scope
- Backend API logic (pending integration)
- Database validation
- Load / performance testing
- Security penetration testing

---

## Environment

| Component | Detail |
|-----------|--------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | SCSS |
| **Browsers** | Chrome, Firefox, Brave/Edge |
| **Viewports** | Desktop (1440px), Tablet (768px), Mobile (390px) |
| **OS** | Linux |
| **Automation Tool** | Playwright |
| **Version Control** | Git / GitHub |

---

## Test Cases

### Flow 1 — Email/Password Login

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|-----------------|--------|
| TC-001 | Successful login with valid credentials | Navigate to login → Enter valid email → Enter valid password → Click Login | User redirected to dashboard, session created | Blocked — awaiting backend |
| TC-002 | Login fails with invalid email | Enter non-existent email → Enter any password → Click Login | Error message displayed, user stays on login page | Blocked — awaiting backend |
| TC-003 | Login fails with wrong password | Enter valid email → Enter incorrect password → Click Login | Error message displayed, user stays on login page | Blocked — awaiting backend |
| TC-004 | Login fails with empty fields | Leave email and password blank → Click Login | Validation messages shown on both fields | Testable now |
| TC-005 | Login with email containing whitespace | Enter email with leading/trailing spaces → Enter valid password → Click Login | Input is trimmed and login succeeds, or validation error shown | Testable now |
| TC-006 | Password visibility toggle | Enter password → Click eye icon → Click again | Password toggles between hidden (dots) and visible (plain text) | Testable now |
| TC-007 | Remember me — checked | Check "Remember me" → Login → Close browser → Reopen app | User remains logged in, session persists | Blocked — awaiting backend |
| TC-008 | Remember me — unchecked | Leave unchecked → Login → Close browser → Reopen | User is logged out, must login again | Blocked — awaiting backend |
| TC-009 | Google OAuth login | Click Google sign-in button | Google OAuth popup opens, user authenticates, redirected to dashboard | Testable now (UI only) |
| TC-010 | Microsoft OAuth login | Click Microsoft sign-in button | Microsoft OAuth popup opens, user authenticates, redirected to dashboard | Testable now (UI only) |

### Flow 2 — Phone Login

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|-----------------|--------|
| TC-011 | Navigate to phone login | Click "Sign in with phone number" on login page | Phone login screen loads with country auto-detected | Testable now |
| TC-012 | Country auto-detection | Load phone login page | Country code matches user's location | Testable now (API may be rate limited) |
| TC-013 | Manual country selection | Click country selector → Choose a different country | Country code updates to match selection | Testable now |
| TC-014 | Valid phone number submission | Enter valid phone number → Click Continue | OTP screen loads | Blocked — awaiting backend |
| TC-015 | Empty phone number | Leave phone number blank → Click Continue | Validation error shown | Testable now |
| TC-016 | Invalid phone number format | Enter letters or special characters in phone field | Input rejects non-numeric characters or shows error | Testable now |
| TC-017 | Back button from phone login | Click Back button | Returns to login page | Testable now |
| TC-018 | OTP input accepts only numbers | Try typing letters in OTP field | Field rejects non-numeric input | Testable now |
| TC-019 | OTP countdown timer | Arrive at OTP screen, observe timer | Timer counts down, resend button disabled until expiry | Testable now |
| TC-020 | Resend OTP button | Wait for timer to expire → Click Resend | Timer resets, new code requested | Partially testable (UI only) |

### Flow 3 — Forgot Password

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|-----------------|--------|
| TC-021 | Navigate to forgot password | Click "Forgot password?" on login page | Forgot password screen loads with email input | Testable now |
| TC-022 | Submit valid email for reset | Enter valid email → Click Submit | Redirects to email verification/code screen | Blocked — awaiting backend |
| TC-023 | Submit empty email | Leave email blank → Click Submit | Validation error shown | Testable now |
| TC-024 | Submit invalid email format | Enter "notanemail" → Click Submit | Validation error for invalid format | Testable now |
| TC-025 | Back to login from forgot password | Click Back/login link | Returns to login page | Testable now |
| TC-026 | Reset code input | Enter code received via email | Accepted, proceeds to reset password screen | Blocked — awaiting backend |
| TC-027 | Reset code countdown timer | Observe timer on code screen | Timer counts down, resend disabled until expiry | Testable now |
| TC-028 | Resend reset code | Wait for timer → Click Resend | UI resets timer, new code requested | Partially testable |
| TC-029 | Password strength indicator | Type passwords of varying strength (weak, medium, strong) | Strength indicator updates in real time | Testable now |
| TC-030 | Password and confirm password match | Enter same password in both fields | No error, submit enabled | Testable now |
| TC-031 | Password and confirm password mismatch | Enter different passwords in each field | Error message indicating passwords don't match | Testable now |
| TC-032 | Empty password fields on reset | Leave both fields blank → Click Submit | Validation errors on both fields | Testable now |
| TC-033 | Success screen after reset | Complete password reset flow | Success message with "Back to login" button | Blocked — awaiting backend |
| TC-034 | Back to login from success screen | Click "Back to login" button | Redirects to login page | Testable now |

### Flow 4 — Sign Up

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|-----------------|--------|
| TC-035 | Navigate to sign up | Click "Sign up" link on login page | Sign up page loads with email, password, confirm password fields | Testable now |
| TC-036 | Successful account creation | Enter valid email → Strong password → Confirm → Click Create Account | Account created, redirected to login page | Blocked — awaiting backend |
| TC-037 | Sign up with empty fields | Leave all fields blank → Click Create Account | Validation errors on all fields | Testable now |
| TC-038 | Sign up with invalid email | Enter "notanemail" → Valid password → Confirm → Submit | Email validation error shown | Testable now |
| TC-039 | Sign up with weak password | Enter valid email → Enter "123" as password | Strength indicator shows weak, possibly prevents submission | Testable now |
| TC-040 | Password strength indicator | Type progressively stronger passwords | Indicator changes from weak to medium to strong | Testable now |
| TC-041 | Confirm password mismatch | Enter different passwords in password and confirm fields | Error message shown, submit blocked | Testable now |
| TC-042 | Confirm password match | Enter same password in both fields | No error, submit enabled | Testable now |
| TC-043 | Sign up with existing email | Enter email that already has account → Submit | Error "Account already exists" or similar | Blocked — awaiting backend |
| TC-044 | Back to login from sign up | Click "Back to login" link | Returns to login page | Testable now |

### Flow 5 — UI and Responsiveness

| ID | Title | Steps | Expected Result | Status |
|----|-------|-------|-----------------|--------|
| TC-045 | Mobile viewport (390px) | Resize browser to 390px → Navigate all auth screens | All screens render correctly, no overflow or cut-off | Testable now |
| TC-046 | Tablet viewport (768px) | Resize to 768px → Navigate all screens | Layout adapts properly | Testable now |
| TC-047 | Desktop viewport (1440px) | View at 1440px → Navigate all screens | Full layout displays correctly | Testable now |
| TC-048 | Cross-browser — Firefox | Open app in Firefox → Run through all flows | All features work identically to Chrome | Testable now |
| TC-049 | Cross-browser — Chromium-based | Open app in Brave or Edge → Run through all flows | All features work identically | Testable now |
| TC-050 | Keyboard navigation | Tab through all form fields and buttons on each screen | Focus order is logical, all interactive elements reachable | Testable now |

---

## Test Summary

| Category | Count |
|----------|-------|
| **Total test cases** | 50 |
| **Testable now** | 30 |
| **Blocked (awaiting backend)** | 14 |
| **Partially testable** | 6 |

---

## Known Issues

| ID | Description | Severity | Status |
|----|-------------|----------|--------|
| BUG-001 | After sign up, middleware silently redirects to login with no success message — user may think account creation failed | Medium | Open |
| BUG-002 | Country detection API (ipapi.co) rate limited on free tier — auto-detection may fail silently | Low | Open — switched to ip2c.org |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Backend not integrated | Cannot test full authentication flows | Test all frontend validation and UI behavior independently |
| Third-party OAuth (Google/Microsoft) | Cannot test full OAuth flow without credentials | Test button presence, click behavior, and popup initiation |
| Country detection API rate limits | Phone login may not auto-detect country | Fallback to manual country selection tested separately |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | April 2026 | Jesse Jones | Initial test plan — 50 test cases across 5 flows |
