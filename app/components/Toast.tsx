'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
  isVisible: boolean
}

export function Toast({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose,
  isVisible 
}: ToastProps) {
  const [visible, setVisible] = useState(isVisible)

  useEffect(() => {
    setVisible(isVisible)
    
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        if (onClose) onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/90 border-green-600'
      case 'error':
        return 'bg-red-500/90 border-red-600'
      case 'info':
      default:
        return 'bg-primary/90 border-primary'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'info':
      default:
        return 'ℹ️'
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-md shadow-lg border ${getTypeStyles()} text-white max-w-xs w-full flex items-center`}
          role="alert"
          aria-live="assertive"
        >
          <span className="mr-2" aria-hidden="true">{getIcon()}</span>
          <p className="flex-1">{message}</p>
          <button 
            onClick={() => {
              setVisible(false)
              if (onClose) onClose()
            }}
            className="ml-2 text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Close notification"
          >
            <span aria-hidden="true">×</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
