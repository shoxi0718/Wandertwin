import React, { useState } from 'react';
import { MapPin, Lock, Star, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function ExploreTab() {
  const { profile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'historical', label: 'Tarixi Joylar', icon: '🏛️', color: 'from-amber-500 to-amber-600' },
    { id: 'religious', label: 'Diniy Joylar', icon: '🕌', color: 'from-green-500 to-green-600' },
    { id: 'natural', label: 'Tabiat', icon: '🏔️', color: 'from-emerald-500 to-emerald-600' },
    { id: 'cultural', label: 'Madaniyat', icon: '🎭', color: 'from-purple-500 to-purple-600' },
    { id: 'modern', label: 'Zamonaviy', icon: '🏙️', color: 'from-blue-500 to-blue-600' }
  ];

  const landmarks = [
    {
      id: '1',
      name: 'Registan',
      category: 'historical',
      region: 'Samarqand',
      rating: 4.9,
      reviews: 2543,
      legend: 'Dünyoning eng go\'zal madrasaxonalarining majmuasi',
      isOptional: false,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Bibi-Khanym Mosque',
      category: 'religious',
      region: 'Samarqand',
      rating: 4.7,
      reviews: 1203,
      legend: 'XVI asrda qurilgan narin ishlangan masjid',
      isOptional: false,
      image: 'https://images.unsplash.com/photo-1578485550222-641f622b78af?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Chimgan Mountains',
      category: 'natural',
      region: 'Tashkent',
      rating: 4.8,
      reviews: 890,
      legend: 'O\'zbekistonning eng mashhur tog\'lari',
      isOptional: false,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      id: '4',
      name: 'Secret Garden (Premium)',
      category: 'cultural',
      region: 'Buxoro',
      rating: 4.9,
      reviews: 312,
      legend: 'Faqat premium foydalanuvchilar uchun yashirin jannat',
      isOptional: true,
      image: 'https://images.unsplash.com/photo-1585399235746-3f4a4b8b7e66?w=400&h=300&fit=crop'
    }
  ];

  const filtered = selectedCategory
    ? landmarks.filter(l => l.category === selectedCategory)
    : landmarks;

  return (
    <div className="pb-24">
      {/* Categories */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg p-4 border-b border-slate-200">
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`p-3 rounded-lg transition text-xs font-medium text-center ${
                selectedCategory === cat.id
                  ? `bg-gradient-to-br ${cat.color} text-white`
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="text-lg">{cat.icon}</div>
              <div className="mt-1">{cat.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Landmarks Grid */}
      <div className="px-4 py-4 space-y-4">
        {filtered.map((landmark) => (
          <div
            key={landmark.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-slate-100 relative"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-slate-200">
              <img
                src={landmark.image}
                alt={landmark.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
              {landmark.isOptional && !profile?.subscription && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <Lock size={32} className="text-white mx-auto mb-2" />
                    <p className="text-white font-semibold text-sm">Premium xususiyati</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">{landmark.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    {landmark.region}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-lg">
                  <Star size={14} className="text-amber-600" fill="currentColor" />
                  <span className="text-sm font-semibold text-amber-900">{landmark.rating}</span>
                </div>
              </div>

              <p className="text-sm text-slate-700 my-3 italic">{landmark.legend}</p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">{landmark.reviews} sharhlar</span>
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition font-semibold text-sm">
                    Batafsil
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-lg transition font-semibold text-sm">
                    AR ko'rish
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Events Section */}
      <div className="px-4 py-4">
        <h2 className="font-semibold text-lg mb-3">Yaqinda bo'ladigan tadbir</h2>
        <div className="space-y-2">
          {[
            { name: 'Navruz Bayrami', date: '2024-03-21', city: 'Tashkent' },
            { name: 'Samarqand Fashion Week', date: '2024-04-15', city: 'Samarqand' }
          ].map((event) => (
            <div key={event.name} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3 border border-pink-200 hover:shadow-md transition cursor-pointer">
              <p className="font-semibold text-slate-900">{event.name}</p>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                <Clock size={14} />
                {event.date} • {event.city}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
