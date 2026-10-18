import React from 'react';
import { Bell, Wifi, BatteryCharging, Signal } from 'lucide-react';
import { AppLanguage } from '../types';

interface AndroidTopBarProps {
  language: AppLanguage;
  onLanguageToggle: () => Unit | (() => void);
  unreadCount: number;
  onNotificationsClick: () => void;
  title?: string;
  onBackClick?: () => void;
  isDark: boolean;
}

export const AndroidTopBar: React.FC<AndroidTopBarProps> = ({
  language,
  onLanguageToggle,
  unreadCount,
  onNotificationsClick,
  title,
  onBackClick,
  isDark,
}) => {
  const isHindi = language === 'hi';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`sticky top-0 z-30 shrink-0 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} border-b select-none`}>
      {/* Android System Status Bar */}
      <div className={`px-4 pt-2 pb-1 flex items-center justify-between text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <span>{currentTime}</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px]">98%</span>
            <BatteryCharging className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Material 3 Top App Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        {onBackClick ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onBackClick}
              aria-label="Back"
              className={`p-1.5 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className={`font-semibold text-base truncate max-w-[200px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {title || (isHindi ? 'डिजिटल दोस्त सेन्टर' : 'Digital Dost Centre')}
            </h1>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-sm">
              DDC
            </div>
            <div>
              <div className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHindi ? 'डिजिटल दोस्त सेन्टर' : 'Digital Dost Centre'}
              </div>
              <div className="text-[10px] text-blue-600 font-medium">
                digitaldostcenter.online
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          {/* Language Switcher */}
          <button
            onClick={onLanguageToggle}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700'
                : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
            }`}
          >
            {isHindi ? 'English' : 'हिंदी'}
          </button>

          {/* Notifications Icon with Badge */}
          <button
            onClick={onNotificationsClick}
            aria-label="Notifications"
            className={`relative p-2 rounded-full transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
type Unit = void;
