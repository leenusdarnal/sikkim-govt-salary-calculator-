/**
 * Source-backed employee-applicability notes for Sikkim Government pay rules.
 *
 * These are reference summaries only. They intentionally do not infer a user's
 * eligibility, change a selected Pay Level, or produce pay/increment amounts.
 * Notification No. 99/GEN/DOP is listed on the official DOP notification archive.
 * A readable copy was located elsewhere, but the original official PDF and the
 * referenced Office Memorandum No. 5339/GEN/DOP remain unverified.
 */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   sourceLabel: string,
 *   sourceDate: string,
 *   sourceUrl: string,
 *   sourceKind: string,
 *   applicability: readonly string[],
 *   stages: readonly string[],
 *   status: string,
 *   caution: string,
 *   calculationEnabled: boolean
 * }} ApplicabilityGuidance
 */

/** @type {ApplicabilityGuidance[]} */
const SOURCE_GUIDANCE = [
  {
    id: 'regularisation-pay-progression-2026',
    title: 'Pay progression after regularisation',
    sourceLabel: 'Office Memorandum No. 2026/GEN/DOP',
    sourceDate: '20 March 2026',
    sourceUrl: 'https://dop.sikkim.gov.in/notificationdoc/2026.pdf',
    sourceKind: 'Office Memorandum',
    calculationEnabled: false,
    applicability: [
      'Group C and D temporary employees covered by the four-year continuous-service regularisation policy (Notification No. 100/GEN/DOP read with No. 24/GEN/DOP).',
      'Persons appointed in lieu of land donated to the Government, after the prescribed three years of continuous temporary service and subject to the scheme criteria (Notification No. 13/GEN/DOP).',
      'Temporary employees with benchmark disabilities covered by the two-year service policy in the particular post (Notification No. 68/GEN/DOP read with No. 25/GEN/DOP).'
    ],
    stages: [
      'For the first year after regularisation, pay is equivalent to the amount drawn while serving in temporary capacity.',
      'After successful completion of one year of regular service, placement is in Level 1, 2 or 3 of the Pay Matrix, as applicable to the post, for the next four years.',
      'On completion of five years of regular service, pay is to be regulated under Notification No. 99/GEN/DOP dated 6 February 2020.'
    ],
    status: 'Reference only — not enabled for automatic calculation',
    caution: 'The OM does not identify a Level for a particular post by itself. The cited Notification No. 99/GEN/DOP and the underlying regularisation/scheme notifications must be obtained and reviewed before implementing this pathway. Confirm the employee’s regularisation order, category, post and service dates.'
  },
  {
    id: 'regularisation-original-pay-level-2020',
    title: 'Original Pay Level after five years of regularisation',
    sourceLabel: 'Notification No. 99/GEN/DOP',
    sourceDate: '6 February 2020',
    sourceUrl: 'https://dop.sikkim.gov.in/visitor/notifications',
    sourceKind: 'Notification listed in official DOP archive; readable copy not independently authenticated',
    calculationEnabled: false,
    applicability: [
      'The located copy addresses employees regularised after completion of 15, 10 or 5 years of service, respectively.'
    ],
    stages: [
      'The located copy says that prefixes such as “Junior” or “Assistant” and other attached nomenclature are to be omitted, restoring the original designation held while working in temporary capacity.',
      'It says that after five years of service following regularisation, employees become eligible for the original Pay Level prescribed for the post, in accordance with Office Memorandum No. 5339/GEN/DOP dated 11 February 2019.'
    ],
    status: 'Official archive listing confirmed; document text and linked 2019 OM still require primary-source verification',
    caution: 'The official DOP archive lists Notification No. 99/GEN/DOP dated 06/02/2020, but the original PDF was not retrieved in this review. The readable text was found in a non-government copy and must be checked against the signed notification. Office Memorandum No. 5339/GEN/DOP also remains unverified. This note does not determine a specific employee’s original post Level or calculate pay.'
  },
  {
    id: 'one-time-cadre-induction-2025',
    title: 'One-time cadre induction for specified Level 1–3 employees',
    sourceLabel: 'Notification No. 109/GEN/DOP and OM No. 6412/GEN/DOP',
    sourceDate: '25 September 2025',
    sourceUrl: 'https://dop.sikkim.gov.in/notificationdoc/109.pdf',
    sourceKind: 'Notification with accompanying Office Memorandum',
    calculationEnabled: false,
    applicability: [
      'Employees whose services had been brought into the regular establishment in Pay Level 1, 2 or 3 and who completed six years of regular service as on 31 December 2025.'
    ],
    stages: [
      'The notification provides for induction into the respective cadre/service as a one-time measure.',
      'The accompanying OM directs the Cadre Controlling Authority to prepare a provisional seniority list and invite claims/objections for at least one month.',
      'After finalisation and publication of the post-wise seniority list, induction is to follow the recruitment rules of the cadre/service. Prescribed educational, technical and other qualifications are not relaxed.'
    ],
    status: 'Reference only — cadre process, not a pay-matrix amendment',
    caution: 'This is a cadre-induction measure, not a general change to Part A cell values or an automatic promotion. Confirm inclusion in the eligible list and the applicable cadre recruitment rules.'
  },
  {
    id: 'eol-increment-clarification-2025',
    title: 'Extraordinary leave and annual increment',
    sourceLabel: 'Clarification No. 6780/GEN/DOP',
    sourceDate: '27 October 2025',
    sourceUrl: 'https://dop.sikkim.gov.in/circular/6780.pdf',
    sourceKind: 'Department of Personnel clarification',
    calculationEnabled: false,
    applicability: [
      'Government servants drawing pay in the revised Pay Matrix where Extraordinary Leave (EOL) affects qualifying service for the annual increment.'
    ],
    stages: [
      'The clarification states that an employee who has availed EOL not exceeding six months, but has rendered at least six months of qualifying service in the relevant Level during the applicable increment cycle, is eligible for the following 1 January or 1 July increment.',
      'It further states that where EOL is availed continuously for six months, the increment date is postponed to the next increment date (1 January or 1 July).'
    ],
    status: 'Source located — increment calculation not enabled',
    caution: 'The qualifying-service calculation and interaction with the employee’s service record must be checked before applying this clarification to an individual case. Do not estimate an increment date from EOL duration alone.'
  }
];

export const APPLICABILITY_GUIDANCE = Object.freeze(
  SOURCE_GUIDANCE.map((item) =>
    Object.freeze({
      ...item,
      applicability: Object.freeze([...item.applicability]),
      stages: Object.freeze([...item.stages])
    })
  )
);

/** @param {string} id */
export function getApplicabilityGuidance(id) {
  return APPLICABILITY_GUIDANCE.find((item) => item.id === id);
}
