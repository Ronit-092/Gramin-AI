import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import AudioModal from './components/AudioModal';
import LandingPage from './pages/LandingPage';
import WizardPage from './pages/WizardPage';
import ReportPage from './pages/ReportPage';
import TriageDeskPage from './pages/TriageDeskPage';

function Footer() {
  return (
    <footer className="w-full bg-[#03251d] text-white py-10 px-4 sm:px-6 border-t border-[#1b3b32]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#83a599]">
        <div className="flex flex-col space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-serif font-bold text-lg text-white">GraminAI</span>
            <span className="bg-[#1b3b32] text-[#c7eadd] text-[10px] font-bold px-2 py-0.5 rounded">
              SIH26091
            </span>
          </div>
          <p className="text-[#abcec1]">
            AI-Driven Hyper-Local Business Advisory & Concessional Underwriting Platform
          </p>
          <p className="text-[11px] text-[#83a599]">
            Ministry of Social Justice and Empowerment (MSJE) · National SC Finance and Development Corporation (NSFDC)
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          <span className="hover:text-white cursor-pointer">Census 2021 Data Rules</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">OpenStreetMap LGD Topology</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">Statutory NSFDC Guidelines</span>
          <span>•</span>
          <span className="text-[#ffb15b] font-bold">Toll Free: 1800-11-2026</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#fbf9f2] text-[#1b1c18]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/wizard" element={<WizardPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/triage" element={<TriageDeskPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <Footer />
          <AudioModal />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
