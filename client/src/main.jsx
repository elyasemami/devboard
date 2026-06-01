// src/main.jsx
// RESOURCE: https://react.dev/learn/your-first-component
//
// This is the ENTRY POINT of your React application.
// It runs once when the browser loads your app.
//
// ReactDOM.createRoot() finds the <div id="root"> in index.html
// and hands control of it to React.
//
// <React.StrictMode> is a development tool that highlights potential problems.
// It renders components twice in dev mode to catch side effects — don't panic
// if you see double console logs.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// TODO: This file is mostly complete. Your job is to understand it.
// QUESTION: What does ReactDOM.createRoot() return? What is .render() doing?
// HINT: https://react.dev/reference/react-dom/client/createRoot

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
