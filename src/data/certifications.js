// Certifications, newest first. Every Coursera link was opened and checked on 2026-10-19.
const coursera = (id) => `https://www.coursera.org/account/accomplishments/verify/${id}`;

// Colours used for the issuer badge and card accent.
export const issuers = {
  'AWS SBG CUI': { color: '#ff9900', short: 'AWS SBG' },
  SkillUp: { color: '#2dd4bf', short: 'SkillUp' },
  IBM: { color: '#4589ff', short: 'IBM' },
  Meta: { color: '#0866ff', short: 'Meta' },
  Anthropic: { color: '#d97757', short: 'Anthropic' },
  Other: { color: '#94a3b8', short: 'Other' }, // fallback for an issuer not listed above
};

export const certifications = [
  {
    title: '“1 to 1 Million” Workshop, Certificate of Attendance',
    issuer: 'AWS SBG CUI',
    issuerFull: 'AWS Student Builder Group, CUI',
    date: 'Oct 2026',
    credentialId: 'a6b3ad36-2b09-4cfa-9089-beedaf8dcf87',
    verify: 'https://credsverse.com/credentials/a6b3ad36-2b09-4cfa-9089-beedaf8dcf87',
    note: 'Workshop attendance, Oct 8, 2026. Not an AWS technical certification.',
  },
  {
    title: 'Spring Framework for Java Development',
    issuer: 'SkillUp',
    issuerFull: 'SkillUp (Coursera)',
    date: 'Dec 2025',
    credentialId: '0EK7BMVDCNXA',
    verify: coursera('0EK7BMVDCNXA'),
  },
  {
    title: 'Introduction to HTML, CSS, & JavaScript',
    issuer: 'IBM',
    issuerFull: 'IBM (Coursera)',
    date: 'Oct 2025',
    credentialId: 'JQFCR6A9MKCK',
    verify: coursera('JQFCR6A9MKCK'),
  },
  {
    title: 'Object Oriented Programming in Java',
    issuer: 'IBM',
    issuerFull: 'IBM (Coursera)',
    date: 'Sep 2025',
    credentialId: 'SH4PK482NUCP',
    verify: coursera('SH4PK482NUCP'),
  },
  {
    title: 'HTML and CSS in depth',
    issuer: 'Meta',
    issuerFull: 'Meta (Coursera)',
    date: 'Sep 2025',
    credentialId: 'NSM4LTIYWK6L',
    verify: coursera('NSM4LTIYWK6L'),
  },
  {
    title: 'Version Control',
    issuer: 'Meta',
    issuerFull: 'Meta (Coursera)',
    date: 'Aug 2025',
    credentialId: 'IJ90NK37R5JR',
    verify: coursera('IJ90NK37R5JR'),
  },
  {
    title: 'Programming with JavaScript',
    issuer: 'Meta',
    issuerFull: 'Meta (Coursera)',
    date: 'Aug 2025',
    credentialId: '14TK2X7D9O62',
    verify: coursera('14TK2X7D9O62'),
  },
  {
    title: 'Java Programming for Beginners',
    issuer: 'IBM',
    issuerFull: 'IBM (Coursera)',
    date: 'Aug 2025',
    credentialId: 'RILUCB64B5ZW',
    verify: coursera('RILUCB64B5ZW'),
  },
  {
    title: 'Introduction to Front-End Development',
    issuer: 'Meta',
    issuerFull: 'Meta (Coursera)',
    date: 'Aug 2025',
    credentialId: 'QQ4BMATTM6Z0',
    verify: coursera('QQ4BMATTM6Z0'),
  },
  {
    title: 'Introduction to Software Engineering',
    issuer: 'IBM',
    issuerFull: 'IBM (Coursera)',
    date: 'Aug 2025',
    credentialId: '5HLEFAYPEVFX',
    verify: coursera('5HLEFAYPEVFX'),
  },
];

export const inProgress = {
  title: 'Anthropic Claude Certification (Claude Architect path)',
  issuer: 'Anthropic',
  issuerFull: 'Preparing via Panaversity AI Agent Factory',
  date: 'In progress',
};
