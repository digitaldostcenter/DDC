import React, { useState } from 'react';
import {
  Calendar,
  IndianRupee,
  GraduationCap,
  Users,
  ExternalLink,
  Download,
  Share2,
  Bookmark,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Clock,
} from 'lucide-react';
import { AppLanguage, Post } from '../types';
import { CATEGORIES } from '../data/posts';

interface PostDetailScreenProps {
  post: Post;
  language: AppLanguage;
  isBookmarked: boolean;
  onToggleBookmark: (postId: string) => void;
  isDark: boolean;
}

export const PostDetailScreen: React.FC<PostDetailScreenProps> = ({
  post,
  language,
  isBookmarked,
  onToggleBookmark,
  isDark,
}) => {
  const isHindi = language === 'hi';
  const [copiedShare, setCopiedShare] = useState(false);
  const catInfo = CATEGORIES.find((c) => c.id === post.category);
  const categoryLabel = isHindi ? catInfo?.titleHi : catInfo?.titleEn;

  const handleShare = () => {
    const text = `${isHindi ? post.titleHi : post.titleEn}\nअंतिम तिथि: ${post.lastDate}\nदेखें: https://digitaldostcenter.online`;
    if (navigator.share) {
      navigator.share({ title: post.titleHi, text, url: 'https://digitaldostcenter.online' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Category & Date Header */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          {categoryLabel}
        </span>
        <div className={`flex items-center gap-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{post.publishedDate}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className={`text-base font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {isHindi ? post.titleHi : post.titleEn}
      </h1>

      {/* Demo Format Disclaimer */}
      {post.isDemo && (
        <div
          className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
            isDark
              ? 'bg-amber-950/30 border-amber-900/50 text-amber-300'
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold">
              {isHindi ? 'सत्यापित प्रारूप [डेमो]: ' : 'Verified Sample [DEMO]: '}
            </span>
            <span>
              {isHindi
                ? 'यह पोस्ट वास्तविक बिहार भर्ती प्रारूप दर्शाती है। ऑनलाइन आवेदन करने से पूर्व आधिकारिक विज्ञप्ति पीडीएफ अवश्य देखें।'
                : 'This announcement mirrors authentic state guidelines. Always check the official notification PDF before submitting.'}
            </span>
          </div>
        </div>
      )}

      {/* Quick Info Grid */}
      <div className={`p-3.5 rounded-2xl border space-y-2.5 ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{isHindi ? 'कुल रिक्तियां / पद' : 'Total Vacancies'}</span>
          </div>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {post.totalVacancies}
          </span>
        </div>
        <div className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`} />
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{isHindi ? 'अंतिम तिथि' : 'Last Date'}</span>
          </div>
          <span className="font-bold text-red-600 dark:text-red-400">
            {post.lastDate}
          </span>
        </div>
        <div className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`} />
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>{isHindi ? 'आयु सीमा' : 'Age Limit'}</span>
          </div>
          <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {post.ageLimit}
          </span>
        </div>
      </div>

      {/* Important Dates Table */}
      {post.importantDates.length > 0 && (
        <div className="space-y-2">
          <h2 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {isHindi ? 'महत्वपूर्ण तिथियां (Important Dates)' : 'Important Dates'}
          </h2>
          <div className={`rounded-2xl border divide-y overflow-hidden text-xs ${isDark ? 'bg-slate-800/40 border-slate-700 divide-slate-700' : 'bg-white border-slate-200 divide-slate-100'}`}>
            {post.importantDates.map((item, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between">
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{item.label}</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Application Fee */}
      <div className="space-y-2">
        <h2 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {isHindi ? 'आवेदन शुल्क (Application Fee)' : 'Application Fee'}
        </h2>
        <div className={`p-3.5 rounded-2xl border space-y-2 text-xs ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              {isHindi ? 'सामान्य / ओबीसी / अन्य राज्य' : 'General / OBC / Other States'}
            </span>
            <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{post.feeGeneral}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              {isHindi ? 'एससी / एसटी / महिला / दिव्यांग' : 'SC / ST / Female / PwD'}
            </span>
            <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{post.feeReserved}</span>
          </div>
        </div>
      </div>

      {/* Eligibility & Qualifications */}
      <div className="space-y-2">
        <h2 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {isHindi ? 'शैक्षणिक योग्यता एवं पात्रता' : 'Eligibility & Qualifications'}
        </h2>
        <div className={`p-3.5 rounded-2xl border space-y-2 text-xs ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {post.qualification}
          </div>
          {post.eligibilityPoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
              <span className="text-blue-600 font-bold">•</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h2 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {isHindi ? 'विवरण एवं दिशानिर्देश' : 'Overview & Guidelines'}
        </h2>
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
          {isHindi ? post.descriptionHi : post.descriptionEn}
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className={`fixed bottom-15 left-0 right-0 p-3 border-t flex items-center gap-2 max-w-md mx-auto z-20 ${isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-md`}>
        <button
          onClick={() => onToggleBookmark(post.id)}
          className={`p-2.5 rounded-xl border transition-colors ${
            isBookmarked
              ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950 dark:border-blue-800'
              : isDark
              ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
              : 'border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
          title={isBookmarked ? 'Bookmarked' : 'Save'}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-blue-600' : ''}`} />
        </button>

        <button
          onClick={handleShare}
          className={`p-2.5 rounded-xl border transition-colors ${
            isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <a
          href={post.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center"
        >
          <span>{isHindi ? 'ऑनलाइन आवेदन करें' : 'Apply Online'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {copiedShare && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg z-50">
          {isHindi ? 'लिंक कॉपी हो गया!' : 'Share text copied!'}
        </div>
      )}
    </div>
  );
};
