import React, { createContext, useContext, useState, useMemo } from 'react';
import { TRANSLATIONS } from '../i18n/translations';
import { calculateFinancials } from '../engine/financialEngine';
import { STATES_DATA, BUSINESS_CATEGORIES, FIELD_OFFICER_APPLICATIONS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'te'
  const [marginMoney, setMarginMoney] = useState(100000); // Default ₹1 Lakh matching visual mockup
  
  // Geographic hierarchy state
  const [selectedStateId, setSelectedStateId] = useState('telangana');
  const [selectedDistrictId, setSelectedDistrictId] = useState('nizamabad');
  const [selectedMandalId, setSelectedMandalId] = useState('armoor');
  const [selectedGpId, setSelectedGpId] = useState('perkit-gp');
  const [selectedVillageId, setSelectedVillageId] = useState('perkit');
  
  // Business category & assets
  const [selectedCategoryId, setSelectedCategoryId] = useState('dairy-commercial');
  const [assetsSkills, setAssetsSkills] = useState({
    hasLand: true,
    hasTraining: true,
    hasFamilyExp: true,
    hasWaterPower: true
  });

  // Beneficiary details
  const [beneficiaryName, setBeneficiaryName] = useState('Ramesh Kumar');
  const [community, setCommunity] = useState('SC (Scheduled Caste)');

  // Voice assist modal state
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceSpeechText, setVoiceSpeechText] = useState('');

  // Triage desk applications
  const [applications, setApplications] = useState(FIELD_OFFICER_APPLICATIONS);

  // Translation helper
  const t = useMemo(() => {
    return TRANSLATIONS[language] || TRANSLATIONS.en;
  }, [language]);

  // Financial calculations
  const financials = useMemo(() => {
    return calculateFinancials(marginMoney);
  }, [marginMoney]);

  // Active geographic object lookups
  const currentState = useMemo(() => {
    return STATES_DATA.find(s => s.id === selectedStateId) || STATES_DATA[0];
  }, [selectedStateId]);

  const currentDistrict = useMemo(() => {
    return currentState.districts.find(d => d.id === selectedDistrictId) || currentState.districts[0];
  }, [currentState, selectedDistrictId]);

  const currentMandal = useMemo(() => {
    return currentDistrict.mandals.find(m => m.id === selectedMandalId) || currentDistrict.mandals[0];
  }, [currentDistrict, selectedMandalId]);

  const currentGp = useMemo(() => {
    return currentMandal.gps.find(g => g.id === selectedGpId) || currentMandal.gps[0];
  }, [currentMandal, selectedGpId]);

  const currentVillage = useMemo(() => {
    return currentGp.villages.find(v => v.id === selectedVillageId) || currentGp.villages[0];
  }, [currentGp, selectedVillageId]);

  // Active business category lookup
  const currentCategory = useMemo(() => {
    return BUSINESS_CATEGORIES.find(c => c.id === selectedCategoryId) || BUSINESS_CATEGORIES[0];
  }, [selectedCategoryId]);

  // Voice narration helper
  const triggerVoiceAssist = (customText) => {
    const textToSpeak = customText || (
      language === 'te'
        ? `గ్రామీణ ఎఐ సలహా వ్యవస్థకు స్వాగతం. మీ పెట్టుబడి ₹${marginMoney.toLocaleString('en-IN')} ప్రకారం మొత్తం ప్రాజెక్ట్ వ్యయం ₹${financials.projectCost.toLocaleString('en-IN')}. మరియు ప్రభుత్వ రాయితీ రుణం ₹${financials.eligibleLoan.toLocaleString('en-IN')}.`
        : language === 'hi'
        ? `ग्रामीण एआई सलाहकार प्रणाली में आपका स्वागत है। आपके मार्जिन पूंजी ₹${marginMoney.toLocaleString('en-IN')} के अनुसार कुल परियोजना लागत ₹${financials.projectCost.toLocaleString('en-IN')} है। एवं 90 प्रतिशत रियायती ऋण ₹${financials.eligibleLoan.toLocaleString('en-IN')} अनुशंसित है।`
        : `Welcome to GraminAI Advisory Engine. Based on your margin capital of ₹${marginMoney.toLocaleString('en-IN')}, your total feasible project cost is ₹${financials.projectCost.toLocaleString('en-IN')}, and eligible concessional loan is ₹${financials.eligibleLoan.toLocaleString('en-IN')} under ${financials.scheme.name}.`
    );

    setVoiceSpeechText(textToSpeak);
    setIsVoiceModalOpen(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      if (language === 'te') utterance.lang = 'te-IN';
      else if (language === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const closeVoiceAssist = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsVoiceModalOpen(false);
  };

  // Triage state updates
  const updateApplicationStatus = (appId, newStatus, statusCategory) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, status: newStatus, statusCategory };
      }
      return app;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
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
        isVoiceModalOpen,
        voiceSpeechText,
        triggerVoiceAssist,
        closeVoiceAssist,
        applications,
        updateApplicationStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
