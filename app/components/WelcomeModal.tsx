'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WelcomeModalProps {
  onClose: () => void
  showOnlyOnce?: boolean
}

export function WelcomeModal({ onClose, showOnlyOnce = true }: WelcomeModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Check if we've shown the modal before
    if (showOnlyOnce) {
      const hasSeenWelcome = localStorage.getItem('lucky_spin_has_seen_welcome')
      if (hasSeenWelcome) {
        return
      }
    }
    
    // Show modal with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [showOnlyOnce])
  
  const handleClose = () => {
    setIsVisible(false)
    
    if (showOnlyOnce) {
      localStorage.setItem('lucky_spin_has_seen_welcome', 'true')
    }
    
    onClose()
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40"
            onClick={handleClose}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-surface border-2 border-primary/30 rounded-lg p-5 sm:p-6 max-w-md w-[90%] shadow-glow"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-modal-title"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-muted hover:text-text focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              aria-label="Close welcome modal"
            >
              <span aria-hidden="true" className="text-xl">×</span>
            </button>
            
            {/* Content */}
            <div className="text-center space-y-4">
              <h2 id="welcome-modal-title" className="text-2xl font-bold text-primary">
                <span aria-hidden="true">🎰</span> Welcome to Lucky Spin Casino!
              </h2>
              
              <div className="space-y-3 text-left">
                <p>Ready to try your luck? Here's how to play:</p>
                
                <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base">
                  <li>Connect your wallet to start playing</li>
                  <li>Set your bet amount using the controls</li>
                  <li>Click the "SPIN TO WIN" button to spin the reels</li>
                  <li>Match symbols to win crypto rewards!</li>
                </ol>
                
                <div className="bg-primary/10 p-3 rounded-md mt-3">
                  <h3 className="font-bold text-primary mb-1">Winning Combinations:</h3>
                  <ul className="space-y-1 text-sm">
                    <li><span aria-hidden="true">🍒 🍒 🍒</span> - Cherry: 2x your bet</li>
                    <li><span aria-hidden="true">🍋 🍋 🍋</span> - Lemon: 3x your bet</li>
                    <li><span aria-hidden="true">🍊 🍊 🍊</span> - Orange: 4x your bet</li>
                    <li><span aria-hidden="true">🍇 🍇 🍇</span> - Grapes: 5x your bet</li>
                    <li><span aria-hidden="true">🔔 🔔 🔔</span> - Bell: 8x your bet</li>
                    <li><span aria-hidden="true">💎 💎 💎</span> - Diamond: 15x your bet</li>
                    <li><span aria-hidden="true">7️⃣ 7️⃣ 7️⃣</span> - Seven: 25x your bet</li>
                    <li><span aria-hidden="true">⭐ ⭐ ⭐</span> - Star: 50x your bet</li>
                  </ul>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="btn-primary px-6 py-2 mt-4"
                aria-label="Start playing"
              >
                Let's Play!
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
