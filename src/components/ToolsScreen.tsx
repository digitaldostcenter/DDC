import React, { useState } from 'react';
import { Calculator, Camera, FileCheck, Info, CheckCircle2 } from 'lucide-react';
import { AppLanguage } from '../types';

interface ToolsScreenProps {
  language: AppLanguage;
  isDark: boolean;
}

export const ToolsScreen: React.FC<ToolsScreenProps> = ({ language, isDark }) => {
  const isHindi = language === 'hi';

  const [dob, setDob] = useState('2001-07-15');
  const [cutoffDate, setCutoffDate] = useState('2026-08-01');
  const [ageResult, setAgeResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = () => {
    if (!dob || !cutoffDate) return;
    const start = new Date(dob);
    const end = new Date(cutoffDate);

    if (end < start) {
      alert(isHindi ? 'कटऑफ तिथि जन्म तिथि के बाद की होनी चाहिए।' : 'Cutoff date must be after Date of Birth.');
      return;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setAgeResult({ years, months, days, totalDays });
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      <div>
        <h1 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {isHindi ? 'विद्यार्थी टूल्स (DDC Tools)' : 'Student Utilities & Tools'}
        </h1>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {isHindi
            ? 'सरकारी नौकरी व परीक्षा फॉर्म भरने हेतु आवश्यक टूल्स'
            : 'Essential calculators and guidelines for competitive exam applications'}
        </p>
      </div>

      {/* Age Calculator Card */}
      <div className={`p-4 rounded-3xl border space-y-3.5 ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isHindi ? 'सरकारी परीक्षा आयु कैलकुलेटर (Age Calculator)' : 'Sarkari Exam Age Calculator'}
            </h2>
            <div className="text-[11px] text-slate-500">
              {isHindi ? 'विज्ञप्ति कटऑफ तिथि अनुसार सटीक आयु ज्ञात करें' : 'Calculate exact age as of notification cutoff date'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {isHindi ? 'जन्म तिथि (Date of Birth)' : 'Date of Birth (DOB)'}
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {isHindi ? 'कटऑफ गणना तिथि (Cut-off Date)' : 'Cut-off Calculation Date'}
            </label>
            <input
              type="date"
              value={cutoffDate}
              onChange={(e) => setCutoffDate(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <button
          onClick={calculateAge}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
        >
          {isHindi ? 'सटीक आयु निकालें' : 'Calculate Exact Age'}
        </button>

        {ageResult && (
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-center space-y-1">
            <div className="text-[11px] font-semibold text-blue-600">
              {isHindi ? 'कटऑफ तिथि अनुसार आपकी कुल आयु:' : 'Your Exact Age on Cut-off Date:'}
            </div>
            <div className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {ageResult.years} {isHindi ? 'वर्ष' : 'Years'} · {ageResult.months} {isHindi ? 'माह' : 'Months'} · {ageResult.days} {isHindi ? 'दिन' : 'Days'}
            </div>
            <div className="text-[10px] text-slate-500">
              {isHindi ? `(कुल ${ageResult.totalDays} दिन)` : `(Total ${ageResult.totalDays} days)`}
            </div>
          </div>
        )}
      </div>

      {/* Photo & Signature Resizer Guideline */}
      <div className={`p-4 rounded-3xl border space-y-3 ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isHindi ? 'फोटो व हस्ताक्षर साइज दिशानिर्देश (Photo Guidelines)' : 'Photo & Signature Specifications'}
            </h2>
            <div className="text-[11px] text-slate-500">
              BPSC, CSBC, SSC, Railway & State PSC Forms
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border divide-y overflow-hidden text-xs ${isDark ? 'border-slate-700 divide-slate-700' : 'border-slate-100 divide-slate-100'}`}>
          <div className="p-2.5 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isHindi ? 'पासपोर्ट फोटो (Passport Photo)' : 'Passport Photo'}
            </span>
            <span className="text-[11px] text-slate-500">20 KB - 50 KB (3.5 × 4.5 cm)</span>
          </div>
          <div className="p-2.5 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isHindi ? 'हस्ताक्षर (Signature - Hindi/Eng)' : 'Signature (Hindi / English)'}
            </span>
            <span className="text-[11px] text-slate-500">10 KB - 20 KB (Black/Blue ink)</span>
          </div>
          <div className="p-2.5 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isHindi ? 'दस्तावेज / मार्कशीट (PDF/JPEG)' : 'Certificates / Marksheet'}
            </span>
            <span className="text-[11px] text-slate-500">100 KB - 300 KB (Clear scan)</span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl flex items-start gap-2 text-[11px] ${isDark ? 'bg-slate-700/40 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>
            {isHindi
              ? 'टिप: BPSC एवं CSBC फॉर्म में लाइव वेबकैम फोटो ली जाती है। सुनिश्चित करें कि पर्याप्त प्रकाश व्यवस्था हो और चश्मा/टोपी न पहनें।'
              : 'Tip: Ensure neutral background with proper lighting. Avoid glares, sunglasses, or headwear.'}
          </span>
        </div>
      </div>
    </div>
  );
};
