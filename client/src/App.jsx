// src/App.jsx
// RESOURCE: https://reactrouter.com/en/main/start/tutorial
//
// EXPLANATION: App.jsx is the root component — the top of your component tree.
// React Router watches the URL and swaps which Page component is rendered.
//
// Key components:
//   <BrowserRouter>  — provides routing context to the whole app
//   <Routes>         — container for all route definitions
//   <Route>          — maps a URL path to a component
//   <Navigate>       — redirects to another route

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Tasks from './pages/Tasks.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/"      element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* TODO: Wrap the /tasks route with <ProtectedRoute>
                so only logged-in users can access it.
                HINT:
                <Route path="/tasks" element={
                  <ProtectedRoute><Tasks /></ProtectedRoute>
                } />
            */}
            <Route path="/tasks" element={<Tasks />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
