import React from 'react';
import { Bookmark, ArrowRight, Trash2, BookmarkX } from 'lucide-react';
import { AppLanguage, Post } from '../types';
import { CATEGORIES } from '../data/posts';

interface SavedScreenProps {
  savedPosts: Post[];
  language: AppLanguage;
  onPostClick: (post: Post) => void;
  onRemoveBookmark: (postId: string) => void;
  onExploreClick: () => void;
  isDark: boolean;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedPosts,
  language,
  onPostClick,
  onRemoveBookmark,
  onExploreClick,
  isDark,
}) => {
  const isHindi = language === 'hi';

  return (
    <div className="p-4 space-y-4 pb-20">
      <div>
        <h1 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {isHindi ? 'सहेजे गए पोस्ट (Saved)' : 'Saved Posts'}
        </h1>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {isHindi
            ? 'आपके द्वारा ऑफलाइन व त्वरित संदर्भ हेतु बुकमार्क की गई सूचनाएं'
            : 'Announcements bookmarked for offline and fast reference'}
        </p>
      </div>

      {savedPosts.length === 0 ? (
        <div className={`p-8 rounded-3xl border text-center space-y-3 ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600">
            <BookmarkX className="w-6 h-6" />
          </div>
          <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isHindi ? 'कोई सहेजा हुआ पोस्ट नहीं' : 'No Saved Posts Yet'}
          </div>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            {isHindi
              ? 'सरकारी नौकरी, एडमिट कार्ड अथवा छात्रवृत्ति की किसी भी पोस्ट पर बुकमार्क आइकन दबाकर यहां सुरक्षित करें।'
              : 'Tap the bookmark icon on any job notification or result card to save it here for offline reading.'}
          </p>
          <button
            onClick={onExploreClick}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
          >
            {isHindi ? 'होम पेज पर जाएं' : 'Browse Announcements'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {savedPosts.map((post) => {
            const catInfo = CATEGORIES.find((c) => c.id === post.category);
            const categoryLabel = isHindi ? catInfo?.titleHi : catInfo?.titleEn;

            return (
              <div
                key={post.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-semibold text-blue-600">{categoryLabel}</span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{post.publishedDate}</span>
                </div>

                <h3
                  onClick={() => onPostClick(post)}
                  className={`text-sm font-semibold leading-snug cursor-pointer line-clamp-2 hover:text-blue-600 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {isHindi ? post.titleHi : post.titleEn}
                </h3>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                    {isHindi ? 'अंतिम तिथि: ' : 'Deadline: '}
                    <strong className="text-red-600 dark:text-red-400">{post.lastDate}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveBookmark(post.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      title={isHindi ? 'हटाएं' : 'Remove'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onPostClick(post)}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs flex items-center gap-1"
                    >
                      <span>{isHindi ? 'देखें' : 'View'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
