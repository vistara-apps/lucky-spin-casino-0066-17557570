'use client'

import { useState, useEffect } from 'react'
import { useMiniKit, useAddFrame, useOpenUrl } from '@coinbase/onchainkit/minikit'
import { SlotMachine } from './components/SlotMachine'
import { WelcomeModal } from './components/WelcomeModal'
import { ThemeToggle } from './components/ThemeToggle'
import { Toast, ToastType } from './components/Toast'
import { motion } from 'framer-motion'

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit()
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const [toastConfig, setToastConfig] = useState({
    message: '',
    type: 'info' as ToastType,
    isVisible: false
  })

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = async () => {
    try {
      await addFrame()
      showToast('Frame saved successfully!', 'success')
    } catch (error) {
      showToast('Failed to save frame. Please try again.', 'error')
    }
  }
  
  const showToast = (message: string, type: ToastType = 'info') => {
    setToastConfig({
      message,
      type,
      isVisible: true
    })
  }
  
  const handleCloseToast = () => {
    setToastConfig(prev => ({ ...prev, isVisible: false }))
  }
  
  const handleWelcomeModalClose = () => {
    // Optional: Show a toast after welcome modal closes
    showToast('Welcome to Lucky Spin Casino! Connect your wallet to start playing.', 'info')
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-xl mx-auto px-4 py-4 sm:py-6">
        {/* Header with frame actions */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl" aria-hidden="true">🎰</span>
            <span className="font-bold text-primary text-lg sm:text-xl">Lucky Spin</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle className="text-muted hover:text-primary" />
            
            <button
              onClick={handleAddFrame}
              className="btn-secondary text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
              aria-label="Save Frame"
            >
              <span aria-hidden="true">⭐</span> Save Frame
            </button>
          </div>
        </motion.div>

        {/* Main Game */}
        <SlotMachine showToast={showToast} />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <button
              onClick={() => openUrl('https://base.org/builders/minikit')}
              className="text-muted text-xs hover:text-primary transition-colors"
              aria-label="Visit Base.org Builders MiniKit"
            >
              Built on Base with MiniKit <span aria-hidden="true">🔗</span>
            </button>
            
            <button
              onClick={() => {
                const welcomeModal = document.createElement('div')
                document.body.appendChild(welcomeModal)
                const onClose = () => {
                  document.body.removeChild(welcomeModal)
                  handleWelcomeModalClose()
                }
                // This is a hack to force the modal to show again
                localStorage.removeItem('lucky_spin_has_seen_welcome')
                const modal = <WelcomeModal onClose={onClose} showOnlyOnce={false} />
              }}
              className="text-muted text-xs hover:text-primary transition-colors"
              aria-label="View game rules"
            >
              Game Rules <span aria-hidden="true">📋</span>
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Welcome Modal */}
      <WelcomeModal onClose={handleWelcomeModalClose} />
      
      {/* Toast Notifications */}
      <Toast
        message={toastConfig.message}
        type={toastConfig.type}
        isVisible={toastConfig.isVisible}
        onClose={handleCloseToast}
      />
    </div>
  )
}
