import React from 'react';
import {
  Info,
  Wrench,
  Globe,
  Share2,
  Mail,
  ShieldCheck,
  Moon,
  Sun,
  Languages,
  Code2,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { AppLanguage } from '../types';

interface MoreScreenProps {
  language: AppLanguage;
  onLanguageToggle: () => void;
  onToolsClick: () => void;
  onAndroidSourceClick: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({
  language,
  onLanguageToggle,
  onToolsClick,
  onAndroidSourceClick,
  isDark,
  onToggleTheme,
}) => {
  const isHindi = language === 'hi';

  const handleShareApp = () => {
    const text = 'डिजिटल दोस्त सेन्टर (DDC) - बिहार एवं देश भर के सरकारी नौकरी, एडमिट कार्ड, रिजल्ट एवं छात्रवृत्ति अपडेट्स तुरंत पाएं: https://digitaldostcenter.online';
    if (navigator.share) {
      navigator.share({ title: 'Digital Dost Centre', text, url: 'https://digitaldostcenter.online' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(isHindi ? 'ऐप शेयर लिंक कॉपी हो गया!' : 'App link copied to clipboard!');
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      <div>
        <h1 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {isHindi ? 'अधिक जानकारी एवं सेटिंग्स' : 'More & Settings'}
        </h1>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {isHindi
            ? 'डिजिटल दोस्त सेन्टर के बारे में, टूल्स और सहायता'
            : 'About Digital Dost Centre, student utilities and help'}
        </p>
      </div>

      {/* Brand About Card */}
      <div className={`p-4 rounded-3xl border space-y-3 ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border-blue-100'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
            DDC
          </div>
          <div>
            <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isHindi ? 'डिजिटल दोस्त सेन्टर (DDC)' : 'Digital Dost Centre (DDC)'}
            </div>
            <a
              href="https://digitaldostcenter.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              <span>digitaldostcenter.online</span>
            </a>
          </div>
        </div>

        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {isHindi
            ? 'डिजिटल दोस्त सेन्टर (DDC) बिहार एवं भारत के सभी प्रतियोगी छात्र-छात्राओं के लिए समर्पित एक निःशुल्क एवं विज्ञापन-मुक्त सूचना मंच है। हमारा लक्ष्य सरकारी नौकरी, एडमिट कार्ड, परीक्षा परिणाम, छात्रवृत्ति एवं विश्वविद्यालय प्रवेश की 100% सटीक एवं सत्यापित जानकारी सीधे आधिकारिक स्रोतों से पहुंचाना है।'
            : 'Digital Dost Centre (DDC) provides fact-checked, reliable updates on government jobs, admit cards, exam results, scholarships, and admissions for aspirants in Bihar and nationwide.'}
        </p>

        <div className={`flex items-center gap-2 pt-2 border-t text-[11px] ${isDark ? 'border-slate-700 text-slate-400' : 'border-blue-100 text-slate-500'}`}>
          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span>{isHindi ? 'ऑफलाइन केंद्र: कैमूर, बिहार (भारत)' : 'Physical Support: Kaimur, Bihar (India)'}</span>
        </div>
      </div>

      {/* Primary Actions List */}
      <div className="space-y-2">
        {/* Student Tools */}
        <button
          onClick={onToolsClick}
          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
            isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHindi ? 'विद्यार्थी टूल्स (आयु व फोटो कैलकुलेटर)' : 'Student Utilities & Tools'}
              </div>
              <div className="text-[11px] text-slate-500">
                {isHindi ? 'कटऑफ अनुसार सटीक आयु व फोटो गाइड' : 'Age calculator & exam photo resizer guide'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* View / Download Android Kotlin Source */}
        <button
          onClick={onAndroidSourceClick}
          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
            isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHindi ? 'नेटिव एंड्रॉइड कोड देखें (Kotlin & Compose)' : 'Native Android Code & Export'}
              </div>
              <div className="text-[11px] text-slate-500">
                {isHindi ? 'Gradle प्रोजेक्ट, Kotlin फाइलें व Android Studio सेटअप' : 'Gradle project, Kotlin Compose files & build instructions'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Toggle Language */}
        <button
          onClick={onLanguageToggle}
          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
            isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHindi ? 'भाषा बदलें (Language)' : 'Change Language'}
              </div>
              <div className="text-[11px] text-slate-500">
                {isHindi ? 'वर्तमान: हिंदी (English में स्विच करें)' : 'Current: English (Switch to Hindi)'}
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950">
            {isHindi ? 'ENG' : 'हिंदी'}
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleTheme}
          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
            isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHindi ? 'थीम मोड (Theme Mode)' : 'Appearance Theme'}
              </div>
              <div className="text-[11px] text-slate-500">
                {isDark ? (isHindi ? 'डार्क मोड सक्रिय' : 'Dark Mode Active') : (isHindi ? 'लाइट मोड सक्रिय' : 'Light Mode Active')}
              </div>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>

        {/* Share App */}
        <button
          onClick={handleShareApp}
          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
            isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHindi ? 'ऐप शेयर करें (Share App)' : 'Share DDC Application'}
              </div>
              <div className="text-[11px] text-slate-500">
                {isHindi ? 'साथी विद्यार्थियों व मित्रों के साथ साझा करें' : 'Share verified job alerts with classmates'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Helpdesk Contact */}
        <a
          href="mailto:digitaldostcenter@gmail.com"
          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all block ${
            isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHindi ? 'सहायता एवं ईमेल संपर्क' : 'Contact Support & Helpdesk'}
              </div>
              <div className="text-[11px] text-slate-500">
                digitaldostcenter@gmail.com
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </a>

        {/* Privacy Policy & Disclaimer */}
        <div className={`p-3 rounded-2xl border flex items-start gap-2.5 text-xs ${isDark ? 'bg-slate-800/20 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <strong className="block text-slate-700 dark:text-slate-300">
              {isHindi ? 'सत्यनिष्ठा एवं अस्वीकरण' : 'Verification Integrity & Disclaimer'}
            </strong>
            {isHindi
              ? 'डिजिटल दोस्त सेन्टर किसी भी प्रकार का भ्रामक आंकड़ा या असत्यापित विज्ञप्ति प्रकाशित नहीं करता। उपयोगकर्ता आवेदन करने से पहले संबंधित आयोग/बोर्ड की आधिकारिक वेबसाइट पर अधिसूचना की पुष्टि अवश्य करें।'
              : 'Digital Dost Centre does not invent false numbers or unverified vacancies. Users are advised to confirm with official notification portals before applying.'}
          </div>
        </div>
      </div>
    </div>
  );
};
