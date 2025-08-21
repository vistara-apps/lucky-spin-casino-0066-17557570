
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

export function SlotMachine() {
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
    const newUser = createMockUser(address)
    setUser(newUser)
    saveUser(newUser)
    setGameState(prev => ({
      ...prev,
      balance: newUser.balance,
    }))
  }

  const handleSpin = async () => {
    if (!user || gameState.isSpinning || gameState.currentBet > gameState.balance) {
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
        <h1 className="display-text text-primary mb-2">🎰 Lucky Spin Casino</h1>
        <p className="body-text text-muted">Spin to Win Real Crypto Rewards!</p>
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
            <div className="flex justify-center gap-4">
              {gameState.lastResult ? (
                gameState.lastResult.symbols.map((symbol, index) => (
                  <SlotReel
                    key={index}
                    symbol={symbol}
                    isSpinning={gameState.isSpinning}
                    delay={index * 200}
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
