export type PostCategory =
  | 'govt_jobs'
  | 'results'
  | 'admit_cards'
  | 'scholarships'
  | 'admissions'
  | 'answer_keys'
  | 'syllabus'
  | 'govt_schemes'
  | 'ddc_tools';

export interface CategoryInfo {
  id: PostCategory;
  titleEn: string;
  titleHi: string;
  icon: string;
}

export interface Post {
  id: string;
  titleHi: string;
  titleEn: string;
  category: PostCategory;
  state: string;
  publishedDate: string;
  lastDate: string;
  feeGeneral: string;
  feeReserved: string;
  ageLimit: string;
  qualification: string;
  totalVacancies: string;
  applyUrl: string;
  officialUrl: string;
  notificationPdfUrl: string;
  isDemo: boolean;
  descriptionHi: string;
  descriptionEn: string;
  importantDates: { label: string; date: string }[];
  eligibilityPoints: string[];
}

export interface NotificationItem {
  id: string;
  titleHi: string;
  titleEn: string;
  messageHi: string;
  messageEn: string;
  timestamp: string;
  isRead: boolean;
  targetPostId?: string;
  category: PostCategory;
}

export type AppLanguage = 'hi' | 'en';
export type ActiveTab = 'home' | 'categories' | 'saved' | 'more' | 'notifications' | 'tools' | 'post-detail' | 'android-source';
