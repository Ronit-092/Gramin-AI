import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { STATES_DATA, BUSINESS_CATEGORIES } from '../data/mockData';
import { formatINR, calculateDSCR } from '../engine/financialEngine';

export default function WizardPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    language,
    t,
    marginMoney,
    setMarginMoney,
    financials,
    selectedStateId,
    setSelectedStateId,
    selectedDistrictId,
    setSelectedDistrictId,
    selectedMandalId,
    setSelectedMandalId,
    selectedGpId,
    setSelectedGpId,
    selectedVillageId,
    setSelectedVillageId,
    currentState,
    currentDistrict,
    currentMandal,
    currentGp,
    currentVillage,
    selectedCategoryId,
    setSelectedCategoryId,
    currentCategory,
    assetsSkills,
    setAssetsSkills,
    beneficiaryName,
    setBeneficiaryName,
    community,
    setCommunity,
    triggerVoiceAssist
  } = useApp();

  // Handle GPS Auto-detect Simulation
  const handleAutoGps = () => {
    setSelectedStateId('telangana');
    setSelectedDistrictId('nizamabad');
    setSelectedMandalId('armoor');
    setSelectedGpId('perkit-gp');
    setSelectedVillageId('perkit');
    
    // Announce GPS locked
    if (language === 'te') {
      triggerVoiceAssist('GPS లొకేషన్ విజయవంతంగా కనుగొనబడింది: పెర్కిట్ గ్రామం, ఆర్మూర్ మండలం, నిజామాబాద్ జిల్లా, తెలంగాణ.');
    } else if (language === 'hi') {
      triggerVoiceAssist('जीपीएस स्थान सफलतापूर्वक पहचाना गया: ग्राम पेर्किट, आर्मूर मंडल, निज़ामाबाद ज़िला, तेलंगाना।');
    } else {
      triggerVoiceAssist('GPS Location successfully detected: Perkit Village, Armoor Mandal, Nizamabad District, Telangana.');
    }
  };

  // Step 4 DSCR calculation
  const dscrData = calculateDSCR(
    currentCategory.monthlyRevenueEstimate,
    currentCategory.monthlyOpexEstimate,
    financials.monthlyEMI
  );

  // Generate Report Action
  const handleGenerateReport = () => {
    setIsGenerating(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setIsGenerating(false);
      navigate('/report');
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-16 bg-[#fbf9f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Voice Guidance Bar & Civic Context Strip */}
        <section className="w-full bg-[#f6f4ed] rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e4e2dc] mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-[#002334] text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-2xl text-[#c6e7ff]">record_voice_over</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold bg-[#ffb15b] text-[#744300] px-2 py-0.5 rounded uppercase tracking-wider">
                  {t.audioAssistTitle}
                </span>
                <span className="text-xs text-[#414845] font-medium">
                  {t.audioAssistSubtitle}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#1b1c18] truncate mt-0.5">
                {language === 'te'
                  ? 'వ్యాపార ఆలోచన & పెట్టుబడి నమోదు · Step 1-4 Assisted Pre-Structuring'
                  : language === 'hi'
                  ? 'व्यवसाय विचार एवं मार्जिन पूंजी प्रविष्टि · चरण 1-4 सहायता'
                  : 'Enterprise Idea & Capital Structuring · Step 1-4 Underwriting Engine'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => triggerVoiceAssist()}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-[#03251d] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#1b3b32] transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-lg text-[#c7eadd]">volume_up</span>
              <span>
                {language === 'te'
                  ? 'సూచనలు వినండి (తెలుగు)'
                  : language === 'hi'
                  ? 'निर्देश सुनें (हिंदी)'
                  : 'Play Instructions (Audio)'}
              </span>
            </button>
          </div>
        </section>

        {/* Step Progress Header */}
        <section className="w-full bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#e4e2dc] mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#8a5100] uppercase tracking-wider mb-1">
                <span>NSFDC FORM SUITE 2025</span>
                <span>•</span>
                <span>SMART CONCESSIONAL ALLOCATION</span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#03251d] tracking-tight">
                {t.wizardHead}
              </h1>
              <p className="text-xs sm:text-sm text-[#414845] mt-1">
                {t.wizardSub}
              </p>
            </div>

            <div className="flex items-center gap-2.5 bg-[#f6f4ed] px-4 py-2 rounded-xl border border-[#e4e2dc] shrink-0">
              <span className="material-symbols-outlined text-xl text-[#03251d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_with_heart
              </span>
              <div>
                <span className="text-xs font-bold text-[#1b1c18] block">Institutional Validation</span>
                <span className="text-[11px] font-mono text-[#414845] block">LGD Code: {currentVillage.lgdCode} Active</span>
              </div>
            </div>
          </div>

          {/* Stepper Navigation Rail (4 Steps) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { num: 1, title: t.step1Title, te: 'స్థలం & క్లస్టర్' },
              { num: 2, title: t.step2Title, te: 'మూలధనం & లీవరేజ్' },
              { num: 3, title: t.step3Title, te: 'వ్యాపారం & ఆస్తులు' },
              { num: 4, title: t.step4Title, te: 'క్యాష్-ఫ్లో & సమీక్ష' }
            ].map((s) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;

              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setCurrentStep(s.num)}
                  className={`p-3 rounded-xl flex items-center gap-3 transition-all text-left ${
                    isActive
                      ? 'bg-[#03251d] text-white shadow-md'
                      : isPast
                      ? 'bg-[#eae8e1] text-[#03251d] hover:bg-[#e4e2dc]'
                      : 'bg-[#f6f4ed] text-[#717975] hover:bg-[#eae8e1]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-[#c7eadd] text-[#03251d]'
                        : isPast
                        ? 'bg-[#03251d] text-white'
                        : 'bg-[#e4e2dc] text-[#717975]'
                    }`}
                  >
                    {isPast ? '✓' : s.num}
                  </div>
                  <div className="min-w-0">
                    <span className={`text-[10px] uppercase font-bold tracking-wider block ${isActive ? 'text-[#c7eadd]' : 'opacity-70'}`}>
                      Step {s.num} · {language === 'te' ? s.te : `Phase 0${s.num}`}
                    </span>
                    <span className="text-xs font-semibold block truncate">
                      {s.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* WORKBENCH DUAL-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Hand Intake Canvas (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* STEP 1: Geographic Hierarchy & Cluster */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#1b3b32] text-white font-bold text-xs flex items-center justify-center">1</span>
                    <div>
                      <h2 className="font-serif font-bold text-lg text-[#03251d]">
                        {language === 'te' ? 'భౌగోళిక స్థానం & గ్రామ క్లస్టర్' : 'Geographic Hierarchy & Market Catchment'}
                      </h2>
                      <p className="text-xs text-[#8a5100] font-medium">
                        Multi-tier Census 2021 & Local Government Directory (LGD) Grounding
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoGps}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#8a5100] bg-[#ffdcbd]/60 hover:bg-[#ffdcbd] px-3 py-1.5 rounded-lg transition-colors border border-[#ffb15b]/40"
                  >
                    <span className="material-symbols-outlined text-sm">my_location</span>
                    <span>{t.autoGpsBtn}</span>
                  </button>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* State */}
                  <div>
                    <label className="block text-xs font-semibold text-[#414845] mb-1.5">
                      {t.stateLabel}
                    </label>
                    <select
                      value={selectedStateId}
                      onChange={(e) => {
                        setSelectedStateId(e.target.value);
                        const st = STATES_DATA.find(s => s.id === e.target.value);
                        if (st && st.districts[0]) {
                          setSelectedDistrictId(st.districts[0].id);
                          setSelectedMandalId(st.districts[0].mandals[0].id);
                          setSelectedGpId(st.districts[0].mandals[0].gps[0].id);
                          setSelectedVillageId(st.districts[0].mandals[0].gps[0].villages[0].id);
                        }
                      }}
                      className="w-full h-11 px-3 rounded-xl bg-[#f6f4ed] text-sm text-[#1b1c18] font-medium border border-[#e4e2dc] focus:outline-none focus:ring-2 focus:ring-[#03251d]"
                    >
                      {STATES_DATA.map(st => (
                        <option key={st.id} value={st.id}>
                          {language === 'te' ? st.name_te : language === 'hi' ? st.name_hi : st.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-xs font-semibold text-[#414845] mb-1.5">
                      {t.districtLabel}
                    </label>
                    <select
                      value={selectedDistrictId}
                      onChange={(e) => {
                        setSelectedDistrictId(e.target.value);
                        const dist = currentState.districts.find(d => d.id === e.target.value);
                        if (dist && dist.mandals[0]) {
                          setSelectedMandalId(dist.mandals[0].id);
                          setSelectedGpId(dist.mandals[0].gps[0].id);
                          setSelectedVillageId(dist.mandals[0].gps[0].villages[0].id);
                        }
                      }}
                      className="w-full h-11 px-3 rounded-xl bg-[#f6f4ed] text-sm text-[#1b1c18] font-medium border border-[#e4e2dc] focus:outline-none focus:ring-2 focus:ring-[#03251d]"
                    >
                      {currentState.districts.map(dist => (
                        <option key={dist.id} value={dist.id}>
                          {language === 'te' ? dist.name_te : language === 'hi' ? dist.name_hi : dist.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mandal */}
                  <div>
                    <label className="block text-xs font-semibold text-[#414845] mb-1.5">
                      {t.mandalLabel}
                    </label>
                    <select
                      value={selectedMandalId}
                      onChange={(e) => {
                        setSelectedMandalId(e.target.value);
                        const mandal = currentDistrict.mandals.find(m => m.id === e.target.value);
                        if (mandal && mandal.gps[0]) {
                          setSelectedGpId(mandal.gps[0].id);
                          setSelectedVillageId(mandal.gps[0].villages[0].id);
                        }
                      }}
                      className="w-full h-11 px-3 rounded-xl bg-[#f6f4ed] text-sm text-[#1b1c18] font-medium border border-[#e4e2dc] focus:outline-none focus:ring-2 focus:ring-[#03251d]"
                    >
                      {currentDistrict.mandals.map(mandal => (
                        <option key={mandal.id} value={mandal.id}>
                          {mandal.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Village */}
                  <div>
                    <label className="block text-xs font-semibold text-[#414845] mb-1.5">
                      {t.villageLabel}
                    </label>
                    <select
                      value={selectedVillageId}
                      onChange={(e) => setSelectedVillageId(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#f6f4ed] text-sm text-[#1b1c18] font-medium border border-[#e4e2dc] focus:outline-none focus:ring-2 focus:ring-[#03251d]"
                    >
                      {currentGp.villages.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Village Grounded Demographics Badge */}
                <div className="p-4 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#03251d] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#45655a]">verified</span>
                      <span>LGD Profile: {currentVillage.name}</span>
                    </span>
                    <span className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#e4e2dc]">
                      LGD Code: {currentVillage.lgdCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="bg-white p-2.5 rounded-lg border border-[#e4e2dc]/60">
                      <span className="text-[#717975] block text-[10px]">Census Population</span>
                      <strong className="text-[#1b1c18] font-bold">{currentVillage.censusPopulation.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-[#e4e2dc]/60">
                      <span className="text-[#717975] block text-[10px]">Rural Households</span>
                      <strong className="text-[#1b1c18] font-bold">{currentVillage.households}</strong>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-[#e4e2dc]/60">
                      <span className="text-[#717975] block text-[10px]">Nearest Mandi / APMC</span>
                      <strong className="text-[#8a5100] font-bold">{currentVillage.distanceToMandiKm} km</strong>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-[#e4e2dc]/60">
                      <span className="text-[#717975] block text-[10px]">Road Quality</span>
                      <strong className="text-[#45655a] font-bold truncate block">{currentVillage.roadAccess}</strong>
                    </div>
                  </div>
                </div>

                {/* Next Step CTA */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#03251d] text-white text-sm font-semibold hover:bg-[#1b3b32] transition-all shadow-md active:scale-98"
                  >
                    <span>{language === 'te' ? 'తదుపరి: మార్జిన్ పెట్టుబడి నమోదు' : 'Next: Input Margin Capital'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: Margin Money & 1:9 Leverage */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] space-y-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#1b3b32] text-white font-bold text-xs flex items-center justify-center">2</span>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-[#03251d]">
                      {t.step2Title}
                    </h2>
                    <p className="text-xs text-[#8a5100] font-medium">
                      Statutory 10% Own Contribution with 90% Concessional Term Loan Underwriting
                    </p>
                  </div>
                </div>

                {/* Capital Input Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#414845] mb-1.5">
                    {t.marginAmountLabel}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-lg font-bold text-[#717975]">₹</span>
                    <input
                      type="number"
                      min="10000"
                      max="1000000"
                      step="5000"
                      value={marginMoney}
                      onChange={(e) => setMarginMoney(Number(e.target.value))}
                      className="w-full h-13 pl-9 pr-4 text-xl font-bold font-sans text-[#03251d] rounded-xl bg-[#f6f4ed] border border-[#e4e2dc] focus:outline-none focus:ring-2 focus:ring-[#03251d]"
                    />
                  </div>
                  <span className="text-[11px] text-[#717975] mt-1 block">
                    {t.marginHelper}
                  </span>
                </div>

                {/* Preset Chips */}
                <div>
                  <span className="text-xs font-semibold text-[#414845] block mb-2">
                    {language === 'te' ? 'త్వరిత ఎంపిక (సాధారణ పరిమితులు):' : 'Standard NSFDC Capital Presets:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[14000, 50000, 100000, 200000, 300000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setMarginMoney(amt)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                          marginMoney === amt
                            ? 'bg-[#03251d] text-white shadow-sm'
                            : 'bg-[#f6f4ed] text-[#414845] hover:bg-[#eae8e1] border border-[#e4e2dc]'
                        }`}
                      >
                        {formatINR(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explanatory Policy Callout */}
                <div className="p-4 rounded-xl bg-[#c7eadd]/20 border border-[#abcec1] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#03251d]">
                    <span className="material-symbols-outlined text-base">info</span>
                    <span>1:9 Statutory Multiplier Explanation</span>
                  </div>
                  <p className="text-xs text-[#1b3b32] leading-relaxed">
                    Under NSFDC guidelines, your ₹{marginMoney.toLocaleString('en-IN')} acts as 10% own equity. The bank and corporation provide ₹{financials.eligibleLoan.toLocaleString('en-IN')} (90%) as concessional debt at {financials.interestRate}% p.a.
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-[#eae8e1] text-[#03251d] text-xs font-semibold hover:bg-[#e4e2dc]"
                  >
                    {language === 'te' ? 'వెనుకకు' : 'Back'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#03251d] text-white text-sm font-semibold hover:bg-[#1b3b32] transition-all shadow-md active:scale-98"
                  >
                    <span>{language === 'te' ? 'తదుపరి: వ్యాపార రంగం ఎంపిక' : 'Next: Select Enterprise Category'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: Enterprise & Assets */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] space-y-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#1b3b32] text-white font-bold text-xs flex items-center justify-center">3</span>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-[#03251d]">
                      {t.selectCategoryTitle}
                    </h2>
                    <p className="text-xs text-[#8a5100] font-medium">
                      Pre-Calibrated Unit Cost & Operating Margins
                    </p>
                  </div>
                </div>

                {/* Category Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {BUSINESS_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategoryId === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategoryId(cat.id)}
                        className={`p-4 rounded-xl text-left transition-all border relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#c7eadd]/20 border-[#03251d] ring-2 ring-[#03251d]'
                            : 'bg-[#f6f4ed] border-[#e4e2dc] hover:bg-[#eae8e1]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="material-symbols-outlined text-2xl text-[#03251d]">
                              {cat.icon}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#03251d] text-white text-xs flex items-center justify-center">
                                ✓
                              </span>
                            )}
                          </div>
                          <h3 className="font-serif font-bold text-sm text-[#1b1c18]">
                            {language === 'te' ? cat.title_te : language === 'hi' ? cat.title_hi : cat.title}
                          </h3>
                          <p className="text-xs text-[#414845] mt-1 line-clamp-2">
                            {language === 'te' ? cat.description_te : cat.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#e4e2dc]/60 flex items-center justify-between text-[11px]">
                          <span className="text-[#8a5100] font-semibold">{cat.badge}</span>
                          <span className="font-mono text-[#03251d] font-bold">~{formatINR(cat.typicalProjectCost)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Assets & Skills Checkbox Matrix */}
                <div className="p-4 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc] space-y-3">
                  <span className="text-xs font-bold text-[#03251d] block">
                    {t.skillsHeader}
                  </span>

                  <div className="space-y-2">
                    {[
                      { key: 'hasLand', label: t.hasLand },
                      { key: 'hasTraining', label: t.hasTraining },
                      { key: 'hasFamilyExp', label: t.hasFamilyExp },
                      { key: 'hasWaterPower', label: t.hasWaterPower }
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer text-xs text-[#1b1c18] font-medium">
                        <input
                          type="checkbox"
                          checked={assetsSkills[key]}
                          onChange={(e) => setAssetsSkills(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="w-4 h-4 accent-[#03251d] rounded cursor-pointer"
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-[#eae8e1] text-[#03251d] text-xs font-semibold hover:bg-[#e4e2dc]"
                  >
                    {language === 'te' ? 'వెనుకకు' : 'Back'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#03251d] text-white text-sm font-semibold hover:bg-[#1b3b32] transition-all shadow-md active:scale-98"
                  >
                    <span>{language === 'te' ? 'తదుపరి: క్యాష్-ఫ్లో & రిపోర్ట్' : 'Next: Review Cash-flow & Feasibility'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

              </div>
            )}

            {/* STEP 4: Cash-Flow & Final Generation */}
            {currentStep === 4 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] space-y-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#8a5100] text-white font-bold text-xs flex items-center justify-center">4</span>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-[#03251d]">
                      {language === 'te' ? 'క్యాష్-ఫ్లో & తుది సాధ్యాసాధ్యాల సమీక్ష' : 'Cash-Flow & Underwriting Feasibility Review'}
                    </h2>
                    <p className="text-xs text-[#8a5100] font-medium">
                      Simulated Debt Service Coverage Ratio (DSCR) & Repayment Viability
                    </p>
                  </div>
                </div>

                {/* Beneficiary Name & Community Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#414845] mb-1">
                      Applicant Full Name
                    </label>
                    <input
                      type="text"
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#f6f4ed] text-sm text-[#1b1c18] font-medium border border-[#e4e2dc]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#414845] mb-1">
                      Statutory Community / Target Category
                    </label>
                    <select
                      value={community}
                      onChange={(e) => setCommunity(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#f6f4ed] text-sm text-[#1b1c18] font-medium border border-[#e4e2dc]"
                    >
                      <option>SC (Scheduled Caste - Priority Tier I)</option>
                      <option>OBC (Backward Classes - Backward Classes Commission)</option>
                      <option>Safai Karamchari / Target Sanitation Beneficiary</option>
                      <option>Rural Women Self-Help Group (SHG) Member</option>
                    </select>
                  </div>
                </div>

                {/* Cash-Flow Assessment Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc]">
                    <span className="text-[11px] text-[#717975] block">Projected Monthly Revenue</span>
                    <strong className="text-base font-bold text-[#03251d] block mt-0.5">
                      {formatINR(currentCategory.monthlyRevenueEstimate)}
                    </strong>
                    <span className="text-[10px] text-[#45655a]">Empirical mandi rate</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc]">
                    <span className="text-[11px] text-[#717975] block">Operating Expenses (OPEX)</span>
                    <strong className="text-base font-bold text-[#8a5100] block mt-0.5">
                      {formatINR(currentCategory.monthlyOpexEstimate)}
                    </strong>
                    <span className="text-[10px] text-[#717975]">Feed, labor & power</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#c7eadd]/30 border border-[#abcec1]">
                    <span className="text-[11px] text-[#03251d] font-semibold block">Net Surplus & DSCR</span>
                    <strong className="text-base font-bold text-[#03251d] block mt-0.5">
                      {formatINR(dscrData.netSurplus)} · {dscrData.dscr}x
                    </strong>
                    <span className="text-[10px] text-[#03251d] font-bold">
                      {dscrData.rating}
                    </span>
                  </div>
                </div>

                {/* Final Underwriting Confirmation Card */}
                <div className="p-4 rounded-xl bg-[#1b3b32] text-white space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#c7eadd] uppercase tracking-wider">
                      Underwriting Status: Ready For Sanction Docket
                    </span>
                    <span className="material-symbols-outlined text-[#c7eadd] text-lg">check_circle</span>
                  </div>
                  <p className="text-xs text-[#83a599] leading-relaxed">
                    Zero algorithmic hallucinations detected. Project cost ₹{financials.projectCost.toLocaleString('en-IN')} with margin money ₹{marginMoney.toLocaleString('en-IN')} matches statutory NSFDC debt coverage criteria.
                  </p>
                </div>

                {/* Final Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-[#eae8e1] text-[#03251d] text-xs font-semibold hover:bg-[#e4e2dc]"
                  >
                    {language === 'te' ? 'వెనుకకు' : 'Back'}
                  </button>

                  <button
                    type="button"
                    disabled={isGenerating}
                    onClick={handleGenerateReport}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#8a5100] hover:bg-[#744300] text-white text-sm font-bold shadow-lg shadow-[#8a5100]/20 transition-all active:scale-98"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {isGenerating ? 'hourglass_top' : 'assessment'}
                    </span>
                    <span>
                      {isGenerating
                        ? (language === 'te' ? 'నివేదిక తయారవుతోంది...' : 'Generating Dossier...')
                        : t.generateReportBtn}
                    </span>
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Right Hand Sticky Summary Card (Cols 8-12) */}
          <div className="lg:col-span-5 w-full sticky top-28">
            <div className="bg-[#f6f4ed] rounded-2xl p-5 sm:p-6 shadow-md border border-[#e4e2dc] space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#e4e2dc]">
                <div>
                  <span className="text-[10px] font-bold text-[#8a5100] uppercase tracking-wider block">
                    STATUTORY SUMMARY
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#03251d]">
                    Live Underwriting Docket
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#c7eadd] text-[#03251d] text-[11px] font-bold">
                  Active
                </span>
              </div>

              {/* Village & Beneficiary Snapshot */}
              <div className="bg-white p-3 rounded-xl border border-[#e4e2dc] text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#717975]">Village:</span>
                  <strong className="text-[#1b1c18]">{currentVillage.name} ({currentDistrict.name})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#717975]">LGD Code:</span>
                  <strong className="font-mono text-[#03251d]">{currentVillage.lgdCode}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#717975]">Selected Enterprise:</span>
                  <strong className="text-[#8a5100] truncate max-w-[170px]">
                    {language === 'te' ? currentCategory.title_te : currentCategory.title}
                  </strong>
                </div>
              </div>

              {/* Financial Metrics Stack */}
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-white border border-[#e4e2dc] flex items-center justify-between">
                  <span className="text-xs text-[#414845]">Committed Margin (10%)</span>
                  <strong className="text-sm font-bold text-[#03251d]">{formatINR(marginMoney)}</strong>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#e4e2dc] flex items-center justify-between">
                  <span className="text-xs text-[#414845]">Total Project Cost</span>
                  <strong className="text-sm font-bold text-[#03251d]">{formatINR(financials.projectCost)}</strong>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#e4e2dc] flex items-center justify-between">
                  <span className="text-xs text-[#414845]">Concessional Loan (90%)</span>
                  <strong className="text-sm font-bold text-[#8a5100]">{formatINR(financials.eligibleLoan)}</strong>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1b3b32] text-white text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#c7eadd]">
                    <span>{financials.scheme.name}</span>
                    <span>{financials.interestRate}% p.a.</span>
                  </div>
                  <p className="text-[11px] text-[#83a599]">
                    Tenure: {financials.tenureYears} Years · Moratorium: {financials.moratoriumMonths} Mos
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#e4e2dc] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#414845] block">Quarterly Installment</span>
                    <span className="text-[10px] text-[#8a5100]">Crop harvest cycle</span>
                  </div>
                  <strong className="text-lg font-bold text-[#03251d]">
                    {formatINR(financials.quarterlyEMI)}
                  </strong>
                </div>
              </div>

              {/* Bottom Quick Trigger */}
              <button
                type="button"
                onClick={handleGenerateReport}
                className="w-full py-3 rounded-xl bg-[#03251d] hover:bg-[#1b3b32] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Preview Feasibility Report</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
