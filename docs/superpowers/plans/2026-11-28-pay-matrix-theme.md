# Pay Matrix Lookup and Theme Modes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add a source-traceable lookup for all 23 Gazette Part A pay levels and cells, plus a persistent light/dark mode without adding runtime dependencies.

**Architecture:** Store only the official Level metadata and entry-pay values, then construct each matrix column with the documented annual increment progression: 3% of current pay, increment rounded to the nearest ₹100, added to the current pay. Add a small pure theme helper for preference resolution and toggling; apply the theme early in the HTML shell to avoid a flash and use CSS variables/overrides in the existing page.

**Tech Stack:** Existing SvelteKit/Svelte 5, JavaScript modules, Node built-in test runner, CSS, inline SVG icons, browser localStorage.

**Spec:** Gazette No. 333, Notification No. 56/GEN/DOP dated 23 June 2018, Schedule Part A (printed pages 12–14), Rule 7(1)(a)(i) (printed page 4); existing project accuracy guardrails in `docs/PAY_MATRIX_SOURCE_AUDIT.md`.

## Global Constraints

- No new runtime or development dependencies.
- Do not add allowance/deduction rates or infer post eligibility.
- Preserve exact per-Level cell counts; do not pad missing cells.
- Display the source, effective context, and verification limitation alongside the lookup.
- Keep manual basic-pay entry available.
- Theme preference may be persisted locally only; do not add a server or tracking.
- Use accessible inline sun/moon SVG icons; no icon package.

## Review Focus

- Cell 1/last-cell boundaries and invalid Level/Cell requests are tested.
- Increment rounding matches the Gazette matrix at low, mid, and high levels.
- The UI never offers a blank cell as a valid selection.
- Manual entry continues to work and can still be used independently of the matrix lookup.
- Theme initializes before first paint, follows system preference when no saved choice exists, and persists explicit user choice.
- Both themes retain readable contrast, keyboard focus, and native form-control styling.

---

### Task 1: Matrix data and theme helper tests

**Files:**
- Create: `src/lib/pay-matrix.js`
- Create: `src/lib/theme.js`
- Test: `tests/pay-matrix.test.mjs`
- Test: `tests/theme.test.mjs`

**Interfaces:**
- `getPayLevel(level): PayLevel | undefined`
- `getPayCell(level, cell): number | undefined`
- `resolveTheme(savedTheme, systemTheme): 'light' | 'dark'`
- `nextTheme(currentTheme): 'light' | 'dark'`

- [x] Add tests for all 23 Level metadata records, actual cell counts, representative matrix values, and invalid lookup requests.
- [x] Add tests for saved/system theme resolution and toggling.
- [x] Run tests and confirm they fail because the modules do not exist.
- [x] Implement the small metadata-driven matrix generator and pure theme helpers.
- [x] Run all tests.

### Task 2: Theme switch

**Files:**
- Modify: `src/app.html`
- Modify: `src/routes/+page.svelte`

**Interfaces:**
- Theme preference is initialized from localStorage or system preference before first paint.
- The header button toggles light/dark and stores the explicit selection.
- The toggle uses inline SVG sun/moon icons with an accessible name and pressed state.

- [x] Add the early theme bootstrap and `color-scheme` meta declaration.
- [x] Add a small theme button and on-mount/toggle synchronization.
- [x] Add light/dark surface, text, border, field, note and focus styling without adding dependencies.
- [x] Verify print output remains monochrome.

### Task 3: Matrix lookup UI and documentation

**Files:**
- Modify: `src/routes/+page.svelte`
- Modify: `docs/PAY_MATRIX_SOURCE_AUDIT.md`
- Modify: `docs/ROADMAP.md`
- Modify: `README.md`

**Interfaces:**
- User selects a Level and a valid cell, then can apply the selected amount to the existing basic-pay input.
- The source note identifies Gazette No. 333, Schedule Part A, the 3% increment/nearest ₹100 progression, and the outstanding independent cell-by-cell audit.

- [x] Add a responsive Level/cell selector and an explicit “Use selected basic pay” action.
- [x] Preserve manual input and zero/negative validation behavior.
- [x] Document the matrix generation method, source references, and current verification scope accurately.
- [x] Update roadmap to mark the matrix lookup milestone complete, not the full rules-backed salary engine.
- [x] Run Svelte/TypeScript checks, all tests, dependency audit, and production build.
- [x] Review the diff and open a PR; merge only after green CI.


## Execution notes

- The initial CI run failed at the expected test-first stage because the new matrix and theme modules were not yet present.
- Added the source metadata and matrix generation logic, then fixed strict TypeScript annotations and optional lookup assertions identified by CI.
- Corrected the source-specific cell counts for Levels 15–20 and added terminal-cell assertions across all 23 Levels.
- Theme bootstrap runs before first paint; the toggle persists explicit choices, and the page follows system changes until a choice is pinned.
- Final verification is tracked by the latest pull-request CI run. The separate full cell-by-cell independent audit and employee applicability review remain pending in Phase 0.
