import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Volume2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AIAssistant() {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: profile?.gender === 'male'
        ? 'Salom! Men sizning yordamchingizman! O\'zbekiston bo\'ylab sayohatingizda sizga yordam berishga tayyor.'
        : 'Salom! Men sizning yordamchingizman! O\'zbekiston bo\'ylab sayohatingizda sizga yordam berishga tayyor.'
    }
  ]);
  const [input, setInput] = useState('');

  const getCharacterEmoji = () => profile?.gender === 'male' ? '👦' : '👧';

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { role: 'user', content: input },
      {
        role: 'assistant',
        content: 'Tushundim! Bu juda yaxshi so\'rov. Sizga eng yaxshi variantlarni topa olaman. 😊'
      }
    ]);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-red-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all flex items-center justify-center"
        >
          <span className="text-3xl animate-bounce">{getCharacterEmoji()}</span>
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-400 to-red-500 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{getCharacterEmoji()}</span>
              <div>
                <p className="font-bold text-white text-sm">WanderTwin AI</p>
                <p className="text-xs text-amber-50">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-white rounded-br-none'
                      : 'bg-slate-200 text-slate-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-slate-200 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Savolingizni bering..."
              className="flex-1 px-3 py-2 rounded-lg bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              onClick={handleSend}
              className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition"
            >
              <MessageCircle size={20} />
            </button>
            <button className="bg-slate-200 text-slate-700 p-2 rounded-lg hover:bg-slate-300 transition">
              <Volume2 size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
