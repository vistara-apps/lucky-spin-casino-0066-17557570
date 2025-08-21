'use client'

import { motion } from 'framer-motion'
import { Bet } from '../types'

interface BetHistoryProps {
  bets: Bet[]
}

export function BetHistory({ bets }: BetHistoryProps) {
  if (bets.length === 0) {
    return (
      <div className="card text-center text-muted">
        <p>No bets yet. Start spinning to see your history!</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card space-y-3"
    >
      <h3 className="text-lg font-bold text-primary" id="recent-spins-heading">Recent Spins</h3>
      
      <div 
        className="space-y-2 max-h-64 overflow-y-auto"
        aria-labelledby="recent-spins-heading"
        role="log"
      >
        {bets.slice(0, 10).map((bet) => (
          <motion.div
            key={bet.betId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex justify-between items-center p-2 sm:p-3 rounded-md border ${
              bet.outcome.isWin 
                ? 'border-primary/30 bg-primary/5' 
                : 'border-surface bg-surface/50'
            }`}
            aria-label={`Spin result: ${bet.outcome.isWin ? 'Win' : 'Loss'}`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex gap-1">
                {bet.outcome.symbols.map((symbol, index) => (
                  <span key={index} className="text-base sm:text-lg" aria-hidden="true">{symbol}</span>
                ))}
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-medium">Bet: {bet.amount}</p>
                {bet.outcome.isWin && (
                  <p className="text-primary text-xs">{bet.outcome.multiplier}x</p>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-bold text-sm sm:text-base ${
                bet.outcome.isWin ? 'text-primary' : 'text-red-400'
              }`}>
                {bet.outcome.isWin ? '+' : '-'}{bet.outcome.isWin ? bet.payout : bet.amount}
              </p>
              <p className="text-xs text-muted">
                {new Date(bet.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
