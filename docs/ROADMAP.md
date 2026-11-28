# Implementation Roadmap

This roadmap is ordered by dependency. Dates are intentionally not assigned until source verification and project scope are settled. The research baseline, evidence standard and next-step sequence are consolidated in [SALARY_RULES_GUIDE.md](SALARY_RULES_GUIDE.md).

## Phase 0 — Rules discovery and verification

**Outcome:** a defensible specification of the salary rules that the first release will implement.

- [x] Locate the baseline Sikkim Government Services (Revised Pay) Rules, 2018 and review Rules 1–6.
- [x] Locate Gazette Schedule Part A and Part B; identify the full Government matrix and the specified-post upgrade schedule.
- [x] Locate the State Bank of Sikkim Pay Matrix Annexure-I and record its selected Level/Grade Pay/entry-pay headings.
- [ ] Independently transcribe and check every cell in Gazette Part A and compare every corresponding cell in the State Bank PDF.
- [ ] Collect later orders affecting post-specific Level assignments and identify the MVP employee categories.
- [ ] Locate and verify allowance orders, eligibility conditions and effective dates.
- [ ] Identify deduction rules and which employee categories they apply to.
- [ ] Record rounding, ceilings, exemptions and retrospective-effect provisions.
- [ ] Create independently checked sample salary scenarios.
- [x] Start the source register and preserve source links, notification details and verification gaps in PAY_RULES_REGISTER.md and PAY_MATRIX_SOURCE_AUDIT.md.

**Exit gate:** no rate or matrix cell enters the calculation dataset without a primary source and a reviewer-checked transcription.

## Phase 1 — Application foundation

**Outcome:** a maintainable, testable application shell.

- [x] Scaffold SvelteKit with TypeScript and Tailwind CSS.
- [x] Add a basic type-checking and unit-test setup.
- [x] Add GitHub Actions checks for pull requests and a GitHub Pages deployment workflow.
- [ ] Add dependency lockfile and switch CI/deployment installation to npm ci.
- [ ] Add linting and formatting.
- [ ] Establish the complete folder structure for routes, components, domain logic and rules data.
- [ ] Add responsive layout, typography, accessible form controls and number formatting.
- [ ] Confirm Cloudflare deployment strategy and static/server requirements.

**Dependency note:** the one-time lockfile generator is being added in a separate bootstrap PR. GitHub only exposes manual workflow dispatch after that workflow exists on the default branch. The npm ci switch will follow once the generated lockfile is committed.

## Phase 2 — Pay matrix

**Outcome:** users can find and select basic pay using verified matrix data.

- [ ] Add complete typed pay-level and cell data with source metadata.
- [ ] Add pay-level/cell selector.
- [ ] Add manual basic-pay entry and validation.
- [ ] Display matrix version and official source.
- [ ] Add data-integrity tests for every level and cell.
- [ ] Keep Part B post-specific upgrades separate from the Part A base matrix.

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
