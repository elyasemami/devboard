// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="page home-page">
      <div className="hero">
        <h1>Welcome to DevBoard</h1>
        <p className="hero-subtitle">
          A full-stack learning project built with React, Vite, and Node.js.
        </p>

        {isAuthenticated ? (
          <div>
            <p>Welcome back, <strong>{user?.name}</strong>!</p>
            <Link to="/tasks" className="btn btn-primary btn-lg">
              Go to My Tasks →
            </Link>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-lg">
            Get Started →
          </Link>
        )}
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">⚛️</span>
          <h3>React 18</h3>
          <p>Components, hooks, context, and React Router for client-side navigation.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Vite</h3>
          <p>Lightning-fast dev server with hot module replacement and build optimization.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🟢</span>
          <h3>Node.js + Express</h3>
          <p>RESTful API with JWT authentication, middleware, and MVC architecture.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔐</span>
          <h3>JWT Auth</h3>
          <p>Secure token-based authentication flow from login to protected routes.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
