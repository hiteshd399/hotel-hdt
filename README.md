# Hotel HDT — Luxury Hotel Website

A complete, production-ready luxury hotel website for **Hotel HDT**, a premium hotel in Kathmandu, Nepal. Built with a modern JavaScript stack (no TypeScript) — Vite + React on the frontend, Node.js + Express + Prisma on the backend.

> Theme: **Luxury · Minimal · Dark + Gold** — Apple-level clean design with smooth premium animations.

---

## Tech Stack

### Frontend
- **React 18** + **Vite 6**
- **React Router v6**
- **Tailwind CSS 3**
- **Framer Motion** (premium animations)
- **Axios** (HTTP client)
- **React Icons**
- **Swiper.js** (sliders)
- **React Hook Form** (forms)
- **React Hot Toast** (notifications)

### Backend
- **Node.js** + **Express.js**
- **Prisma ORM** (with SQLite for dev — switch to PostgreSQL/MongoDB in production)
- **JWT Authentication** + **HTTP-only cookies**
- **Bcrypt** (password hashing)
- **Multer** + **Cloudinary** (image uploads)
- **Nodemailer** (transactional emails)
- **Helmet**, **CORS**, **express-rate-limit** (security)
- **Zod** (input validation)
- **dotenv**, **cookie-parser**, **morgan**

---

## Project Structure

```
hotel-hdt/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # Admin layout & widgets
│   │   │   ├── customer/       # Customer layout
│   │   │   ├── forms/
│   │   │   ├── layout/         # Navbar, Footer, ScrollToTop, PageTransition
│   │   │   ├── sections/       # Home page sections (Hero, AboutPreview, etc.)
│   │   │   └── ui/             # Reusable: RoomCard, Skeleton, Reveal, etc.
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── data/               # Static site data (amenities, testimonials, etc.)
│   │   ├── hooks/              # useFetch
│   │   ├── pages/
│   │   │   ├── admin/          # 10 admin pages
│   │   │   ├── customer/       # 3 customer dashboard pages
│   │   │   ├── About.jsx
│   │   │   ├── BookNow.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Offers.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Restaurant.jsx
│   │   │   ├── RoomDetails.jsx
│   │   │   └── Rooms.jsx
│   │   ├── routes/             # ProtectedRoute
│   │   ├── utils/              # axios instance, formatters
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind + luxury theme
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── .env.example
│   └── package.json
│
└── server/                     # Node + Express + Prisma backend
    ├── prisma/
    │   ├── schema.prisma       # 9 models: User, Room, Booking, Review, Gallery,
    │   │                       #   Restaurant, Offer, Event, Contact
    │   └── seed.js             # Full seed data (rooms, menu, offers, events, etc.)
    ├── src/
    │   ├── config/             # prisma.js, cloudinary.js, mailer.js
    │   ├── controllers/        # 11 controllers (auth, user, room, booking, etc.)
    │   ├── middleware/         # auth, error, validate, asyncHandler
    │   ├── routes/             # 12 route files
    │   ├── utils/              # helpers (JWT, slugify, etc.)
    │   ├── validators/         # Zod schemas
    │   └── server.js
    ├── uploads/                # Local fallback for uploads
    ├── .env.example
    └── package.json
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- (Optional) Cloudinary account for image uploads
- (Optional) Gmail with App Password for email sending

### 1. Backend Setup

```bash
cd server
cp .env.example .env             # then edit values
npm install
npx prisma generate
npx prisma db push               # creates SQLite DB + tables
npm run seed                     # seeds demo data
npm run dev                      # starts on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd client
cp .env.example .env             # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                      # starts on http://localhost:5173
```

### 3. Demo Credentials

After seeding, you can log in with:

| Role     | Email                  | Password    |
|----------|------------------------|-------------|
| Admin    | admin@hotelhdt.com     | admin123    |
| Customer | user@hotelhdt.com      | user123     |

---

## Configuration

### Backend `.env` (server/.env)

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# Database — SQLite for dev. Swap to postgresql/mysql for prod.
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
COOKIE_SECURE=false

# Cloudinary (optional — uploads fall back to local if missing)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=info@hotelhdt.com
```

### Frontend `.env` (client/.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Reference

Base URL: `http://localhost:5000/api`

### Authentication
| Method | Endpoint         | Description           | Auth |
|--------|------------------|-----------------------|------|
| POST   | /auth/register   | Register a new user   | —    |
| POST   | /auth/login      | Login                 | —    |
| GET    | /auth/logout     | Logout                | —    |
| GET    | /auth/me         | Get current user      | ✓    |

### Users
| Method | Endpoint              | Description             | Auth  |
|--------|-----------------------|-------------------------|-------|
| GET    | /users                | List users (paginated)  | Admin |
| GET    | /users/:id            | Get user                | Admin |
| PUT    | /users/profile        | Update own profile      | ✓     |
| PUT    | /users/password       | Change password         | ✓     |
| DELETE | /users/:id            | Delete user             | Admin |
| PUT    | /users/:id/role       | Update user role        | Admin |

### Rooms
| Method | Endpoint              | Description             | Auth  |
|--------|-----------------------|-------------------------|-------|
| GET    | /rooms                | List (search/filter/sort/paginate) | — |
| GET    | /rooms/categories/list| List categories         | —     |
| GET    | /rooms/:slug          | Get single room + reviews | —    |
| POST   | /rooms                | Create room             | Admin |
| PUT    | /rooms/:id            | Update room             | Admin |
| DELETE | /rooms/:id            | Delete room             | Admin |

### Bookings
| Method | Endpoint              | Description             | Auth |
|--------|-----------------------|-------------------------|------|
| POST   | /bookings             | Create booking          | ✓    |
| GET    | /bookings             | List (own / all if admin) | ✓  |
| GET    | /bookings/:id         | Get booking             | ✓    |
| DELETE | /bookings/:id         | Cancel booking          | ✓    |
| PUT    | /bookings/:id/status  | Update status           | Admin |

### Reviews, Gallery, Restaurant, Offers, Events, Contact
Each follows RESTful conventions:
- `GET /api/<resource>` — list (public for read; admin for write)
- `POST /api/<resource>` — create (auth/admin)
- `PUT /api/<resource>/:id` — update (admin)
- `DELETE /api/<resource>/:id` — delete (admin)

### Uploads
| Method | Endpoint              | Auth  |
|--------|-----------------------|-------|
| POST   | /upload               | Admin |
| POST   | /upload/multiple      | Admin |

### Stats
| Method | Endpoint | Description              | Auth  |
|--------|----------|--------------------------|-------|
| GET    | /stats   | Admin dashboard statistics | Admin |

---

## Features

### Public
- Animated hero with rotating slides + integrated booking bar
- About page with story, values, and timeline
- Rooms listing with search, filter, sort, and pagination
- Room details with image gallery (Swiper + lightbox), reviews, booking widget
- Restaurant page with category tabs
- Masonry gallery with filter and lightbox
- Offers, Events pages
- Contact page with form, map, and social links

### Authentication
- JWT in HTTP-only cookies + localStorage fallback
- Role-based access (admin / customer)
- Protected routes
- Auto-logout on 401

### Booking System
- Date, room, guest selection
- Real-time price calculation (nights × rate + 10% tax)
- Availability checking (overlapping bookings vs. inventory)
- Email confirmation on booking + status change
- Admin approval workflow (pending → approved → completed)

### Customer Dashboard
- Profile view & edit
- Change password
- My bookings (filterable by status)
- Cancel pending/approved bookings
- Booking history

### Admin Dashboard
- Statistics overview with 7-day booking chart
- Manage rooms (full CRUD with image URL management)
- Manage bookings (approve / cancel / complete)
- Manage users (delete / role toggle)
- Approve reviews
- Manage gallery (with image upload)
- Manage restaurant menu (CRUD)
- Manage offers (CRUD)
- Manage events (CRUD)
- Resolve contact messages

### UX
- Smooth page transitions (Framer Motion)
- Loading skeletons
- Toast notifications
- Glassmorphism, parallax, micro-interactions
- Fully responsive (mobile-first)
- SEO-friendly meta tags
- Custom 404 page

### Security
- Passwords hashed with bcrypt (10 rounds)
- JWT in HTTP-only, SameSite cookies
- Helmet security headers
- Rate limiting (500 req/15min global, 30 req/15min auth)
- Zod input validation on every endpoint
- XSS protection via input sanitization
- Role-based authorization

---

## Database Models

The Prisma schema defines 9 models:

1. **User** — authentication & profile
2. **Room** — hotel rooms with categories, images, features, inventory
3. **Booking** — reservations with status workflow
4. **Review** — room reviews with approval flow
5. **Gallery** — image gallery items
6. **Restaurant** — menu items (categorized)
7. **Offer** — promotional offers
8. **Event** — hotel events
9. **Contact** — contact form submissions

---

## Deployment Guide

### Backend (Render / Railway / Vercel Functions)

1. Set environment variables in your hosting dashboard
2. Switch `DATABASE_URL` to PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Run `npx prisma migrate deploy` to apply schema
4. Run `npm run seed` to populate initial data
5. Start with `npm start`

### Frontend (Vercel / Netlify / Cloudflare Pages)

1. Set `VITE_API_URL` to your deployed backend URL
2. Build: `npm run build`
3. Deploy the `dist/` folder
4. Configure SPA fallback (rewrite all routes to `index.html`)

### CORS
Update `CLIENT_URL` in `server/.env` to match your frontend domain.

### Cloudinary
Create a free account at cloudinary.com, copy your cloud name + API keys into `.env`. Without Cloudinary configured, image uploads will fail gracefully — admin can still create rooms/offers/etc. using direct image URLs.

### Email (Nodemailer with Gmail)
1. Enable 2-Factor Auth on your Gmail account
2. Generate an App Password (Google Account → Security → App passwords)
3. Set `SMTP_USER` and `SMTP_PASS` (the app password, not your account password)

---

## Sample Hotel Images

All seeded rooms, gallery, and menu items use royalty-free images from Unsplash (hot-linkable). Replace them with your own photography in production by:
- Editing `server/prisma/seed.js` and re-running `npm run seed`, OR
- Using the admin dashboard to edit rooms/gallery/menu items

---

## Scripts

### Backend (`server/`)
| Command           | Description                       |
|-------------------|-----------------------------------|
| `npm run dev`     | Start dev server (nodemon)        |
| `npm start`       | Start production server           |
| `npm run seed`    | Seed the database with demo data  |

### Frontend (`client/`)
| Command           | Description                       |
|-------------------|-----------------------------------|
| `npm run dev`     | Start Vite dev server             |
| `npm run build`   | Production build to `dist/`       |
| `npm run preview` | Preview the production build      |

---

## License

MIT © Hotel HDT. Free to use, modify, and deploy.

---

## Credits

- **Hotel Information**: Hotel HDT, Kathmandu, Nepal · info@hotelhdt.com · +977-98XXXXXXXX
- **Images**: [Unsplash](https://unsplash.com) (royalty-free)
- **Fonts**: Playfair Display, Inter, Cormorant Garamond (Google Fonts)
- **Icons**: React Icons (Feather pack)
- **Inspiration**: Apple, Aman Resorts, Four Seasons
