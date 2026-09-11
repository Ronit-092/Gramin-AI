import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { language, setLanguage, t, triggerVoiceAssist } = useApp();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fbf9f2]/95 backdrop-blur-md border-b border-[#e4e2dc] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Top Sovereign Institutional Authority Strip */}
      <div className="w-full bg-[#03251d] text-white py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs tracking-wider">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xs text-[#c7eadd]">verified</span>
            <span className="font-sans font-medium line-clamp-1">
              {t.govTitle}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 shrink-0 text-[#c7eadd] font-mono text-[11px]">
            <span>SIH26091 Institutional Desk</span>
            <span className="opacity-40">|</span>
            <span>NSFDC Statutory Tier</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <Link to="/" className="flex items-center gap-3 shrink-0 hover:opacity-95 transition-opacity">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#03251d] to-[#1b3b32] p-1.5 flex items-center justify-center shadow-sm ring-1 ring-[#c7eadd]/30">
            {/* National Agricultural & Enterprise Emblem SVG */}
            <svg viewBox="0 0 36 36" className="w-full h-full text-white" fill="currentColor">
              <path d="M18 3L4 9v7c0 8.8 6 17 14 19 8-8 14-16.2 14-19V9L18 3zm0 4.2l9 3.8v4.5c0 6.6-4.5 12.8-9 14.5-4.5-1.7-9-7.9-9-14.5V11l9-3.8z" fill="#c7eadd" opacity="0.9"/>
              <path d="M18 12c-2.8 0-5 2.2-5 5 0 3.3 5 8 5 8s5-4.7 5-8c0-2.8-2.2-5-5-5zm0 6.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" fill="#ffb15b"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl text-[#03251d] tracking-tight">GraminAI</span>
              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e4e2dc] text-[#414845]">
                {t.engineBadge}
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#8a5100] -mt-0.5">
              {t.portalSub}
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg transition-all ${
              isActive('/')
                ? 'bg-[#1b3b32] text-white font-semibold shadow-sm'
                : 'text-[#414845] hover:bg-[#eae8e1] hover:text-[#1b1c18]'
            }`}
          >
            {t.navHome}
          </Link>
          <Link
            to="/wizard"
            className={`px-3 py-2 rounded-lg transition-all ${
              isActive('/wizard')
                ? 'bg-[#1b3b32] text-white font-semibold shadow-sm'
                : 'text-[#414845] hover:bg-[#eae8e1] hover:text-[#1b1c18]'
            }`}
          >
            {t.navWizard}
          </Link>
          <Link
            to="/report"
            className={`px-3 py-2 rounded-lg transition-all ${
              isActive('/report')
                ? 'bg-[#1b3b32] text-white font-semibold shadow-sm'
                : 'text-[#414845] hover:bg-[#eae8e1] hover:text-[#1b1c18]'
            }`}
          >
            {t.navReport}
          </Link>
          <Link
            to="/triage"
            className={`px-3 py-2 rounded-lg transition-all ${
              isActive('/triage')
                ? 'bg-[#1b3b32] text-white font-semibold shadow-sm'
                : 'text-[#414845] hover:bg-[#eae8e1] hover:text-[#1b1c18]'
            }`}
          >
            {t.navDesk}
          </Link>
        </nav>

        {/* Right Tools & Language Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Trilingual Toggle */}
          <div className="flex items-center bg-[#eae8e1] p-1 rounded-lg border border-[#c1c8c4]/40">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                language === 'en'
                  ? 'bg-[#03251d] text-white shadow-sm'
                  : 'text-[#414845] hover:text-[#1b1c18]'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                language === 'hi'
                  ? 'bg-[#03251d] text-white shadow-sm'
                  : 'text-[#414845] hover:text-[#1b1c18]'
              }`}
              title="हिन्दी"
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                language === 'te'
                  ? 'bg-[#03251d] text-white shadow-sm'
                  : 'text-[#414845] hover:text-[#1b1c18]'
              }`}
              title="తెలుగు"
            >
              తెలుగు
            </button>
          </div>

          {/* Voice Assist Button */}
          <button
            onClick={() => triggerVoiceAssist()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#002334] text-white text-xs font-semibold hover:bg-[#003a53] transition-all shadow-sm active:scale-95"
            title="Read instructions aloud"
          >
            <span className="material-symbols-outlined text-sm">mic</span>
            <span className="hidden sm:inline">{t.voiceAssist}</span>
          </button>

          {/* Mitra Helpline */}
          <div className="hidden 2xl:flex flex-col text-right pr-1">
            <span className="text-[10px] uppercase font-bold text-[#717975]">{t.mitraHelpline}</span>
            <span className="text-xs font-bold text-[#8a5100]">1800-11-2026</span>
          </div>

          {/* Field Counselor Profile Icon */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#c1c8c4]/50">
            <div className="w-8 h-8 rounded-full bg-[#1b3b32] text-[#c7eadd] font-semibold text-xs flex items-center justify-center ring-2 ring-[#c7eadd]/60">
              KS
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#1b1c18] leading-tight">K. Sharma</span>
              <span className="text-[10px] text-[#414845]">Prerak / Mitra</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Strip */}
      <div className="lg:hidden flex items-center justify-around border-t border-[#e4e2dc] bg-[#f0eee7] py-2 px-2 text-xs font-medium">
        <Link
          to="/"
          className={`px-2 py-1 rounded ${isActive('/') ? 'bg-[#03251d] text-white font-bold' : 'text-[#414845]'}`}
        >
          {t.navHome}
        </Link>
        <Link
          to="/wizard"
          className={`px-2 py-1 rounded ${isActive('/wizard') ? 'bg-[#03251d] text-white font-bold' : 'text-[#414845]'}`}
        >
          {t.navWizard}
        </Link>
        <Link
          to="/report"
          className={`px-2 py-1 rounded ${isActive('/report') ? 'bg-[#03251d] text-white font-bold' : 'text-[#414845]'}`}
        >
          {t.navReport}
        </Link>
        <Link
          to="/triage"
          className={`px-2 py-1 rounded ${isActive('/triage') ? 'bg-[#03251d] text-white font-bold' : 'text-[#414845]'}`}
        >
          {t.navDesk}
        </Link>
      </div>
    </header>
  );
}
