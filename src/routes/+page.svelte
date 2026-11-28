<script lang="ts">
  import { onMount } from 'svelte';
  import { calculateSalary } from '../lib/salary-calculation.js';
  import { getPayCell, getPayLevel, PAY_LEVELS } from '../lib/pay-matrix.js';
  import { nextTheme, resolveTheme } from '../lib/theme.js';
  import { createManualEstimateStatement, hasValidManualEstimateInputs } from '../lib/estimate-statement.js';

  let basicPay = 0;
  let allowances = 0;
  let deductions = 0;
  let selectedLevel = 0;
  let selectedCell = 1;
  let isDark = false;

  $: selectedPayLevel = getPayLevel(selectedLevel);
  $: selectedPay = getPayCell(selectedLevel, selectedCell);
  $: calculation = calculateSalary({ basicPay, allowances, deductions });
  $: statement = createManualEstimateStatement(calculation);
  $: canPrint = hasValidManualEstimateInputs({ basicPay, allowances, deductions });

  onMount(() => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem('sikkim-salary-theme');
    } catch {
      // The early HTML bootstrap already selected the system theme.
    }
    applyTheme(resolveTheme(savedTheme, systemPreference.matches ? 'dark' : 'light'));

    const followSystemTheme = (event: MediaQueryListEvent) => {
      let savedTheme: string | null = null;
      try {
        savedTheme = localStorage.getItem('sikkim-salary-theme');
      } catch {
        // Follow the live system preference if storage is unavailable.
      }
      if (savedTheme !== 'light' && savedTheme !== 'dark') {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    };
    systemPreference.addEventListener('change', followSystemTheme);
    return () => systemPreference.removeEventListener('change', followSystemTheme);
  });

  function applyTheme(theme: 'light' | 'dark') {
    isDark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    const scheme = document.querySelector('meta[name="color-scheme"]');
    scheme?.setAttribute('content', theme);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor?.setAttribute('content', theme === 'dark' ? '#0d1714' : '#173b34');
  }

  function toggleTheme() {
    const theme = nextTheme(isDark ? 'dark' : 'light');
    applyTheme(theme);
    try {
      localStorage.setItem('sikkim-salary-theme', theme);
    } catch {
      // The current page still changes theme if browser storage is unavailable.
    }
  }

  function handleLevelChange(event: Event) {
    const value = (event.currentTarget as HTMLSelectElement).value;
    selectedLevel = value ? Number(value) : 0;
    selectedCell = 1;
  }

  function applySelectedPay() {
    if (selectedPay !== undefined) basicPay = selectedPay;
  }

  const money = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
</script>

<svelte:head>
  <title>Sikkim Government Salary Calculator</title>
  <meta name="description" content="A transparent, source-backed salary calculator for Government of Sikkim employees." />
</svelte:head>

<main class="shell">
  <header class="topbar">
    <a class="brand" href="#main" aria-label="Sikkim Salary Calculator home">
      <span class="mark" aria-hidden="true">₹</span>
      <span>Sikkim Salary Calculator</span>
    </a>
    <div class="topbar-actions">
      <span class="status">Early preview</span>
      <button
        type="button"
        class="theme-toggle"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDark}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onclick={toggleTheme}
      >
        {#if isDark}
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </svg>
        {:else}
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
          </svg>
        {/if}
      </button>
    </div>
  </header>

  <section class="intro" id="main">
    <p class="eyebrow">For Government of Sikkim employees</p>
    <h1>Understand your salary,<br class="desktop-break" /> component by component.</h1>
    <p class="lead">Enter the amounts from your current pay details to see a simple monthly estimate. Verified pay-matrix rates and official rules are being added separately.</p>
  </section>

  <div class="preview-note" role="note">
    <span class="note-icon" aria-hidden="true">i</span>
    <p><strong>Preview calculator — manual inputs only.</strong> No official allowance or deduction rates are applied. Use this for arithmetic only; it is not an official salary calculation.</p>
  </div>

  <section class="calculator" aria-labelledby="calculator-title">
    <div class="form-panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Monthly estimate</p>
          <h2 id="calculator-title">Enter your pay amounts</h2>
        </div>
        <span class="step">01 / 01</span>
      </div>

      <section class="matrix-lookup" aria-labelledby="matrix-title">
        <div class="matrix-heading">
          <div>
            <p class="eyebrow">Gazette No. 333 · Schedule Part A</p>
            <h3 id="matrix-title">Pay matrix lookup</h3>
          </div>
          <span class="matrix-badge">2018 rules</span>
        </div>
        <div class="matrix-fields">
          <label for="pay-level">Pay level</label>
          <label for="pay-cell">Cell</label>
          <select id="pay-level" bind:value={selectedLevel} onchange={(event) => { selectedLevel = Number((event.currentTarget as HTMLSelectElement).value); selectedCell = 1; }}>
            <option value={0}>Choose a level</option>
            {#each PAY_LEVELS as level (level.level)}
              <option value={level.level}>Level {level.level}</option>
            {/each}
          </select>
          <select id="pay-cell" bind:value={selectedCell} disabled={!selectedPayLevel}>
            {#each selectedPayLevel?.cells ?? [] as amount, index (index)}
              <option value={index + 1}>Cell {index + 1} · {money(amount)}</option>
            {/each}
          </select>
        </div>
        <div class="matrix-selection">
          {#if selectedPayLevel && selectedPay !== undefined}
            <p>Level {selectedLevel} · Cell {selectedCell} <span>Grade Pay ₹{selectedPayLevel.gradePay.toLocaleString('en-IN')}</span></p>
            <strong>{money(selectedPay)}</strong>
          {:else}
            <p>Select a level and cell to look up basic pay.</p>
          {/if}
          <button type="button" class="matrix-use" disabled={selectedPay === undefined} onclick={applySelectedPay}>Use selected basic pay</button>
        </div>
        <p class="matrix-source">Cells are generated from Gazette entry pay using 3% increments rounded to the nearest ₹100; full cell-by-cell verification remains pending. This lookup does not determine which level applies to a post. <a href="https://www.sikkim.gov.in/uploads/Gazette/333_20240813.pdf" target="_blank" rel="noreferrer">Official Gazette PDF</a>.</p>
      </section>

      <label for="basic-pay">Basic pay <span>₹</span></label>
      <input id="basic-pay" class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" type="number" min="0" step="1" bind:value={basicPay} inputmode="decimal" aria-invalid={!Number.isFinite(basicPay) || basicPay < 0} aria-describedby={!Number.isFinite(basicPay) || basicPay < 0 ? "basic-pay-error" : undefined} placeholder="e.g. 56000" />
      {#if !Number.isFinite(basicPay) || basicPay < 0}<p class="field-error" id="basic-pay-error">Enter a valid, non-negative amount.</p>{/if}

      <label for="allowances">Total allowances <span>₹</span></label>
      <input id="allowances" class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" type="number" min="0" step="1" bind:value={allowances} inputmode="decimal" aria-invalid={!Number.isFinite(allowances) || allowances < 0} aria-describedby={!Number.isFinite(allowances) || allowances < 0 ? "allowances-error" : undefined} placeholder="Enter your allowance total" />
      {#if !Number.isFinite(allowances) || allowances < 0}<p class="field-error" id="allowances-error">Enter a valid, non-negative amount.</p>{/if}

      <label for="deductions">Total deductions <span>₹</span></label>
      <input id="deductions" class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" type="number" min="0" step="1" bind:value={deductions} inputmode="decimal" aria-invalid={!Number.isFinite(deductions) || deductions < 0} aria-describedby={!Number.isFinite(deductions) || deductions < 0 ? "deductions-error" : undefined} placeholder="Enter your deduction total" />
      {#if !Number.isFinite(deductions) || deductions < 0}<p class="field-error" id="deductions-error">Enter a valid, non-negative amount.</p>{/if}

      <p class="helper">Use amounts from your own pay details. Leave a field at zero if it does not apply.</p>
    </div>

    <aside class="result-panel">
      <p class="result-label">Estimated take-home</p>
      <p class="net-amount" aria-live="polite" aria-atomic="true">{money(calculation.net)}</p>
      <p class="result-caption">Monthly · based only on the values entered</p>
      <div class="breakdown">
        <div><span>Basic pay</span><strong>{money(calculation.basicPay)}</strong></div>
        <div><span>Allowances</span><strong>{money(calculation.allowances)}</strong></div>
        <div class="total"><span>Gross amount</span><strong>{money(calculation.gross)}</strong></div>
        <div><span>Deductions</span><strong>− {money(calculation.deductions)}</strong></div>
      </div>
      <div class="net-row"><span>Estimated net</span><strong>{money(calculation.net)}</strong></div>
      <button type="button" class="print-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" disabled={!canPrint} aria-describedby={!canPrint ? 'print-help' : undefined} onclick={() => window.print()}>Print / Save PDF</button>
      {#if !canPrint}<p class="print-help" id="print-help" role="status">Correct invalid or negative amounts to enable printing.</p>{/if}
      <button type="button" class="reset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onclick={() => { basicPay = 0; allowances = 0; deductions = 0; }}>Clear amounts</button>
    </aside>
  </section>

  <section class="print-sheet" aria-labelledby="print-title">
    <div class="print-topline">
      <p class="print-eyebrow">Sikkim Salary Calculator · Independent preview</p>
      <span class="print-status">Manual inputs only</span>
    </div>
    <h1 id="print-title">{statement.title}</h1>
    <p class="print-lead">Itemized monthly calculation using amounts manually entered by the user.</p>
    <dl class="print-breakdown">
      {#each statement.lines as line (line.id)}
        <div class:print-total={line.emphasis}>
          <dt>{line.label}</dt>
          <dd>{line.deduction ? '− ' : ''}{money(line.amount)}</dd>
        </div>
      {/each}
    </dl>
    <p class="print-disclaimer"><strong>Important:</strong> {statement.disclaimer}</p>
    <p class="print-footer">This independent preview is not affiliated with the Government of Sikkim. Check all amounts against official payroll records.</p>
  </section>

  <section class="next" aria-labelledby="next-title">
    <p class="eyebrow">What comes next</p>
    <h2 id="next-title">Verified rules, then smarter calculations.</h2>
    <p>The next release will add pay-level and cell selection, source-linked allowance rules, applicable deductions and a detailed calculation trail after official orders are verified.</p>
    <a href="https://github.com/leenusdarnal/sikkim-govt-salary-calculator-">Follow development on GitHub ↗</a>
  </section>

  <footer>
    <span>Independent community project · Not an official Government of Sikkim application</span>
    <span>Amounts stay in this browser session.</span>
  </footer>
</main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(body) { margin: 0; background: #f4f7f5; color: #172a26; font: 16px/1.55 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  :global(button), :global(input) { font: inherit; }
  :global(html) { color-scheme: light; }
  :global(html[data-theme="dark"]) { color-scheme: dark; }
  .shell { width: min(1120px, calc(100% - 36px)); margin: 0 auto; }
  .topbar { min-height: 82px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 1px solid #dfe7e2; }
  .brand { display: inline-flex; align-items: center; gap: 11px; color: #173b34; font-weight: 750; text-decoration: none; letter-spacing: -.02em; }
  .mark { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; color: white; background: #173b34; font-size: 21px; }
  .status { padding: 6px 11px; border: 1px solid #cddbd4; border-radius: 999px; color: #45665a; font-size: 12px; font-weight: 700; white-space: nowrap; }
  .topbar-actions { display: flex; align-items: center; gap: 10px; }
  .theme-toggle { display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border: 1px solid #cddbd4; border-radius: 12px; color: #24483e; background: #fff; cursor: pointer; }
  .theme-toggle svg { width: 20px; height: 20px; }
  .theme-toggle:hover { background: #edf4f0; }
  .theme-toggle:focus-visible { outline: 2px solid #377b68; outline-offset: 3px; }
  .intro { padding: 54px 0 28px; max-width: 800px; }
  .eyebrow { margin: 0 0 9px; color: #477366; font-size: 11px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
  h1 { margin: 0; color: #173b34; font-size: clamp(34px, 6vw, 58px); line-height: 1.08; letter-spacing: -.05em; }
  .lead { max-width: 690px; margin: 20px 0 0; color: #5b6d66; font-size: 17px; }
  .preview-note { display: flex; align-items: flex-start; gap: 13px; margin: 0 0 22px; padding: 15px 17px; border: 1px solid #e7d8b4; border-radius: 12px; background: #fff9eb; color: #65542f; }
  .preview-note p { margin: 0; font-size: 13px; }
  .note-icon { display: grid; place-items: center; flex: 0 0 21px; height: 21px; border: 1px solid #cbb57f; border-radius: 50%; font-size: 12px; font-weight: 800; }
  .calculator { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(300px, .95fr); overflow: hidden; border: 1px solid #dce6e0; border-radius: 18px; background: white; box-shadow: 0 12px 32px rgb(23 59 52 / 5%); }
  .form-panel { padding: clamp(22px, 4vw, 36px); }
  .section-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
  .matrix-lookup { margin: 0 0 25px; padding: 16px; border: 1px solid #dce6e0; border-radius: 12px; background: #f8faf9; }
  .matrix-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  .matrix-heading .eyebrow { margin-bottom: 4px; font-size: 9px; }
  .matrix-heading h3 { margin: 0; color: #173b34; font-size: 17px; letter-spacing: -.02em; }
  .matrix-badge { padding: 4px 7px; border-radius: 6px; background: #e7efeb; color: #47665b; font-size: 10px; font-weight: 700; white-space: nowrap; }
  .matrix-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 0 12px; margin-top: 9px; }
  .matrix-fields label { margin-top: 13px; font-size: 11px; }
  .matrix-fields select { width: 100%; min-width: 0; min-height: 43px; padding: 9px 10px; border: 1px solid #d4dfd8; border-radius: 8px; background: #fff; color: #172a26; font: inherit; font-size: 12px; }
  .matrix-fields select:focus-visible { outline: 2px solid #377b68; outline-offset: 2px; }
  .matrix-fields select:disabled { opacity: .55; }
  .matrix-selection { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; padding-top: 13px; border-top: 1px solid #dce6e0; }
  .matrix-selection p { margin: 0; color: #536b61; font-size: 11px; }
  .matrix-selection p span { display: block; color: #87968f; }
  .matrix-selection strong { color: #173b34; font-size: 18px; font-variant-numeric: tabular-nums; }
  .matrix-use { width: 100%; min-height: 40px; padding: 9px 12px; border: 0; border-radius: 8px; color: white; background: #1b6653; font-size: 12px; font-weight: 750; cursor: pointer; }
  .matrix-use:hover:not(:disabled) { background: #174f42; }
  .matrix-use:disabled { opacity: .45; cursor: not-allowed; }
  .matrix-source { margin: 12px 0 0; color: #7b8982; font-size: 10px; line-height: 1.5; }
  .matrix-source a { color: #1b6653; font-weight: 700; text-underline-offset: 2px; }
  h2 { margin: 0; font-size: 23px; line-height: 1.2; letter-spacing: -.03em; }
  .step { color: #87968f; font-size: 11px; font-weight: 750; letter-spacing: .08em; white-space: nowrap; }
  label { display: flex; justify-content: space-between; margin: 18px 0 7px; color: #314b42; font-size: 13px; font-weight: 700; }
  label span { color: #809087; font-weight: 500; }
  input { width: 100%; min-height: 49px; padding: 12px 14px; border: 1px solid #d4dfd8; border-radius: 9px; outline: none; background: #fbfcfb; color: #172a26; }
  input:focus { border-color: #377b68; box-shadow: 0 0 0 3px rgb(55 123 104 / 14%); background: white; }
  input::placeholder { color: #9aa69f; }
  .helper { margin: 17px 0 0; color: #78877f; font-size: 12px; }
  .field-error { margin: 6px 0 0; color: #a12f2f; font-size: 12px; }
  .result-panel { display: flex; flex-direction: column; padding: clamp(22px, 4vw, 36px); background: #173b34; color: white; }
  .result-label { margin: 0; color: #c4d9d0; font-size: 13px; font-weight: 650; }
  .net-amount { margin: 7px 0 0; font-size: clamp(30px, 4vw, 42px); font-weight: 760; letter-spacing: -.04em; overflow-wrap: anywhere; }
  .result-caption { margin: 4px 0 24px; color: #b1c8be; font-size: 12px; }
  .breakdown { display: grid; gap: 13px; padding: 20px 0; border-top: 1px solid #3a5b52; border-bottom: 1px solid #3a5b52; }
  .breakdown div, .net-row { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; }
  .breakdown span { color: #c4d9d0; }
  .breakdown strong, .net-row strong { font-variant-numeric: tabular-nums; text-align: right; }
  .breakdown .total { padding-top: 12px; border-top: 1px dashed #527166; }
  .breakdown .total span { color: white; }
  .net-row { align-items: center; margin-top: 18px; font-weight: 700; }
  .net-row strong { font-size: 18px; }
  .print-action { align-self: flex-start; margin-top: 22px; padding: 10px 13px; border: 1px solid #b8cec5; border-radius: 9px; color: #173b34; background: white; font-size: 12px; font-weight: 750; cursor: pointer; }
  .print-action:hover:not(:disabled) { background: #edf4f0; }
  .print-action:disabled { opacity: .55; cursor: not-allowed; }
  .print-help { margin: 7px 0 0; color: #d3e1da; font-size: 11px; }
  .reset { align-self: flex-start; margin-top: 12px; padding: 10px 0 0; border: 0; background: none; color: #c5ddd3; font-size: 12px; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
  .reset:hover { color: white; }
  .print-sheet { display: none; }
  .next { max-width: 700px; padding: 48px 0 36px; }
  .next h2 { color: #173b34; }
  .next p:not(.eyebrow) { color: #5b6d66; }
  .next a { color: #1b6653; font-size: 13px; font-weight: 750; text-underline-offset: 4px; }
  footer { display: flex; justify-content: space-between; gap: 12px; padding: 20px 0 28px; border-top: 1px solid #dfe7e2; color: #829087; font-size: 11px; }
  @media (max-width: 720px) { .intro { padding-top: 38px; } .calculator { grid-template-columns: 1fr; } .result-panel { min-height: 410px; } footer { flex-direction: column; } }
  @media (max-width: 420px) { .topbar-actions { gap: 7px; } .theme-toggle { width: 36px; height: 36px; } .status { display: none; } .matrix-lookup { padding: 13px; } .matrix-fields { gap: 0 8px; } }
  @media (max-width: 420px) { .shell { width: calc(100% - 24px); } .brand { font-size: 13px; } .mark { width: 34px; height: 34px; } .status { font-size: 10px; } .desktop-break { display: none; } }

  :global(html[data-theme="dark"] body) { background: #0d1714; color: #e5eee9; }
  :global(html[data-theme="dark"]) .topbar { border-color: #2b3d36; }
  :global(html[data-theme="dark"]) .brand { color: #dce9e2; }
  :global(html[data-theme="dark"]) .mark { color: #173b34; background: #cce4d8; }
  :global(html[data-theme="dark"]) .status { border-color: #3b554a; color: #c0d5ca; }
  :global(html[data-theme="dark"]) .theme-toggle { border-color: #40564b; color: #e4eee8; background: #172720; }
  :global(html[data-theme="dark"]) .theme-toggle:hover { background: #23372e; }
  :global(html[data-theme="dark"]) .theme-toggle:focus-visible { outline-color: #8ed8bc; }
  :global(html[data-theme="dark"]) .eyebrow { color: #91c8b3; }
  :global(html[data-theme="dark"]) h1, :global(html[data-theme="dark"]) .next h2 { color: #e4f0e9; }
  :global(html[data-theme="dark"]) .lead, :global(html[data-theme="dark"]) .next p:not(.eyebrow) { color: #a9bcb2; }
  :global(html[data-theme="dark"]) .preview-note { border-color: #5c4c2b; background: #282318; color: #e5d6ad; }
  :global(html[data-theme="dark"]) .note-icon { border-color: #9a814b; }
  :global(html[data-theme="dark"]) .calculator { border-color: #2a3b33; background: #14221c; box-shadow: 0 12px 32px rgb(0 0 0 / 20%); }
  :global(html[data-theme="dark"]) h2 { color: #e4eee8; }
  :global(html[data-theme="dark"]) .step { color: #8ea198; }
  :global(html[data-theme="dark"]) label { color: #c8d9d0; }
  :global(html[data-theme="dark"]) label span { color: #8ea198; }
  :global(html[data-theme="dark"]) input { border-color: #3a4d43; background: #101b16; color: #edf4f0; }
  :global(html[data-theme="dark"]) input:focus { border-color: #78bda5; box-shadow: 0 0 0 3px rgb(120 189 165 / 18%); background: #111f18; }
  :global(html[data-theme="dark"]) input::placeholder { color: #7f9288; }
  :global(html[data-theme="dark"]) .helper { color: #9aaca2; }
  :global(html[data-theme="dark"]) .field-error { color: #ffb4a9; }
  :global(html[data-theme="dark"]) .result-panel { background: #102b22; }
  :global(html[data-theme="dark"]) .breakdown { border-color: #34574a; }
  :global(html[data-theme="dark"]) .breakdown .total { border-color: #527568; }
  :global(html[data-theme="dark"]) .print-action { border-color: #8bb9a6; color: #102b22; background: #e2f1e9; }
  :global(html[data-theme="dark"]) .print-action:hover:not(:disabled) { background: #cde6d9; }
  :global(html[data-theme="dark"]) .reset { color: #c7ded2; }
  :global(html[data-theme="dark"]) .next a { color: #8ed8bc; }
  :global(html[data-theme="dark"]) footer { border-color: #2b3d36; color: #8fa198; }
  :global(html[data-theme="dark"]) .matrix-lookup { border-color: #2d4237; background: #101b16; }
  :global(html[data-theme="dark"]) .matrix-heading h3 { color: #e4eee8; }
  :global(html[data-theme="dark"]) .matrix-badge { background: #263a30; color: #bdd8ca; }
  :global(html[data-theme="dark"]) .matrix-fields select { border-color: #3a4d43; background: #0d1714; color: #edf4f0; }
  :global(html[data-theme="dark"]) .matrix-fields select:focus-visible { outline-color: #8ed8bc; }
  :global(html[data-theme="dark"]) .matrix-selection { border-color: #2d4237; }
  :global(html[data-theme="dark"]) .matrix-selection p { color: #b4c8bd; }
  :global(html[data-theme="dark"]) .matrix-selection p span { color: #8fa198; }
  :global(html[data-theme="dark"]) .matrix-selection strong { color: #e4eee8; }
  :global(html[data-theme="dark"]) .matrix-use { background: #28735c; }
  :global(html[data-theme="dark"]) .matrix-use:hover:not(:disabled) { background: #338568; }
  :global(html[data-theme="dark"]) .matrix-source { color: #93a69b; }
  :global(html[data-theme="dark"]) .matrix-source a { color: #8ed8bc; }

  @media print {
    @page { margin: 18mm; }
    :global(body) { margin: 0; background: white !important; color: #111 !important; font-size: 12pt; }
    .shell { width: 100%; margin: 0; }
    .topbar, .intro, .preview-note, .calculator, .next, footer { display: none !important; }
    .print-sheet { display: block !important; color: #111 !important; }
    .print-topline { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-bottom: 14px; border-bottom: 1px solid #888; }
    .print-eyebrow { margin: 0; color: #444; font-size: 10pt; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .print-status { padding: 4px 8px; border: 1px solid #777; border-radius: 4px; font-size: 9pt; white-space: nowrap; }
    .print-sheet h1 { margin: 20px 0 6px; color: #111; font-size: 24pt; line-height: 1.1; letter-spacing: -.02em; }
    .print-lead { margin: 0 0 20px; color: #444; }
    .print-breakdown { display: grid; margin: 0; padding: 0; border-top: 1px solid #bbb; border-bottom: 1px solid #bbb; }
    .print-breakdown div { display: flex; justify-content: space-between; gap: 20px; padding: 10px 0; border-bottom: 1px solid #ddd; }
    .print-breakdown div:last-child { border-bottom: 0; }
    .print-breakdown dt { color: #333; }
    .print-breakdown dd { margin: 0; color: #111; font-variant-numeric: tabular-nums; font-weight: 650; text-align: right; white-space: nowrap; }
    .print-breakdown .print-total { border-top: 1px solid #888; font-weight: 750; }
    .print-breakdown .print-total dd { font-weight: 750; }
    .print-disclaimer { margin: 24px 0 0; padding: 12px; border: 1px solid #888; color: #222; }
    .print-footer { margin: 18px 0 0; padding-top: 12px; border-top: 1px solid #ccc; color: #555; font-size: 9pt; }
  }
</style>
