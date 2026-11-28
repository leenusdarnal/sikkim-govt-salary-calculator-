# Sikkim Salary Calculator — Rules Research Guide

**Purpose:** This is the working guide for research and implementation of salary rules. It records what the current source review supports, what remains unverified, and the gates that must be met before figures are used by the calculator.

**Current status:** Research baseline established; the full pay-matrix transcription, independent checking, employee-category mapping and salary-rule verification are not complete. This document is a guide, not an official pay determination.

## 1. Source hierarchy and evidence standard

Use primary Government of Sikkim rules, Gazette notifications, orders, circulars and official departmental publications as the controlling evidence. Record the exact source title, issuing authority, number, issue date, effective date, applicable employee group, and page/clause/table.

The 2018 Revised Pay Rules and Gazette Schedule are the baseline sources for the Government pay matrix. The State Bank of Sikkim Pay Matrix (Annexure-I) is a separate official publication and a cross-reference; it is not a substitute for the full Government schedule. Part B post upgrades are separate from the general Part A matrix.

Secondary reporting may help locate an official order, but is not sufficient evidence for implementing a rate. Never fill gaps by inference or silently reconcile sources that differ.

A rule is implementation-ready only after the source and applicability are clear, the transcription has been independently checked, and a test case is recorded. See [PAY_RULES_REGISTER.md](PAY_RULES_REGISTER.md) for the rule lifecycle and evidence fields.

## 2. What the reviewed sources establish

### Government of Sikkim Revised Pay Rules, 2018

- Gazette: Sikkim Government Gazette Extraordinary No. 333, published 25 June 2018.
- Notification No. 56/GEN/DOP, dated 23 June 2018.
- The Rules are deemed to have come into force on 1 January 2016.
- Rules 1–6 and the Schedule/Appendix locations have been reviewed.
- Schedule Part A contains the Government Pay Matrix for Levels 1–23.
- Schedule Part B lists upgraded Levels for specified posts.
- Appendix C contains a pay-fixation statement.

Rule 2 includes coverage conditions and exclusions. The reviewed text identifies exclusions and separate notes for work-charged establishment and people who ceased service on or after 1 January 2016. Eligibility must be checked against the actual category and applicable later orders; do not infer eligibility from a job title.

### Gazette Part A and State Bank Annexure-I

The current audit contains an initial transcription of Level, Grade Pay and Cell 1/entry-pay headings. It is not a complete pay dataset. The Gazette has Levels 1–23; the State Bank PDF displays a selected subset of 16 Levels. Corresponding headings and entry-pay combinations were initially transcribed as matching, but the full cell-by-cell comparison and independent review remain pending.

Preserve each Level's actual cell count. Blank cells are not values, and a shorter column must not be padded with inferred amounts. Do not load any partial matrix into the calculation engine.

### Gazette Part B — specified post upgrades

Part B is a separate schedule of upgraded Levels for specified posts. Initial Excise (Abkari) rows have been transcribed in [PAY_MATRIX_SOURCE_AUDIT.md](PAY_MATRIX_SOURCE_AUDIT.md). These are not universal changes to every post with the same old Grade Pay. Before applying a mapping, verify the employee's cadre/post, appointment or promotion history, and any later order.

### Other located DOP material

- Notification No. 109/GEN/DOP and OM No. 6412/GEN/DOP, dated 25 September 2025, concern a one-time induction measure for specified regular-establishment employees in Levels 1–3 who completed six years of regular service as on 31 December 2025. This does not amend matrix cell values.
- DOP clarification No. 6780/GEN/DOP concerns the effect of Extra Ordinary Leave on annual increment. The issue date and complete applicability details still need to be captured from the original circular before increment logic is implemented.

## 3. What must not be assumed or implemented yet

The reviewed matrix sources do not establish current allowance or deduction rates. Do not automatically apply DA, HRA, GIS, NPS, professional tax, or other deductions/allowances from the pay matrix. Each requires its own applicable primary source, effective date, calculation basis, eligibility and exceptions.

Do not infer:
- a post's Level from designation alone;
- that all employee categories are covered by the same rules;
- that every Level has the same number of cells;
- that a State Bank selected-Level table is the exhaustive Government matrix;
- rounding, ceilings, exemptions, arrears treatment or retrospective effect without a source;
- a rule's current validity merely because an older order was located.

Manual basic-pay entry may be supported as a clearly labelled user-provided input, but it must not be presented as verified matrix selection.

## 4. Required work, in dependency order

1. **Complete and independently verify the matrix.** Transcribe every Gazette Part A cell for Levels 1–23 from the source pages; preserve column lengths; have a second check against page images. Compare every corresponding State Bank Annexure-I cell and record any differences.
2. **Resolve scope and post mappings.** Define the MVP employee categories. Review Part B for all relevant departments and locate later orders affecting post-specific Level assignments. Record exceptions and required evidence.
3. **Verify rule families separately.** Locate primary orders for allowances, deductions, increments and other planned features. Capture issue/effective dates, eligibility, formula/base, caps, exemptions, rounding and retrospective instructions.
4. **Create checked scenarios.** Calculate representative and boundary cases independently, record the source-backed inputs and expected results, and have them reviewed.
5. **Only then implement.** Store verified matrix/rules as typed, versioned data with source metadata. Add data-integrity tests for every cell, applicability tests, calculation tests and regression fixtures. Keep Part B mappings separate from Part A data.
6. **Maintain the evidence trail.** Update the source audit, rule register and roadmap together whenever research changes status. Preserve superseded rules and their effective periods; do not silently overwrite history.

## 5. Implementation and release gates

- **Research complete:** matrix transcription and comparison independently checked; MVP categories and post mappings supported; planned rule families sourced.
- **Rule verified:** official source details and applicability recorded; transcription independently checked; test case completed.
- **Internal alpha:** only the explicitly scoped employee group and verified rules are enabled; unresolved items are shown as warnings or manual inputs.
- **Public beta:** source-backed calculations, checked scenarios, visible limitations and estimate disclaimer are in place.
- **Stable release:** rule-update process and regression tests are maintained.

## 6. Current tracker

| Work item | Status | Next action |
|---|---|---|
| 2018 Rules, Rules 1–6 and schedule locations | Reviewed | Preserve as baseline; check later applicable orders |
| Gazette Part A headings and entry pay | Initial transcription | Independent check against page images |
| Gazette Part A full cell data | Pending | Transcribe and verify all Levels/cells |
| State Bank Annexure-I | Initial headings/entry pay | Compare every cell with Gazette Part A |
| Part B post mappings | Initial Excise rows | Review relevant departments and later orders |
| Employee applicability | Base Rule 2 reviewed | Define MVP groups and map cadre/post evidence |
| Allowances and deductions | Pending | Locate primary orders and capture applicability/effective dates |
| Increment/EOL treatment | Clarification located | Capture full details and applicability from original circular |
| Rounding, exceptions and sample cases | Pending | Verify from sources and independently check scenarios |

See [PAY_MATRIX_SOURCE_AUDIT.md](PAY_MATRIX_SOURCE_AUDIT.md), [PAY_RULES_REGISTER.md](PAY_RULES_REGISTER.md), and [ROADMAP.md](ROADMAP.md) for the detailed audit, evidence register and phase checklist.

## 7. Official source links currently recorded

- [Sikkim Government Services (Revised Pay) Rules, 2018 — Gazette No. 333](https://www.sikkim.gov.in/uploads/Gazette/333_20240813.pdf)
- [State Bank of Sikkim Pay Matrix — Annexure-I](https://www.statebankofsikkim.com/SBSPAYMATRIX.pdf)
- [DOP Notification No. 109/GEN/DOP](https://dop.sikkim.gov.in/notificationdoc/109.pdf)
- [DOP clarification No. 6780/GEN/DOP](https://dop.sikkim.gov.in/circular/6780.pdf)

The source audit records the current transcription status and additional official source locations. Re-open the original documents before making a new factual claim or changing a verification status.
