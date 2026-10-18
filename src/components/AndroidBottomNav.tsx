import React from 'react';
import { Home, Grid3X3, Bookmark, Menu } from 'lucide-react';
import { ActiveTab, AppLanguage } from '../types';

interface AndroidBottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  savedCount: number;
  language: AppLanguage;
  isDark: boolean;
}

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({
  activeTab,
  onTabChange,
  savedCount,
  language,
  isDark,
}) => {
  const isHindi = language === 'hi';

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      tab: 'home',
      label: isHindi ? 'होम' : 'Home',
      icon: <Home className="w-5 h-5" />,
    },
    {
      tab: 'categories',
      label: isHindi ? 'श्रेणियां' : 'Categories',
      icon: <Grid3X3 className="w-5 h-5" />,
    },
    {
      tab: 'saved',
      label: isHindi ? 'सहेजे गए' : 'Saved',
      icon: <Bookmark className="w-5 h-5" />,
      badge: savedCount,
    },
    {
      tab: 'more',
      label: isHindi ? 'अधिक' : 'More',
      icon: <Menu className="w-5 h-5" />,
    },
  ];

  return (
    <div
      className={`sticky bottom-0 z-30 shrink-0 border-t ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-100'
      } backdrop-blur-md`}
    >
      <div className="grid grid-cols-4 items-center h-15">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onTabChange(item.tab)}
              className="relative flex flex-col items-center justify-center h-full gap-0.5 group focus:outline-none"
            >
              <div
                className={`flex items-center justify-center w-12 h-7 rounded-full transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? 'bg-blue-900/60 text-blue-400'
                      : 'bg-blue-100 text-blue-700'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.icon}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-1 right-5 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-medium leading-none ${
                  isActive
                    ? isDark
                      ? 'text-blue-400 font-semibold'
                      : 'text-blue-700 font-semibold'
                    : isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Android System Navigation Gesture Bar */}
      <div className="flex justify-center pb-1 pt-0.5">
        <div className={`w-32 h-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
      </div>
    </div>
  );
};
