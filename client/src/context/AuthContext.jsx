// src/context/AuthContext.jsx
// RESOURCE: https://react.dev/learn/passing-data-deeply-with-context
// RESOURCE: https://jwt.io/introduction
//
// EXPLANATION: React Context lets you share global state across the entire app
// without passing props through every level (called "prop drilling").
//
// Pattern: createContext → Provider (holds state) → useContext (reads state)
//
// This file:
//   1. Creates an AuthContext object
//   2. Creates AuthProvider — holds auth state, exposes it to the whole app
//   3. Creates useAuth — a custom hook so components read auth state cleanly

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // TODO: Define state for user and token
  // HINT: You need two useState calls:
  //   const [user, setUser] = useState(null)
  //   const [token, setToken] = useState(null)
  // RESOURCE: https://react.dev/reference/react/useState


  // TODO: On app load, restore session from localStorage
  // HINT: useEffect with empty [] runs once on mount
  // HINT: localStorage.getItem('token') and localStorage.getItem('user')
  // HINT: user is stored as JSON — use JSON.parse() to convert it back to an object
  // RESOURCE: https://react.dev/reference/react/useEffect
  useEffect(() => {

  }, [])

  // TODO: Implement login(userData, jwtToken)
  // Called after a successful API login response
  // 1. Save userData and jwtToken to state
  // 2. Persist to localStorage so the session survives a page refresh:
  //    localStorage.setItem('token', jwtToken)
  //    localStorage.setItem('user', JSON.stringify(userData))
  const login = (userData, jwtToken) => {

  }

  // TODO: Implement logout()
  // 1. Set user and token back to null
  // 2. Remove from localStorage:
  //    localStorage.removeItem('token')
  //    localStorage.removeItem('user')
  const logout = () => {

  }

  // isAuthenticated is a derived boolean — true if a token exists
  // !! converts any value to true/false
  const isAuthenticated = !!token

  const value = { user, token, login, logout, isAuthenticated }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>')
  return context
}
