# Research Experts — MERN Academic Services Platform

A full production-ready MERN stack web application for academic research services (plagiarism check, removal, proofreading, thesis writing, etc.).

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite + **TypeScript** + TailwindCSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (admin only) |
| File Upload | Multer |
| Email | Nodemailer |

---

## Project Structure

```
/
├── client/                  # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── home/        # Hero, ServicesSection, WhyChooseUs, Testimonials, CTA, FAQ
│   │   │   └── ProtectedRoute.tsx
│   │   ├── context/         # AuthContext.tsx
│   │   ├── data/            # services.ts (service definitions)
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── ServiceDetail.tsx
│   │   │   ├── Submit.tsx
│   │   │   ├── Calculator.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── admin/
│   │   │       ├── Login.tsx
│   │   │       ├── Dashboard.tsx
│   │   │       └── SubmissionDetail.tsx
│   │   ├── services/        # api.ts (Axios instance)
│   │   └── types/           # index.ts (TypeScript interfaces)
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── server/                  # Node.js + Express backend
    ├── controllers/         # authController, submissionController, contactController
    ├── middleware/           # auth.js, upload.js, errorHandler.js
    ├── models/              # User, Submission, ContactMessage
    ├── routes/              # auth, submissions, contact
    ├── utils/               # email.js, seedAdmin.js
    ├── uploads/             # Uploaded files (gitignored)
    └── server.js
```

---

## Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### 2. Setup Server

```bash
cd server
npm install

# Copy and edit environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, email credentials

# Seed the admin user
npm run seed

# Start development server
npm run dev
```

### 3. Setup Client

```bash
cd client
npm install

# Copy environment variables
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api  (already proxied via Vite)

# Start development server
npm run dev
```

### 4. Access the App

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Frontend |
| `http://localhost:5000/api/health` | Backend health check |
| `http://localhost:5173/admin/login` | Admin login |

---

## Environment Variables

### Server (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/researchexperts
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=Research Experts <noreply@researchexperts.com>
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@researchexperts.com
ADMIN_PASSWORD=Admin@123
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

> In development, Vite proxies `/api` and `/uploads` to `localhost:5000` automatically.

---

## API Endpoints

### Public
| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/submissions` | Create submission (with file upload) |
| `POST` | `/api/contact` | Submit contact message |
| `POST` | `/api/auth/login` | Admin login |

### Protected (Admin JWT required)
| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/auth/me` | Get current admin user |
| `GET` | `/api/submissions` | List all submissions |
| `GET` | `/api/submissions/stats` | Dashboard stats |
| `GET` | `/api/submissions/:id` | Get single submission |
| `PUT` | `/api/submissions/:id/status` | Update status + send email |
| `GET` | `/api/contact` | List all contact messages |
| `PUT` | `/api/contact/:id/reply` | Reply to contact message |

---

## Features

### Frontend
- **Landing page** — Hero, Services, Why Choose Us, Testimonials, CTA, FAQ
- **Services page** — All 6 services with details pages
- **Document submission form** — File upload, validation, success state
- **Cost calculator** — Dynamic price estimation with sliders
- **Contact page** — Form with email notification
- **Admin panel** — Login, dashboard with stats, submissions table, detail view

### Backend
- JWT authentication (admin-only protected routes)
- Multer file upload (PDF, DOC, DOCX, TXT — max 20MB)
- Nodemailer email notifications (submission confirmation, contact confirmation, admin replies)
- Pagination, search, and status filtering on submissions
- MongoDB schemas with Mongoose

---

## Gmail Setup (for email)

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Use this password as `EMAIL_PASS` in `.env`

---

## Deployment

### Backend (Railway / Render / Heroku)
1. Set all environment variables in the dashboard
2. Set `CLIENT_URL` to your frontend URL
3. Deploy `server/` directory

### Frontend (Vercel / Netlify)
1. Set `VITE_API_URL` to your backend URL (e.g. `https://your-api.railway.app/api`)
2. Deploy `client/` directory
3. Remove the Vite proxy (not needed in production) or keep it

---

## Admin Credentials (after seeding)

- **Email:** `admin@researchexperts.com`
- **Password:** `Admin@123`

> Change these immediately in production via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
