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
| [DOP clarification No. 6780/GEN/DOP](https://dop.sikkim.gov.in/circular/6780.pdf) | Clarification on effect of Extra Ordinary Leave on annual increment under the 2018 Revised Pay Rules | Located; date and complete applicability must be recorded before implementing increment logic |

### Important distinction between the two matrix PDFs

The Gazette contains the Government of Sikkim's full Schedule Part A with Levels 1–23 and a separate Part B for upgraded Levels for specified posts. The State Bank of Sikkim Annexure-I displays a selected subset of 16 Levels. The State Bank PDF is preserved as an official cross-reference, but it is not treated as an exhaustive replacement for the Gazette schedule. See [PAY_MATRIX_SOURCE_AUDIT.md](PAY_MATRIX_SOURCE_AUDIT.md) for the transcribed Level/Grade Pay/entry-pay cross-reference and the verification gaps.

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
| Employee applicability | Covered services/posts, exclusions, work-charged employees, post-specific upgrades and later induction measures | Base Rule 2 and Part B reviewed; individual category/cadre mapping pending |
| Annual increment | Rate, date, eligibility, withholding and special cases | 2018 rules located; DOP EOL clarification located; full increment implementation research pending |
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
