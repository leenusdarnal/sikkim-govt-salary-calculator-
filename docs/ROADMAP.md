# Implementation Roadmap

This roadmap is ordered by dependency. Dates are intentionally not assigned until source verification and project scope are settled. The research baseline, evidence standard and next-step sequence are consolidated in [SALARY_RULES_GUIDE.md](SALARY_RULES_GUIDE.md).

## Phase 0 — Rules discovery and verification

**Outcome:** a defensible specification of the salary rules that the first release will implement.

- [x] Locate the baseline Sikkim Government Services (Revised Pay) Rules, 2018 and review Rules 1–6.
- [x] Locate Gazette Schedule Part A and Part B; identify the full Government matrix and the specified-post upgrade schedule.
- [x] Locate the State Bank of Sikkim Pay Matrix Annexure-I and record its selected Level/Grade Pay/entry-pay headings.
- [x] Transcribe all 24 specified-post entries from Gazette Schedule Part B into a separate, reference-only lookup; retain the independent second-check and later-order review as open work.
- [x] Review DOP OM No. 2026/GEN/DOP (20/03/2026), Notification No. 109/GEN/DOP with OM No. 6412/GEN/DOP (25/09/2025), and clarification No. 6780/GEN/DOP (27/10/2025) as separate applicability references.
- [x] Locate the official DOP archive listing for Notification No. 99/GEN/DOP dated 06/02/2020 and a readable copy; record its provisional effect on original designation/original Pay Level after five years following regularisation. The original signed PDF and referenced OM No. 5339/GEN/DOP dated 11/02/2019 remain unverified.
- [ ] Obtain and review the original Notification No. 99/GEN/DOP and OM No. 5339/GEN/DOP, plus the underlying regularisation/scheme notifications referenced by the 2026 OM, before implementing any regularised-employee progression.
- [x] Transcribe the State Bank Annexure-I values into a test-only fixture and compare all 549 cells across the 16 shared Levels with the lookup; no mismatches found.
- [x] Manually transcribe the 245 cells for Gazette-only Levels 1, 2, 3, 8, 13, 18 and 23 from printed pages 12–14 and add a regression test; all values match the lookup.
- [ ] Obtain a second independent reviewer check of all 794 populated cells in Gazette Part A and record sign-off.
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
- [x] Add dependency lockfile and switch CI/deployment installation to npm ci.
- [ ] Add linting and formatting.
- [ ] Establish the complete folder structure for routes, components, domain logic and rules data.
- [x] Add responsive layout, typography, accessible form controls and number formatting.
- [x] Add system-aware, persistent light/dark mode with accessible inline icons.
- [ ] Confirm Cloudflare deployment strategy and static/server requirements.

## Phase 2 — Pay matrix

**Outcome:** users can look up and select basic pay from the source-linked matrix preview; full independent verification and employee applicability remain open.

- [x] Add all 23 Gazette Part A Levels, Grade Pay, entry pay, and source-specific cell counts; generate cells with the documented progression and retain exact column lengths. All 794 populated cells are represented in source-based regression fixtures; the second independent reviewer check of the complete Gazette table remains open in Phase 0.
- [x] Add pay-level/cell selector and an explicit action to apply selected basic pay.
- [x] Preserve manual basic-pay entry and validation.
- [x] Display matrix version and official source.
- [x] Add tests for all Level metadata, cell counts, invalid lookups, and every generated cell's progression, plus representative Gazette values.
- [x] Keep Part B post-specific upgrades separate from the Part A base matrix.

**Phase 2 limitation:** this is a source-linked lookup preview only. All 794 populated cells now have source-based regression coverage (549 State Bank cross-reference cells and 245 Gazette-only cells manually transcribed from Gazette images). A second independent reviewer check and employee/post applicability review remain open. No allowance or deduction logic is implied.

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

- [x] Add an interim print-only view for manual arithmetic estimates; it is not a source-backed salary statement.
- [ ] Add the complete printable salary statement with calculation notes, rule references and effective period.
- [ ] Add print stylesheet and PDF-friendly layout for the complete statement.
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
