# Sikkim Government Employee Salary Calculator

A transparent, source-backed salary calculator designed for employees of the Government of Sikkim.

The project aims to help employees estimate monthly salary, understand pay components and deductions, explore pay-matrix progression, and generate a clear salary statement. Calculations will be driven by documented rules and effective dates rather than values hard-coded into the interface.

> **Project status:** Planning and rules verification. No salary rate or deduction should be treated as confirmed until it is supported by the applicable Government of Sikkim order or an authoritative official source.

## Project goals

- Calculate estimated monthly gross salary, deductions and net salary.
- Support the applicable Sikkim Government pay structure and pay matrix.
- Explain each calculation so users can see how a figure was derived.
- Keep salary rules versioned by effective date and linked to source orders.
- Work well on mobile and desktop, with an offline-friendly, privacy-first design.
- Make it easy to correct and update rules when new official orders are issued.

## Planned modules

1. **Pay matrix** — pay levels, cells and basic-pay lookup.
2. **Salary calculator** — basic pay, applicable allowances, gross pay, deductions and estimated net pay.
3. **Employee scenario** — only the minimum inputs needed for a calculation; no employee ID or bank details.
4. **Increment and promotion** — estimate pay movement under verified rules.
5. **Arrears and revisions** — compare two rule/pay periods using verified effective dates.
6. **Salary statement** — printable/downloadable breakdown with calculation notes.
7. **Rules library** — source orders, effective dates, applicability and verification status.

## Technology direction

- SvelteKit
- TypeScript
- Tailwind CSS
- Vitest for calculation and rule tests
- Playwright for key user journeys
- Cloudflare Pages/Workers as the preferred low-cost hosting direction, subject to deployment requirements

The first release should be client-side and should not require an account or send personal salary inputs to a server. Hosting and deployment configuration will be added after the project scaffold is selected.

## Accuracy and official sources

The calculator is an informational tool, not a government payroll system. Official orders and notifications take precedence over the calculator.

Initial official source locations to review:

- [Department of Personnel — Revision of Pay](https://www.sikkim.gov.in/departments/department-of-personnel-public-grievances/revision-of-pay)
- [Finance Department — Notifications](http://www.sikkimfred.gov.in/Notification/Notification_Main_Page.aspx)

The source register in [docs/PAY_RULES_REGISTER.md](docs/PAY_RULES_REGISTER.md) tracks what has been found, what remains to be verified, and what evidence is required before implementation. No current DA, HRA, GIS, NPS, professional tax or other rate is asserted by this repository at this stage.

## Project documents

- [Product plan](docs/PRODUCT_PLAN.md)
- [Roadmap](docs/ROADMAP.md)
- [Pay rules and source register](docs/PAY_RULES_REGISTER.md)
- [Contribution guide](CONTRIBUTING.md)

## Development

The application scaffold has not yet been added. Once the initial technical setup is committed, this section will contain the exact install, development, test and build commands.

## Disclaimer

This project is independent and is not an official Government of Sikkim application. Results are estimates for informational use and must be checked against the applicable government orders, department instructions and official salary records. Do not enter confidential employee, banking or identity information.
