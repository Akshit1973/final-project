# SwapSkills: Full Project Documentation

## 1. Project Overview
**SwapSkills** is a premium, high-performance web application designed for knowledge exchange. It allows users to list skills they possess and skills they wish to learn, facilitating a "skill swap" ecosystem. The platform features a dynamic, glassmorphic UI, a robust authentication system, and a progression-based gamification engine.

---

## 2. Core Technology Stack
The project is built using modern, industry-standard technologies focused on speed, developer experience, and scalability.

### **Frontend**
- **React.js (Vite)**: Core framework for building the user interface.
- **Motion (Framer Motion)**: For high-quality, smooth animations and transitions.
- **Lucide React**: Premium icon library.
- **Tailwind CSS**: Utility-first styling for a custom, modern look.
- **Context API**: Global state management for user authentication (`AuthContext`).
- **React Router**: Client-side routing for seamless navigation.

### **Backend**
- **Node.js & Express**: High-performance server environment.
- **Prisma ORM**: Modern database toolkit for type-safe database access.
- **SQLite**: Lightweight, efficient relational database.
- **Tsx**: For running TypeScript directly in the backend.

---

## 3. Key Features

### **A. Robust Authentication System**
- **Sign Up / Login**: Users can create accounts with a unique **Username** and Email.
- **Auth Persistence**: Sessions are saved in `localStorage`, meaning users stay logged in even after refreshing.
- **Protected Routes**: Pages like the Dashboard are protected; unauthenticated users are redirected to the Login page.

### **B. Smart Dashboard**
- **User Profile**: Displays user stats, levels, and initials.
- **Skill Management**: Users can dynamically add or remove skills they "Have" and skills they "Want".
- **Match Engine**: Shows potential partners based on skill compatibility scores (e.g., 97% Match).
- **Skill Analytics**: Visual data representations using `recharts` (Radar and Bar charts).

### **C. Explore & Discovery**
- **Advanced Filtering**: Filter swappers by skill level, rating, availability, and online status.
- **Category Navigation**: Quick-access chips for Web Dev, Design, Music, AI, and more.
- **Request Swap**: Interactive buttons with loading and success states for requesting a skill exchange.

---

## 4. Gamification: The Leveling System
The project uses a progression system to encourage community engagement. Every user starts as a "Noob" and advances through their swapping journey:
1. **Level 1: Noob** (Start)
2. **Level 2: Rookie**
3. **Level 3: Intermediate**
4. **Level 4: Pro**
5. **Level 5: Advance** (Mastery)

---

## 5. Data Architecture
The database is managed via Prisma with the following `User` model:
- `id`: Unique UUID
- `email`: Unique identifier
- `username`: Unique handle (e.g., alex_dev)
- `name`: Full name (optional)
- `createdAt / updatedAt`: Timestamps

---

## 6. Project Structure
```text
/final-project
├── prisma/                # Database schema and migrations
├── src/
│   ├── app/
│   │   ├── components/    # Reusable UI (Navbar, GlassCard, AuthContext)
│   │   ├── pages/         # Page components (Dashboard, Explore, Login)
│   │   ├── App.tsx        # Main App entry with Routing
│   │   └── routes.ts      # Route definitions
│   ├── server/
│   │   └── index.ts       # Express server & API endpoints
│   └── main.tsx           # React DOM hydration
├── .env                  # Environment variables
├── vite.config.ts        # Vite & Proxy configuration
└── package.json          # Scripts and Dependencies
```

---

## 7. How to Run the Project
1. **Install Dependencies**: `npm install`
2. **Setup Database**: `npx prisma migrate dev`
3. **Run Full Stack**: `npm run dev:full`

---
**Documentation compiled by Antigravity AI.**
