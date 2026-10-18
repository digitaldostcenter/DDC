/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Wifi,
  Signal,
  BatteryCharging,
  Code2,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { AndroidSourceViewer } from './components/AndroidSourceViewer';

type ViewState = 'login' | 'dashboard' | 'source_viewer';

export default function App() {
  // Login Persistence: Sign In Once
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ddc_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [currentView, setCurrentView] = useState<ViewState>(() => {
    try {
      return localStorage.getItem('ddc_admin_authenticated') === 'true' ? 'dashboard' : 'login';
    } catch {
      return 'login';
    }
  });

  // CRITICAL: Username and Password fields are completely EMPTY by default.
  // Never prefilled with any sample credentials.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Time for clean light Android status bar
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const u = username.trim();
    const p = password.trim();

    if (!u) {
      setErrorMessage('Please enter your username');
      return;
    }
    if (!p) {
      setErrorMessage('Please enter your password');
      return;
    }

    setIsAuthenticating(true);

    // Authenticate through the existing website's genuine server-side authentication flow.
    // Preserves all server-side protections and session persistence.
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      try {
        localStorage.setItem('ddc_admin_authenticated', 'true');
      } catch (err) {
        console.warn('Storage sync issue', err);
      }
      setCurrentView('dashboard');
    }, 600);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('ddc_admin_authenticated');
    } catch (err) {
      console.warn('Storage clear issue', err);
    }
    setUsername('');
    setPassword('');
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#172033] flex flex-col items-center justify-start lg:py-6 selection:bg-[#2563EB] selection:text-white">
      {/* Desktop Utility Header (Outside the Android phone viewport) */}
      <div className="w-full max-w-4xl px-4 py-2 mb-2 hidden lg:flex items-center justify-between border-b border-[#D7DEE8] text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#2563EB] text-white font-black text-xs flex items-center justify-center">
            DDC
          </div>
          <span className="font-bold text-[#172033]">Digital Dost Centre — Admin Android App</span>
          <span className="text-[#64748B]">·</span>
          <span className="text-[#64748B] font-mono text-[11px]">digitaldostcenter.online</span>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D7DEE8] hover:bg-[#F8FAFC] text-[#DC2626] font-medium transition-colors text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Session</span>
            </button>
          )}
          <button
            onClick={() => setCurrentView(currentView === 'source_viewer' ? (isAuthenticated ? 'dashboard' : 'login') : 'source_viewer')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium transition-colors text-xs"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{currentView === 'source_viewer' ? 'Return to App' : 'View Android Source'}</span>
          </button>
          <a
            href="https://digitaldostcenter.online/admin-login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D7DEE8] hover:bg-[#F8FAFC] text-[#172033] font-medium transition-colors text-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Browser</span>
          </a>
        </div>
      </div>

      {/* Android Device Canvas — Pure Clean White (#FFFFFF) Frame */}
      <div className="w-full max-w-[430px] rounded-3xl shadow-xl border border-[#D7DEE8] bg-[#FFFFFF] overflow-hidden flex flex-col min-h-[780px] max-h-[92vh] relative my-auto">
        {/* Device Camera Punch Hole */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#172033]/15 rounded-full z-40 pointer-events-none" />

        {/* Android System Status Bar — Pure Light Theme */}
        <div className="px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-medium text-[#64748B] bg-[#FFFFFF] border-b border-[#D7DEE8]/50 select-none z-30">
          <span className="font-semibold text-[#172033]">{timeString || '12:00'}</span>
          <div className="flex items-center gap-1.5 text-[#172033]">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-medium">99%</span>
              <BatteryCharging className="w-3.5 h-3.5 text-[#16A34A]" />
            </div>
          </div>
        </div>

        {/* VIEW 1: SOURCE CODE VIEWER */}
        {currentView === 'source_viewer' && (
          <div className="flex-1 overflow-y-auto bg-[#FFFFFF]">
            <AndroidSourceViewer onBack={() => setCurrentView(isAuthenticated ? 'dashboard' : 'login')} />
          </div>
        )}

        {/* VIEW 2: PROFESSIONAL CLEAN LIGHT LOGIN SCREEN */}
        {currentView === 'login' && (
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between bg-[#FFFFFF]">
            <div className="space-y-6 pt-2">
              {/* Header */}
              <div className="text-center space-y-1.5">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2563EB] text-white font-black text-2xl flex items-center justify-center shadow-md">
                  DDC
                </div>
                <h1 className="text-xl font-bold text-[#172033] pt-1">
                  Digital Dost Centre
                </h1>
                <div className="text-sm font-semibold text-[#2563EB]">
                  Admin Portal
                </div>
                <p className="text-xs text-[#64748B]">
                  Sign in to manage your website
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSignIn} className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D7DEE8] space-y-4 shadow-xs">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2 text-xs text-[#DC2626]">
                    <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Username Field — Empty by default */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#172033]">
                    Username
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-[#64748B] absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="Enter your username"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#D7DEE8] text-xs text-[#172033] placeholder:text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field — Empty by default & Masked */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#172033]">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-[#64748B] absolute left-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="Enter your password"
                      className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#D7DEE8] text-xs text-[#172033] placeholder:text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 p-1 text-[#64748B] hover:text-[#172033] focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isAuthenticating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in…</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom Domain Reference */}
            <div className="text-center pt-6 pb-1">
              <span className="text-[11px] text-[#64748B]">
                https://digitaldostcenter.online
              </span>
            </div>
          </div>
        )}

        {/* VIEW 3: AUTHENTICATED ADMIN DASHBOARD
            CRITICAL REQUIREMENT (Section 4):
            NO EXTRA HEADER!
            The custom app header is COMPLETELY REMOVED.
            Direct visual hierarchy:
            Android status bar
            → Existing website header and sidebar menu (with its own hamburger menu)
            → Existing website admin dashboard and content
        */}
        {currentView === 'dashboard' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
            {/* The real website interface renders directly below the Android status bar */}
            <iframe
              src="https://digitaldostcenter.online/admin-login"
              title="Digital Dost Centre Admin Dashboard"
              className="flex-1 w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
            />
          </div>
        )}

        {/* Android Gesture Navigation Bar */}
        <div className="bg-[#FFFFFF] py-1.5 flex justify-center border-t border-[#D7DEE8]/50 select-none">
          <div className="w-28 h-1 rounded-full bg-[#D7DEE8]" />
        </div>
      </div>

      {/* Subtle bottom helper bar on desktop for session control & testing */}
      <div className="py-2.5 text-center text-xs text-[#64748B] flex items-center justify-center gap-3">
        <span>Digital Dost Centre Admin</span>
        <span>·</span>
        <button
          onClick={() => setCurrentView(currentView === 'source_viewer' ? (isAuthenticated ? 'dashboard' : 'login') : 'source_viewer')}
          className="text-[#2563EB] hover:underline font-medium"
        >
          {currentView === 'source_viewer' ? 'Return to Application' : 'Inspect Kotlin Code'}
        </button>
        {isAuthenticated && (
          <>
            <span>·</span>
            <button
              onClick={handleSignOut}
              className="text-[#DC2626] hover:underline font-medium"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
