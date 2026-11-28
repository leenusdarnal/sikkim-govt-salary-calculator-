# Pay Matrix Source Audit

**Status:** source-based test fixtures now cover all 794 cells across the 23 Gazette Part A Levels. The 549 cells published in the State Bank Annexure-I for 16 shared Levels match the generated lookup with no discrepancy. The remaining 245 cells in Levels 1, 2, 3, 8, 13, 18 and 23 have been manually transcribed from Gazette page images and also match the lookup. A second independent reviewer sign-off for the complete Gazette matrix and employee-applicability review remain pending. See [SALARY_RULES_GUIDE.md](SALARY_RULES_GUIDE.md) for implementation guardrails.

## 1. Governing Government of Sikkim rules

**Primary legal source**

- Document: *Sikkim Government Services (Revised Pay) Rules, 2018*
- Gazette: Sikkim Government Gazette Extraordinary, No. 333, published 25 June 2018
- Notification: No. 56/GEN/DOP
- Notification date: 23 June 2018
- Issuing authority: Department of Personnel, Administrative Reforms, Training and Public Grievances, Government of Sikkim
- Official PDF: https://www.sikkim.gov.in/uploads/Gazette/333_20240813.pdf

Relevant provisions reviewed:

| Location in PDF | Provision | What the source establishes |
|---|---|---|
| Printed page 1 | Rule 1 | The rules are called the Sikkim Government Services (Revised Pay) Rules, 2018 and are deemed to have come into force on 1 January 2016. |
| Printed pages 1–2 | Rule 2 and Notes | The rules specify which Government servants are covered and identify exclusions, together with notes for work-charged establishment and persons who ceased service on or after 1 January 2016. |
| Printed page 2 | Rule 3 | Defines basic pay, existing Pay Band and Grade Pay, Level, Pay Matrix, pay in the Level and revised pay structure. |
| Printed pages 2–3 | Rules 4–6 | Link the Level of a post to the corresponding existing Pay Band and Grade Pay, prescribe drawing pay in the applicable Level, and provide for exercise of the option under the rules. |
| Printed pages 12–14 | Schedule, Part A | Contains the Government of Sikkim Pay Matrix, with Levels 1 through 23 and vertical cells. |
| Printed page 15 | Schedule, Part B | Lists upgraded Levels for specified posts. Post-to-Level mapping therefore needs to be checked against the relevant cadre/post entry, not guessed from a designation. |
| Printed page 18 | Appendix C | Provides the statement of fixation of pay, including the applicable Level, cell, revised basic pay and next increment details. |

### Applicability recorded from Rule 2

The rules state that, save as otherwise provided, they apply to persons other than members of the All India Services who are appointed to State services and posts in connection with the affairs of the State of Sikkim.

The rule also lists exclusions, including persons not in whole-time employment, persons paid out of contingencies, persons paid otherwise than on a monthly basis (including piece-rate basis), persons employed on contract except where the contract provides otherwise, persons re-employed in Government service after retirement, teachers of State Government Colleges drawing UGC pay, and any other class or category specifically excluded by order of the Governor.

The notes to Rule 2 separately address work-charged establishment drawing pay in the existing Pay Band and Grade Pay, and persons who ceased to be in service on account of death, retirement or otherwise on or after 1 January 2016. These notes must be preserved when defining employee eligibility.

## 2. Gazette Part A: complete Level / Grade Pay / entry-pay headings

The Schedule, Part A in the Gazette displays all 23 Government Pay Levels. The Level headings, Grade Pay and entry-pay columns are transcribed from printed pages 12–14. The lookup generates remaining cells from the published entry pay using a 3% increment rounded to the nearest ₹100, then added to the current cell. For an external cross-check, all 549 values published for the 16 Levels shared with State Bank Annexure-I match the corresponding lookup cells. The other seven Levels have now been manually transcribed directly from the Gazette page images into a separate test fixture; the 245 transcribed values also match the lookup. Both source fixtures are regression-tested. A second independent reviewer must still check the complete Gazette table before the matrix is approved for salary-engine use.

| Pay Level | Grade Pay (₹) | Cell 1 / entry pay (₹) |
|---:|---:|---:|
| 1 | 1,400 | 15,200 |
| 2 | 1,800 | 16,200 |
| 3 | 2,300 | 19,300 |
| 4 | 2,200 | 18,000 |
| 5 | 2,300 | 19,400 |
| 6 | 2,400 | 20,300 |
| 7 | 2,600 | 21,700 |
| 8 | 2,700 | 22,800 |
| 9 | 3,000 | 25,400 |
| 10 | 3,400 | 30,200 |
| 11 | 3,800 | 33,700 |
| 12 | 4,200 | 37,100 |
| 13 | 4,400 | 37,600 |
| 14 | 4,600 | 39,100 |
| 15 | 5,000 | 46,300 |
| 16 | 5,400 | 49,700 |
| 17 | 6,200 | 56,000 |
| 18 | 6,700 | 65,000 |
| 19 | 7,200 | 71,100 |
| 20 | 8,700 | 83,700 |
| 21 | 9,000 | 105,400 |
| 22 | 9,500 | 120,500 |
| 23 | 10,000 | 124,700 |

The implemented column lengths are: Levels 1–14 = 40 cells each; Level 15 = 36; Level 16 = 35; Level 17 = 32; Level 18 = 28; Level 19 = 26; Level 20 = 23; Level 21 = 19; Level 22 = 18; Level 23 = 17. These lengths are kept as source metadata; blank cells are not valid pay values.

### Gazette-only columns manually transcribed from page images

The following seven columns do not appear in State Bank Annexure-I. Their values have been read directly from Gazette Schedule Part A and recorded as literal test data rather than relying solely on the progression function.

| Pay Level | Printed Gazette page | Transcribed cells | Automated comparison |
|---:|---:|---:|---|
| 1 | 12 | 40 | All cells match the lookup |
| 2 | 12 | 40 | All cells match the lookup |
| 3 | 12 | 40 | All cells match the lookup |
| 8 | 12 | 40 | All cells match the lookup |
| 13 | 13 | 40 | All cells match the lookup |
| 18 | 14 | 28 | All cells match the lookup |
| 23 | 14 | 17 | All cells match the lookup |

The 245 source values are stored in tests/fixtures/gazette-part-a-only-levels.js and verified by tests/pay-matrix-gazette-transcription.test.mjs. Together with the 549 State Bank cross-reference values, the test fixtures cover 794 matrix cells, the total number of populated cells across all 23 Level columns. The transcription is complete as a first pass; a second independent reviewer must still compare the full Gazette table and record sign-off.

## 2. State Bank of Sikkim Pay Matrix reference

- Document title: *State Bank of Sikkim — Pay Matrix, Annexure-I*
- Source status: an officially published State Bank of Sikkim pay-matrix document.
- Official source: https://www.statebankofsikkim.com/SBSPAYMATRIX.pdf
- Format: two-page matrix showing Pay Band, Grade Pay, Pay Level, entry pay and cell values.

The State Bank PDF presents these 16 Levels:

| Pay Level | Grade Pay | Cell 1 / entry pay (₹) |
|---:|---:|---:|
| 4 | 2,200 | 18,000 |
| 5 | 2,300 | 19,400 |
| 6 | 2,400 | 20,300 |
| 7 | 2,600 | 21,700 |
| 9 | 3,000 | 25,400 |
| 10 | 3,400 | 30,200 |
| 11 | 3,800 | 33,700 |
| 12 | 4,200 | 37,100 |
| 14 | 4,600 | 39,100 |
| 15 | 5,000 | 46,300 |
| 16 | 5,400 | 49,700 |
| 17 | 6,200 | 56,000 |
| 19 | 7,200 | 71,100 |
| 20 | 8,700 | 83,700 |
| 21 | 9,000 | 105,400 |
| 22 | 9,500 | 120,500 |

These headings and entry-pay figures are transcribed from the State Bank PDF. The displayed levels form a selected subset; the PDF does not display every Level in Gazette Part A. In particular, Gazette Part A also includes Levels 1, 2, 3, 8, 13, 18 and 23. A calculator intended for the full Government of Sikkim employee population must not silently treat the State Bank PDF's 16-level presentation as an exhaustive replacement for the Gazette schedule.

The State Bank PDF is an official State Bank of Sikkim matrix publication, and its displayed Level/Grade Pay/entry-pay combinations correspond to the matching columns in Gazette Part A. The Bank PDF shows 16 selected Levels, not the full Government schedule. A test-only fixture records every cell visible in the two-page Bank PDF; the automated comparison checks all 549 published values (320 on page 1 and 229 on page 2) and finds no mismatch against the matching lookup cells. The fixture is in tests/fixtures/state-bank-annexure-i.js, with the comparison enforced by tests/pay-matrix-source-audit.test.mjs. The seven Levels omitted from the Bank PDF are now separately transcribed from Gazette page images, as described below. The Bank PDF remains a distinct cross-reference and is not treated as an exhaustive replacement for the Gazette or as evidence of employee applicability.

## 3. Part B: specified upgraded posts

The Gazette's Schedule, Part B (printed page 15) is a separate table of upgraded Levels for specified posts. It records the existing Grade Pay, the Grade Pay corresponding to the upgradation recommended in the report, and the revised Pay Matrix Level. The table below transcribes all 24 entries shown on that page, grouped by the service/department headings printed in the Gazette.

| Service / department as grouped in Part B | Specified post | Existing Grade Pay (₹) | Upgraded Grade Pay shown (₹) | Revised Level | Report paragraph |
|---|---|---:|---:|---:|---:|
| Sub-ordinate Accounts Service | Accountant | 3,400 | 3,800 | 11 | 5.11 |
| Sub-ordinate Accounts Service | Sr. Accountant | 4,200 | 4,600 | 14 | 5.11 |
| Ministerial and Executive Service | Head Assistant | 3,400 | 3,800 | 11 | 5.11 |
| Ministerial and Executive Service | Inspector | 3,800 | 4,200 | 12 | 5.11 |
| Ministerial and Executive Service | Office Superintendent | 4,200 | 4,600 | 14 | 5.11 |
| HRDD, Food Security & Agriculture Development Department, Horticulture & Cash Crops Development Department and Animal Husbandry, Livestock, Fisheries & Veterinary Services Department | Laboratory Attendant | 2,200 | 2,400 | 6 | 5.14 |
| Food Security and Agriculture Development and Horticulture & Cash Crops Development Departments | Field Assistant | 2,300 | 2,400 | 6 | 5.15 |
| Excise (Abkari) Department | Head Constable | 3,000 | 3,400 | 10 | 5.33 |
| Excise (Abkari) Department | Assistant Sub-Inspector | 3,000 | 3,800 | 11 | 5.33 |
| Excise (Abkari) Department | Sub-Inspector | 3,400 | 4,200 | 12 | 5.33 |
| Excise (Abkari) Department | Inspector | 3,800 | 4,600 | 14 | 5.33 |
| Forest, Environment and Wildlife Management Department | Head Forest Guard | 3,000 | 3,400 | 10 | 5.70 |
| Forest, Environment and Wildlife Management Department | Block Officer | 3,400 | 3,800 | 11 | 5.70 |
| Forest, Environment and Wildlife Management Department | Range Officer | 4,200 | 4,600 | 14 | 5.70 |
| Sub-ordinate Engineering Service | Junior Engineer | 3,800 | 4,200 | 12 | 5.72 |
| Sub-ordinate Police Service | Head Constable | 3,000 | 3,400 | 10 | 5.78 |
| Sub-ordinate Police Service | Asstt. Sub-Inspector | 3,400 | 3,800 | 11 | 5.78 |
| Sub-ordinate Police Service | Sub-Inspector | 3,800 | 4,200 | 12 | 5.79 |
| Sub-ordinate Revenue Service, Commercial Tax Division, FRED | Assistant Sub Inspector | 2,700 | 3,000 | 9 | 5.85 |
| Sub-ordinate Revenue Service, Commercial Tax Division, FRED | Sub Inspector | 3,000 | 3,400 | 10 | 5.85 |
| Sub-ordinate Revenue Service, Commercial Tax Division, FRED | Inspector | 3,800 | 4,200 | 12 | 5.85 |
| Transport Department (SNT) | Constable, Transport Department | 2,300 | 2,400 | 6 | 5.86 |
| Transport Department (SNT) | Mechanics (Non ITI) | 2,200 | 2,300 | 5 | 5.16 |
| Health Care, Human Services & Family Welfare Department | Counsellor/Pharmacist with degree | 3,800 | 4,200 | 12 | 5.43 |

The application exposes these rows as a reference-only lookup. It can set the Part A Level selector to the listed Level as a starting point, but it does not infer that a user's appointment, cadre, service history or current entitlement matches the row. Similar titles in different services (for example, Assistant Sub-Inspector) remain separate records. No general grade-pay-to-Level conversion is implied.

The table is transcribed from the Gazette page image. A second independent transcription check and review of subsequent orders affecting these posts remain outstanding. Users must confirm the exact post/service and current applicable orders before relying on an entry.

## 4. Related Department of Personnel material found

**Notification No. 99/GEN/DOP dated 6 February 2020:** the official DOP archive lists this notification. A readable non-government copy says specified regularised employees restore their original designation and become eligible for the original post Pay Level after five years, in accordance with OM No. 5339/GEN/DOP dated 11/02/2019. The original signed notification and 2019 OM are still unverified, so the transcription remains provisional.

**Office Memorandum No. 2026/GEN/DOP dated 20 March 2026** addresses pay progression after regularisation for the four-year Group C/D regularisation category, eligible land-donor appointees and eligible temporary employees with benchmark disabilities. It prescribes temporary-capacity pay during the first year after regularisation, placement in the applicable Level 1/2/3 for the next four years after successful completion of one year of regular service, and regulation under Notification No. 99/GEN/DOP dated 06/02/2020 after five years of regular service. The original Notification No. 99/GEN/DOP and the referenced scheme/regularisation notifications still need to be obtained and reviewed; this pathway is not enabled in the calculator.



**Notification No. 109/GEN/DOP dated 25 September 2025** is published at https://dop.sikkim.gov.in/notificationdoc/109.pdf. It records a one-time decision concerning employees whose services had been brought into the regular establishment in Pay Levels 1, 2 or 3 and who completed six years of regular service as on 31 December 2025, for induction into their respective cadres/services. The accompanying Office Memorandum No. 6412/GEN/DOP dated 25 September 2025 gives process instructions. This is an employee-induction measure; it does not amend the Part A cell values.

A Department of Personnel clarification titled **Effect of EOL on the date of annual increment under the Sikkim Government Service Revised Pay Rules, 2018**, reference No. 6780/GEN/DOP, was also located at https://dop.sikkim.gov.in/circular/6780.pdf. It addresses qualifying service and postponement of an increment where Extra Ordinary Leave is taken. The issue date and complete applicability details must be captured from the original signed circular before this is added to executable increment logic.

## 5. Implementation controls

1. Keep the Gazette Part A and State Bank Annexure-I as separately sourced evidence. The 549 Bank-published cells and 245 manually transcribed Gazette-only cells are held in separate test fixtures. Do not treat the Bank schedule as a replacement for the Gazette or as an employee-applicability decision.
2. Preserve each Level's own available cell count. Do not pad a shorter column with inferred values or assume every Level has the same number of cells.
3. Keep Part B post-specific upgraded Levels separate from the Part A baseline Level/Grade Pay mapping.
4. Do not infer a post's Level from job title alone. Require a verified cadre/post mapping or accept a user-entered basic pay with an explicit manual-entry label.
5. Store source URL, title, notification number, date, printed page, table/part, transcription status and verification notes alongside the data.
6. Do not implement DA, HRA, GIS, NPS, professional tax or other deductions/allowances from these matrix documents. Each requires its own applicable order and effective date.

## 6. Current transcription status

| Dataset | Status | Next verification step |
|---|---|---|
| Gazette Part A level headings, Grade Pay mapping, Cell 1 and column lengths | Transcribed into lookup data for all 23 Levels | Second independent reviewer check against Gazette page images |
| Gazette Part A subsequent cells | 245 Gazette-only cells manually transcribed; all match the generated lookup; shared cells cross-checked against State Bank Annexure-I | Second independent reviewer check of all 794 Gazette cells and sign-off |
| State Bank Annexure-I headings and all published cells | 16 Levels and 549 cells transcribed into a test-only fixture; all 549 values match the corresponding lookup values | Maintain the regression fixture; investigate any future mismatch |
| Gazette-only Part A columns | Levels 1, 2, 3, 8, 13, 18 and 23 transcribed from printed pages 12–14; 245 cells match the lookup | Independent second reviewer sign-off remains pending |
| Gazette Part B specified-post upgrades | All 24 entries on printed page 15 transcribed into a separate reference | Independent second check and review later orders affecting individual posts |
| Employee-category applicability | Base Rule 2 reviewed | Identify exceptions and any later orders for the MVP employee groups |
| Annual increment / EOL treatment | Clarification located | Capture issue date, qualifying-service details and full scope from original circular |

The current lookup is a reference tool and does not infer employee applicability or calculate official salary. Test fixtures now cover all 794 populated cells across the 23 Levels, with 549 Bank cross-reference cells and 245 manually transcribed Gazette-only cells matching the generated lookup. The complete Gazette transcription still requires a second independent reviewer, and employee-category applicability remains open. Do not treat the matrix as a fully approved salary-engine dataset.
