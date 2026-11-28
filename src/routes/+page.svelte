<script lang="ts">
  import { calculateSalary } from '../lib/salary-calculation.js';
  import { createManualEstimateStatement, hasValidManualEstimateInputs } from '../lib/estimate-statement.js';

  let basicPay = 0;
  let allowances = 0;
  let deductions = 0;

  $: calculation = calculateSalary({ basicPay, allowances, deductions });
  $: statement = createManualEstimateStatement(calculation);
  $: canPrint = hasValidManualEstimateInputs({ basicPay, allowances, deductions });

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
    <span class="status">Early preview</span>
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
  .shell { width: min(1120px, calc(100% - 36px)); margin: 0 auto; }
  .topbar { min-height: 82px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 1px solid #dfe7e2; }
  .brand { display: inline-flex; align-items: center; gap: 11px; color: #173b34; font-weight: 750; text-decoration: none; letter-spacing: -.02em; }
  .mark { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; color: white; background: #173b34; font-size: 21px; }
  .status { padding: 6px 11px; border: 1px solid #cddbd4; border-radius: 999px; color: #45665a; font-size: 12px; font-weight: 700; white-space: nowrap; }
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
  @media (max-width: 420px) { .shell { width: calc(100% - 24px); } .brand { font-size: 13px; } .mark { width: 34px; height: 34px; } .status { font-size: 10px; } .desktop-break { display: none; } }
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
