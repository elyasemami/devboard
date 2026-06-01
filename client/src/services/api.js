// src/services/api.js
// RESOURCE: https://axios-http.com/docs/instance
// RESOURCE: https://axios-http.com/docs/interceptors
//
// EXPLANATION: Why a separate API service file?
// You could call axios.get() directly inside any component, but that creates problems:
//  - If your API URL changes, you'd update 10 different files
//  - Token injection logic would be duplicated everywhere
//  - Hard to test
//
// Instead, this file creates ONE configured Axios instance that all components share.
// This is called the "service layer" pattern — common in production codebases.
//
// Axios is a library that makes HTTP requests (GET, POST, PUT, DELETE).
// It's like fetch() but with better error handling and features.
// RESOURCE: https://axios-http.com/docs/api_intro

import axios from 'axios'

// Create a custom Axios instance with a base URL
// All requests made through this instance will automatically prepend '/api'
// So apiClient.get('/tasks') actually calls '/api/tasks'
// Vite's proxy (in vite.config.js) then forwards that to http://localhost:3001/api/tasks
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── REQUEST INTERCEPTOR ────────────────────────────────────────────────────
// An interceptor runs on EVERY request BEFORE it's sent.
// Perfect for attaching the auth token automatically.
// Without this, you'd have to manually add the token header in every API call.
// RESOURCE: https://axios-http.com/docs/interceptors

apiClient.interceptors.request.use(
  (config) => {
    // TODO: Attach the JWT token to every outgoing request
    // HINT: Read the token from localStorage: localStorage.getItem('token')
    // HINT: If a token exists, set config.headers.Authorization = `Bearer ${token}`
    // HINT: The "Bearer " prefix is a standard HTTP convention for JWT tokens
    // RESOURCE: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
    
    const token = localStorage.getItem('token')
    if (token) {
      // TODO: Set the Authorization header here
    }
    return config // Always return config — it continues the request
  },
  (error) => Promise.reject(error) // Pass errors through
)

// ─── RESPONSE INTERCEPTOR ───────────────────────────────────────────────────
// Runs on every response AFTER it comes back from the server.
// Use it to handle global errors like 401 Unauthorized (expired token).

apiClient.interceptors.response.use(
  (response) => response, // Success: just pass it through
  (error) => {
    // TODO: Handle 401 Unauthorized globally
    // HINT: error.response.status gives you the HTTP status code
    // HINT: If status is 401, the token is expired/invalid
    //   - Clear localStorage ('token' and 'user')
    //   - Redirect to login: window.location.href = '/login'
    // This prevents users from being silently stuck with an expired session.
    
    if (error.response?.status === 401) {
      // TODO: Clear storage and redirect to login
    }
    return Promise.reject(error)
  }
)

// ─── API FUNCTIONS ───────────────────────────────────────────────────────────
// Export named functions for each API endpoint.
// Components import these functions — they never call axios directly.
// This makes your API calls easy to find, change, and test.

// AUTH
export const authAPI = {
  login: (credentials) => {
    // TODO: Make a POST request to '/auth/login' with credentials
    // credentials = { email, password }
    // HINT: apiClient.post(url, data) returns a Promise
    // HINT: Return the promise so the calling component can .then() or await it
  },

  register: (userData) => {
    // TODO: Make a POST request to '/auth/register' with userData
    // userData = { name, email, password }
  },
}

// TASKS — full CRUD (Create, Read, Update, Delete)
export const tasksAPI = {
  getAll: () => {
    // TODO: Make a GET request to '/tasks'
    // HINT: apiClient.get('/tasks')
    // This fetches ALL tasks for the logged-in user
  },

  getOne: (id) => {
    // TODO: Make a GET request to '/tasks/:id'
    // HINT: Use a template literal: `/tasks/${id}`
  },

  create: (taskData) => {
    // TODO: Make a POST request to '/tasks' with taskData
    // taskData = { title, description, status, priority }
  },

  update: (id, taskData) => {
    // TODO: Make a PUT request to '/tasks/:id' with taskData
    // HINT: apiClient.put(`/tasks/${id}`, taskData)
    // PUT replaces the whole resource. PATCH updates partial fields.
    // Both are acceptable here.
  },

  delete: (id) => {
    // TODO: Make a DELETE request to '/tasks/:id'
    // HINT: apiClient.delete(`/tasks/${id}`)
  },
}

export default apiClient
