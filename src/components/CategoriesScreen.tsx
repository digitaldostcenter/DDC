import React from 'react';
import {
  Briefcase,
  Award,
  CreditCard,
  GraduationCap,
  BookOpen,
  CheckSquare,
  FileText,
  Landmark,
  Wrench,
  ChevronRight,
} from 'lucide-react';
import { AppLanguage, PostCategory } from '../types';
import { CATEGORIES } from '../data/posts';

interface CategoriesScreenProps {
  language: AppLanguage;
  onSelectCategory: (cat: PostCategory) => void;
  isDark: boolean;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  language,
  onSelectCategory,
  isDark,
}) => {
  const isHindi = language === 'hi';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-blue-600" />;
      case 'Award':
        return <Award className="w-6 h-6 text-amber-600" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-emerald-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-indigo-600" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-violet-600" />;
      case 'CheckSquare':
        return <CheckSquare className="w-6 h-6 text-teal-600" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-cyan-600" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-rose-600" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-sky-600" />;
      default:
        return <Briefcase className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      <div>
        <h1 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {isHindi ? 'सभी श्रेणियां (Categories)' : 'All Categories'}
        </h1>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {isHindi
            ? 'अपनी पसंद की परीक्षा या श्रेणी अनुसार सूचनाएं देखें'
            : 'Explore notifications by specific examination or student category'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all hover:scale-[1.01] active:scale-[0.99] ${
              isDark
                ? 'bg-slate-800/60 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60">
                {getIcon(cat.icon)}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <div className={`text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHindi ? cat.titleHi : cat.titleEn}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {isHindi ? cat.titleEn : cat.titleHi}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
