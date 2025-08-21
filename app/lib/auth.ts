
import { User } from '../types'

// Mock JWT auth for demonstration
export function generateMockJWT(walletAddress: string): string {
  const payload = {
    walletAddress,
    timestamp: Date.now(),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
  }
  
  // In production, use proper JWT signing
  return btoa(JSON.stringify(payload))
}

export function verifyMockJWT(token: string): { walletAddress: string } | null {
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null // Token expired
    }
    return { walletAddress: payload.walletAddress }
  } catch {
    return null
  }
}

export function createMockUser(walletAddress: string): User {
  return {
    userId: `user_${walletAddress.slice(-8)}`,
    walletAddress,
    jwtToken: generateMockJWT(walletAddress),
    balance: 1000, // Starting balance in wei equivalent
  }
}
