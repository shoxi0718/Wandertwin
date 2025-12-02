import React from 'react';
import { useTheme } from '../context/ThemeContext';

export function AnimatedBackground() {
  const { theme, currentHour } = useTheme();

  const getBackgroundGradient = () => {
    switch (theme) {
      case 'light':
        if (currentHour >= 6 && currentHour < 12) {
          return 'from-blue-100 via-amber-50 to-blue-50';
        } else if (currentHour >= 12 && currentHour < 18) {
          return 'from-blue-200 via-orange-50 to-amber-50';
        } else if (currentHour >= 18 && currentHour < 22) {
          return 'from-orange-200 via-pink-100 to-purple-100';
        } else {
          return 'from-slate-700 via-slate-600 to-slate-800';
        }

      case 'dark':
        return 'from-slate-900 via-slate-800 to-slate-950';

      case 'wander':
        return 'from-red-600 via-amber-500 to-green-600';

      default:
        return 'from-blue-50 to-slate-100';
    }
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 -z-10`}>
      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="suzani" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse" opacity="0.1">
              <circle cx="50" cy="50" r="30" fill="currentColor" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="10" fill="currentColor" />
            </pattern>

            <pattern id="pomegranate" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" opacity="0.15">
              <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="40" cy="40" r="20" fill="currentColor" opacity="0.3" />
              <line x1="40" y1="15" x2="40" y2="65" stroke="currentColor" strokeWidth="1" />
              <line x1="15" y1="40" x2="65" y2="40" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="1200" height="800" fill="url(#suzani)" />
          <rect width="1200" height="800" fill="url(#pomegranate)" />

          {theme === 'wander' && (
            <>
              <path
                d="M 0 400 Q 300 350 600 400 T 1200 400"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.2"
              />
              <path
                d="M 0 500 Q 300 450 600 500 T 1200 500"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.15"
              />
            </>
          )}
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotate-slow 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
