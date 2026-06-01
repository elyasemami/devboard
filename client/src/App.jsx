// src/App.jsx
// RESOURCE: https://reactrouter.com/en/main/start/tutorial
//
// App.jsx is the ROOT COMPONENT — the top of your component tree.
// Every other component lives inside this one.
//
// React Router turns your SPA into a "multi-page" app by watching the URL.
// When the URL changes, Router swaps which <Page> component is rendered —
// without ever refreshing the browser.
//
// Key Router concepts:
//   <BrowserRouter>  — Provides routing context to the whole app
//   <Routes>         — Container that holds all your route definitions
//   <Route>          — Maps a URL path to a component
//   <Navigate>       — Redirects to another route programmatically

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Tasks from './pages/Tasks.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    // AuthProvider wraps everything so ALL components can access auth state
    // RESOURCE: https://react.dev/learn/passing-data-deeply-with-context
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar renders on every page because it's outside <Routes> */}
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* Public routes — anyone can access */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* 
              TODO: Protected Route
              Wrap the /tasks route so only logged-in users can see it.
              If not logged in, redirect to /login.
              
              HINT: Use the <ProtectedRoute> component defined in components/ProtectedRoute.jsx
              HINT: React Router's <Route> element prop accepts any JSX, including wrappers.
              
              It should look like:
              <Route path="/tasks" element={<ProtectedRoute> <Tasks /> </ProtectedRoute>} />
            */}
            <Route path="/tasks" element={<Tasks />} /> {/* ← Replace this line */}

            {/* Catch-all: redirect unknown URLs to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
