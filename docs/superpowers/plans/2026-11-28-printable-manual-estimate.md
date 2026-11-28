# Printable Manual Estimate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Let users print or save the existing manual arithmetic estimate as a clear, self-contained document without presenting it as an official salary statement.

**Architecture:** Keep salary arithmetic in the existing pure calculation module. Add a small statement-view model that converts normalized calculation results into labelled lines and a prominent disclaimer. The Svelte page renders that model in a print-only section and invokes the browser print dialog; print CSS hides the interactive app and keeps the statement.

**Tech Stack:** SvelteKit, Svelte 5, existing Node built-in test runner, browser `window.print()`, CSS `@media print`.

**Spec:** Existing constraints in `docs/PRODUCT_PLAN.md` and `docs/SALARY_RULES_GUIDE.md`; this is an interim manual-only print view, not the complete source-backed salary statement requirement.

## Global Constraints

- Do not add salary rates or infer employee applicability.
- Label every amount as user-entered or derived from user-entered amounts.
- State clearly that the printout is not an official salary statement.
- Keep all salary inputs in the browser; do not add network calls or persistence.
- Add no runtime dependency for printing; use the browser print dialog.

## Review Focus

- Zero-valued inputs still produce a valid, clearly labelled estimate.
- Deductions remain consistent with the existing calculation engine's normalized/capped result.
- Print output does not expose the interactive calculator controls or unrelated page sections.
- Narrow/mobile layouts continue to use the existing responsive UI.
- The printout remains understandable in monochrome and does not rely on background colours.

---

### Task 1: Statement view model

**Files:**
- Create: `src/lib/estimate-statement.js`
- Test: `tests/manual-estimate-statement.test.mjs`

**Interfaces:**
- Consumes a normalized salary calculation object with `basicPay`, `allowances`, `gross`, `deductions`, and `net`.
- Produces `{ title, disclaimer, lines }`; each line has a stable id, label, amount, and optional emphasis/deduction marker.

- [x] Write failing tests for the statement labels, values, and manual-only disclaimer.
- [x] Run the new test and confirm it fails because the module is not implemented.
- [x] Implement the pure statement model.
- [x] Run the statement tests and all existing calculation tests.

### Task 2: Printable UI and docs

**Files:**
- Modify: `src/routes/+page.svelte`
- Modify: `README.md`
- Modify: `docs/ROADMAP.md`

**Interfaces:**
- The page derives the statement model from the existing `calculateSalary()` result.
- A visible button calls `window.print()`; a print-only section renders the model.

- [x] Add the print/save button and print-only statement.
- [x] Add print CSS that hides non-statement content and formats a monochrome document.
- [x] Update the README's install instructions and remove the stale lockfile-workflow note.
- [x] Mark the completed lockfile work in the roadmap and distinguish this interim print view from the full source-backed statement requirement.
- [x] Run type-check, tests, audit, and production build through GitHub Actions.


## Execution notes

- The initial statement-model tests were observed failing before the implementation was added, then passed once the model existed.
- Added explicit validity checks after review so negative and non-finite input values cannot be printed as normalized zero amounts.
- The TypeScript test lookup uses an existence assertion before accessing the deductions line.
- Final GitHub Actions validation passed: `npm run check`, `npm test`, `npm audit --audit-level=high`, and `npm run build`.
