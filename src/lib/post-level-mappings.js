/**
 * Gazette No. 333 (2018), Schedule Part B, printed page 15.
 *
 * These 24 entries are a separate reference for specified posts. They are
 * intentionally not merged into the Part A pay matrix and are not a universal
 * grade-pay conversion or an employee-specific eligibility decision.
 *
 * A second independent transcription review and checks for later orders remain
 * outstanding. Confirm the exact service/cadre/post and applicable orders
 * before relying on any listed Level.
 */
const SOURCE_MAPPINGS = [
  {
    id: 'accounts-accountant',
    department: 'Sub-ordinate Accounts Service',
    post: 'Accountant',
    existingGradePay: 3400,
    upgradedGradePay: 3800,
    revisedLevel: 11,
    reportParagraph: '5.11'
  },
  {
    id: 'accounts-sr-accountant',
    department: 'Sub-ordinate Accounts Service',
    post: 'Sr. Accountant',
    existingGradePay: 4200,
    upgradedGradePay: 4600,
    revisedLevel: 14,
    reportParagraph: '5.11'
  },
  {
    id: 'ministerial-head-assistant',
    department: 'Ministerial and Executive Service',
    post: 'Head Assistant',
    existingGradePay: 3400,
    upgradedGradePay: 3800,
    revisedLevel: 11,
    reportParagraph: '5.11'
  },
  {
    id: 'ministerial-inspector',
    department: 'Ministerial and Executive Service',
    post: 'Inspector',
    existingGradePay: 3800,
    upgradedGradePay: 4200,
    revisedLevel: 12,
    reportParagraph: '5.11'
  },
  {
    id: 'ministerial-office-superintendent',
    department: 'Ministerial and Executive Service',
    post: 'Office Superintendent',
    existingGradePay: 4200,
    upgradedGradePay: 4600,
    revisedLevel: 14,
    reportParagraph: '5.11'
  },
  {
    id: 'multi-dept-laboratory-attendant',
    department: 'HRDD, Food Security & Agriculture Development, Horticulture & Cash Crops Development, and Animal Husbandry, Livestock, Fisheries & Veterinary Services Departments',
    post: 'Laboratory Attendant',
    existingGradePay: 2200,
    upgradedGradePay: 2400,
    revisedLevel: 6,
    reportParagraph: '5.14'
  },
  {
    id: 'food-security-field-assistant',
    department: 'Food Security and Agriculture Development and Horticulture & Cash Crops Development Departments',
    post: 'Field Assistant',
    existingGradePay: 2300,
    upgradedGradePay: 2400,
    revisedLevel: 6,
    reportParagraph: '5.15'
  },
  {
    id: 'excise-head-constable',
    department: 'Excise (Abkari) Department',
    post: 'Head Constable',
    existingGradePay: 3000,
    upgradedGradePay: 3400,
    revisedLevel: 10,
    reportParagraph: '5.33'
  },
  {
    id: 'excise-assistant-sub-inspector',
    department: 'Excise (Abkari) Department',
    post: 'Assistant Sub-Inspector',
    existingGradePay: 3000,
    upgradedGradePay: 3800,
    revisedLevel: 11,
    reportParagraph: '5.33'
  },
  {
    id: 'excise-sub-inspector',
    department: 'Excise (Abkari) Department',
    post: 'Sub-Inspector',
    existingGradePay: 3400,
    upgradedGradePay: 4200,
    revisedLevel: 12,
    reportParagraph: '5.33'
  },
  {
    id: 'excise-inspector',
    department: 'Excise (Abkari) Department',
    post: 'Inspector',
    existingGradePay: 3800,
    upgradedGradePay: 4600,
    revisedLevel: 14,
    reportParagraph: '5.33'
  },
  {
    id: 'forest-head-forest-guard',
    department: 'Forest, Environment and Wildlife Management Department',
    post: 'Head Forest Guard',
    existingGradePay: 3000,
    upgradedGradePay: 3400,
    revisedLevel: 10,
    reportParagraph: '5.70'
  },
  {
    id: 'forest-block-officer',
    department: 'Forest, Environment and Wildlife Management Department',
    post: 'Block Officer',
    existingGradePay: 3400,
    upgradedGradePay: 3800,
    revisedLevel: 11,
    reportParagraph: '5.70'
  },
  {
    id: 'forest-range-officer',
    department: 'Forest, Environment and Wildlife Management Department',
    post: 'Range Officer',
    existingGradePay: 4200,
    upgradedGradePay: 4600,
    revisedLevel: 14,
    reportParagraph: '5.70'
  },
  {
    id: 'engineering-junior-engineer',
    department: 'Sub-ordinate Engineering Service',
    post: 'Junior Engineer',
    existingGradePay: 3800,
    upgradedGradePay: 4200,
    revisedLevel: 12,
    reportParagraph: '5.72'
  },
  {
    id: 'police-head-constable',
    department: 'Sub-ordinate Police Service',
    post: 'Head Constable',
    existingGradePay: 3000,
    upgradedGradePay: 3400,
    revisedLevel: 10,
    reportParagraph: '5.78'
  },
  {
    id: 'police-assistant-sub-inspector',
    department: 'Sub-ordinate Police Service',
    post: 'Asstt. Sub-Inspector',
    existingGradePay: 3400,
    upgradedGradePay: 3800,
    revisedLevel: 11,
    reportParagraph: '5.78'
  },
  {
    id: 'police-sub-inspector',
    department: 'Sub-ordinate Police Service',
    post: 'Sub-Inspector',
    existingGradePay: 3800,
    upgradedGradePay: 4200,
    revisedLevel: 12,
    reportParagraph: '5.79'
  },
  {
    id: 'revenue-assistant-sub-inspector',
    department: 'Sub-ordinate Revenue Service, Commercial Tax Division, FRED',
    post: 'Assistant Sub Inspector',
    existingGradePay: 2700,
    upgradedGradePay: 3000,
    revisedLevel: 9,
    reportParagraph: '5.85'
  },
  {
    id: 'revenue-sub-inspector',
    department: 'Sub-ordinate Revenue Service, Commercial Tax Division, FRED',
    post: 'Sub Inspector',
    existingGradePay: 3000,
    upgradedGradePay: 3400,
    revisedLevel: 10,
    reportParagraph: '5.85'
  },
  {
    id: 'revenue-inspector',
    department: 'Sub-ordinate Revenue Service, Commercial Tax Division, FRED',
    post: 'Inspector',
    existingGradePay: 3800,
    upgradedGradePay: 4200,
    revisedLevel: 12,
    reportParagraph: '5.85'
  },
  {
    id: 'transport-constable',
    department: 'Transport Department (SNT)',
    post: 'Constable, Transport Department',
    existingGradePay: 2300,
    upgradedGradePay: 2400,
    revisedLevel: 6,
    reportParagraph: '5.86'
  },
  {
    id: 'transport-mechanics-non-iti',
    department: 'Transport Department (SNT)',
    post: 'Mechanics (Non ITI)',
    existingGradePay: 2200,
    upgradedGradePay: 2300,
    revisedLevel: 5,
    reportParagraph: '5.16'
  },
  {
    id: 'health-counsellor-pharmacist-degree',
    department: 'Health Care, Human Services & Family Welfare Department',
    post: 'Counsellor/Pharmacist with degree',
    existingGradePay: 3800,
    upgradedGradePay: 4200,
    revisedLevel: 12,
    reportParagraph: '5.43'
  }
];

export const POST_MAPPING_SOURCE = Object.freeze({
  title: 'Sikkim Government Services (Revised Pay) Rules, 2018',
  gazette: 'Sikkim Government Gazette Extraordinary No. 333',
  notification: 'No. 56/GEN/DOP dated 23 June 2018',
  part: 'Schedule Part B',
  printedPage: 15,
  url: 'https://www.sikkim.gov.in/uploads/Gazette/333_20240813.pdf'
});

export const POST_LEVEL_MAPPINGS = Object.freeze(
  SOURCE_MAPPINGS.map((mapping) => Object.freeze(mapping))
);

const groups = [];
const groupIndex = new Map();

for (const mapping of POST_LEVEL_MAPPINGS) {
  let groupPosition = groupIndex.get(mapping.department);
  if (groupPosition === undefined) {
    groupPosition = groups.length;
    groupIndex.set(mapping.department, groupPosition);
    groups.push({ department: mapping.department, posts: [] });
  }
  groups[groupPosition].posts.push(mapping);
}

export const POST_MAPPING_GROUPS = Object.freeze(
  groups.map((group) =>
    Object.freeze({
      department: group.department,
      posts: Object.freeze([...group.posts])
    })
  )
);

/** @param {string} id */
export function getPostMapping(id) {
  return POST_LEVEL_MAPPINGS.find((mapping) => mapping.id === id);
}
