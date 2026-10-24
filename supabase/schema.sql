-- ====================================================================
-- DARKTIME - Luxury Watch Atelier & Marketplace Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Watches Table
CREATE TABLE IF NOT EXISTS public.watches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    reference_number TEXT,
    price NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    condition TEXT NOT NULL CHECK (condition IN ('New / Unworn', 'Pre-owned', 'Vintage')),
    availability TEXT NOT NULL DEFAULT 'In Stock' CHECK (availability IN ('In Stock', 'Reserved', 'On Request', 'Sold Out')),
    description TEXT,
    images TEXT[] NOT NULL DEFAULT '{}',
    case_diameter TEXT,
    case_material TEXT,
    dial_color TEXT,
    movement TEXT,
    water_resistance TEXT,
    bezel_material TEXT,
    bracelet_material TEXT,
    power_reserve TEXT,
    year INTEGER,
    featured BOOLEAN NOT NULL DEFAULT false,
    seller_name TEXT NOT NULL DEFAULT 'DARKTIME Certified Vault',
    seller_rating NUMERIC(2, 1) DEFAULT 4.9,
    seller_location TEXT DEFAULT 'Geneva, Switzerland',
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_watches_brand ON public.watches (brand);
CREATE INDEX IF NOT EXISTS idx_watches_price ON public.watches (price);
CREATE INDEX IF NOT EXISTS idx_watches_condition ON public.watches (condition);
CREATE INDEX IF NOT EXISTS idx_watches_featured ON public.watches (featured);
CREATE INDEX IF NOT EXISTS idx_watches_published ON public.watches (is_published);

-- 3. Create Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    preferred_currency TEXT DEFAULT 'USD',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Create Favorites Table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    watch_id UUID NOT NULL REFERENCES public.watches(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, watch_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites (user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_watch_id ON public.favorites (watch_id);

-- 5. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    watch_id UUID REFERENCES public.watches(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_user_id ON public.inquiries (user_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_watch_id ON public.inquiries (watch_id);

-- 6. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.watches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies

-- Watches: Publicly viewable for published watches
DROP POLICY IF EXISTS "Public can view published watches" ON public.watches;
CREATE POLICY "Public can view published watches"
    ON public.watches FOR SELECT
    USING (is_published = true);

-- Profiles: Users can view & update only their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- Favorites: Users can view, add, and remove only their own favorites
DROP POLICY IF EXISTS "Users can view own favorites" ON public.favorites;
CREATE POLICY "Users can view own favorites"
    ON public.favorites FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can add own favorites" ON public.favorites;
CREATE POLICY "Users can add own favorites"
    ON public.favorites FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove own favorites" ON public.favorites;
CREATE POLICY "Users can remove own favorites"
    ON public.favorites FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Inquiries: Anyone can submit an inquiry; authenticated users can view their inquiries
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiry"
    ON public.inquiries FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own inquiries" ON public.inquiries;
CREATE POLICY "Users can view own inquiries"
    ON public.inquiries FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- 8. Trigger to create user profile upon auth.users sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- 9. Sample Seed Data (Real Luxury Watch Exhibits)
-- ====================================================================
INSERT INTO public.watches (
    id, brand, model, reference_number, price, condition, availability,
    description, images, case_diameter, case_material, dial_color,
    movement, water_resistance, bezel_material, bracelet_material,
    power_reserve, year, featured, seller_name, seller_rating, seller_location
) VALUES
(
    'c1a0e101-1111-4000-8000-000000000001',
    'Omega',
    'Speedmaster Dark Side of the Moon "Vintage Black"',
    '311.92.44.51.01.006',
    13200,
    'New / Unworn',
    'In Stock',
    'The Speedmaster Dark Side of the Moon is an emblem of lunar exploration and avant-garde ceramic engineering. Crafted from a single block of black zirconium oxide ceramic, this timepiece features vintage Super-LumiNova hour markers, blackened hands, and a brown leather strap that echoes mid-century heritage.',
    ARRAY[
        '/images/gallery/watch-speedmaster-black.jpg',
        '/images/gallery/watch-speedmaster-green.jpg',
        '/images/gallery/watch-seamaster-nato-turntable.webp'
    ],
    '44.25 mm',
    'Black Ceramic',
    'Matt Black Ceramic',
    'Omega Co-Axial Calibre 9300',
    '50 meters / 165 feet',
    'Ceramic with Tachymeter Scale',
    'Black Ceramic & Deployment Clasp',
    '60 hours',
    2024,
    true,
    'DARKTIME Certified Vault',
    4.9,
    'Geneva, Switzerland'
),
(
    'c1a0e101-1111-4000-8000-000000000002',
    'Omega',
    'Seamaster Diver 300M 007 Edition "No Time To Die"',
    '210.90.42.20.01.001',
    9900,
    'New / Unworn',
    'In Stock',
    'Identical to James Bond''s watch in No Time To Die, this 42 mm Seamaster in Grade 2 Titanium is built with tough military needs in mind. Lightness and rugged elegance coalesce with a tropical brown aluminium dial and bezel ring, paired with a titanium mesh bracelet.',
    ARRAY[
        '/images/gallery/watch-seamaster-007.jpg',
        '/images/gallery/watch-seamaster-black-wave.jpg',
        '/images/gallery/watch-seamaster-nato-turntable.webp'
    ],
    '42 mm',
    'Grade 2 Titanium',
    'Tropical Brown Aluminum',
    'Omega Master Chronometer Calibre 8806',
    '300 meters / 1000 feet',
    'Unidirectional Rotating Titanium',
    'Titanium Mesh',
    '55 hours',
    2024,
    true,
    'DARKTIME Certified Vault',
    5.0,
    'Zurich, Switzerland'
),
(
    'c1a0e101-1111-4000-8000-000000000003',
    'Omega',
    'Seamaster Planet Ocean 600M Co-Axial Master Chronometer',
    '215.30.44.21.01.002',
    8400,
    'New / Unworn',
    'In Stock',
    'A tribute to Omega''s deep maritime diving heritage. Features a high-gloss black ceramic dial with Arabic numerals in vivid orange, helium escape valve, and water resistance to an astonishing 600 meters (2,000 feet).',
    ARRAY[
        '/images/gallery/watch-planet-ocean-600m.webp',
        '/images/gallery/watch-seamaster-black-wave.jpg',
        '/images/gallery/watch-seamaster-007.jpg'
    ],
    '43.5 mm',
    'Stainless Steel & Ceramic',
    'Black Ceramic with Orange Numerals',
    'Omega Master Chronometer Calibre 8900',
    '600 meters / 2000 feet',
    'Black Ceramic with Liquidmetal',
    'Stainless Steel Bracelet',
    '60 hours',
    2024,
    true,
    'DARKTIME Certified Vault',
    4.9,
    'Geneva, Switzerland'
),
(
    'c1a0e101-1111-4000-8000-000000000004',
    'Omega',
    'Speedmaster Professional 18k Yellow Gold Skeleton',
    '3191.50.00',
    49500,
    'Pre-owned',
    'In Stock',
    'An extraordinary work of hand-engraved horological art. Solid 18k yellow gold case and integrated bracelet house an exquisitely skeletonized mechanical movement, revealing every gear, pinion, and balance bridge.',
    ARRAY[
        '/images/gallery/watch-speedmaster-gold.jpg',
        '/images/gallery/watch-speedmaster-black.jpg',
        '/images/gallery/watch-planet-ocean-600m.webp'
    ],
    '42 mm',
    '18k Yellow Gold',
    'Openworked Hand-Engraved Skeleton',
    'Omega Hand-Wound Calibre 867 Skeleton',
    '50 meters / 165 feet',
    '18k Gold with Black Tachymetre',
    '18k Solid Yellow Gold Bracelet',
    '48 hours',
    2023,
    true,
    'Monaco Horology Salon',
    5.0,
    'Monte Carlo, Monaco'
),
(
    'c1a0e101-1111-4000-8000-000000000005',
    'Omega',
    'Seamaster Diver 300M "Deep Olive Wave"',
    '210.30.42.20.10.001',
    6100,
    'New / Unworn',
    'In Stock',
    'Sporting a sun-brushed dark olive green ceramic dial with laser-engraved waves. The polished and brushed stainless steel case is accented by a green ceramic bezel with white enamel diving scale.',
    ARRAY[
        '/images/gallery/watch-seamaster-green-wave.jpg',
        '/images/gallery/watch-seamaster-black-wave.jpg',
        '/images/gallery/watch-planet-ocean-600m.webp'
    ],
    '42 mm',
    'Stainless Steel',
    'Olive Green Ceramic Wave',
    'Omega Co-Axial Master Chronometer 8800',
    '300 meters / 1000 feet',
    'Green Ceramic with White Enamel',
    'Brushed & Polished Steel Bracelet',
    '55 hours',
    2024,
    true,
    'DARKTIME Certified Vault',
    5.0,
    'Geneva, Switzerland'
),
(
    'c1a0e101-1111-4000-8000-000000000006',
    'Omega',
    'Seamaster Professional Chronograph Navy Sunburst',
    '212.30.44.50.03.001',
    7600,
    'Pre-owned',
    'In Stock',
    'Equipped with a column-wheel chronograph mechanism and co-axial escapement. The radiant blue sunburst dial features red chronograph indicators, luminescent skeleton hands, and is paired with a custom tan alligator strap.',
    ARRAY[
        '/images/gallery/watch-seamaster-chrono-wrist.jpg',
        '/images/gallery/watch-seamaster-nato-turntable.webp'
    ],
    '44 mm',
    'Stainless Steel',
    'Deep Blue Sunburst with Red Accents',
    'Omega Calibre 3330 Co-Axial Chronograph',
    '300 meters / 1000 feet',
    'Blue Ceramic Unidirectional Rotating',
    'Tuscan Tan Leather Strap',
    '52 hours',
    2023,
    false,
    'Alpine Watch Exchange',
    4.8,
    'Lugano, Switzerland'
),
(
    'c1a0e101-1111-4000-8000-000000000007',
    'Omega',
    'Speedmaster Chronometer "Forest Green Racing"',
    '329.30.44.51.10.001',
    11900,
    'New / Unworn',
    'In Stock',
    'Delivered in its original luxury presentation box with certification medallion. Features a rich green sunburst dial with silver subdials, Master Chronometer certified precision, and exhibition caseback.',
    ARRAY[
        '/images/gallery/watch-speedmaster-green.jpg',
        '/images/gallery/watch-speedmaster-black.jpg'
    ],
    '44.25 mm',
    'Stainless Steel',
    'Forest Green Sunburst',
    'Omega Master Chronometer Calibre 9900',
    '50 meters / 165 feet',
    'Stainless Steel with Tachymetre',
    'Dark Forest Green Calfskin Leather',
    '60 hours',
    2024,
    true,
    'Saxonia Fine Horology',
    5.0,
    'Dresden, Germany'
),
(
    'c1a0e101-1111-4000-8000-000000000008',
    'Omega',
    'Seamaster Chronograph "Tactical Spec-Ops" NATO',
    '210.32.44.51.01.001',
    8900,
    'Pre-owned',
    'In Stock',
    'Black ceramic dial with laser-engraved waves and dual chronograph counters. Fitted to a durable black and gold Bond NATO strap engineered for all-terrain versatility and high-velocity operations.',
    ARRAY[
        '/images/gallery/watch-seamaster-nato-turntable.webp',
        '/images/gallery/watch-seamaster-007.jpg'
    ],
    '44 mm',
    'Stainless Steel & Ceramic',
    'Pitch Black Ceramic Wave',
    'Omega Master Chronometer Calibre 9900',
    '300 meters / 1000 feet',
    'Black Ceramic with White Enamel',
    'High-Durability Black & Gold NATO Strap',
    '60 hours',
    2023,
    true,
    'DARKTIME Certified Vault',
    5.0,
    'Geneva, Switzerland'
),
(
    'c1a0e101-1111-4000-8000-000000000009',
    'Omega',
    'Seamaster Diver 300M "Midnight Obsidian"',
    '210.30.42.20.01.001',
    5900,
    'New / Unworn',
    'In Stock',
    'The archetype of the modern luxury dive watch. Black ceramic dial, helium escape valve at 10 o''clock, and chronometer certified accuracy tested to 15,000 Gauss magnetic immunity.',
    ARRAY[
        '/images/gallery/watch-seamaster-black-wave.jpg',
        '/images/gallery/watch-planet-ocean-600m.webp'
    ],
    '42 mm',
    'Stainless Steel',
    'Gloss Black Ceramic Wave',
    'Omega Co-Axial Master Chronometer 8800',
    '300 meters / 1000 feet',
    'Black Ceramic with White Enamel',
    'Stainless Steel Diver Bracelet',
    '55 hours',
    2024,
    false,
    'Paris Vendôme Chrono',
    4.9,
    'Paris, France'
),
(
    'c1a0e101-1111-4000-8000-000000000010',
    'Omega',
    'Speedmaster Dark Side "Pitch Black"',
    '311.92.44.51.01.004',
    12800,
    'Pre-owned',
    'In Stock',
    'Constructed entirely from polished and brushed black zirconium oxide ceramic. The indexes and hands are coated with Super-LumiNova for luminescent legibility in the dark.',
    ARRAY[
        '/images/gallery/watch-speedmaster-black.jpg',
        '/images/gallery/watch-seamaster-nato-turntable.webp'
    ],
    '44.25 mm',
    'Black Zirconium Ceramic',
    'Matt Black Ceramic',
    'Omega Co-Axial Calibre 9300',
    '50 meters / 165 feet',
    'Ceramic with Super-LumiNova Tachymeter',
    'Black Coated Nylon Fabric',
    '60 hours',
    2023,
    false,
    'Vallée de Joux Collectors',
    4.9,
    'Le Sentier, Switzerland'
),
(
    'c1a0e101-1111-4000-8000-000000000011',
    'Omega',
    'Planet Ocean 600M GMT "Deep Black"',
    '215.92.46.22.01.001',
    11400,
    'New / Unworn',
    'In Stock',
    'A genuine GMT dive watch crafted from a single monobloc of black ceramic. Features an 18k Sedna gold and ceramic bezel, GMT dual-timezone display, and Master Chronometer Calibre 8906.',
    ARRAY[
        '/images/gallery/watch-planet-ocean-600m.webp',
        '/images/gallery/watch-seamaster-green-wave.jpg'
    ],
    '45.5 mm',
    'Black Ceramic',
    'Black Ceramic with GMT Ring',
    'Omega Master Chronometer Calibre 8906',
    '600 meters / 2000 feet',
    'Bi-directional Ceramic GMT Bezel',
    'Black Rubber Strap with Orange Stitching',
    '60 hours',
    2024,
    false,
    'DARKTIME Certified Vault',
    5.0,
    'Geneva, Switzerland'
),
(
    'c1a0e101-1111-4000-8000-000000000012',
    'Omega',
    'Seamaster 300 Heritage Master Co-Axial',
    '234.30.41.21.01.001',
    7200,
    'Vintage',
    'In Stock',
    'Introduced by Omega in 1957 for professional divers, this vintage revival features a sandwich dial with vintage Super-LumiNova numerals, slim anodised aluminium bezel, and lollipop seconds hand.',
    ARRAY[
        '/images/gallery/watch-seamaster-007.jpg',
        '/images/gallery/watch-speedmaster-green.jpg'
    ],
    '41 mm',
    'Stainless Steel',
    'Vintage Black Sandwich Dial',
    'Omega Co-Axial Master Chronometer 8912',
    '300 meters / 1000 feet',
    'Anodised Aluminium Retro Bezel',
    'Stainless Steel Mesh & Vintage Foldover',
    '60 hours',
    2023,
    false,
    'Heritage Crown Gallery',
    4.8,
    'London, United Kingdom'
);
