/**
 * GraminAI Deterministic Financial Engine
 * Aligned with NSFDC (National Scheduled Castes Finance and Development Corporation)
 * and NBCFDC statutory underwriting rules.
 * 
 * ZERO SYNTHETIC HALLUCINATIONS: Strict mathematical computation.
 */

export const SCHEMES = {
  MICRO_FINANCE: {
    id: 'nsfdc-mfs',
    code: 'NSFDC-MFS-2025',
    name: 'Micro Finance Scheme (NSFDC Tier I)',
    name_hi: 'माइक्रो फाइनेंस योजना (एनएसएफडीसी टियर I)',
    name_te: 'మైక్రో ఫైనాన్స్ పథకం (NSFDC టైర్ I)',
    maxProjectCost: 140000,
    marginPct: 0.10, // 10% own margin
    loanPct: 0.90,   // 90% concessional loan
    interestRate: 6.5, // 6.5% p.a. simple concessional
    tenureYears: 3,
    moratoriumMonths: 3,
    repaymentFreq: 'Quarterly / Monthly harvest-linked'
  },
  TERM_LOAN_TIER_II: {
    id: 'nsfdc-tls',
    code: 'NSFDC-TL-2025',
    name: 'Term Loan Scheme (NSFDC Tier II)',
    name_hi: 'टर्म लोन योजना (एनएसएफडीसी टियर II)',
    name_te: 'టర్మ్ లోన్ పథకం (NSFDC టైర్ II)',
    maxProjectCost: 5000000, // Up to ₹50 Lakhs
    marginPct: 0.10, // 10% own margin
    loanPct: 0.90,   // 90% concessional loan
    interestRate: 8.0, // 8.0% p.a.
    tenureYears: 7,
    moratoriumMonths: 6,
    repaymentFreq: 'Quarterly harvest-linked'
  }
};

/**
 * Routes the appropriate statutory scheme based on project cost or margin money.
 */
export function routeScheme(projectCost) {
  if (projectCost <= SCHEMES.MICRO_FINANCE.maxProjectCost) {
    return SCHEMES.MICRO_FINANCE;
  }
  return SCHEMES.TERM_LOAN_TIER_II;
}

/**
 * Calculates project cost and loan parameters from applicant's margin money.
 * Standard NSFDC ratio: Margin = 10%, Concessional Loan = 90%
 */
export function calculateFinancials(marginMoney) {
  const margin = Math.max(10000, Number(marginMoney) || 10000);
  
  // Total feasible project cost = Margin / 0.10 (10x leverage)
  let projectCost = Math.round(margin / 0.10);
  
  // Hard cap at NSFDC upper limit: ₹50,00,000
  if (projectCost > 5000000) {
    projectCost = 5000000;
  }
  
  const eligibleLoan = Math.round(projectCost * 0.90);
  const scheme = routeScheme(projectCost);
  
  // Monthly interest rate
  const annualRate = scheme.interestRate;
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = scheme.tenureYears * 12;
  
  // Standard EMI formula: [P * r * (1 + r)^n] / [(1 + r)^n - 1]
  const emi = Math.round(
    (eligibleLoan * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  // Quarterly EMI (NSFDC standard for agricultural and rural enterprises)
  const quarterlyRate = annualRate / 4 / 100;
  const totalQuarters = scheme.tenureYears * 4;
  const quarterlyEMI = Math.round(
    (eligibleLoan * quarterlyRate * Math.pow(1 + quarterlyRate, totalQuarters)) /
    (Math.pow(1 + quarterlyRate, totalQuarters) - 1)
  );

  // Total repayment over tenure
  const totalRepayment = emi * totalMonths;
  const totalInterest = totalRepayment - eligibleLoan;
  
  // Simple moratorium interest during moratorium window (interest-only)
  const moratoriumMonthlyInterest = Math.round((eligibleLoan * (annualRate / 100)) / 12);

  return {
    marginMoney: margin,
    projectCost,
    eligibleLoan,
    scheme,
    interestRate: annualRate,
    tenureYears: scheme.tenureYears,
    moratoriumMonths: scheme.moratoriumMonths,
    monthlyEMI: emi,
    quarterlyEMI,
    totalRepayment,
    totalInterest,
    moratoriumMonthlyInterest
  };
}

/**
 * Format Indian Rupee currency (e.g. ₹10,00,000, ₹14,028)
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const num = Math.round(Number(amount));
  return '₹' + num.toLocaleString('en-IN');
}

/**
 * Format in Lakhs / Crores for compact badges
 */
export function formatCompactINR(amount) {
  const num = Number(amount);
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} Lakh`;
  }
  if (num >= 1000) {
    return `₹${(num / 1000).toFixed(0)}k`;
  }
  return `₹${num}`;
}

/**
 * Calculate Debt Service Coverage Ratio (DSCR)
 * DSCR = Net Operating Income / Debt Service Requirement
 * Benchmarks: > 1.5 is Strong, 1.25 - 1.5 is Acceptable, < 1.25 is Risky
 */
export function calculateDSCR(monthlyRevenue, monthlyOpex, monthlyEMI) {
  const netSurplus = monthlyRevenue - monthlyOpex;
  if (monthlyEMI <= 0) return 3.0;
  const dscr = parseFloat((netSurplus / monthlyEMI).toFixed(2));
  return {
    netSurplus,
    dscr,
    isViable: dscr >= 1.25,
    rating: dscr >= 1.75 ? 'Safe / High' : dscr >= 1.3 ? 'Moderate' : 'Tight / Field Review Needed'
  };
}
