
import { User, Bet } from '../types'

// Mock storage using localStorage for demonstration
const STORAGE_KEYS = {
  USER: 'lucky_spin_user',
  BETS: 'lucky_spin_bets',
}

export function saveUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  }
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.USER)
    return stored ? JSON.parse(stored) : null
  }
  return null
}

export function updateUserBalance(newBalance: number): void {
  const user = getUser()
  if (user) {
    user.balance = newBalance
    saveUser(user)
  }
}

export function saveBet(bet: Bet): void {
  if (typeof window !== 'undefined') {
    const bets = getBets()
    bets.unshift(bet) // Add to beginning
    localStorage.setItem(STORAGE_KEYS.BETS, JSON.stringify(bets.slice(0, 50))) // Keep last 50
  }
}

export function getBets(): Bet[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.BETS)
    return stored ? JSON.parse(stored) : []
  }
  return []
}

export function clearStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.BETS)
  }
}
