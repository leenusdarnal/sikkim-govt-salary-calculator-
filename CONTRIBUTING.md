# Contributing

Thank you for helping improve the Sikkim Government Employee Salary Calculator.

## Before opening an issue or pull request

- Search existing issues to avoid duplication.
- Keep changes focused and explain the user problem being addressed.
- Do not submit confidential employee records, personal identifiers, bank details or private salary slips.
- For any pay-rule change, include the official source and its effective date.

## Pay-rule contributions

A calculation value must not be added based only on an unofficial website, a screenshot without context or a remembered rate.

Include:

- official order/notification title and number;
- issuing authority and date;
- effective date and applicability;
- source URL and relevant page/clause/table;
- explanation of the calculation method;
- at least one independently checked example;
- tests covering normal and boundary cases.

Update docs/PAY_RULES_REGISTER.md when a source is found, verified or superseded. Keep historical rule versions.

## Code contributions

- Keep calculation logic in the domain layer, separate from Svelte components.
- Prefer pure, deterministic functions.
- Add unit tests for new calculations and edge cases.
- Avoid hard-coded rates in UI components.
- Use TypeScript types for rule definitions and calculation inputs/outputs.
- Keep forms accessible and responsive.
- Run linting, type checking, tests and production build before submitting a pull request.

The exact commands will be documented after the application scaffold is committed.

## Pull request checklist

- [ ] The change has a clear purpose and scope.
- [ ] Relevant tests have been added or updated.
- [ ] No unverified pay rate or eligibility assumption has been introduced.
- [ ] Official sources are linked for rule changes.
- [ ] Documentation has been updated where necessary.
- [ ] No personal or confidential data is included.

## Design and product direction

Prioritise clarity, accessibility, explainability and the smallest useful feature. Avoid building employee-management or backend features unless they are justified by an agreed requirement.
