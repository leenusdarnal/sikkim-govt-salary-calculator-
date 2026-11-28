# Pay Rules and Source Register

This file is the control document for salary-rule research. It prevents unverified rates or assumptions from being copied into application code.

## Verification policy

A rule may be marked **Verified** only when:

1. An official Government of Sikkim order, notification, circular, rule or other authoritative source is available.
2. The title, order/notification number, issuing authority and date are recorded.
3. The relevant clause, table or page has been identified.
4. Effective date and retrospective effect, if any, are understood.
5. Applicability to employee categories is clear.
6. A second check of the transcription and a test case have been completed.

News reports, third-party calculators, social posts and informal messages may help locate a document but are not sufficient evidence for implementing a rate.

## Reviewed official sources

| Source | Details established | Status |
|---|---|---|
| [Sikkim Government Services (Revised Pay) Rules, 2018 — Gazette No. 333](https://www.sikkim.gov.in/uploads/Gazette/333_20240813.pdf) | Notification No. 56/GEN/DOP, dated 23/06/2018; deemed effective from 01/01/2016; Rules 1–6, Schedule Part A (Levels 1–23), Part B (specified post upgrades) and Appendix C reviewed | Base rules and schedule located/reviewed; complete cell transcription and employee-category verification pending |
| [State Bank of Sikkim Pay Matrix — Annexure-I](https://www.statebankofsikkim.com/SBSPAYMATRIX.pdf) | Two-page table with Pay Band, Grade Pay, Level, entry pay and selected vertical cell values; displays 16 Levels | Initial headings/entry-pay transcription completed; full cell comparison with Gazette Part A pending |
| [DOP Notification No. 109/GEN/DOP and OM No. 6412/GEN/DOP](https://dop.sikkim.gov.in/notificationdoc/109.pdf) | One-time induction measure for specified regular-establishment employees in Levels 1/2/3 who completed six years of regular service as on 31/12/2025; OM issued 25/09/2025 | Reviewed for employee-applicability context; does not amend matrix values |
| [DOP Office Memorandum No. 2026/GEN/DOP](https://dop.sikkim.gov.in/notificationdoc/2026.pdf) | Dated 20/03/2026; sets a distinct pay progression for the four-year Group C/D category, eligible land-donor appointees and eligible temporary employees with benchmark disabilities: first year at temporary-capacity pay, next four years in applicable Level 1/2/3, and after five years under Notification No. 99/GEN/DOP | Source reviewed; downstream Notification No. 99 and referenced regularisation/scheme notifications still require review; not implemented in calculator |
| [DOP clarification No. 6780/GEN/DOP](https://dop.sikkim.gov.in/circular/6780.pdf) | Dated 27/10/2025; clarifies EOL and annual increment dates (1 January / 1 July) where qualifying-service conditions are met | Source reviewed; individual qualifying-service treatment and edge cases require review; increment logic not implemented |
| [DOP clarification No. 6780/GEN/DOP](https://dop.sikkim.gov.in/circular/6780.pdf) | Clarification on effect of Extra Ordinary Leave on annual increment under the 2018 Revised Pay Rules | Located; date and complete applicability must be recorded before implementing increment logic |

### Important distinction between the two matrix PDFs

The Gazette contains the Government of Sikkim's full Schedule Part A with Levels 1–23 and a separate Part B for upgraded Levels for specified posts. The State Bank of Sikkim Annexure-I displays a selected subset of 16 Levels. The State Bank PDF is preserved as an official cross-reference, but it is not treated as an exhaustive replacement for the Gazette schedule. See [PAY_MATRIX_SOURCE_AUDIT.md](PAY_MATRIX_SOURCE_AUDIT.md) for the transcribed Level/Grade Pay/entry-pay cross-reference and the verification gaps.

## Special employee-applicability pathways identified

The following later Department of Personnel instruments must be considered separately from the general Part A matrix and the specified-post Part B table.

### Office Memorandum No. 2026/GEN/DOP dated 20 March 2026

The OM addresses regularised employees within three policy groups:

1. Group C and D temporary employees covered by the four-year continuous-service regularisation policy under Notification No. 100/GEN/DOP read with No. 24/GEN/DOP.
2. Persons appointed in lieu of land donated to the Government, after the prescribed three years of continuous temporary service and subject to the scheme under Notification No. 13/GEN/DOP.
3. Temporary employees with benchmark disabilities covered by the two-year service policy in the particular post under Notification No. 68/GEN/DOP read with No. 25/GEN/DOP.

The OM prescribes: (a) for the first year after regularisation, pay equivalent to the amount drawn in temporary capacity; (b) after successful completion of one year of regular service, placement in Level 1, 2 or 3 as applicable to the post for the next four years; and (c) on completion of five years of regular service, regulation under Notification No. 99/GEN/DOP dated 06/02/2020.

**Implementation hold:** the original Notification No. 99/GEN/DOP and the referenced regularisation/scheme notifications must be obtained and reviewed. The OM does not provide the post-to-Level assignment or decide that an individual meets the regularisation criteria. This pathway is therefore displayed as a source note only and must not be used for automatic pay calculation.

### Notification No. 109/GEN/DOP and OM No. 6412/GEN/DOP dated 25 September 2025

The notification provides for one-time induction into the respective cadres/services for employees whose services had been brought into the regular establishment in Pay Levels 1, 2 or 3 and who completed six years of regular service as on 31/12/2025. The accompanying OM describes the seniority-list process, the claims/objections period, induction under the relevant cadre recruitment rules, and the requirement not to relax prescribed educational, technical or other qualifications.

This is a cadre-induction measure, not a general revision of Part A cell values or an automatic promotion. Individual eligibility and cadre recruitment rules must be checked.

### Clarification No. 6780/GEN/DOP dated 27 October 2025

The clarification addresses the effect of EOL on annual increment under the 2018 Revised Pay Rules. It refers to the common increment dates of 1 January and 1 July, minimum qualifying service in the relevant Level during the increment cycle, and postponement where EOL is continuously availed for six months.

The clarification is recorded as a source note only. Qualifying-service calculation and the employee's leave/service record must be checked before determining an individual increment date.

## Initial official source locations

| Source | Purpose | Status |
|---|---|---|
| [Department of Personnel — Revision of Pay](https://www.sikkim.gov.in/departments/department-of-personnel-public-grievances/revision-of-pay) | Locate pay-revision orders and related documents | Source location identified; individual orders still need review |
| [Department of Personnel — official site](https://dop.sikkim.gov.in/) | Locate current notifications, circulars and Office Memoranda | Additional primary-source location reviewed |
| [Finance Department — Notifications](http://www.sikkimfred.gov.in/Notification/Notification_Main_Page.aspx) | Locate Finance Department notifications and circulars | Source archive identified; relevant notifications still need review |
| [Government of Sikkim — Official Portal](https://www.sikkim.gov.in/) | Discover official department pages, government notices and additional primary-source locations | Official portal identified; relevant salary/pay orders still need to be located and reviewed |

The links above are starting points, not confirmation of any particular allowance or deduction rate.

## Rule inventory

| Rule area | Information to verify | Status |
|---|---|---|
| Pay structure | Applicable pay rules, pay levels, cells, minimum/maximum and conversion/fixation rules | Base 2018 rules and Gazette matrix reviewed; full cell transcription and post applicability pending |
| Employee applicability | Covered services/posts, exclusions, work-charged employees, post-specific upgrades and later induction/regularisation measures | Base Rule 2, Part B, 2025 one-time induction notification and 2026 regularisation OM reviewed; individual category/cadre mapping and underlying referenced notifications pending |
| Annual increment | Rate, date, eligibility, withholding and special cases | DOP clarification No. 6780/GEN/DOP dated 27/10/2025 reviewed; qualifying-service and EOL edge-case treatment remains to be independently checked before implementation |
| Dearness allowance | Rate by effective date, calculation base, rounding and arrears treatment | Pending |
| House rent allowance | Rate, eligibility, location/category rules, exclusions and calculation base | Pending |
| Other allowances | Names, amount/rate, eligibility, caps and effective dates | Pending |
| NPS | Employee contribution basis/rate, applicability and treatment | Pending |
| GPF/CPF or other retirement deductions | Applicability, contribution basis and exceptions | Pending |
| GIS | Subscription slabs/rates and employee-category applicability | Pending |
| Professional tax | Current state provisions, slabs, exemptions and effective date | Pending |
| Income tax | Whether to include in MVP; applicable tax regime and user-provided declarations | Out of initial scope; review later |
| Other recoveries | Loans, advances, insurance or departmental recoveries | User-entered/optional pending policy review |
| Rounding | Component-wise and final rounding conventions | Pending |
| Arrears | Retrospective orders, month-by-month calculation and adjustment handling | Later phase |

**Important:** No allowance or deduction rate is ready for use in the salary engine. Matrix values must not be consumed by the application until the complete cell transcription has been independently checked.

## Evidence record template

| Field | Required value |
|---|---|
| Rule ID | Stable machine-readable identifier |
| Rule name | Human-readable name |
| Issuing authority | Department/authority |
| Order number | Exact number as printed |
| Order date | Date of issue |
| Effective from | Start date for application |
| Effective to | End date, if applicable |
| Applicability | Employee category and conditions |
| Calculation method | Formula, fixed value, table or manual input |
| Source URL | Official document/page |
| Page/clause/table | Exact location in the source |
| Verification | Reviewer and date |
| Tests | Scenario/test case identifiers |
| Notes | Ambiguities, supersession or exceptions |

## Rule lifecycle

Discovered → Source obtained → Transcribed → Independently checked → Tested → Verified → Implemented

A new order should not silently replace an older rule. Preserve the old version and its effective period so historical calculations remain reproducible.

## Questions to resolve before coding rates

- Which employee categories and cadres are included in the first release?
- Do later post-specific orders supersede any particular Part B mapping?
- Which allowances are universal and which depend on posting, location, designation or other conditions?
- Which deductions are mandatory, conditional or voluntary?
- What rounding method is used in official payroll calculations?
- Are there retrospective changes or specific arrears instructions?
