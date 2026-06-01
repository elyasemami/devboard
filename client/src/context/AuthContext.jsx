// src/context/AuthContext.jsx
// RESOURCE: https://react.dev/learn/passing-data-deeply-with-context
// RESOURCE: https://jwt.io/introduction (understand what a JWT is)
//
// EXPLANATION: What is Context?
// Normally, to share data between components you pass it as "props" down the tree.
// But for something like "is the user logged in?" — needed everywhere — that gets
// messy fast (called "prop drilling").
//
// React Context is a way to create GLOBAL STATE that any component can read
// without passing props manually through every level.
//
// Pattern: createContext → Provider (wraps app, holds state) → useContext (reads state)
//
// What this file does:
// 1. Creates an AuthContext object
// 2. Creates AuthProvider — a component that holds auth state and exposes it
// 3. Creates useAuth — a custom hook so components can read auth state cleanly

import { createContext, useContext, useState, useEffect } from 'react'

// Step 1: Create the context object (just a container, no data yet)
const AuthContext = createContext(null)

// Step 2: The Provider component — wraps the whole app in App.jsx
// Any component inside <AuthProvider> can call useAuth() to get this data
export function AuthProvider({ children }) {
  // TODO: Define state for the current user and their token
  // HINT: useState returns [value, setter] — you need:
  //   - user: the logged-in user object (or null if not logged in)
  //   - token: the JWT string (or null)
  // HINT: https://react.dev/reference/react/useState
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // TODO: On app load, check if a token was saved from a previous session
  // HINT: localStorage persists data across browser refreshes
  // HINT: Use useEffect with an empty dependency array [] to run once on mount
  // HINT: localStorage.getItem('token') and localStorage.getItem('user')
  // RESOURCE: https://react.dev/reference/react/useEffect
  useEffect(() => {
    // TODO: Fill this in
    // 1. Read 'token' from localStorage
    // 2. Read 'user' from localStorage (it's stored as JSON string — use JSON.parse)
    // 3. If both exist, call setToken and setUser to restore the session
  }, []) // ← empty array = runs once when component mounts

  // Called after a successful login API response
  const login = (userData, jwtToken) => {
    // TODO: Fill this in
    // 1. Save userData to state with setUser
    // 2. Save jwtToken to state with setToken
    // 3. Persist both to localStorage so the session survives page refresh:
    //    localStorage.setItem('token', jwtToken)
    //    localStorage.setItem('user', JSON.stringify(userData))
    // HINT: JSON.stringify converts an object to a string for storage
  }

  // Called when user clicks "Logout"
  const logout = () => {
    // TODO: Fill this in
    // 1. Set user and token back to null
    // 2. Remove items from localStorage:
    //    localStorage.removeItem('token')
    //    localStorage.removeItem('user')
  }

  // isAuthenticated is a derived boolean — true if a token exists
  const isAuthenticated = !!token // !! converts any value to true/false

  // The value object is what every consumer of useAuth() will receive
  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Step 3: Custom hook — components call useAuth() instead of useContext(AuthContext)
// This is cleaner and lets us add error checking in one place
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>')
  }
  return context
}
