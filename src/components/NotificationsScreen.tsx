import React, { useState } from 'react';
import { Bell, CheckCheck, Settings, ExternalLink, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { AppLanguage, NotificationItem } from '../types';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  language: AppLanguage;
  onNotificationClick: (notif: NotificationItem) => void;
  onMarkAllRead: () => void;
  isDark: boolean;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  language,
  onNotificationClick,
  onMarkAllRead,
  isDark,
}) => {
  const isHindi = language === 'hi';
  const [showSettings, setShowSettings] = useState(false);
  const [channels, setChannels] = useState({
    jobAlerts: true,
    admitCards: true,
    results: true,
    scholarships: true,
  });

  const toggleChannel = (key: keyof typeof channels) => {
    setChannels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isHindi ? 'सूचनाएं (Notification Inbox)' : 'Notifications'}
          </h1>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {isHindi ? 'नवीनतम परीक्षा एवं भर्ती चेतावनियां' : 'Latest alerts and examination updates'}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl transition-colors ${
              showSettings ? 'bg-blue-600 text-white' : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Notification Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={onMarkAllRead}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold ${
              isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{isHindi ? 'सभी पढ़ें' : 'Mark Read'}</span>
          </button>
        </div>
      </div>

      {/* FCM Push Notification Configuration Panel */}
      {showSettings && (
        <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-blue-50/60 border-blue-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
              {isHindi ? 'पुश नोटिफिकेशन सेटिंग्स (FCM Channels)' : 'Push Notification Channels (FCM)'}
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600/10 text-blue-600">
              Native FCM Ready
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { key: 'jobAlerts', labelHi: 'सरकारी नौकरी अलर्ट (Job Alerts)', labelEn: 'Sarkari Job Alerts' },
              { key: 'admitCards', labelHi: 'एडमिट कार्ड सूचना (Admit Cards)', labelEn: 'Admit Card Alerts' },
              { key: 'results', labelHi: 'परीक्षा परिणाम (Exam Results)', labelEn: 'Exam Results' },
              { key: 'scholarships', labelHi: 'छात्रवृत्ति व योजनाएं (Scholarships)', labelEn: 'Scholarship Schemes' },
            ].map((ch) => {
              const active = channels[ch.key as keyof typeof channels];
              return (
                <div key={ch.key} className="flex items-center justify-between py-1">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    {isHindi ? ch.labelHi : ch.labelEn}
                  </span>
                  <button
                    onClick={() => toggleChannel(ch.key as keyof typeof channels)}
                    className="focus:outline-none"
                  >
                    {active ? (
                      <ToggleRight className="w-6 h-6 text-blue-600" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-400" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-2.5">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            {isHindi ? 'कोई नई सूचना नहीं है।' : 'No notifications in your inbox.'}
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onNotificationClick(notif)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:border-blue-300 ${
                !notif.isRead
                  ? isDark
                    ? 'bg-blue-950/30 border-blue-900/60'
                    : 'bg-blue-50/60 border-blue-200'
                  : isDark
                  ? 'bg-slate-800/40 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <div className="flex items-center gap-1.5">
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  )}
                  <span className="font-bold text-blue-600 uppercase text-[10px]">
                    {notif.category.replace('_', ' ')}
                  </span>
                </div>
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                  {notif.timestamp}
                </span>
              </div>

              <h2 className={`text-xs font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHindi ? notif.titleHi : notif.titleEn}
              </h2>

              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {isHindi ? notif.messageHi : notif.messageEn}
              </p>

              {notif.targetPostId && (
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                  <span>{isHindi ? 'विस्तार से पढ़ें' : 'Read details'}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
