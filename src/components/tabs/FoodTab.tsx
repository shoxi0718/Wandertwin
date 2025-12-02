import React, { useState } from 'react';
import { Search, MapPin, Star, DollarSign, Navigation } from 'lucide-react';

export function FoodTab() {
  const [filterHalal, setFilterHalal] = useState(false);

  const restaurants = [
    {
      id: '1',
      name: 'Plov Palace',
      cuisine: 'O\'zbek',
      rating: 4.9,
      price: 'budget',
      reviews: 512,
      region: 'Tashkent',
      isHalal: true,
      image: 'https://images.unsplash.com/photo-1645112411341-6c4ee32510d8?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Chaikhana Samarqand',
      cuisine: 'Milliy',
      rating: 4.7,
      price: 'budget',
      reviews: 298,
      region: 'Samarqand',
      isHalal: true,
      image: 'https://images.unsplash.com/photo-1550966871-7df12dc3005c?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Shashlik Corner',
      cuisine: 'Osh markazi',
      rating: 4.6,
      price: 'budget',
      reviews: 187,
      region: 'Buxoro',
      isHalal: true,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561af1?w=400&h=300&fit=crop'
    }
  ];

  const filtered = filterHalal ? restaurants.filter(r => r.isHalal) : restaurants;

  const getPriceLabel = (level: string) => {
    return level === 'budget' ? '5,000-15,000 so\'m' : level === 'moderate' ? '15,000-50,000 so\'m' : '50,000+ so\'m';
  };

  return (
    <div className="pb-24">
      {/* Search & Filter */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg p-4 border-b border-slate-200">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Taom, restoran qidirish..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2 rounded-lg">
          <input
            type="checkbox"
            checked={filterHalal}
            onChange={(e) => setFilterHalal(e.target.checked)}
            className="w-4 h-4 rounded accent-amber-500"
          />
          <span className="text-sm font-medium">Halol taomlar</span>
        </label>
      </div>

      {/* Restaurants List */}
      <div className="px-4 py-4 space-y-4">
        {filtered.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-slate-100"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden bg-slate-200">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
              {restaurant.isHalal && (
                <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Halol ✓
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900">{restaurant.name}</h3>
                <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-lg">
                  <Star size={14} className="text-amber-600" fill="currentColor" />
                  <span className="text-sm font-semibold text-amber-900">{restaurant.rating}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 mb-1">{restaurant.cuisine}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                <MapPin size={14} />
                {restaurant.region}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                  {getPriceLabel(restaurant.price)}
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded-lg border border-amber-400 text-amber-600 hover:bg-amber-50 transition font-semibold text-sm">
                    Menu
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-lg transition font-semibold text-sm flex items-center gap-1">
                    <Navigation size={16} />
                    Yo\'naltir
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-2">{restaurant.reviews} sharhlar</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
