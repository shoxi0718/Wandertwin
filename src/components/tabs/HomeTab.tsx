import React from 'react';
import { User, Globe, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Language } from '../../types';

export function HomeTab() {
  const { user, profile, signOut } = useAuth();
  const [language, setLanguage] = React.useState<Language>(profile?.language || 'uz-Latin');

  const languages: { value: Language; label: string }[] = [
    { value: 'uz-Latin', label: 'O\'zbek (Latin)' },
    { value: 'uz-Cyrillic', label: 'O\'zbek (Cyrillic)' },
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' }
  ];

  return (
    <div className="pb-24">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-500 text-white p-6 rounded-b-3xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.full_name || 'Sayohatchiga xush kelibsiz'}</h1>
            <p className="text-sm text-white/80">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Premium Status */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="font-semibold flex items-center gap-2">
              <Zap size={18} />
              Premium Bo'lish
            </p>
            <p className="text-sm text-blue-100 mt-1">Barcha xususiyatlarni ochib ko'ring</p>
          </div>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
            Upgrade
          </button>
        </div>

        {/* Saved Places */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Saqlangan Joylar</h2>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border border-slate-100">
                <div className="w-full h-20 bg-slate-200 rounded-lg mb-2" />
                <p className="text-sm font-medium text-slate-700">Saqlangan joy {i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trip History */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Sayohatingizni Boshqaring</h2>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-3 border border-slate-100 hover:border-amber-300 transition">
                <p className="font-medium text-slate-800">Sayohat {i}</p>
                <p className="text-xs text-slate-500">2024-01-{10 + i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Language Settings */}
        <div>
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Globe size={20} />
            Tilni Tanlang
          </h2>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={`w-full p-3 rounded-lg border transition text-left font-medium ${
                  language === lang.value
                    ? 'bg-amber-100 border-amber-500 text-amber-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="space-y-2 pt-4 border-t border-slate-200">
          <button className="w-full p-2 text-left text-slate-700 hover:text-amber-600 transition text-sm">
            Muallif/Jamoa haqida
          </button>
          <button className="w-full p-2 text-left text-slate-700 hover:text-amber-600 transition text-sm">
            Maxfiylik siyosati
          </button>
          <button className="w-full p-2 text-left text-slate-700 hover:text-amber-600 transition text-sm">
            Foydalaanish shartlari
          </button>
          <button
            onClick={signOut}
            className="w-full p-2 text-left text-red-600 hover:text-red-700 transition text-sm flex items-center gap-2"
          >
            <LogOut size={16} />
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
