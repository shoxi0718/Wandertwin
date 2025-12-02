import { supabase } from '../lib/supabase';
import { Hotel, Restaurant, Landmark, Event } from '../types';

export async function seedHotels() {
  const hotels: Omit<Hotel, 'created_at'>[] = [
    {
      id: crypto.randomUUID(),
      name: 'Registan Palace',
      description: 'Luxury hotel near the famous Registan square with stunning views',
      latitude: 39.6549,
      longitude: 66.9749,
      address: 'Registan Square, Samarkand',
      phone: '+998 66 233-66-66',
      website: 'registan-palace.uz',
      email: 'info@registan-palace.uz',
      price_per_night_usd: 150,
      rating: 4.8,
      total_reviews: 243,
      amenities: ['WiFi', 'Spa', 'Restaurant', 'Pool', 'Gym'],
      images_urls: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop'
      ],
      has_360_tour: true,
      is_national_house: false,
      region: 'Samarkand'
    },
    {
      id: crypto.randomUUID(),
      name: 'Old City Boutique',
      description: 'Authentic national house in historic Bukhara old city',
      latitude: 39.7749,
      longitude: 64.4149,
      address: 'Ark Street, Bukhara',
      phone: '+998 65 224-01-18',
      website: 'oldcity-bukhara.uz',
      email: 'stay@oldcity.uz',
      price_per_night_usd: 89,
      rating: 4.5,
      total_reviews: 156,
      amenities: ['WiFi', 'Courtyard', 'Traditional Tea'],
      images_urls: [
        'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=400&h=300&fit=crop'
      ],
      has_360_tour: false,
      is_national_house: true,
      region: 'Bukhara'
    },
    {
      id: crypto.randomUUID(),
      name: 'Tashkent Luxury Suite',
      description: 'Five-star modern luxury in the heart of Tashkent',
      latitude: 41.2995,
      longitude: 69.2401,
      address: 'Amir Timur Avenue, Tashkent',
      phone: '+998 71 120-88-88',
      website: 'tashkent-luxury.uz',
      email: 'booking@tashkent-luxury.uz',
      price_per_night_usd: 200,
      rating: 4.6,
      total_reviews: 312,
      amenities: ['WiFi', 'Gym', 'Pool', 'Restaurant', 'Business Center'],
      images_urls: [
        'https://images.unsplash.com/photo-1553531088-be7da882dd18?w=400&h=300&fit=crop'
      ],
      has_360_tour: true,
      is_national_house: false,
      region: 'Tashkent'
    }
  ];

  const { error } = await supabase
    .from('hotels')
    .insert(hotels);

  if (error) console.error('Hotels seed error:', error);
}

export async function seedRestaurants() {
  const restaurants: Omit<Restaurant, 'created_at'>[] = [
    {
      id: crypto.randomUUID(),
      name: 'Plov Palace',
      description: 'Best plov in Tashkent with authentic Uzbek flavors',
      latitude: 41.3005,
      longitude: 69.2505,
      address: 'Mustaqillik Avenue, Tashkent',
      phone: '+998 71 233-45-67',
      website: 'plovpalace.uz',
      cuisine_type: 'Uzbek',
      rating: 4.9,
      total_reviews: 512,
      price_level: 'budget',
      images_urls: [
        'https://images.unsplash.com/photo-1645112411341-6c4ee32510d8?w=400&h=300&fit=crop'
      ],
      menu_url: 'https://plovpalace.uz/menu',
      is_halal: true,
      accepts_card: true,
      region: 'Tashkent'
    },
    {
      id: crypto.randomUUID(),
      name: 'Chaikhana Samarkand',
      description: 'Traditional tea house with cultural ambiance',
      latitude: 39.6559,
      longitude: 66.9759,
      address: 'Registan Area, Samarkand',
      phone: '+998 66 233-12-34',
      website: 'chaikhana-samarkand.uz',
      cuisine_type: 'Milliy',
      rating: 4.7,
      total_reviews: 298,
      price_level: 'budget',
      images_urls: [
        'https://images.unsplash.com/photo-1550966871-7df12dc3005c?w=400&h=300&fit=crop'
      ],
      menu_url: 'https://chaikhana-samarkand.uz/menu',
      is_halal: true,
      accepts_card: true,
      region: 'Samarkand'
    }
  ];

  const { error } = await supabase
    .from('restaurants')
    .insert(restaurants);

  if (error) console.error('Restaurants seed error:', error);
}

export async function seedLandmarks() {
  const landmarks: Omit<Landmark, 'created_at'>[] = [
    {
      id: crypto.randomUUID(),
      name: 'Registan',
      name_uz_cyrillic: 'Регистан',
      description: 'The most magnificent square in Central Asia',
      history: 'Built in the 15th-17th centuries',
      latitude: 39.6549,
      longitude: 66.9749,
      address: 'Samarkand City Center',
      category: 'historical',
      images_urls: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop'
      ],
      entrance_fee_usd: 10,
      opening_hours: '09:00 - 17:00',
      best_time_to_visit: 'Early morning or sunset',
      legendary_story: 'Home to three magnificent madrasahs with intricate tile work',
      region: 'Samarkand',
      is_premium_only: false
    },
    {
      id: crypto.randomUUID(),
      name: 'Bibi-Khanym Mosque',
      name_uz_cyrillic: 'Биби-Ханум Масжиди',
      description: 'One of the finest mosques in the Islamic world',
      history: 'Built in 1399-1404 by Timur',
      latitude: 39.6459,
      longitude: 66.9859,
      address: 'Samarkand',
      category: 'religious',
      images_urls: [
        'https://images.unsplash.com/photo-1578485550222-641f622b78af?w=400&h=300&fit=crop'
      ],
      entrance_fee_usd: 5,
      opening_hours: '09:00 - 18:00',
      best_time_to_visit: 'Morning light for photography',
      legendary_story: 'Built for the favorite wife of Amir Timur',
      region: 'Samarkand',
      is_premium_only: false
    },
    {
      id: crypto.randomUUID(),
      name: 'Chimgan Mountains',
      name_uz_cyrillic: 'Чимган Тоглари',
      description: 'Beautiful mountain range near Tashkent',
      history: 'Popular destination for centuries',
      latitude: 41.4649,
      longitude: 69.4249,
      address: 'Near Tashkent',
      category: 'natural',
      images_urls: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
      ],
      entrance_fee_usd: 0,
      opening_hours: '24/7',
      best_time_to_visit: 'Spring and autumn',
      legendary_story: 'Sacred mountains with hiking trails and cable car',
      region: 'Tashkent',
      is_premium_only: false
    }
  ];

  const { error } = await supabase
    .from('landmarks')
    .insert(landmarks);

  if (error) console.error('Landmarks seed error:', error);
}

export async function seedEvents() {
  const events: Omit<Event, 'created_at'>[] = [
    {
      id: crypto.randomUUID(),
      name: 'Navruz Festival',
      description: 'Spring celebration with music, food, and traditions',
      category: 'festival',
      start_date: '2024-03-21T00:00:00Z',
      end_date: '2024-03-23T23:59:59Z',
      latitude: 41.2995,
      longitude: 69.2401,
      location: 'Tashkent Central Park',
      image_url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop',
      website: 'navruz.uz',
      ticket_price_usd: 0,
      region: 'Tashkent'
    },
    {
      id: crypto.randomUUID(),
      name: 'Samarkand Fashion Week',
      description: 'International fashion showcase featuring Uzbek designers',
      category: 'cultural',
      start_date: '2024-04-15T09:00:00Z',
      end_date: '2024-04-17T23:59:59Z',
      latitude: 39.6549,
      longitude: 66.9749,
      location: 'Registan Convention Center',
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      website: 'fashionweek.uz',
      ticket_price_usd: 15,
      region: 'Samarkand'
    }
  ];

  const { error } = await supabase
    .from('events')
    .insert(events);

  if (error) console.error('Events seed error:', error);
}

export async function seedAllData() {
  console.log('Seeding database...');
  await Promise.all([
    seedHotels(),
    seedRestaurants(),
    seedLandmarks(),
    seedEvents()
  ]);
  console.log('Database seeding complete!');
}
