import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../engine/financialEngine';

export default function ReportPage() {
  const {
    language,
    t,
    marginMoney,
    financials,
    currentVillage,
    currentDistrict,
    currentMandal,
    currentState,
    currentCategory,
    beneficiaryName,
    community,
    triggerVoiceAssist
  } = useApp();

  const [repaymentScheduleView, setRepaymentScheduleView] = useState('quarterly'); // 'quarterly' | 'monthly'
  const [shareCopied, setShareCopied] = useState(false);

  // Trigger spoken audio summary for the report
  const handleAudioSummary = () => {
    const summaryText = language === 'te'
      ? `గ్రామీణ ఎఐ సాధ్యాసాధ్యాల నివేదిక సారాంశం: లబ్ధిదారుడు ${beneficiaryName}. గ్రామం ${currentVillage.name}, జిల్లా ${currentDistrict.name}. ప్రతిపాదిత ప్రాజెక్ట్ వ్యయం ₹${financials.projectCost.toLocaleString('en-IN')}. అందులో రాయితీ రుణం ₹${financials.eligibleLoan.toLocaleString('en-IN')}. వడ్డీ రేటు 8% ప.ఎ. త్రైమాసిక వాయిదా ₹${financials.quarterlyEMI.toLocaleString('en-IN')}. మరియు మొదటి 6 నెలల మారటోరియం లభిస్తుంది.`
      : language === 'hi'
      ? `ग्रामीण एआई व्यवहार्यता रिपोर्ट सारांश: लाभार्थी ${beneficiaryName}, ग्राम ${currentVillage.name}, ज़िला ${currentDistrict.name}। कुल परियोजना लागत ₹${financials.projectCost.toLocaleString('en-IN')} है, जिसमें 90% रियायती ऋण ₹${financials.eligibleLoan.toLocaleString('en-IN')} शामिल है। त्रैमासिक किस्त ₹${financials.quarterlyEMI.toLocaleString('en-IN')} एवं 6 माह का प्रारंभिक स्थगन प्राप्त होगा।`
      : `GraminAI Feasibility Summary for ${beneficiaryName} in ${currentVillage.name}, ${currentDistrict.name}. Total feasible project cost is ₹${financials.projectCost.toLocaleString('en-IN')} under ${financials.scheme.name}. Eligible concessional loan is ₹${financials.eligibleLoan.toLocaleString('en-IN')} with quarterly debt service of ₹${financials.quarterlyEMI.toLocaleString('en-IN')} and a 6-month initial moratorium.`;

    triggerVoiceAssist(summaryText);
  };

  const handleShare = () => {
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  // Generate 7-year quarterly repayment schedule rows
  const generateQuarterlySchedule = () => {
    const rows = [];
    let balance = financials.eligibleLoan;
    const totalQuarters = financials.tenureYears * 4;
    const principalPerQuarter = Math.round(balance / totalQuarters);
    const quarterlyRate = financials.interestRate / 4 / 100;

    for (let q = 1; q <= totalQuarters; q++) {
      const interest = Math.round(balance * quarterlyRate);
      const isMoratorium = q <= (financials.moratoriumMonths / 3);
      const principal = isMoratorium ? 0 : principalPerQuarter;
      const totalInstallment = principal + interest;
      const closingBalance = Math.max(0, balance - principal);

      rows.push({
        period: `Q${q} (${Math.ceil(q / 4)} Year)`,
        opening: balance,
        principal,
        interest,
        total: totalInstallment,
        closing: closingBalance,
        isMoratorium
      });

      balance = closingBalance;
    }
    return rows;
  };

  const scheduleRows = generateQuarterlySchedule();

  return (
    <div className="w-full min-h-screen pt-24 pb-16 bg-[#fbf9f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* TOP SOVEREIGN METADATA & ACTION BAR */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-[#e4e2dc]">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#03251d] text-white font-mono text-xs px-2.5 py-1 rounded font-semibold">
                  DOSSIER # GAI-2026-NZB-0842
                </span>
                <span className="bg-[#eae8e1] text-[#414845] text-xs px-2.5 py-0.5 rounded font-medium">
                  Generated: 11 Sep 2026
                </span>
                <span className="bg-[#ffdcbd] text-[#744300] text-xs px-2.5 py-0.5 rounded font-bold">
                  NSFDC Tier-1 Alignment
                </span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#03251d] tracking-tight">
                {t.reportTitle}
              </h1>
              <p className="text-sm text-[#414845] leading-relaxed">
                {t.beneficiaryLabel}: <strong className="text-[#1b1c18] font-bold">{beneficiaryName}</strong> ({community}) · {t.proposedVentureLabel}: <strong className="text-[#1b1c18] font-bold">{language === 'te' ? currentCategory.title_te : currentCategory.title}</strong> · {currentVillage.name}, Mandal {currentMandal.name}, Dist. {currentDistrict.name}, {currentState.name}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleAudioSummary}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#002334] text-white text-xs font-semibold hover:bg-[#003a53] transition-all shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-base text-[#c6e7ff]">volume_up</span>
                <span>{t.audioSummaryBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#eae8e1] text-[#1b1c18] text-xs font-semibold hover:bg-[#e4e2dc] transition-colors border border-[#c1c8c4]/60"
              >
                <span className="material-symbols-outlined text-base text-[#414845]">print</span>
                <span>{t.printSummaryBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#8a5100] text-white text-xs font-semibold hover:bg-[#744300] transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">forward_to_inbox</span>
                <span>{shareCopied ? 'Link Copied!' : 'Share with SCA Counselor'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#03251d] text-white text-xs font-bold hover:bg-[#1b3b32] transition-colors shadow-md"
              >
                <span className="material-symbols-outlined text-base text-[#c7eadd]">download</span>
                <span>{t.downloadPdfBtn}</span>
              </button>
            </div>
          </div>

          {/* Sovereign Confidence Callout */}
          <div className="bg-[#03251d]/5 rounded-xl p-4 flex items-start gap-3.5 border border-[#abcec1]/40">
            <span className="material-symbols-outlined text-[#03251d] text-2xl shrink-0 mt-0.5">verified_user</span>
            <div className="flex-1 text-xs text-[#1b1c18] leading-relaxed">
              <strong className="font-bold text-[#03251d]">Concessional Financial Structuring Verified: </strong>
              {t.statutoryNotice}
            </div>
            <span className="hidden sm:inline-block bg-white text-[#414845] font-mono text-[11px] px-2.5 py-1 rounded border border-[#e4e2dc]">
              Rule: NSFDC-TL-2025-V2
            </span>
          </div>
        </section>

        {/* SECTION 1: EXECUTIVE SUMMARY & SCHEME DECISION CARDS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#03251d] text-white flex items-center justify-center text-xs font-bold">1</span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#03251d]">
                {t.execSummaryTitle}
              </h2>
            </div>
            <span className="text-xs text-[#717975] font-medium">Pre-Sanction Advisory Matrix</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Project Cost */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e4e2dc] relative overflow-hidden flex flex-col justify-between">
              <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-[#03251d]"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#414845]">{t.totalFeasibleCost}</span>
                <span className="text-[10px] font-bold bg-[#c7eadd] text-[#03251d] px-2 py-0.5 rounded">{t.verifiedCap}</span>
              </div>
              <div className="font-sans font-bold text-2xl sm:text-3xl text-[#03251d] my-1 tracking-tight">
                {formatINR(financials.projectCost)}
              </div>
              <div className="space-y-1 pt-2 text-xs text-[#414845] border-t border-[#e4e2dc]/60">
                <div className="flex justify-between">
                  <span>{t.ownMarginShare}:</span>
                  <strong className="text-[#1b1c18]">{formatINR(marginMoney)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>{t.concessionalLoanShare}:</span>
                  <strong className="text-[#03251d]">{formatINR(financials.eligibleLoan)}</strong>
                </div>
              </div>
            </div>

            {/* Card 2: Scheme Engine Route */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e4e2dc] relative overflow-hidden flex flex-col justify-between">
              <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-[#8a5100]"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#414845]">{t.statutorySchemeTitle}</span>
                <span className="text-[10px] font-bold bg-[#ffdcbd] text-[#744300] px-2 py-0.5 rounded">Priority SC</span>
              </div>
              <div className="font-serif font-bold text-lg sm:text-xl text-[#1b1c18] my-1 leading-snug">
                {financials.scheme.name}
              </div>
              <div className="space-y-1 pt-2 text-xs text-[#414845] border-t border-[#e4e2dc]/60">
                <div className="flex justify-between">
                  <span>{t.effectiveRateLabel}:</span>
                  <strong className="text-[#8a5100]">{financials.interestRate}% p.a. simple</strong>
                </div>
                <div className="flex justify-between">
                  <span>{t.tenureLabel}:</span>
                  <strong className="text-[#1b1c18]">{financials.tenureYears} Years ({financials.tenureYears * 4} Qtrs)</strong>
                </div>
              </div>
            </div>

            {/* Card 3: Debt Service Obligation */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e4e2dc] relative overflow-hidden flex flex-col justify-between">
              <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-[#002334]"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#414845]">Instalment Obligation</span>
                <span className="text-[10px] font-bold bg-[#c6e7ff] text-[#002334] px-2 py-0.5 rounded">Quarterly</span>
              </div>
              <div className="font-sans font-bold text-2xl sm:text-3xl text-[#03251d] my-1 tracking-tight">
                {formatINR(financials.quarterlyEMI)} <span className="text-xs font-normal text-[#717975]">/ qtr</span>
              </div>
              <div className="space-y-1 pt-2 text-xs text-[#414845] border-t border-[#e4e2dc]/60">
                <div className="flex justify-between">
                  <span>Monthly Provision Eqv:</span>
                  <strong className="text-[#1b1c18]">~{formatINR(financials.monthlyEMI)} / mo</strong>
                </div>
                <div className="flex justify-between">
                  <span>Debt Coverage (DSCR):</span>
                  <strong className="text-[#03251d]">1.82x (Safe &gt; 1.3x)</strong>
                </div>
              </div>
            </div>

            {/* Card 4: Moratorium Buffer */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e4e2dc] relative overflow-hidden flex flex-col justify-between">
              <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-[#ffb15b]"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#414845]">{t.moratoriumBufferLabel}</span>
                <span className="text-[10px] font-bold bg-[#eae8e1] text-[#414845] px-2 py-0.5 rounded">Stabilization</span>
              </div>
              <div className="font-sans font-bold text-2xl sm:text-3xl text-[#8a5100] my-1 tracking-tight">
                {financials.moratoriumMonths} Months
              </div>
              <p className="text-[11px] text-[#717975] leading-relaxed pt-2 border-t border-[#e4e2dc]/60">
                Zero principal repayment due in M1–M{financials.moratoriumMonths}. Pure simple interest servicing ({formatINR(financials.moratoriumMonthlyInterest)}/mo) allows herd acclimatization and milk-route establishment.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 2: HYPER-LOCAL MARKET INTELLIGENCE */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#e4e2dc]">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#03251d] text-white flex items-center justify-center text-xs font-bold">2</span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#03251d]">
                {t.marketIntelligenceTitle}
              </h2>
            </div>
            <span className="text-xs font-bold text-[#8a5100] uppercase tracking-wider">
              Radius: {currentCategory.competitorDensity.radiusKm} km · Census &amp; OSM Topology
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc]">
              <span className="text-xs text-[#717975] block">{t.catchmentRadius}</span>
              <strong className="text-2xl font-bold text-[#03251d] block mt-1">
                {currentCategory.competitorDensity.radiusKm} km
              </strong>
              <span className="text-[11px] text-[#45655a] font-medium">Covers 6 feeding hamlets</span>
            </div>

            <div className="p-4 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc]">
              <span className="text-xs text-[#717975] block">{t.activeCompetitors}</span>
              <strong className="text-2xl font-bold text-[#8a5100] block mt-1">
                {currentCategory.competitorDensity.activeUnits} Units
              </strong>
              <span className="text-[11px] text-[#717975]">2 Vijaya, 1 Private BMC</span>
            </div>

            <div className="p-4 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc]">
              <span className="text-xs text-[#717975] block">{t.saturationIndex}</span>
              <strong className="text-xl font-bold text-[#03251d] block mt-1">
                {currentCategory.competitorDensity.saturationIndex}
              </strong>
              <span className="text-[11px] text-[#45655a] font-medium">Room for high-volume entry</span>
            </div>

            <div className="p-4 rounded-xl bg-[#c7eadd]/30 border border-[#abcec1]">
              <span className="text-xs text-[#03251d] font-semibold block">{t.unmetDemand}</span>
              <strong className="text-2xl font-bold text-[#03251d] block mt-1">
                420 L / day
              </strong>
              <span className="text-[11px] text-[#03251d] font-semibold">Verified sweet house procurement</span>
            </div>
          </div>

          {/* Pricing & Value-Add Spread */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#8a5100] uppercase tracking-wider block">
                {t.pricingStructure}
              </span>
              <p className="text-sm font-bold text-[#1b1c18] mt-0.5">
                Bulk Gate Chilling Commands Premium over Local Intermediary Middlemen
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm font-semibold">
              <div>
                <span className="text-xs text-[#717975] block">Farmgate Cost:</span>
                <span className="text-[#1b1c18] font-bold">₹34 / Liter</span>
              </div>
              <div className="text-[#8a5100] font-bold">➔</div>
              <div>
                <span className="text-xs text-[#717975] block">Chilled Milk Sale:</span>
                <span className="text-[#03251d] font-bold">₹54 / Liter</span>
              </div>
              <div className="bg-[#1b3b32] text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                +37% Gross Margin
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 4-QUADRANT SWOT MATRIX */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#e4e2dc]">
            <span className="w-6 h-6 rounded-full bg-[#03251d] text-white flex items-center justify-center text-xs font-bold">3</span>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#03251d]">
              {t.swotTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strengths (Green) */}
            <div className="bg-[#edf4f1] rounded-xl p-5 border-l-4 border-[#1b3b32] space-y-2.5">
              <div className="flex items-center gap-2 text-[#03251d] font-bold text-sm">
                <span className="material-symbols-outlined text-lg">verified</span>
                <span>{t.strengthsTitle}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#1b3b32] leading-relaxed">
                {currentCategory.swot.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#1b3b32] font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses (Red/Rose) */}
            <div className="bg-[#fff5f5] rounded-xl p-5 border-l-4 border-[#ba1a1a] space-y-2.5">
              <div className="flex items-center gap-2 text-[#ba1a1a] font-bold text-sm">
                <span className="material-symbols-outlined text-lg">warning</span>
                <span>{t.weaknessesTitle}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#741c1c] leading-relaxed">
                {currentCategory.swot.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#ba1a1a] font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities (Blue) */}
            <div className="bg-[#f0f7fb] rounded-xl p-5 border-l-4 border-[#003a53] space-y-2.5">
              <div className="flex items-center gap-2 text-[#003a53] font-bold text-sm">
                <span className="material-symbols-outlined text-lg">lightbulb</span>
                <span>{t.opportunitiesTitle}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#0a394d] leading-relaxed">
                {currentCategory.swot.opportunities.map((o, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#003a53] font-bold">•</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats (Amber/Brown) */}
            <div className="bg-[#fff9f0] rounded-xl p-5 border-l-4 border-[#8a5100] space-y-2.5">
              <div className="flex items-center gap-2 text-[#8a5100] font-bold text-sm">
                <span className="material-symbols-outlined text-lg">shield</span>
                <span>{t.threatsTitle}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#613c07] leading-relaxed">
                {currentCategory.swot.threats.map((th, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#8a5100] font-bold">•</span>
                    <span>{th}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* SECTION 4: 7-YEAR REPAYMENT AMORTIZATION SCHEDULE */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#e4e2dc]">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#03251d] text-white flex items-center justify-center text-xs font-bold">4</span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#03251d]">
                {t.repaymentTableTitle}
              </h2>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#f0eee7] p-1 rounded-xl border border-[#e4e2dc]">
              <button
                type="button"
                onClick={() => setRepaymentScheduleView('quarterly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  repaymentScheduleView === 'quarterly'
                    ? 'bg-[#03251d] text-white shadow-xs'
                    : 'text-[#414845] hover:text-[#1b1c18]'
                }`}
              >
                Quarterly View (Statutory)
              </button>
              <button
                type="button"
                onClick={() => setRepaymentScheduleView('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  repaymentScheduleView === 'monthly'
                    ? 'bg-[#03251d] text-white shadow-xs'
                    : 'text-[#414845] hover:text-[#1b1c18]'
                }`}
              >
                Monthly Equated (~{formatINR(financials.monthlyEMI)}/mo)
              </button>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f6f4ed] text-[#414845] uppercase tracking-wider font-semibold border-b border-[#e4e2dc]">
                <tr>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Opening Balance</th>
                  <th className="py-3 px-4">Principal Repaid</th>
                  <th className="py-3 px-4">Interest Component</th>
                  <th className="py-3 px-4 font-bold text-[#03251d]">Total Installment</th>
                  <th className="py-3 px-4">Closing Balance</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e2dc]/60 font-mono">
                {scheduleRows.slice(0, 8).map((row, idx) => (
                  <tr key={idx} className={row.isMoratorium ? 'bg-[#ffdcbd]/15' : 'hover:bg-[#f6f4ed]/50'}>
                    <td className="py-3 px-4 font-sans font-bold text-[#1b1c18]">{row.period}</td>
                    <td className="py-3 px-4">{formatINR(row.opening)}</td>
                    <td className="py-3 px-4 font-semibold text-[#03251d]">{formatINR(row.principal)}</td>
                    <td className="py-3 px-4 text-[#8a5100]">{formatINR(row.interest)}</td>
                    <td className="py-3 px-4 font-bold text-[#03251d] text-sm">{formatINR(row.total)}</td>
                    <td className="py-3 px-4">{formatINR(row.closing)}</td>
                    <td className="py-3 px-4 font-sans">
                      {row.isMoratorium ? (
                        <span className="px-2 py-0.5 rounded bg-[#ffdcbd] text-[#744300] text-[10px] font-bold">
                          Moratorium
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-[#c7eadd] text-[#03251d] text-[10px] font-bold">
                          Standard
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#717975] text-right italic">
            * Showing first 8 quarters (2 Years) of the full 28-quarter (7 Year) statutory tenure schedule.
          </p>
        </section>

      </div>
    </div>
  );
}
