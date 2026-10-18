import React, { useState } from 'react';
import { Search, X, RefreshCw, Bookmark, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AppLanguage, Post, PostCategory } from '../types';
import { CATEGORIES } from '../data/posts';

interface HomeScreenProps {
  posts: Post[];
  savedIds: string[];
  language: AppLanguage;
  selectedCategory: PostCategory | null;
  onSelectCategory: (cat: PostCategory | null) => void;
  onPostClick: (post: Post) => void;
  onToggleBookmark: (postId: string) => void;
  isDark: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  posts,
  savedIds,
  language,
  selectedCategory,
  onSelectCategory,
  onPostClick,
  onToggleBookmark,
  isDark,
}) => {
  const isHindi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshMessage(isHindi ? 'ताज़ा अपडेट्स लोड हो गए हैं' : 'Feed refreshed successfully');
      setTimeout(() => setRefreshMessage(null), 2500);
    }, 600);
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        post.titleHi.toLowerCase().includes(q) ||
        post.titleEn.toLowerCase().includes(q) ||
        post.qualification.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-4">
      {/* Search Input Bar */}
      <div className="px-4 pt-3">
        <div
          className={`relative flex items-center rounded-2xl border transition-all ${
            isDark
              ? 'bg-slate-800/80 border-slate-700 text-slate-100 focus-within:border-blue-500'
              : 'bg-slate-50 border-slate-200 text-slate-900 focus-within:border-blue-600 focus-within:bg-white'
          }`}
        >
          <Search className="w-4 h-4 ml-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isHindi
                ? 'नौकरी, रिजल्ट, छात्रवृत्ति, परीक्षा खोजें...'
                : 'Search jobs, results, scholarships, exams...'
            }
            className="w-full py-2.5 pl-2.5 pr-8 bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Verified Notice Banner */}
      <div className="px-4">
        <div
          className={`flex items-start gap-2.5 p-3 rounded-2xl border ${
            isDark
              ? 'bg-blue-950/40 border-blue-900/60 text-blue-200'
              : 'bg-blue-50/70 border-blue-100 text-blue-900'
          }`}
        >
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold">
              {isHindi ? 'डिजिटल दोस्त सेन्टर प्रतिज्ञा: ' : 'Digital Dost Centre Pledge: '}
            </span>
            <span>
              {isHindi
                ? 'केवल आधिकारिक वेबसाइटों से सत्यापित सरकारी विज्ञप्तियां व लिंक। कोई भ्रामक आंकड़े नहीं।'
                : 'Only 100% verified notifications from official govt portals. Zero false statistics.'}
            </span>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Carousel */}
      <div className="space-y-2">
        <div className="px-4 flex items-center justify-between">
          <h2 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {isHindi ? 'श्रेणियां (Categories)' : 'Categories'}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              {isHindi ? 'सभी देखें (Clear)' : 'View All'}
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
              selectedCategory === null
                ? 'bg-blue-600 text-white shadow-sm'
                : isDark
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isHindi ? 'सभी (All)' : 'All Updates'}
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isHindi ? cat.titleHi : cat.titleEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Latest Updates Section Header */}
      <div className="px-4 pt-1 flex items-center justify-between">
        <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {isHindi ? 'ताज़ा सूचनाएं (Latest Updates)' : 'Latest Announcements'}
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex items-center gap-1 text-xs font-medium ${
            isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isHindi ? 'रिफ्रेश' : 'Refresh'}</span>
        </button>
      </div>

      {refreshMessage && (
        <div className="px-4">
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-500/10 text-emerald-600 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{refreshMessage}</span>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="px-4 space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <div className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {isHindi ? 'कोई सूचना नहीं मिली' : 'No announcements found'}
            </div>
            <div className="text-xs text-slate-500 max-w-xs mx-auto">
              {isHindi
                ? 'कृपया किसी अन्य कीवर्ड से खोजें या श्रेणी फ़िल्टर हटाएं।'
                : 'Try searching with a different exam, post name, or board.'}
            </div>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isBookmarked = savedIds.includes(post.id);
            const catInfo = CATEGORIES.find((c) => c.id === post.category);
            const categoryLabel = isHindi ? catInfo?.titleHi : catInfo?.titleEn;

            return (
              <div
                key={post.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                {/* Meta line */}
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-blue-600">{categoryLabel}</span>
                    <span className="text-slate-400">·</span>
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{post.publishedDate}</span>
                  </div>
                  {post.isDemo && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      DEMO FORMAT
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  onClick={() => onPostClick(post)}
                  className={`text-sm font-semibold leading-snug cursor-pointer line-clamp-2 hover:text-blue-600 transition-colors ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {isHindi ? post.titleHi : post.titleEn}
                </h3>

                {/* Grid details */}
                <div className={`mt-2.5 pt-2 border-t grid grid-cols-2 gap-2 text-xs ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                  <div>
                    <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {isHindi ? 'अंतिम तिथि' : 'Last Date'}
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {post.lastDate}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {isHindi ? 'पद / सीटें' : 'Vacancies'}
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {post.totalVacancies}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex items-center justify-between pt-1">
                  <button
                    onClick={() => onPostClick(post)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                  >
                    <span>{isHindi ? 'विवरण देखें' : 'View Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleBookmark(post.id)}
                    aria-label="Save"
                    className={`p-2 rounded-xl transition-colors ${
                      isBookmarked
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30'
                        : isDark
                        ? 'text-slate-400 hover:bg-slate-700'
                        : 'text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
