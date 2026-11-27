# Implementation Roadmap

This roadmap is ordered by dependency. Dates are intentionally not assigned until the source-verification work and project scope are settled.

## Phase 0 — Rules discovery and verification

**Outcome:** a defensible specification of the salary rules that the first release will implement.

- [ ] Collect the current and relevant historical Sikkim Government pay-revision orders.
- [ ] Locate and verify the applicable pay matrix/pay levels and cell values.
- [ ] Identify allowance orders, eligibility conditions and effective dates.
- [ ] Identify deduction rules and which employee categories they apply to.
- [ ] Record rounding, ceilings, exemptions and retrospective-effect provisions.
- [ ] Create independently checked sample salary scenarios.
- [ ] Record every source and verification status in PAY_RULES_REGISTER.md.

**Exit gate:** no rate enters the calculation dataset without a primary source and a reviewer-checked transcription.

## Phase 1 — Application foundation

**Outcome:** a maintainable, testable application shell.

- [ ] Scaffold SvelteKit with TypeScript and Tailwind CSS.
- [ ] Add linting, formatting, type checking and unit testing.
- [ ] Establish the folder structure for routes, components, domain logic and rules data.
- [ ] Add responsive layout, typography, accessible form controls and number formatting.
- [ ] Add GitHub Actions checks for pull requests.
- [ ] Confirm Cloudflare deployment strategy and static/server requirements.

## Phase 2 — Pay matrix

**Outcome:** users can find and select basic pay using verified matrix data.

- [ ] Add typed pay-level and cell data.
- [ ] Add pay-level/cell selector.
- [ ] Add manual basic-pay entry and validation.
- [ ] Display the matrix version and official source.
- [ ] Add data-integrity tests for every level and cell.

## Phase 3 — Monthly salary calculation

**Outcome:** core gross salary, deductions and estimated net salary.

- [ ] Implement pure calculation functions.
- [ ] Implement allowance calculations supported by verified rules.
- [ ] Implement applicable deductions supported by verified rules.
- [ ] Add salary-period/effective-date handling.
- [ ] Show a line-by-line breakdown, source references and warnings.
- [ ] Add unit and regression tests using checked scenarios.

## Phase 4 — Salary statement and usability

**Outcome:** users can retain a clear record of a calculation without creating an account.

- [ ] Add printable salary statement.
- [ ] Add print stylesheet and PDF-friendly layout.
- [ ] Improve mobile form flow and accessibility.
- [ ] Add offline support after the core app is stable.
- [ ] Conduct a usability review with representative users.

## Phase 5 — Advanced pay tools

**Outcome:** optional tools built on the verified core engine.

- [ ] Increment projection.
- [ ] Promotion/pay fixation scenarios.
- [ ] Pay revision comparison.
- [ ] Arrears estimation across effective dates.
- [ ] Historical salary comparison.

Each feature requires its own rule and source review before implementation.

## Phase 6 — Public beta and maintenance

**Outcome:** a reliable public tool with a sustainable update process.

- [ ] Review the app against the MVP acceptance criteria.
- [ ] Publish limitations, source notes and feedback process.
- [ ] Add a process for reviewing new government orders.
- [ ] Add regression tests whenever a rule changes.
- [ ] Publish a changelog for rule and application releases.

## Release gates

- **Prototype:** interface and sample-only calculations; not for real-world reliance.
- **Internal alpha:** verified rules for a narrow, explicitly stated employee category.
- **Public beta:** source-backed calculations, tested sample cases and visible limitations.
- **Stable release:** ongoing rule-maintenance process and complete acceptance criteria.
