# Product Plan

## 1. Product vision

Build a reliable and easy-to-use salary calculator specifically for Government of Sikkim employees. A user should be able to enter a small set of pay details, receive an understandable salary breakdown, and trace every rule used in the calculation to an official source.

The product is not intended to replace DDO/treasury systems, official pay fixation, or department-issued salary slips.

## 2. Primary users

- Sikkim Government employees who want to estimate monthly take-home salary.
- Employees checking the impact of an increment, promotion or pay revision.
- Users who want to understand how allowances and deductions contribute to net salary.
- Maintainers who need to update calculation rules when official orders change.

Employee categories and rule applicability must be confirmed from official orders before they are represented as selectable options.

## 3. Product principles

1. **Accuracy before breadth:** do not implement a rate until its source, effective date and applicability are documented.
2. **Explainable calculations:** show the formula and inputs behind every important total.
3. **Separation of concerns:** keep salary rules and calculation logic independent of UI components.
4. **Privacy by default:** no login, no employee number, no bank details and no server-side storage of salary inputs in the initial release.
5. **Accessible and mobile-first:** clear forms, readable figures, keyboard support and responsive layouts.
6. **Maintainable rules:** version rules and pay matrices; never silently overwrite a historical rule.
7. **Minimal first release:** deliver an accurate monthly salary calculator before adding advanced payroll utilities.

## 4. MVP scope

### Included

- Pay level and cell/basic-pay selection, based on a verified Sikkim Government pay matrix.
- Manual basic-pay entry as a fallback, with validation against the selected rule set where possible.
- Applicable allowance inputs, each clearly marked as fixed, percentage-based, conditional or manually entered.
- Configurable deductions, with applicability controlled by verified rules.
- Calculation summary: basic pay, allowances, gross pay, deductions and estimated net pay.
- A detailed calculation breakdown with formulas and rounding behaviour.
- Effective-date selection or clear indication of the rule period being used.
- Printable salary statement.
- Source and rule version references shown with the result.

### Not in the first release

- Employee login or personal employee profiles.
- Payroll processing, attendance, leave or treasury integration.
- Collection or storage of Aadhaar, PAN, bank account, GPF/NPS account or employee ID.
- Automatic interpretation of uploaded orders without human verification.
- Tax-return preparation or statutory tax advice.
- Claims that the result is an official salary determination.

## 5. Functional requirements

### FR-01 — Pay details

The user can select a verified pay level and cell or enter basic pay manually. The interface must state which pay matrix/rule version is active.

### FR-02 — Allowances

Each allowance must have a documented calculation method, eligibility condition, effective date and source. If an amount cannot be determined from verified rules, it must be explicitly entered by the user and labelled as user-provided.

### FR-03 — Deductions

Deductions must be modelled independently. The calculator must distinguish mandatory, conditional and optional/user-entered deductions. A deduction must not be automatically applied to all users unless its applicability is established.

### FR-04 — Calculation explanation

The result must show each component and its computation. Totals must be reproducible from the displayed inputs and rule versions.

### FR-05 — Historical rules

The calculation engine must select rules based on the salary month or chosen effective date. Updates must not change the result of a past-period calculation unless the underlying official order expressly requires retrospective application.

### FR-06 — Salary statement

The user can print or save a statement containing the selected period, pay inputs, each allowance/deduction, totals, assumptions and source references. It must be labelled as an estimate.

### FR-07 — Validation

Inputs must be validated for missing values, invalid numbers, unsupported combinations and dates outside a rule's effective period.

## 6. Non-functional requirements

- Responsive and accessible user interface.
- Deterministic calculation engine with unit tests.
- No external network call required for a basic calculation once the app is loaded.
- No personal salary input transmitted to a backend in the MVP.
- Rule datasets must be reviewable as structured source files.
- Clear separation between verified rules, assumptions and user-entered values.
- Automated checks for formatting, type safety, tests and production build.

## 7. Calculation model

At a high level:

- **Gross salary** = basic pay + applicable allowances + other verified earnings.
- **Total deductions** = applicable statutory/departmental deductions + user-selected deductions.
- **Estimated net salary** = gross salary − total deductions.

These are structural definitions only. The exact components, eligibility, calculation bases, caps, rounding and exclusions must come from verified orders. The application must not assume every allowance or deduction applies to every employee.

## 8. Technical architecture

### Front end

SvelteKit, TypeScript and Tailwind CSS. Keep forms and presentation components separate from calculation functions.

### Domain layer

A pure TypeScript calculation engine. It should accept a validated input object and a versioned ruleset, then return component amounts, formula/derivation metadata, gross salary, deductions, estimated net salary, warnings and missing-rule indicators, plus source/rule identifiers.

### Rules data

Store pay matrix tables and rule definitions as typed, versioned data. Every rule should include a stable identifier, display name, calculation method, parameters, applicability conditions, effective dates, official source title/number/date/URL, verification status and review notes.

### Testing

- Unit tests for every formula and boundary condition.
- Regression fixtures based on independently checked sample calculations.
- Tests for effective-date selection and overlapping rules.
- End-to-end checks for the main salary calculation and printable statement.

### Hosting

Prefer a low-cost static/client-side deployment. Assess Cloudflare Pages with the SvelteKit Cloudflare adapter. GitHub Pages is an alternative only if the selected SvelteKit setup can be exported as a fully static site without requiring server features.

## 9. User experience direction

Use a clean, government-service-oriented interface:

- Start with the salary calculation task, not a large dashboard.
- Use a short guided form with sensible grouping.
- Keep gross, deductions and net salary visually distinct.
- Show calculation details on demand without hiding important assumptions.
- Use consistent spacing, typography, number formatting and accessible contrast.
- Avoid decorative charts or complex employee-management features in the MVP.

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Outdated or misapplied pay orders | Maintain a source register and rule effective dates |
| Different employee categories have different entitlements | Model applicability explicitly; do not assume universal eligibility |
| Rounding differences from payroll systems | Confirm rounding rules and add regression tests |
| Incorrect deductions | Require source-backed applicability and clear user overrides |
| Users treat estimates as official pay | Display estimate disclaimer and source notes in the UI and statement |
| Sensitive employee data is entered | Minimise inputs and avoid collecting identifiers or bank data |

## 11. MVP acceptance criteria

The MVP is ready for a public beta only when the applicable pay matrix has been transcribed and independently checked; every implemented allowance and deduction has a primary source and effective date; the engine has tests for ordinary, boundary and exception cases; independently calculated samples match the app; unknown, conditional and user-entered values are clearly explained; users can calculate on mobile without an account; and outputs are labelled as estimates.
