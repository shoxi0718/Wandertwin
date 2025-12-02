import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { BottomNav } from './components/BottomNav';
import { MoodSwitcher } from './components/MoodSwitcher';
import { AIAssistant } from './components/AIAssistant';
import { HomeTab } from './components/tabs/HomeTab';
import { HotelsTab } from './components/tabs/HotelsTab';
import { FoodTab } from './components/tabs/FoodTab';
import { SafetyTab } from './components/tabs/SafetyTab';
import { ExploreTab } from './components/tabs/ExploreTab';
import { supabase } from './lib/supabase';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'hotels' | 'food' | 'safety' | 'explore'>('home');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-amber-600 rounded-full animate-spin mx-auto" />
          <p className="text-slate-700 font-semibold">WanderTwin yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-300 to-red-500 flex items-center justify-center p-4">
        <div className="text-center text-white space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-2">WanderTwin</h1>
            <p className="text-xl opacity-90">O'zbekistonning premium AI turizm yordamchisi</p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 max-w-md space-y-4">
            <p className="text-lg font-semibold">QR kodni skanerlang yoki wandertwin.uz ga kiring</p>

            <button
              onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
              className="w-full bg-white text-amber-600 font-bold py-3 rounded-lg hover:bg-amber-50 transition shadow-lg"
            >
              Google orqali kiring
            </button>

            <button
              onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition shadow-lg"
            >
              Email orqali ro'yxatdan o'ting
            </button>
          </div>

          <div className="text-sm opacity-75">
            <p>wandertwin.uz veb-saytida ro'yxatdan o'tib, QR kodni skanerlang</p>
          </div>
        </div>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'hotels':
        return <HotelsTab />;
      case 'food':
        return <FoodTab />;
      case 'safety':
        return <SafetyTab />;
      case 'explore':
        return <ExploreTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <AnimatedBackground />

      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-4 py-4">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
            WanderTwin
          </h1>
          <MoodSwitcher />
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-2xl mx-auto relative z-10">
        {renderTab()}
      </div>

      {/* Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
