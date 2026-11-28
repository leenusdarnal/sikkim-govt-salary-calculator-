# Sikkim Salary Calculator — Rules Research Guide

**Purpose:** This is the working guide for research and implementation of salary rules. It records what the current source review supports, what remains unverified, and the gates that must be met before figures are used by the calculator.

**Current status:** Test fixtures cover all 794 populated Part A cells across 23 Gazette Levels. The 549 cells published in State Bank Annexure-I match the generated lookup; the remaining 245 cells in seven Gazette-only Levels have been manually transcribed from Gazette page images and also match. A second independent reviewer sign-off, employee-category mapping and salary-rule verification remain incomplete. This document is a guide, not an official pay determination.

## 1. Source hierarchy and evidence standard

Use primary Government of Sikkim rules, Gazette notifications, orders, circulars and official departmental publications as the controlling evidence. Record the exact source title, issuing authority, number, issue date, effective date, applicable employee group, and page/clause/table.

The 2018 Revised Pay Rules and Gazette Schedule are the baseline sources for the Government pay matrix. The State Bank of Sikkim Pay Matrix (Annexure-I) is a separate official publication and a cross-reference; it is not a substitute for the full Government schedule. Part B post upgrades are separate from the general Part A matrix. All 24 entries on printed page 15 have been transcribed into a reference-only lookup; a second independent check and review of later post-specific orders remain pending.

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

The Gazette has Levels 1–23; the State Bank PDF displays a selected subset of 16 Levels. A test-only fixture records all 549 values published in that annexure (320 on page 1 and 229 on page 2), and every value matches the corresponding lookup cell. The seven omitted Gazette Levels (1, 2, 3, 8, 13, 18 and 23) have now been manually transcribed from Gazette pages 12–14 into a second test fixture. Its 245 values also match the generated cells. These fixtures cover all 794 populated cells across the full 23-Level data structure. A second independent reviewer still needs to check the complete Gazette matrix; neither fixture changes employee applicability.

Preserve each Level's actual cell count. Blank cells are not values, and a shorter column must not be padded with inferred amounts. Do not load any partial matrix into the calculation engine.

### Gazette Part B — specified post upgrades

Part B is a separate schedule of upgraded Levels for specified posts. All 24 entries on printed page 15, covering 11 service/department groupings, have been transcribed in [PAY_MATRIX_SOURCE_AUDIT.md](PAY_MATRIX_SOURCE_AUDIT.md) and exposed as a reference lookup. These are not universal changes to every post with the same old Grade Pay. Similar titles in different services are separate entries. Before applying a mapping, verify the employee's exact cadre/post, appointment or promotion history, and any later order. The lookup must not be treated as an individual eligibility decision.

### Other located DOP material

- **Notification No. 99/GEN/DOP dated 6 February 2020:** the official DOP notification archive lists this order. A readable non-government copy states that certain regularised employees regain their original designation and become eligible for the original Pay Level prescribed for the post after five years following regularisation, in accordance with OM No. 5339/GEN/DOP dated 11/02/2019. The original signed notification and the 2019 OM have not yet been verified; this is not an executable rule.
- **Office Memorandum No. 2026/GEN/DOP dated 20 March 2026:** covers three regularisation pathways: the four-year Group C/D category, eligible land-donor appointees with three years of continuous temporary service, and eligible temporary employees with benchmark disabilities with two or more years in the particular post. It states that the first year after regularisation is paid at the temporary-capacity amount; after one successful year of regular service the employee is placed in the applicable Level 1/2/3 for the next four years; and after five years of regular service pay is regulated under Notification No. 99/GEN/DOP dated 06/02/2020. The original Notification No. 99/GEN/DOP and the underlying eligibility notifications still need to be obtained and reviewed. Do not implement this progression as an automatic rule yet.
- **Notification No. 109/GEN/DOP and OM No. 6412/GEN/DOP, both dated 25 September 2025:** provide a one-time cadre-induction process for employees already brought into the regular establishment in Levels 1–3 who completed six years of regular service as on 31 December 2025. The OM describes preparation/finalisation of seniority lists and induction in accordance with cadre recruitment rules without relaxing prescribed qualifications. This is a cadre process, not a general Part A matrix amendment.
- **Clarification No. 6780/GEN/DOP dated 27 October 2025:** addresses the impact of EOL on annual increment dates (1 January / 1 July) and qualifying service in the relevant Level. Record it as a source note only until the qualifying-service calculation and individual leave/service-record treatment are independently checked.
 
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

1. **Complete and independently verify the matrix.** The 549 shared cells have passed the State Bank Annexure-I cross-check, and 245 Gazette-only cells have been transcribed from the Gazette page images and compared with the lookup. Have a second reviewer independently check all 794 published Gazette cells, preserve each column length and record the reviewer and source page.
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
| Gazette Part A headings and entry pay | All 23 Levels transcribed | Independent second check against page images |
| Gazette Part A full cell data | Test fixtures cover all 794 populated cells: 549 State Bank cross-reference cells and 245 Gazette-only cells; all match the lookup | Obtain second independent reviewer sign-off for all 23 Gazette columns |
| Gazette-only Gazette Part A cells | Levels 1, 2, 3, 8, 13, 18 and 23 transcribed from page images; 245 cells match | Second reviewer check against the original Gazette |
| State Bank Annexure-I | All 549 published cells in 16 Levels recorded in a test fixture and matched against corresponding lookup values | Keep the automated comparison in CI; investigate any future mismatch |
| Part B post mappings | 24 printed-page entries transcribed; second check pending | Independently verify each entry and review later orders |
| Employee applicability | Rule 2, Part B and later regularisation/induction measures reviewed as references | Obtain Notification No. 99/GEN/DOP and underlying scheme/regularisation orders; map individual cadre/post evidence |
| Allowances and deductions | Pending | Locate primary orders and capture applicability/effective dates |
| Increment/EOL treatment | Clarification No. 6780/GEN/DOP dated 27/10/2025 reviewed | Independently verify qualifying service and edge cases before implementing increment logic |
| Rounding, exceptions and sample cases | Pending | Verify from sources and independently check scenarios |

See [PAY_MATRIX_SOURCE_AUDIT.md](PAY_MATRIX_SOURCE_AUDIT.md), [PAY_RULES_REGISTER.md](PAY_RULES_REGISTER.md), and [ROADMAP.md](ROADMAP.md) for the detailed audit, evidence register and phase checklist.

## 7. Official source links currently recorded

- [Sikkim Government Services (Revised Pay) Rules, 2018 — Gazette No. 333](https://www.sikkim.gov.in/uploads/Gazette/333_20240813.pdf)
- [State Bank of Sikkim Pay Matrix — Annexure-I](https://www.statebankofsikkim.com/SBSPAYMATRIX.pdf)
- [DOP Notification No. 109/GEN/DOP](https://dop.sikkim.gov.in/notificationdoc/109.pdf)
- [DOP Office Memorandum No. 2026/GEN/DOP](https://dop.sikkim.gov.in/notificationdoc/2026.pdf)
- [DOP clarification No. 6780/GEN/DOP dated 27 October 2025](https://dop.sikkim.gov.in/circular/6780.pdf)

The source audit records the current transcription status and additional official source locations. Re-open the original documents before making a new factual claim or changing a verification status.
