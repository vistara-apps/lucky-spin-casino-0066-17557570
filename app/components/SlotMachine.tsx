'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SlotReel } from './SlotReel'
import { BetInput } from './BetInput'
import { SpinButton } from './SpinButton'
import { WinLossDisplay } from './WinLossDisplay'
import { GameStats } from './GameStats'
import { BetHistory } from './BetHistory'
import { WalletConnectButton } from './WalletConnectButton'
import { spinSlotMachine, calculatePayout } from '../lib/slot-machine'
import { createMockUser } from '../lib/auth'
import { saveUser, getUser, updateUserBalance, saveBet, getBets } from '../lib/storage'
import { User, Bet, SlotResult, GameState } from '../types'
import { ToastType } from './Toast'

interface SlotMachineProps {
  showToast?: (message: string, type: ToastType) => void
}

export function SlotMachine({ showToast }: SlotMachineProps) {
  const [user, setUser] = useState<User | null>(null)
  const [gameState, setGameState] = useState<GameState>({
    isSpinning: false,
    currentBet: 10,
    balance: 1000,
    lastResult: null,
    recentBets: [],
  })

  // Load user data on mount
  useEffect(() => {
    const savedUser = getUser()
    if (savedUser) {
      setUser(savedUser)
      setGameState(prev => ({
        ...prev,
        balance: savedUser.balance,
        recentBets: getBets(),
      }))
    }
  }, [])

  const handleWalletConnect = (address: string) => {
    try {
      const newUser = createMockUser(address)
      setUser(newUser)
      saveUser(newUser)
      setGameState(prev => ({
        ...prev,
        balance: newUser.balance,
      }))
      
      if (showToast) {
        showToast(`Wallet connected successfully! Starting balance: ${newUser.balance} credits`, 'success')
      }
    } catch (error) {
      if (showToast) {
        showToast('Failed to connect wallet. Please try again.', 'error')
      }
    }
  }

  const handleSpin = async () => {
    if (!user) {
      if (showToast) {
        showToast('Please connect your wallet to play', 'info')
      }
      return
    }
    
    if (gameState.isSpinning) {
      return
    }
    
    if (gameState.currentBet > gameState.balance) {
      if (showToast) {
        showToast('Insufficient balance for this bet amount', 'error')
      }
      return
    }

    setGameState(prev => ({ ...prev, isSpinning: true, lastResult: null }))

    // Simulate spin delay
    setTimeout(() => {
      const result = spinSlotMachine()
      const payout = result.isWin ? calculatePayout(gameState.currentBet, result.multiplier) : 0
      const newBalance = gameState.balance - gameState.currentBet + payout

      // Create bet record
      const bet: Bet = {
        betId: `bet_${Date.now()}`,
        userId: user.userId,
        amount: gameState.currentBet,
        timestamp: Date.now(),
        outcome: result,
        payout,
      }

      // Update state
      setGameState(prev => ({
        ...prev,
        isSpinning: false,
        balance: newBalance,
        lastResult: result,
        recentBets: [bet, ...prev.recentBets],
      }))

      // Save to storage
      updateUserBalance(newBalance)
      saveBet(bet)

      // Update user balance
      const updatedUser = { ...user, balance: newBalance }
      setUser(updatedUser)
      saveUser(updatedUser)
      
      // Show toast for big wins
      if (result.isWin && result.multiplier >= 15 && showToast) {
        showToast(`🎉 BIG WIN! You won ${payout} credits with a ${result.multiplier}x multiplier!`, 'success')
      }
    }, 2000)
  }

  const canSpin = user && !gameState.isSpinning && gameState.currentBet <= gameState.balance

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
          <span aria-hidden="true">🎰</span> Lucky Spin Casino
        </h1>
        <p className="text-sm sm:text-base text-muted">Spin to Win Real Crypto Rewards!</p>
      </motion.div>

      {/* Wallet Connection */}
      {!user ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card text-center space-y-4"
        >
          <h2 className="text-xl font-bold">Connect Your Wallet to Play</h2>
          <p className="text-muted">Connect your wallet to start spinning and winning crypto!</p>
          <WalletConnectButton onConnect={handleWalletConnect} />
        </motion.div>
      ) : (
        <>
          {/* Game Stats */}
          <GameStats balance={gameState.balance} recentBets={gameState.recentBets} />

          {/* Slot Machine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card space-y-6"
          >
            {/* Slot Reels */}
            <div className="flex justify-center gap-2 sm:gap-4" aria-label="Slot Machine Reels">
              {gameState.lastResult ? (
                gameState.lastResult.symbols.map((symbol, index) => (
                  <SlotReel
                    key={index}
                    symbol={symbol}
                    isSpinning={gameState.isSpinning}
                    delay={index * 200}
                    index={index}
                  />
                ))
              ) : (
                // Default symbols
                ['🍒', '🍋', '🍊'].map((symbol, index) => (
                  <SlotReel
                    key={index}
                    symbol={symbol}
                    isSpinning={gameState.isSpinning}
                    delay={index * 200}
                    index={index}
                  />
                ))
              )}
            </div>

            {/* Bet Input */}
            <BetInput
              value={gameState.currentBet}
              onChange={(value) => setGameState(prev => ({ ...prev, currentBet: value }))}
              max={gameState.balance}
              disabled={gameState.isSpinning}
            />

            {/* Spin Button */}
            <SpinButton
              onClick={handleSpin}
              disabled={!canSpin}
              isSpinning={gameState.isSpinning}
            />

            {/* Warning for insufficient balance */}
            {gameState.currentBet > gameState.balance && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-center text-sm"
              >
                Insufficient balance for this bet amount
              </motion.p>
            )}
          </motion.div>

          {/* Win/Loss Display */}
          {gameState.lastResult && (
            <WinLossDisplay
              result={gameState.lastResult}
              payout={gameState.lastResult.isWin ? calculatePayout(gameState.currentBet, gameState.lastResult.multiplier) : 0}
            />
          )}

          {/* Bet History */}
          <BetHistory bets={gameState.recentBets} />
        </>
      )}
    </div>
  )
}
