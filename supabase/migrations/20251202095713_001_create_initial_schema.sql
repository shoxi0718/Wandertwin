/*
  # WanderTwin Initial Database Schema

  1. Users Table - Extends Supabase auth.users with profile info
  2. Hotels Table - All hotels with pricing, reviews, 360 tours
  3. Restaurants Table - Restaurants with halal filter, menus
  4. Landmarks Table - Historical sites and attractions
  5. Events Table - Calendar of festivals and events
  6. Saved Places - User bookmarks
  7. Premium Subscriptions - Premium user status
  8. Bookings - Hotel and restaurant reservations
  9. Reviews - User ratings and comments

  Security: Row Level Security enabled on all user-specific tables
*/

-- Users Profile Extension
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  gender text CHECK (gender IN ('male', 'female')),
  profile_picture_url text,
  language text DEFAULT 'uz-Latin' CHECK (language IN ('uz-Latin', 'uz-Cyrillic', 'ru', 'en')),
  mood_theme text DEFAULT 'light' CHECK (mood_theme IN ('light', 'dark', 'wander')),
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Hotels Table
CREATE TABLE IF NOT EXISTS hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  address text NOT NULL,
  phone text,
  website text,
  email text,
  price_per_night_usd integer,
  rating decimal(3, 2) DEFAULT 4.5,
  total_reviews integer DEFAULT 0,
  amenities text[] DEFAULT ARRAY[]::text[],
  images_urls text[] DEFAULT ARRAY[]::text[],
  has_360_tour boolean DEFAULT false,
  is_national_house boolean DEFAULT false,
  region text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_hotels_region ON hotels(region);

-- Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  address text NOT NULL,
  phone text,
  website text,
  cuisine_type text NOT NULL,
  rating decimal(3, 2) DEFAULT 4.5,
  total_reviews integer DEFAULT 0,
  price_level text CHECK (price_level IN ('budget', 'moderate', 'expensive')),
  images_urls text[] DEFAULT ARRAY[]::text[],
  menu_url text,
  is_halal boolean DEFAULT false,
  accepts_card boolean DEFAULT true,
  region text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_restaurants_region ON restaurants(region);
CREATE INDEX idx_restaurants_halal ON restaurants(is_halal);

-- Landmarks Table
CREATE TABLE IF NOT EXISTS landmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_uz_cyrillic text,
  description text,
  history text,
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  address text NOT NULL,
  category text NOT NULL CHECK (category IN ('historical', 'religious', 'natural', 'cultural', 'modern')),
  images_urls text[] DEFAULT ARRAY[]::text[],
  entrance_fee_usd integer,
  opening_hours text,
  best_time_to_visit text,
  legendary_story text,
  region text NOT NULL,
  is_premium_only boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_landmarks_region ON landmarks(region);
CREATE INDEX idx_landmarks_category ON landmarks(category);
CREATE INDEX idx_landmarks_premium ON landmarks(is_premium_only);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('festival', 'concert', 'sports', 'cultural', 'market')),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  location text NOT NULL,
  image_url text,
  website text,
  ticket_price_usd integer,
  region text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_events_region ON events(region);
CREATE INDEX idx_events_date ON events(start_date);

-- Saved Places (Bookmarks)
CREATE TABLE IF NOT EXISTS saved_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  place_type text NOT NULL CHECK (place_type IN ('hotel', 'restaurant', 'landmark', 'event')),
  place_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE saved_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved places"
  ON saved_places FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create saved places"
  ON saved_places FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved places"
  ON saved_places FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_saved_places_user ON saved_places(user_id);

-- Premium Subscriptions
CREATE TABLE IF NOT EXISTS premium_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  is_premium boolean DEFAULT false,
  subscription_start timestamptz,
  subscription_end timestamptz,
  plan_type text CHECK (plan_type IN ('monthly', 'yearly', 'lifetime')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE premium_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON premium_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hotel_id uuid REFERENCES hotels(id),
  restaurant_id uuid REFERENCES restaurants(id),
  booking_type text NOT NULL CHECK (booking_type IN ('hotel', 'restaurant', 'tour')),
  check_in_date date,
  check_out_date date,
  number_of_guests integer,
  total_price_usd decimal(10, 2),
  status text DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_bookings_user ON bookings(user_id);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  place_type text NOT NULL CHECK (place_type IN ('hotel', 'restaurant', 'landmark')),
  place_id uuid NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  images_urls text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_reviews_place ON reviews(place_type, place_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
