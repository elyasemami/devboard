// src/components/ProtectedRoute.jsx
// RESOURCE: https://reactrouter.com/en/main/components/navigate
//
// EXPLANATION: Route Guards / Protected Routes
// Some pages should only be accessible to logged-in users.
// A ProtectedRoute is a "wrapper" component that checks auth status:
//   - If authenticated → render the actual page (children)
//   - If NOT authenticated → redirect to /login
//
// This is one of the most common patterns in real production apps.
// Every dashboard, profile, or data page uses this concept.

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// "children" is a special React prop — it's whatever is nested inside this component.
// Example usage in App.jsx:
//   <ProtectedRoute><Tasks /></ProtectedRoute>
// Here, <Tasks /> is the "children"
function ProtectedRoute({ children }) {
  // TODO: Get isAuthenticated from useAuth
  // HINT: const { isAuthenticated } = useAuth()
  const { isAuthenticated } = useAuth()

  // TODO: If not authenticated, redirect to login
  // HINT: Return <Navigate to="/login" replace /> — the "replace" prevents
  //        the user from hitting the browser back button to get back in
  if (!isAuthenticated) {
    // TODO: Return the Navigate component here
    return <Navigate to="/login" replace />
  }

  // If authenticated, render whatever page was passed in
  // TODO: Return children
  return children
}

export default ProtectedRoute
