
'use client'

import { motion } from 'framer-motion'
import { Bet } from '../types'

interface GameStatsProps {
  balance: number
  recentBets: Bet[]
}

export function GameStats({ balance, recentBets }: GameStatsProps) {
  const totalWagered = recentBets.reduce((sum, bet) => sum + bet.amount, 0)
  const totalWon = recentBets.reduce((sum, bet) => sum + bet.payout, 0)
  const winRate = recentBets.length > 0 
    ? (recentBets.filter(bet => bet.outcome.isWin).length / recentBets.length * 100).toFixed(1)
    : '0'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card space-y-4"
    >
      <h3 className="text-lg font-bold text-primary">Game Stats</h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <p className="text-muted">Balance</p>
          <p className="text-xl font-bold text-primary">{balance}</p>
        </div>
        
        <div className="text-center">
          <p className="text-muted">Win Rate</p>
          <p className="text-xl font-bold">{winRate}%</p>
        </div>
        
        <div className="text-center">
          <p className="text-muted">Total Wagered</p>
          <p className="font-semibold">{totalWagered}</p>
        </div>
        
        <div className="text-center">
          <p className="text-muted">Total Won</p>
          <p className="font-semibold text-primary">{totalWon}</p>
        </div>
      </div>
    </motion.div>
  )
}
