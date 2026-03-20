<<<<<<< HEAD

# Yosef Khier Portfolio

🌐 **Live Website**  
https://yosef-khier-portfolio.vercel.app/

## About
This is my personal portfolio website where I showcase my projects, technical skills, and experience as a Software Engineering student. The goal of this website is to present the software projects I have built and provide an easy way for recruiters or collaborators to contact me.

## Technologies
- React
- Next.js
- TypeScript
- Tailwind CSS
- EmailJS

## Features
- Responsive portfolio website
- Project showcase section
- Skills and technologies overview
- Contact form that sends emails directly using **EmailJS**
- Clean and modern user interface

## Installation

```bash
# Clone the repository
git clone https://github.com/ykhier/yosef-portfolio.git

# Navigate to the project folder
cd yosef-portfolio

# Install dependencies
npm install

# Run the development server
npm run dev

## 👨‍💻 Developer

Developed by **Yosef Khier**

AI-focused full-stack developer building production-grade intelligent systems.
=======
# Portfolio

A full-stack personal portfolio website with a live projects section backed by a database and a password-protected admin panel. Built with React + Vite on the frontend and Node.js + Express + PostgreSQL on the backend.

## Features

- **Portfolio sections** — About, Skills, Education, Projects, Contact
- **Projects** — fetched live from a PostgreSQL database, filterable by category (All / Personal / Academic)
- **Contact form** — sends emails via EmailJS
- **Dark mode** — toggled from the header, persisted to `localStorage`
- **Admin panel** — add, edit, and delete projects with image upload; protected by JWT auth
- **Smooth animations** — Framer Motion fade/stagger effects across all sections

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite (rolldown-vite), Tailwind CSS v4, Framer Motion, React Router v6, Axios |
| Icons | react-icons, @iconify/react |
| Contact | EmailJS (`@emailjs/browser`) |
| Backend | Node.js, Express 4 |
| Database | PostgreSQL (Neon hosted) |
| Auth | JWT (`jsonwebtoken`) |
| Image upload | Multer — local disk storage (`server/uploads/`) |
| Deploy (frontend) | GitHub Pages via `gh-pages` |

## Project Structure

```
portfolio/
├── src/
│   ├── App.jsx              # Routes: / → Portfolio, /admin/login, /admin
│   ├── main.jsx             # BrowserRouter wrapper
│   ├── Header.jsx           # Nav + dark mode toggle
│   ├── AboutUs.jsx
│   ├── Skills.jsx           # Uses Technology.jsx for skill cards
│   ├── Eduction.jsx         # (filename kept as-is)
│   ├── Projects.jsx         # Fetches from API, category filter tabs
│   ├── ContactMe.jsx        # EmailJS contact form
│   ├── animations.js        # Shared Framer Motion variants + wrapped components
│   ├── useDarkMode.js       # Dark mode hook
│   └── admin/
│       ├── AdminLogin.jsx
│       ├── AdminPanel.jsx   # Main admin page (orchestrator)
│       ├── AdminHeader.jsx  # Logout button
│       ├── AddProjectForm.jsx
│       ├── EditProjectForm.jsx
│       ├── ProjectsList.jsx
│       ├── ProtectedRoute.jsx
│       └── adminUtils.js    # Shared API URL, authHeaders, inputCls
└── server/
    ├── index.js             # Express app entry point
    ├── db.js                # PostgreSQL pool
    ├── upload.js            # Multer disk storage config
    ├── init.sql             # DB schema (run once)
    ├── middleware/auth.js   # JWT verify middleware
    └── routes/
        ├── auth.js          # POST /api/auth/login
        └── projects.js      # CRUD /api/projects
```

## Getting Started

### 1. Environment variables

Create a `.env` file in the project root:

```env
# PostgreSQL (Neon or any Postgres)
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Admin credentials (plain text, compared on login)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourpassword

# JWT signing secret
JWT_SECRET=your-secret-key

# Backend URL (used by Vite frontend)
VITE_API_URL=http://localhost:3001

# CORS allowed origin
FRONTEND_URL=http://localhost:5173

# Public URL of the backend (used to build image URLs in production)
SERVER_URL=https://your-backend.onrender.com
```

### 2. Database setup

Run `server/init.sql` against your database once:

```bash
node -e "
const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
pool.query(fs.readFileSync('./server/init.sql', 'utf8')).then(() => { console.log('Done'); pool.end(); });
"
```

### 3. Install & run

```bash
# Frontend — localhost:5173
npm install
npm run dev

# Backend — localhost:3001 (open a second terminal)
cd server
npm install
npm run dev      # uses nodemon for auto-reload
```

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | — | Returns JWT token |
| GET | `/api/projects` | — | List all projects |
| POST | `/api/projects` | JWT | Add a project (multipart/form-data) |
| PUT | `/api/projects/:id` | JWT | Update a project (image optional) |
| DELETE | `/api/projects/:id` | JWT | Delete a project |
| GET | `/api/health` | — | Health check |

Uploaded images are served at `/uploads/<filename>`.

## Admin Panel

1. Navigate to `/admin/login`
2. Sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`
3. Add, edit, or delete projects from the dashboard

The JWT is stored in `localStorage`. Expired or invalid tokens auto-redirect to the login page.

## Deployment

### Frontend → GitHub Pages

```bash
# Set VITE_API_URL to your production backend URL in .env first
npm run deploy
```

This runs `vite build` then pushes `dist/` to the `gh-pages` branch.

### Backend → Render / Railway

1. Deploy the `server/` folder as a Node.js service
2. Set all `.env` variables as environment variables on the platform
3. Set `SERVER_URL` to the public URL of the deployed backend so image URLs are correct
>>>>>>> d956f28 (add admin side that can to add a new project in admin dashboard)
