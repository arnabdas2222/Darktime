# DARKTIME — Haute Horlogerie & Luxury Watch Atelier

DARKTIME is an autonomous, full-stack luxury timepiece platform and marketplace inspired by the cinematic elegance of **Omega** and the comprehensive horological marketplace filtering of **Chrono24**.

---

## 🌟 Key Features

1. **Cinematic Luxury Homepage (Omega-inspired)**:
   - Original DARKTIME branding with custom wordmark and Geneva crest.
   - Dual promotional luxury watch video and craftsmanship showcase sections.
   - Autoplay, muted, loop, and playsInline support with graceful fallback poster backdrops and error handling.
   - Featured Vault Highlights section showcasing certified timepieces.
   - Thematic pillars and accredited maison directory.
   - **Zero News & Stories sections** as specified.
   - Professional footer with Swiss escrow guarantees and navigation.

2. **Watch Marketplace (Chrono24-inspired)**:
   - Complete catalog featuring **12 realistic sample luxury watch listings** (Omega, Rolex, Audemars Piguet, Patek Philippe, Vacheron Constantin, Richard Mille, etc.).
   - Full search by brand, model, and reference number.
   - Filter by maison/brand and condition (*New / Unworn*, *Pre-owned*, *Vintage*).
   - Price range filters with minimum and maximum bounds.
   - Dynamic sorting: Price (Low to High, High to Low), Newest Additions, and Featured.
   - Instant filter reset button and active result counter.
   - Responsive grid with loading, empty, and error states.

3. **Dynamic Watch Details (`/watches/:id`)**:
   - Unique URL per watch with permanent deep-linking.
   - Interactive multi-angle image gallery with thumbnail picker and click-to-zoom.
   - Complete technical specifications grid (case diameter, material, movement, dial, water resistance, power reserve, bezel, strap, year).
   - Certified Vault seller badge with collector rating and location.
   - Optimistic Watchlist / Favorites toggle.
   - Direct Atelier Inquiry / "Contact Seller" modal with concierge confirmation.

4. **Authentication & Client Management (Supabase)**:
   - Supabase Auth integration (Sign Up, Sign In, Sign Out, session persistence).
   - Protected client routes: `/profile` and `/favorites`.
   - Client profile editing (name, phone, preferred valuation currency).
   - Inquiries dispatch tracking.
   - **Graceful Atelier Demo Fallback**: Works immediately out-of-the-box before or after Supabase credentials are plugged in.

5. **Supabase PostgreSQL Backend & RLS**:
   - Complete SQL migration script (`supabase/schema.sql`).
   - Tables: `watches`, `profiles`, `favorites`, `inquiries`.
   - Row Level Security (RLS) policies configured for public viewing, user-scoped favorites, profile updates, and secure inquiry submissions.
   - Automated trigger to sync `auth.users` into `public.profiles`.
   - Seed data with 12 complete luxury timepieces and specifications.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router v6, Tailwind CSS, Lucide React icons
- **Build Tool**: Vite 6
- **Typography**: Cinzel, Playfair Display, and Inter
- **Backend**: Supabase (PostgreSQL, Row Level Security, Supabase Auth)
- **Environment**: JavaScript (ESM), JSX, HTML5, CSS3

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Installation
Clone or navigate to the project directory and install dependencies:
```powershell
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```powershell
Copy-Item .env.example .env
```
By default, `.env` contains placeholder values. The application will automatically run in **Atelier Demo Mode** so you can test all features immediately without configuring a database.

To connect your live Supabase project:
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and create a project.
2. In your Supabase Project Settings -> **API**, copy:
   - **Project URL** -> `VITE_SUPABASE_URL`
   - **anon / public key** -> `VITE_SUPABASE_ANON_KEY`
3. Paste them into `.env`.

### 4. Database Setup (Supabase)
1. Open your Supabase project dashboard.
2. Navigate to **SQL Editor**.
3. Open `supabase/schema.sql` from this project.
4. Paste the SQL contents and click **Run**.
5. All tables (`watches`, `profiles`, `favorites`, `inquiries`), RLS policies, triggers, and the 12 initial timepieces will be created and seeded automatically.

### 5. Start the Development Server
```powershell
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
Darktime/
├── index.html                  # HTML template with luxury Google Fonts
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Dark charcoal, obsidian & gold theme
├── vite.config.js              # Vite server & build configuration
├── .env.example                # Supabase environment variables template
├── .env                        # Local environment variables
├── supabase/
│   └── schema.sql              # PostgreSQL schema, RLS policies & seed data
└── src/
    ├── main.jsx                # Application entry point
    ├── App.jsx                 # Routing and layout structure
    ├── index.css               # Global styles, glassmorphism & gradients
    ├── assets/                 # Static assets
    ├── components/
    │   ├── Navbar.jsx          # Responsive luxury navbar & collector menu
    │   ├── Footer.jsx          # Escrow guarantees, brand links (no News)
    │   ├── HeroVideo.jsx       # Video hero with fallback poster & controls
    │   ├── WatchCard.jsx       # Luxury product card with price, badges & fav
    │   ├── WatchGrid.jsx       # Responsive grid with empty state
    │   ├── SearchAndFilters.jsx# Chrono24-inspired search, filter & sort controls
    │   ├── WatchGallery.jsx    # Multi-image viewer with thumbnail selection & zoom
    │   ├── AuthForm.jsx        # Sign In & Sign Up form with validation
    │   ├── InquiryModal.jsx    # Concierge private inquiry form modal
    │   ├── ProtectedRoute.jsx  # Client route guard
    │   ├── LoadingState.jsx    # Pulsing gold watch complication loader
    │   └── ErrorState.jsx      # Error handling card
    ├── context/
    │   ├── AuthContext.jsx     # Supabase Auth & Demo session state
    │   └── FavoritesContext.jsx# Watchlist state with optimistic updates
    ├── data/
    │   ├── sampleWatches.js    # 12+ luxury timepieces with full specs
    │   └── collections.js      # Curated thematic collections
    ├── lib/
    │   └── supabase.js         # Supabase client, queries & demo fallback
    └── pages/
        ├── HomePage.jsx        # Cinematic Omega-style luxury experience
        ├── ExploreWatchesPage.jsx # Full-featured Chrono24-style marketplace
        ├── WatchDetailPage.jsx # Comprehensive product specification page
        ├── CollectionsPage.jsx # Curated horological disciplines
        ├── AboutPage.jsx       # Atelier provenance & Swiss escrow charter
        ├── SignInPage.jsx      # Client authorization
        ├── SignUpPage.jsx      # New collector registration
        ├── ProfilePage.jsx     # Client profile & inquiry tracking
        ├── FavoritesPage.jsx   # Client saved watchlist
        └── NotFoundPage.jsx    # Luxury 404 handler
```
