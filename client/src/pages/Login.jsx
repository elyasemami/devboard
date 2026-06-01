// src/pages/Login.jsx
// RESOURCE: https://jwt.io/introduction
// RESOURCE: https://reactrouter.com/en/main/hooks/use-navigate
//
// EXPLANATION: The Login Flow
// 1. User fills out form and submits
// 2. Frontend sends POST /api/auth/login with { email, password }
// 3. Server validates credentials, returns { user, token }
// 4. Frontend stores the token (via AuthContext.login())
// 5. Redirect to /tasks — user is now "logged in"
//
// The token is a JWT (JSON Web Token) — a signed string that proves identity.
// On every subsequent request, the frontend sends the token in the header.
// The server verifies the token to know who's making the request.

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false) // Toggle login/register

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      let response

      if (isRegister) {
        // TODO: Call authAPI.register with formData
        // formData needs a name field too — add it to the initial state and form
        // HINT: response = await authAPI.register(formData)
      } else {
        // TODO: Call authAPI.login with formData
        // HINT: response = await authAPI.login(formData)
      }

      // TODO: After successful response:
      // 1. Call login(response.data.user, response.data.token)
      //    This saves the user and token to context + localStorage
      // 2. Redirect to '/tasks' using navigate('/tasks')
      //    navigate replaces the current history entry (they can't go back to login)

    } catch (err) {
      // TODO: Display the error from the server
      // HINT: err.response?.data?.message contains the server's error message
      // The ?. is "optional chaining" — safe even if err.response is undefined
      // RESOURCE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      setError(err.response?.data?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>{isRegister ? 'Create Account' : 'Sign In'}</h1>
        <p className="auth-subtitle">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          {' '}
          <button
            className="link-btn"
            onClick={() => { setIsRegister(!isRegister); setError(null) }}
          >
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Show name field only for registration */}
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Your name"
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isRegister ? 'Create Account' : 'Sign In'
            }
          </button>
        </form>

        {/* Demo credentials hint for testing */}
        {!isRegister && (
          <div className="demo-hint">
            <small>Demo: test@example.com / password123</small>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
