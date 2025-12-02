import React, { useState } from 'react';
import { Search, MapPin, Star, DollarSign, Wifi } from 'lucide-react';

export function HotelsTab() {
  const [showFilter, setShowFilter] = useState(false);
  const [filterNational, setFilterNational] = useState(false);

  const hotels = [
    {
      id: '1',
      name: 'Registan Palace',
      rating: 4.8,
      price: 150,
      reviews: 243,
      region: 'Samarqand',
      amenities: ['WiFi', 'Spa', 'Restaurant'],
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Old City Boutique',
      rating: 4.5,
      price: 89,
      reviews: 156,
      region: 'Buxoro',
      amenities: ['WiFi', 'Courtyard'],
      isNational: true,
      image: 'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Tashkent Luxury Suite',
      rating: 4.6,
      price: 200,
      reviews: 312,
      region: 'Tashkent',
      amenities: ['WiFi', 'Gym', 'Pool', 'Restaurant'],
      image: 'https://images.unsplash.com/photo-1553531088-be7da882dd18?w=400&h=300&fit=crop'
    }
  ];

  const filtered = filterNational ? hotels.filter(h => h.isNational) : hotels;

  return (
    <div className="pb-24">
      {/* Search & Filter */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg p-4 border-b border-slate-200">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Mehmonxona qidirish..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
          >
            Filter
          </button>
        </div>

        {showFilter && (
          <div className="bg-slate-50 p-3 rounded-lg space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filterNational}
                onChange={(e) => setFilterNational(e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500"
              />
              <span className="text-sm font-medium">Milliy uylar</span>
            </label>
          </div>
        )}
      </div>

      {/* Hotels List */}
      <div className="px-4 py-4 space-y-4">
        {filtered.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-slate-100"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden bg-slate-200">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
              {hotel.isNational && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Milliy uy
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900">{hotel.name}</h3>
                <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-lg">
                  <Star size={14} className="text-amber-600" fill="currentColor" />
                  <span className="text-sm font-semibold text-amber-900">{hotel.rating}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                <MapPin size={14} />
                {hotel.region}
              </p>

              <div className="flex gap-2 flex-wrap mb-3">
                {hotel.amenities.map((amenity) => (
                  <span key={amenity} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <DollarSign size={16} className="text-slate-600" />
                  <span className="font-bold text-slate-900">${hotel.price}/kecha</span>
                </div>
                <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition text-sm">
                  Bron qilish
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-2">{hotel.reviews} sharhlar</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
