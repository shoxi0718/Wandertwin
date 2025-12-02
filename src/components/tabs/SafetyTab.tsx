import React from 'react';
import { Phone, AlertTriangle, MapPin, Users } from 'lucide-react';

export function SafetyTab() {
  const emergencyContacts = [
    { number: '105', label: 'Militsiya (Politsiya)', color: 'from-blue-500 to-blue-600' },
    { number: '103', label: 'Ambulansiya', color: 'from-red-500 to-red-600' },
    { number: '101', label: 'O\'t o\'chirish', color: 'from-orange-500 to-orange-600' },
    { number: '102', label: 'Bolalar (Xavf ostidagi bolalar)', color: 'from-purple-500 to-purple-600' }
  ];

  const phrasesUz = [
    { en: 'Help!', uz: 'Yordam bering!' },
    { en: 'Call the police', uz: 'Politsiyani chaqiring' },
    { en: 'I am sick', uz: 'Men bemorman' },
    { en: 'Hospital', uz: 'Shifoxona' },
    { en: 'Where is the embassy?', uz: 'Elchixona qayerda?' },
    { en: 'I need a doctor', uz: 'Doktor kerak' }
  ];

  return (
    <div className="pb-24">
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={24} />
          <h1 className="text-xl font-bold">Xavfsizlik Ma'lumotlari</h1>
        </div>
        <p className="text-sm text-red-100">
          O'zbekistonning turli shaharlarida maslahat va yordam uchun kontakt qilinalar.
        </p>
      </div>

      {/* Emergency Buttons */}
      <div className="px-4 py-6">
        <h2 className="font-semibold text-lg mb-4">Favqulodda Raqamlar</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {emergencyContacts.map((contact) => (
            <button
              key={contact.number}
              className={`bg-gradient-to-br ${contact.color} text-white rounded-2xl p-4 hover:shadow-lg transform hover:scale-105 transition active:scale-95`}
            >
              <Phone size={24} className="mb-2 mx-auto" />
              <div className="text-2xl font-bold">{contact.number}</div>
              <div className="text-xs opacity-90 mt-1">{contact.label}</div>
            </button>
          ))}
        </div>

        {/* Tourist Police */}
        <div className="bg-blue-50 rounded-2xl p-4 border-l-4 border-blue-500 mb-6">
          <h3 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
            <Users size={20} />
            Turist Politsiyasi
          </h3>
          <div className="space-y-1 text-sm text-blue-800">
            <p>📍 Tashkent: +998 71 239-34-44</p>
            <p>📍 Samarqand: +998 662 32-20-45</p>
            <p>📍 Buxoro: +998 652 224-01-18</p>
            <p>📍 Fergona: +998 722 242-02-24</p>
          </div>
        </div>

        {/* Emergency Phrases */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Xavfsizlik Iboralari</h2>
          <div className="space-y-2">
            {phrasesUz.map((phrase, i) => (
              <div key={i} className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="font-semibold text-slate-900">{phrase.uz}</p>
                <p className="text-xs text-slate-500">{phrase.en}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Embassies */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Elchixonalar
          </h2>
          <div className="space-y-2">
            {[
              { country: 'USA', phone: '+998 71 120-93-06', city: 'Tashkent' },
              { country: 'UK', phone: '+998 71 255-23-00', city: 'Tashkent' },
              { country: 'France', phone: '+998 71 234-36-03', city: 'Tashkent' },
              { country: 'Russia', phone: '+998 71 140-55-06', city: 'Tashkent' }
            ].map((embassy) => (
              <div key={embassy.country} className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="font-semibold text-slate-900">{embassy.country} Elchixonasi</p>
                <p className="text-xs text-slate-500">{embassy.city}</p>
                <a href={`tel:${embassy.phone}`} className="text-xs text-blue-600 hover:underline">
                  {embassy.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
