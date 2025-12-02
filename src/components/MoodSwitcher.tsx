import React from 'react';
import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { MoodTheme } from '../types';

export function MoodSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { value: MoodTheme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun size={16} />, label: 'Light' },
    { value: 'dark', icon: <Moon size={16} />, label: 'Dark' },
    { value: 'wander', icon: <Zap size={16} />, label: 'Wander' }
  ];

  return (
    <div className="flex gap-1 bg-white/20 backdrop-blur-md rounded-full p-1">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 text-xs font-medium ${
            theme === t.value
              ? 'bg-white text-amber-600 shadow-md'
              : 'text-white/70 hover:text-white/90'
          }`}
          title={t.label}
        >
          {t.icon}
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
