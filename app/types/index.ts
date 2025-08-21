
export interface User {
  userId: string
  walletAddress: string
  jwtToken: string
  balance: number
}

export interface Bet {
  betId: string
  userId: string
  amount: number
  timestamp: number
  outcome: SlotResult
  payout: number
}

export interface SlotResult {
  symbols: string[]
  isWin: boolean
  multiplier: number
}

export interface GameState {
  isSpinning: boolean
  currentBet: number
  balance: number
  lastResult: SlotResult | null
  recentBets: Bet[]
}
