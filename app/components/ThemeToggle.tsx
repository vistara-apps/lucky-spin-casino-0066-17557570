'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  useEffect(() => {
    // Check for user preference in localStorage
    const savedTheme = localStorage.getItem('lucky_spin_theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark)
    }
  }, [])
  
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('lucky_spin_theme', newTheme ? 'dark' : 'light')
    
    // Apply theme to document
    document.documentElement.classList.toggle('light-theme', !newTheme)
    document.documentElement.classList.toggle('dark-theme', newTheme)
  }
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        animate={{ rotate: isDarkMode ? 0 : 360 }}
        transition={{ duration: 0.5 }}
        className="w-6 h-6 flex items-center justify-center"
      >
        {isDarkMode ? (
          <span aria-hidden="true" className="text-xl">🌙</span>
        ) : (
          <span aria-hidden="true" className="text-xl">☀️</span>
        )}
      </motion.div>
    </button>
  )
}
