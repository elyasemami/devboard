// src/services/api.js
// RESOURCE: https://axios-http.com/docs/instance
// RESOURCE: https://axios-http.com/docs/interceptors
//
// EXPLANATION: A single configured Axios instance shared across the whole app.
// This is the "service layer" pattern — components never call axios directly.
// If the API URL changes, you update it here in one place.

import axios from 'axios'

// Base instance — all requests automatically prepend '/api'
// Vite's proxy (vite.config.js) forwards /api/* → http://localhost:3001/api/*
const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// ── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────
// Runs before EVERY outgoing request. Use it to attach the auth token.
// RESOURCE: https://axios-http.com/docs/interceptors
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Read the token from localStorage and attach it to the request header
    // HINT: const token = localStorage.getItem('token')
    // HINT: If token exists: config.headers.Authorization = `Bearer ${token}`
    // HINT: The "Bearer " prefix is the HTTP standard for JWT tokens
    // RESOURCE: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

    return config
  },
  (error) => Promise.reject(error)
)

// ── RESPONSE INTERCEPTOR ─────────────────────────────────────────────────────
// Runs on every response. Handle global errors like 401 (expired token).
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: If the response status is 401 (Unauthorized):
    // HINT: error.response?.status === 401
    // 1. Clear localStorage: remove 'token' and 'user'
    // 2. Redirect to login: window.location.href = '/login'

    return Promise.reject(error)
  }
)

// ── AUTH API ─────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (credentials) => {
    // TODO: POST to '/auth/login' with credentials { email, password }
    // HINT: return apiClient.post('/auth/login', credentials)
  },

  register: (userData) => {
    // TODO: POST to '/auth/register' with userData { name, email, password }
  },
}

// ── TASKS API (CRUD) ─────────────────────────────────────────────────────────
export const tasksAPI = {
  getAll: () => {
    // TODO: GET '/tasks'
  },

  getOne: (id) => {
    // TODO: GET '/tasks/:id'
    // HINT: Use a template literal for the id: `/tasks/${id}`
  },

  create: (taskData) => {
    // TODO: POST '/tasks' with taskData
  },

  update: (id, taskData) => {
    // TODO: PUT '/tasks/:id' with taskData
  },

  delete: (id) => {
    // TODO: DELETE '/tasks/:id'
  },
}

export default apiClient
