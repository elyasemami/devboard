// src/components/Navbar.jsx
// RESOURCE: https://reactrouter.com/en/main/components/link
// RESOURCE: https://react.dev/learn/conditional-rendering
//
// EXPLANATION: <Link> is React Router's version of <a href>.
// It updates the URL without reloading the page.
// Always use <Link> for internal navigation — never plain <a> tags.

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  // TODO: Destructure user, logout, isAuthenticated from useAuth()

  // useNavigate returns a function to redirect programmatically
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: Call logout(), then navigate to '/'
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🧱 DevBoard</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {/* TODO: Conditional rendering
            If isAuthenticated:
              - <Link to="/tasks">Tasks</Link>
              - <span>{user?.name}</span>
              - <button onClick={handleLogout}>Logout</button>
            If NOT authenticated:
              - <Link to="/login">Login</Link>
            HINT: Use a ternary — {isAuthenticated ? (...) : (...)}
        */}
      </div>
    </nav>
  )
}

export default Navbar
