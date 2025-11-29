import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize dark mode from localStorage or system preference
const isDark = localStorage.getItem('darkMode') === 'true' || 
  (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)

if (isDark) {
  document.documentElement.classList.add('dark')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

