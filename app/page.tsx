
'use client'

import { useEffect } from 'react'
import { useMiniKit, useAddFrame, useOpenUrl } from '@coinbase/onchainkit/minikit'
import { SlotMachine } from './components/SlotMachine'
import { motion } from 'framer-motion'

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit()
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = async () => {
    await addFrame()
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Header with frame actions */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎰</span>
            <span className="font-bold text-primary">Lucky Spin</span>
          </div>
          
          <button
            onClick={handleAddFrame}
            className="btn-secondary text-sm px-3 py-1"
          >
            ⭐ Save Frame
          </button>
        </motion.div>

        {/* Main Game */}
        <SlotMachine />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => openUrl('https://base.org/builders/minikit')}
            className="text-muted text-xs hover:text-primary transition-colors"
          >
            Built on Base with MiniKit 🔗
          </button>
        </motion.div>
      </div>
    </div>
  )
}
