# Sikkim Government Employee Salary Calculator

A transparent, source-backed salary calculator designed for employees of the Government of Sikkim.

The application includes an early manual-arithmetic estimate and a source-linked lookup for the 23 Levels in Gazette Schedule Part A. The matrix lookup can populate basic pay from a selected Level and cell, but it does not determine which Level applies to an employee or calculate an official salary. Independent full cell-by-cell verification and employee-applicability review remain in progress.

> **Project status:** early implementation. The current preview is not an official salary calculation. No allowance or deduction rate should be treated as confirmed until supported by the applicable order. The interim print view is limited to amounts entered by the user and is not an official salary statement.

## Project goals

- Calculate estimated monthly gross salary, deductions and net salary.
- Support the applicable Sikkim Government pay structure and pay matrix.
- Explain each calculation so users can see how a figure was derived.
- Keep salary rules versioned by effective date and linked to source orders.
- Work well on mobile and desktop, with an offline-friendly, privacy-first design.
- Make it easy to correct and update rules when new official orders are issued.

## Planned modules

1. **Pay matrix lookup (preview implemented)** — select a Gazette Part A Level and cell to copy its basic pay into the manual calculator; independent full cell-by-cell verification remains pending.
2. **Salary calculator** — basic pay, applicable allowances, gross pay, deductions and estimated net salary.
3. **Employee scenario** — only the minimum inputs needed for a calculation; no employee ID or bank details.
4. **Increment and promotion** — estimate pay movement under verified rules.
5. **Arrears and revisions** — compare two rule/pay periods using verified effective dates.
6. **Salary statement** — printable/downloadable breakdown with calculation notes.
7. **Rules library** — source orders, effective dates, applicability and verification status.

## Design and user experience

The UI uses *Refactoring UI* as its design foundation: feature-first layouts, strong visual hierarchy, consistent spacing and typography, restrained colours, readable forms, accessible states and clear feedback. The design should make the next useful action obvious without decorating or overcomplicating the calculator.

## Technology

- SvelteKit
- TypeScript
- Tailwind CSS
- Node's built-in test runner for calculation tests
- GitHub Actions for pull-request validation and GitHub Pages deployment
- System-aware light/dark mode with inline SVG icons and no added runtime dependency

The first release is client-side and should not require an account or send personal salary inputs to a server. Hosting and deployment configuration can evolve as project requirements are confirmed.

## Accuracy and official sources

The calculator is an informational tool, not a government payroll system. Official orders and notifications take precedence over the calculator.

The baseline legal source located is the [Sikkim Government Services (Revised Pay) Rules, 2018, Gazette No. 333](https://www.sikkim.gov.in/uploads/Gazette/333_20240813.pdf), Notification No. 56/GEN/DOP dated 23 June 2018. The rules are deemed effective from 1 January 2016 and contain the Government Pay Matrix in Schedule Part A and specified-post upgraded Levels in Part B.

A separate reference lookup also lists all 24 specified-post entries from Gazette Schedule Part B (printed page 15), across 11 service/department groupings. This is not a general grade-pay conversion or an individual eligibility decision; confirm the exact post/cadre and later applicable orders. The source transcription still needs an independent second check.

The current lookup's Level metadata and entry-pay values are transcribed from Gazette Schedule Part A. Subsequent cells are generated from the published entry values using the 3% increment progression rounded to the nearest ₹100, then added to the current cell; representative values and terminal cells are tested against the Gazette pages. A complete independent cell-by-cell comparison is still pending.

The [State Bank of Sikkim Pay Matrix, Annexure-I](https://www.statebankofsikkim.com/SBSPAYMATRIX.pdf) is an officially published State Bank pay-matrix document. It displays 16 Levels, while Gazette Schedule Part A displays the wider Government matrix with 23 Levels. The overlapping Level, Grade Pay and entry-pay headings are recorded separately in the source audit; a full cell-by-cell comparison and employee-category applicability check are still pending.

See [the pay matrix source audit](docs/PAY_MATRIX_SOURCE_AUDIT.md) and [the pay rules register](docs/PAY_RULES_REGISTER.md) for the source transcription, applicability findings and outstanding verification work. No DA, HRA, GIS, NPS, professional tax or other current allowance/deduction rate is asserted by this repository.

## Development

Install dependencies from the committed lockfile and start the local preview:

```sh
npm ci
npm run dev
```

Run project checks with:

```sh
npm run check
npm test
npm run build
```

## Project documents

- [Product plan](docs/PRODUCT_PLAN.md)
- [Roadmap](docs/ROADMAP.md)
- [Pay rules and source register](docs/PAY_RULES_REGISTER.md)
- [Pay matrix source audit](docs/PAY_MATRIX_SOURCE_AUDIT.md)
- [Contribution guide](CONTRIBUTING.md)

## Disclaimer

This project is independent and is not an official Government of Sikkim application. Results are estimates for informational use and must be checked against applicable government orders, department instructions and official salary records. Do not enter confidential employee, banking or identity information.
