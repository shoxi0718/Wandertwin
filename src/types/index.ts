export type Language = 'uz-Latin' | 'uz-Cyrillic' | 'ru' | 'en';
export type MoodTheme = 'light' | 'dark' | 'wander';
export type Gender = 'male' | 'female';
export type PlaceType = 'hotel' | 'restaurant' | 'landmark' | 'event';

export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  gender: Gender;
  profile_picture_url?: string;
  language: Language;
  mood_theme: MoodTheme;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  website?: string;
  email?: string;
  price_per_night_usd: number;
  rating: number;
  total_reviews: number;
  amenities: string[];
  images_urls: string[];
  has_360_tour: boolean;
  is_national_house: boolean;
  region: string;
  created_at: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  website?: string;
  cuisine_type: string;
  rating: number;
  total_reviews: number;
  price_level: 'budget' | 'moderate' | 'expensive';
  images_urls: string[];
  menu_url?: string;
  is_halal: boolean;
  accepts_card: boolean;
  region: string;
  created_at: string;
}

export interface Landmark {
  id: string;
  name: string;
  name_uz_cyrillic?: string;
  description: string;
  history?: string;
  latitude: number;
  longitude: number;
  address: string;
  category: 'historical' | 'religious' | 'natural' | 'cultural' | 'modern';
  images_urls: string[];
  entrance_fee_usd?: number;
  opening_hours?: string;
  best_time_to_visit?: string;
  legendary_story?: string;
  region: string;
  is_premium_only: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  category: 'festival' | 'concert' | 'sports' | 'cultural' | 'market';
  start_date: string;
  end_date: string;
  latitude?: number;
  longitude?: number;
  location: string;
  image_url?: string;
  website?: string;
  ticket_price_usd?: number;
  region: string;
  created_at: string;
}

export interface SavedPlace {
  id: string;
  user_id: string;
  place_type: PlaceType;
  place_id: string;
  created_at: string;
}

export interface PremiumSubscription {
  id: string;
  user_id: string;
  is_premium: boolean;
  subscription_start?: string;
  subscription_end?: string;
  plan_type?: 'monthly' | 'yearly' | 'lifetime';
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  place_type: PlaceType;
  place_id: string;
  rating: number;
  comment?: string;
  images_urls?: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  hotel_id?: string;
  restaurant_id?: string;
  booking_type: 'hotel' | 'restaurant' | 'tour';
  check_in_date?: string;
  check_out_date?: string;
  number_of_guests?: number;
  total_price_usd?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}
