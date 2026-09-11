import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AudioModal() {
  const { isVoiceModalOpen, voiceSpeechText, closeVoiceAssist, language } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1.0);

  if (!isVoiceModalOpen) return null;

  const handleTogglePlay = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          const utterance = new SpeechSynthesisUtterance(voiceSpeechText);
          utterance.rate = speed;
          if (language === 'te') utterance.lang = 'te-IN';
          else if (language === 'hi') utterance.lang = 'hi-IN';
          else utterance.lang = 'en-IN';
          window.speechSynthesis.speak(utterance);
        }
        setIsPlaying(true);
      }
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(voiceSpeechText);
      utterance.rate = newSpeed;
      if (language === 'te') utterance.lang = 'te-IN';
      else if (language === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-[#fbf9f2] rounded-2xl shadow-2xl border-2 border-[#1b3b32] p-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e4e2dc]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#002334] text-white flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-xl">record_voice_over</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#03251d]">
                {language === 'te' ? 'ఆడియో సహాయం (వాయిస్ గైడెన్స్)' : language === 'hi' ? 'ऑडियो सहायता (वॉइस गाइड)' : 'Audio Assist & Voice Guidance'}
              </h3>
              <p className="text-xs text-[#8a5100] font-semibold">
                {language === 'te' ? 'తెలుగు సంభాషణ వినండి' : language === 'hi' ? 'हिंदी में निर्देश सुनें' : 'Listen to Trilingual Speech Guidance'}
              </p>
            </div>
          </div>
          <button
            onClick={closeVoiceAssist}
            className="w-8 h-8 rounded-full bg-[#eae8e1] hover:bg-[#e4e2dc] text-[#1b1c18] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Dynamic Soundwave Visualizer Animation */}
        <div className="my-6 p-4 bg-[#03251d] rounded-xl flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 h-12">
            {[40, 65, 85, 30, 95, 55, 75, 45, 90, 60, 80, 50, 70, 35, 90].map((h, i) => (
              <span
                key={i}
                className={`w-1.5 rounded-full bg-[#c7eadd] transition-all duration-300 ${
                  isPlaying ? 'animate-bounce' : 'opacity-40'
                }`}
                style={{
                  height: isPlaying ? `${h}%` : '20%',
                  animationDelay: `${i * 0.08}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-[#c7eadd] mt-2">
            {isPlaying ? '● Audio Stream Active · Web Speech API Synthesized' : '❚❚ Paused'}
          </span>
        </div>

        {/* Live Audio Transcript Box */}
        <div className="bg-[#ffffff] rounded-xl p-4 border border-[#e4e2dc] mb-5 max-h-36 overflow-y-auto">
          <span className="text-[10px] uppercase font-bold text-[#717975] block mb-1">Live Audio Transcript</span>
          <p className="text-sm font-medium text-[#1b1c18] leading-relaxed">
            {voiceSpeechText}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handleTogglePlay}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1b3b32] text-white font-semibold text-sm hover:bg-[#03251d] transition-all shadow-md active:scale-98"
          >
            <span className="material-symbols-outlined text-lg">
              {isPlaying ? 'pause_circle' : 'play_circle'}
            </span>
            <span>{isPlaying ? (language === 'te' ? 'తాత్కాలికంగా ఆపండి' : language === 'hi' ? 'रोकें' : 'Pause Audio') : (language === 'te' ? 'పునఃప్రారంభించండి' : language === 'hi' ? 'पुनः चलाएं' : 'Resume Audio')}</span>
          </button>

          {/* Speed Selection */}
          <div className="flex items-center gap-1 bg-[#eae8e1] p-1 rounded-xl">
            {[0.8, 1.0, 1.2].map((s) => (
              <button
                key={s}
                onClick={() => handleSpeedChange(s)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  speed === s ? 'bg-[#03251d] text-white shadow-sm' : 'text-[#414845] hover:text-[#1b1c18]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
