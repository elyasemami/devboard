// src/components/Navbar.jsx
// RESOURCE: https://reactrouter.com/en/main/components/link
//
// EXPLANATION: Components vs Pages
// "Components" are REUSABLE pieces — Navbar, Button, Card, Modal.
// "Pages" are ROUTE-LEVEL views — shown when a URL matches.
// Navbar is a component because it appears on every page.
//
// <Link> from React Router is like <a href> but prevents page refresh.
// It updates the URL and lets Router swap the page component without reloading.
// Always use <Link> for internal navigation in React apps.

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  // TODO: Destructure what you need from useAuth
  // HINT: You need: user, logout, isAuthenticated
  // HINT: const { user, logout, isAuthenticated } = useAuth()
  const { user, logout, isAuthenticated } = useAuth()

  // useNavigate returns a function you call to change routes programmatically
  // RESOURCE: https://reactrouter.com/en/main/hooks/use-navigate
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: Call logout() then redirect to '/'
    // HINT: logout() is from useAuth
    // HINT: navigate('/') redirects after logout
    await logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🧱 DevBoard</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {/* 
          TODO: Conditional rendering based on auth state
          
          If isAuthenticated:
            - Show a <Link to="/tasks">Tasks</Link>
            - Show the user's name: <span>{user?.name}</span>
            - Show a Logout button that calls handleLogout
          
          If NOT isAuthenticated:
            - Show a <Link to="/login">Login</Link>
          
          HINT: Use a ternary: {isAuthenticated ? (...) : (...)}
          RESOURCE: https://react.dev/learn/conditional-rendering
        */}
        {isAuthenticated ? (
          <>
            {/* TODO: Add Tasks link, user name display, and logout button */}
            <Link to="/tasks"> Tasks</Link>
            <span>Hello, {user?.name}</span>
            <button onClick={handleLogout}>Logout</button>
            

          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
