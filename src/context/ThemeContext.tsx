import React, { createContext, useContext, useState, useEffect } from 'react';
import { MoodTheme } from '../types';

interface ThemeContextType {
  theme: MoodTheme;
  setTheme: (theme: MoodTheme) => void;
  currentHour: number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<MoodTheme>('light');
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('wandertwin_theme');
    if (saved) {
      setTheme(saved as MoodTheme);
    }
  }, []);

  const updateTheme = (newTheme: MoodTheme) => {
    setTheme(newTheme);
    localStorage.setItem('wandertwin_theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, currentHour }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
