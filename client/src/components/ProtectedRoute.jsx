// src/components/ProtectedRoute.jsx
// RESOURCE: https://reactrouter.com/en/main/components/navigate
//
// EXPLANATION: A route guard — checks auth before rendering a page.
// If authenticated → render children (the protected page)
// If NOT authenticated → redirect to /login
//
// "children" is a special React prop — it's whatever is nested inside:
//   <ProtectedRoute><Tasks /></ProtectedRoute>
//   Here, <Tasks /> is the children

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  // TODO: Get isAuthenticated from useAuth()

  // TODO: If not authenticated, return <Navigate to="/login" replace />
  // The "replace" prop prevents the user using the back button to sneak back in

  // TODO: If authenticated, return children
}

export default ProtectedRoute
