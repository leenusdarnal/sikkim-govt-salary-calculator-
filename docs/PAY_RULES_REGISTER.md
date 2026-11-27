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

## Initial official source locations

| Source | Purpose | Status |
|---|---|---|
| [Department of Personnel — Revision of Pay](https://www.sikkim.gov.in/departments/department-of-personnel-public-grievances/revision-of-pay) | Locate pay-revision orders and related documents | Source location identified; individual orders still need review |
| [Finance Department — Notifications](http://www.sikkimfred.gov.in/Notification/Notification_Main_Page.aspx) | Locate Finance Department notifications and circulars | Source archive identified; relevant notifications still need review |

The links above are starting points, not confirmation of any particular rate.

## Rule inventory

| Rule area | Information to verify | Status |
|---|---|---|
| Pay structure | Applicable pay rules, pay levels, cells, minimum/maximum and conversion/fixation rules | Pending |
| Annual increment | Rate, date, eligibility, withholding and special cases | Pending |
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

**Important:** Every row is pending until supported by the actual order and applicability is established. The repository does not currently publish any salary rates.

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

- Which pay-revision order and matrix are applicable to the employee categories in MVP?
- Are any categories governed by separate pay structures or allowances?
- Which allowances are universal and which depend on posting, location, designation or other conditions?
- Which deductions are mandatory, conditional or voluntary?
- What rounding method is used in official payroll calculations?
- Are there retrospective changes or specific arrears instructions?
