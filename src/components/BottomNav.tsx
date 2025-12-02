import React from 'react';
import { Home, Hotel, Utensils, AlertCircle, Map } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'hotels' | 'food' | 'safety' | 'explore';
  onTabChange: (tab: 'home' | 'hotels' | 'food' | 'safety' | 'explore') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'hotels' as const, icon: Hotel, label: 'Hotels' },
    { id: 'food' as const, icon: Utensils, label: 'Food & Go' },
    { id: 'safety' as const, icon: AlertCircle, label: 'Safety' },
    { id: 'explore' as const, icon: Map, label: 'Explore' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-slate-200 safe-bottom">
      <div className="flex justify-around max-w-2xl mx-auto h-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${
                isActive
                  ? 'text-amber-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
