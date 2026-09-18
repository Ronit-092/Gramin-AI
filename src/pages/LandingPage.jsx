import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatINR } from '../engine/financialEngine';

export default function LandingPage() {
  const navigate = useNavigate();
  const { language, t, marginMoney, setMarginMoney, financials, triggerVoiceAssist } = useApp();

  const handlePresetMargin = (amount) => {
    setMarginMoney(amount);
  };

  const handleContinueWizard = () => {
    navigate('/wizard');
  };

  const handleSampleReport = () => {
    navigate('/report');
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-16 bg-[#fbf9f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* HERO SECTION WITH DUAL COLUMN LAYOUT */}
        <section className="relative w-full rounded-3xl overflow-hidden bg-white p-6 sm:p-8 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e4e2dc] mb-12">
          {/* Subtle civic ambient gradients */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#c7eadd]/25 pointer-events-none blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#ffdcbd]/25 pointer-events-none blur-2xl"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Hero Copy & Value Proposition */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* Badges Pill Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b3b32] text-white text-xs font-semibold shadow-sm">
                  <span className="material-symbols-outlined text-sm text-[#c7eadd]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shield
                  </span>
                  <span>{t.msjeAligned}</span>
                </span>
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eae8e1] text-[#414845] text-xs font-semibold border border-[#c1c8c4]/60">
                  <span className="material-symbols-outlined text-sm text-[#8a5100]">verified_user</span>
                  <span>{t.zeroHallucination}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eae8e1] text-[#414845] text-xs font-semibold border border-[#c1c8c4]/60">
                  <span className="material-symbols-outlined text-sm text-[#45655a]">pin_drop</span>
                  <span>{t.censusGrounded}</span>
                </span>
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm tracking-wider text-[#8a5100] uppercase font-bold">
                  {t.preDecisionSupport}
                </p>
                <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#03251d] tracking-tight">
                  {t.heroTitle}
                </h1>
                <p className="font-serif text-lg sm:text-xl text-[#8a5100] pt-1">
                  {language === 'te'
                    ? 'మీ గ్రామీణ వ్యాపార ఆలోచనను బ్యాంక్ ఆమోదిత, డేటా-ఆధారిత సంస్థగా మార్చుకోండి.'
                    : 'अपने ग्रामीण व्यवसाय विचार को बैंक-स्वीकृत उद्यम में बदलें।'}
                </p>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#414845] max-w-2xl leading-relaxed">
                {t.heroDesc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={handleContinueWizard}
                  className="inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-xl bg-[#03251d] text-white font-semibold text-base shadow-lg shadow-[#03251d]/15 hover:bg-[#1b3b32] transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-xl text-[#c7eadd]">auto_awesome</span>
                  <span>{t.startWizardBtn}</span>
                </button>

                <button
                  onClick={handleSampleReport}
                  className="inline-flex items-center justify-center gap-2.5 h-14 px-6 rounded-xl bg-[#eae8e1] text-[#03251d] font-semibold text-base hover:bg-[#e4e2dc] transition-colors border border-[#c1c8c4]/50"
                >
                  <span className="material-symbols-outlined text-xl text-[#8a5100]">assignment</span>
                  <span>{t.sampleReportBtn}</span>
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-[#e4e2dc]">
                <div className="p-3 sm:p-4 rounded-xl bg-[#f6f4ed] flex flex-col border border-[#e4e2dc]/60">
                  <span className="font-sans font-bold text-2xl sm:text-3xl text-[#03251d]">35,400+</span>
                  <span className="text-xs text-[#414845] font-medium mt-0.5">{t.villagesMapped}</span>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-[#f6f4ed] flex flex-col border border-[#e4e2dc]/60">
                  <span className="font-sans font-bold text-2xl sm:text-3xl text-[#8a5100]">₹14k – ₹50L</span>
                  <span className="text-xs text-[#414845] font-medium mt-0.5">{t.projectBand}</span>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-[#f6f4ed] flex flex-col border border-[#e4e2dc]/60">
                  <span className="font-sans font-bold text-2xl sm:text-3xl text-[#03251d]">100%</span>
                  <span className="text-xs text-[#414845] font-medium mt-0.5">{t.deterministicMath}</span>
                </div>
              </div>

            </div>

            {/* Right Column: LIVE SIMULATION Smart Scheme Leverage Estimator */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-[#f6f4ed] rounded-2xl p-5 sm:p-7 shadow-md border border-[#e4e2dc] flex flex-col space-y-5 relative">
                
                {/* Top header of estimator */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#8a5100] uppercase tracking-wider block">
                      {t.liveSim}
                    </span>
                    <h2 className="font-serif font-bold text-lg text-[#03251d]">
                      {t.smartEstimator}
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#ffb15b] text-[#744300] text-xs font-bold shadow-xs">
                    {t.multiplierTag}
                  </span>
                </div>

                {/* Slider Control Block */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium text-[#414845]">
                      {t.availableMargin}
                    </span>
                    <span className="font-sans font-bold text-2xl sm:text-3xl text-[#03251d] tracking-tight">
                      {formatINR(marginMoney)}
                    </span>
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min="14000"
                    max="300000"
                    step="2000"
                    value={marginMoney}
                    onChange={(e) => setMarginMoney(Number(e.target.value))}
                    className="w-full accent-[#03251d] h-2 bg-[#eae8e1] rounded-lg cursor-pointer"
                  />

                  {/* Quick Preset Chips */}
                  <div className="flex items-center justify-between gap-1.5 mt-3">
                    {[14000, 50000, 100000, 300000].map((amt) => {
                      const isSelected = marginMoney === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handlePresetMargin(amt)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-[#1b3b32] text-white shadow-sm ring-1 ring-[#1b3b32]'
                              : 'bg-white text-[#414845] hover:bg-[#eae8e1] border border-[#e4e2dc]'
                          }`}
                        >
                          {formatINR(amt)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Calculated Results Block */}
                <div className="space-y-2.5 pt-1">
                  
                  {/* Total Feasible Cost */}
                  <div className="p-3.5 rounded-xl bg-white flex items-center justify-between border border-[#e4e2dc]/80 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-xl text-[#8a5100]">account_balance</span>
                      <span className="text-xs sm:text-sm font-medium text-[#414845]">
                        {t.totalFeasibleCost}
                      </span>
                    </div>
                    <span className="font-sans font-bold text-lg sm:text-xl text-[#03251d]">
                      {formatINR(financials.projectCost)}
                    </span>
                  </div>

                  {/* Eligible Concessional Loan */}
                  <div className="p-3.5 rounded-xl bg-white flex items-center justify-between border border-[#e4e2dc]/80 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-xl text-[#45655a]">payments</span>
                      <span className="text-xs sm:text-sm font-medium text-[#414845]">
                        {t.eligibleLoan}
                      </span>
                    </div>
                    <span className="font-sans font-bold text-lg sm:text-xl text-[#8a5100]">
                      {formatINR(financials.eligibleLoan)}
                    </span>
                  </div>

                  {/* Routed Scheme Box (Dark Accent) */}
                  <div className="p-3.5 rounded-xl bg-[#1b3b32] text-white space-y-1 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#c7eadd] uppercase tracking-wider">
                        {t.routedScheme}
                      </span>
                      <span className="text-[11px] font-bold bg-[#03251d] px-2 py-0.5 rounded text-[#c7eadd]">
                        {financials.interestRate}% p.a. Concession
                      </span>
                    </div>
                    <p className="font-serif font-semibold text-base text-[#c7eadd]">
                      {language === 'te'
                        ? financials.scheme.name_te
                        : language === 'hi'
                        ? financials.scheme.name_hi
                        : financials.scheme.name}
                    </p>
                    <p className="text-xs text-[#83a599]">
                      {financials.tenureYears}-year repayment window · {financials.moratoriumMonths}-month initial moratorium
                    </p>
                  </div>

                  {/* Estimated Monthly Installment */}
                  <div className="p-3.5 rounded-xl bg-white flex items-center justify-between border border-[#e4e2dc]/80 shadow-xs">
                    <div>
                      <span className="text-xs text-[#414845] font-medium block">
                        {t.estMonthlyInstallment}
                      </span>
                      <p className="text-[11px] text-[#8a5100] font-semibold">
                        {t.flexibleCycles}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-sans font-bold text-2xl text-[#03251d]">
                        {formatINR(financials.monthlyEMI)}
                      </span>
                      <span className="text-[11px] text-[#414845] font-medium block">
                        {t.perMonth}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Bottom CTA to Wizard */}
                <button
                  onClick={handleContinueWizard}
                  className="w-full h-12 rounded-xl bg-[#8a5100] hover:bg-[#744300] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
                >
                  <span>{t.continueAnalysisBtn}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: THE 2 CORE ENGINE MODULES */}
        <section className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 h-1 rounded bg-[#8a5100]"></span>
                <span className="text-xs font-bold text-[#8a5100] uppercase tracking-wider">
                  {t.algoArch}
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#03251d]">
                {t.twoCoreModules}
              </h2>
              <p className="text-sm sm:text-base text-[#414845] mt-1">
                {t.archDesc}
              </p>
            </div>
            <span className="inline-flex text-xs font-semibold px-3 py-1.5 rounded-full bg-[#eae8e1] text-[#414845] border border-[#c1c8c4]/60 self-start md:self-auto">
              Dual-Stream Validation Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Module 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#002334] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">map</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#e4e2dc] text-[#414845]">
                    Module 01
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#03251d]">
                    {t.module1Title}
                  </h3>
                  <p className="text-xs font-semibold text-[#8a5100] mt-0.5">
                    {t.module1Subtitle}
                  </p>
                </div>
                <p className="text-sm text-[#414845] leading-relaxed">
                  Automatically correlates rural LGD census codes with real-time OpenStreetMap point-of-interest layers. Evaluates 5–10 km catchment circles, counting existing processing units, competitor density, daily traffic arteries, and consumer clusters before an applicant spends margin money.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e4e2dc] flex items-center justify-between text-xs text-[#414845]">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-sm text-[#45655a]">check_circle</span>
                  LGD Code: 571204 Mapped
                </span>
                <span className="font-mono font-bold text-[#03251d]">Confidence: 98%</span>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#1b3b32] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">calculate</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#e4e2dc] text-[#414845]">
                    Module 02
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#03251d]">
                    {t.module2Title}
                  </h3>
                  <p className="text-xs font-semibold text-[#8a5100] mt-0.5">
                    {t.module2Subtitle}
                  </p>
                </div>
                <p className="text-sm text-[#414845] leading-relaxed">
                  Calculates exact 1:9 leverage ratios, interest concession bands (6.5% for Micro Finance, 8.0% for Term Loans), quarterly crop-aligned repayment windows, and 6-month moratorium safety buffers. Generates audit-ready Debt Service Coverage Ratios (DSCR).
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e4e2dc] flex items-center justify-between text-xs text-[#414845]">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-sm text-[#45655a]">check_circle</span>
                  Circular: NSFDC-TL-2025 Validated
                </span>
                <span className="font-mono font-bold text-[#8a5100]">Statutory Math</span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: 4-STEP APPLICANT JOURNEY */}
        <section className="bg-[#f6f4ed] rounded-3xl p-6 sm:p-10 border border-[#e4e2dc] mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#8a5100] uppercase tracking-wider block mb-1">
              CIVIC WORKFLOW PROTOCOL
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#03251d]">
              Simple, Dignified 4-Step Experience
            </h2>
            <p className="text-sm text-[#414845] mt-2">
              Designed specifically for rural entrepreneurs, women SHGs, and field financial counselors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-xl p-5 border border-[#e4e2dc] shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-[#1b3b32] text-white font-bold text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-[#03251d]">Select Village</h3>
              <p className="text-xs text-[#414845] mt-1.5 leading-relaxed">
                Choose state, district, mandal, and village or use GPS auto-detect to ground the analysis in verified Census data.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#e4e2dc] shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-[#1b3b32] text-white font-bold text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-[#03251d]">Input Margin Money</h3>
              <p className="text-xs text-[#414845] mt-1.5 leading-relaxed">
                Enter your committed savings. The 1:9 statutory multiplier immediately structures your feasible loan and EMI.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#e4e2dc] shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-[#1b3b32] text-white font-bold text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-[#03251d]">Pick Enterprise</h3>
              <p className="text-xs text-[#414845] mt-1.5 leading-relaxed">
                Select from dairy, kirana, tailoring, agro-processing, or repair workshops with localized cost templates.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#e4e2dc] shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-[#8a5100] text-white font-bold text-sm flex items-center justify-center mb-3">
                4
              </div>
              <h3 className="font-serif font-bold text-base text-[#03251d]">Download Dossier</h3>
              <p className="text-xs text-[#414845] mt-1.5 leading-relaxed">
                Generate an official pre-application feasibility report with SWOT, cash flow, and bank officer docket.
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
