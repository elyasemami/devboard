// src/pages/Login.jsx
// RESOURCE: https://jwt.io/introduction
// RESOURCE: https://reactrouter.com/en/main/hooks/use-navigate
//
// EXPLANATION: Login flow:
// 1. User submits form → POST /api/auth/login with { email, password }
// 2. Server returns { user, token }
// 3. Call login(user, token) to save to context + localStorage
// 4. Redirect to /tasks

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError]       = useState(null)
  const [loading, setLoading]   = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // TODO: Call the correct API function based on isRegister
      // If registering: authAPI.register(formData)
      // If logging in:  authAPI.login(formData)
      // HINT: let response = await authAPI.login(formData)

      // TODO: After a successful response:
      // 1. Call login(response.data.user, response.data.token)
      // 2. navigate('/tasks') to redirect

    } catch (err) {
      // TODO: Set error from the server response
      // HINT: err.response?.data?.message  — the ?. is "optional chaining"
      // It safely accesses nested properties even if a parent is undefined
      // RESOURCE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>{isRegister ? 'Create Account' : 'Sign In'}</h1>
        <p className="auth-subtitle">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="link-btn" onClick={() => { setIsRegister(!isRegister); setError(null) }}>
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleChange} placeholder="Your name" className="form-input" />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="form-input" required />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

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
