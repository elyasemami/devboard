# 🧱 DevBoard — Full-Stack Learning Boilerplate
### React + Vite + Node.js + Express

---

## 📚 What You'll Learn

| Level | Topic | Where |
|-------|-------|--------|
| 1 | Project structure & tooling | Root config files |
| 2 | Vite + React setup | `client/` |
| 3 | Component architecture | `client/src/components/` |
| 4 | React Hooks (useState, useEffect, custom) | `client/src/hooks/` |
| 5 | React Context (global state) | `client/src/context/` |
| 6 | React Router (SPA navigation) | `client/src/App.jsx` |
| 7 | HTTP requests with Axios | `client/src/services/api.js` |
| 8 | Node.js + Express server | `server/index.js` |
| 9 | REST API design (CRUD routes) | `server/routes/` |
| 10 | Controllers (business logic) | `server/controllers/` |
| 11 | Middleware (auth, error handling) | `server/middleware/` |
| 12 | Data models (in-memory → DB ready) | `server/models/` |
| 13 | JWT Authentication flow | `server/routes/auth.js` |
| 14 | Environment variables & config | `.env` files |

---

## 🗂️ Project Structure

```
devboard/
├── client/                    ← React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx           ← React entry point
│       ├── App.jsx            ← Router setup
│       ├── components/        ← Reusable UI pieces
│       │   ├── Navbar.jsx
│       │   ├── TaskCard.jsx
│       │   └── TaskForm.jsx
│       ├── pages/             ← Route-level views
│       │   ├── Home.jsx
│       │   ├── Tasks.jsx
│       │   └── Login.jsx
│       ├── hooks/             ← Custom React hooks
│       │   └── useTasks.js
│       ├── context/           ← Global state
│       │   └── AuthContext.jsx
│       ├── services/          ← API layer
│       │   └── api.js
│       └── styles/
│           └── index.css
│
└── server/                    ← Node.js + Express backend
    ├── index.js               ← Server entry point
    ├── package.json
    ├── .env.example
    ├── routes/                ← URL endpoints
    │   ├── tasks.js
    │   └── auth.js
    ├── controllers/           ← Business logic
    │   ├── taskController.js
    │   └── authController.js
    ├── middleware/            ← Request interceptors
    │   ├── authMiddleware.js
    │   └── errorHandler.js
    └── models/               ← Data structures
        ├── taskModel.js
        └── userModel.js
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
# Terminal 1 — Frontend
cd client
npm install

# Terminal 2 — Backend
cd server
npm install
```

### 2. Set up environment

```bash
cd server
cp .env.example .env
# Edit .env with your values
```

### 3. Run the app

```bash
# Frontend (http://localhost:5173)
cd client
npm run dev

# Backend (http://localhost:3001)
cd server
npm run dev
```

---

## 🔍 How to Use This Boilerplate

Every file has:
- **Explanation comments** — what each piece does and why
- **`// TODO:`** blocks — where YOU write the code
- **`// HINT:`** comments — pointing you toward docs/concepts
- **`// RESOURCE:`** links — official docs and reading material

### Learning Strategy
1. Read the file top to bottom before writing any code
2. Try the TODO without hints first
3. Check the HINT if stuck for 10–15 minutes
4. Google the RESOURCE link for deeper understanding
5. Test it in the browser / Postman before moving on

---

## 📦 Tech Stack

| Tool | Purpose | Docs |
|------|---------|------|
| **Vite** | Lightning-fast frontend build tool | https://vitejs.dev |
| **React 18** | UI component library | https://react.dev |
| **React Router v6** | Client-side routing | https://reactrouter.com |
| **Axios** | HTTP client | https://axios-http.com |
| **Node.js** | JavaScript runtime for server | https://nodejs.org |
| **Express 4** | Web server framework | https://expressjs.com |
| **bcryptjs** | Password hashing | https://www.npmjs.com/package/bcryptjs |
| **jsonwebtoken** | JWT auth tokens | https://www.npmjs.com/package/jsonwebtoken |
| **dotenv** | Environment variable loader | https://www.npmjs.com/package/dotenv |
| **cors** | Cross-origin resource sharing | https://www.npmjs.com/package/cors |

---

---

## ✅ Completion Checklist

- [ ] Server starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] Tasks API returns JSON (test with Postman or browser)
- [ ] You can CREATE a task via the form
- [ ] You can READ all tasks in the list
- [ ] You can UPDATE a task status
- [ ] You can DELETE a task
- [ ] Login returns a JWT token
- [ ] Protected routes reject unauthenticated requests
- [ ] Frontend stores/reads the token from localStorage

---

## 🛠️ Recommended Tools

- **VS Code** — https://code.visualstudio.com
- **Postman** — API testing — https://postman.com
- **React DevTools** — Chrome extension
- **Thunder Client** — VS Code API tester extension
- **Node.js v20+** — https://nodejs.org

---

*Built as a teaching project. Every TODO you complete is a real pattern used in production apps.*
