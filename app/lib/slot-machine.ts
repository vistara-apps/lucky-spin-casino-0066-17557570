
// Slot machine game logic
export const SLOT_SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '⭐']

export const SYMBOL_PAYOUTS = {
  '🍒': 2,
  '🍋': 3,
  '🍊': 4,
  '🍇': 5,
  '🔔': 8,
  '💎': 15,
  '7️⃣': 25,
  '⭐': 50,
}

export interface SlotResult {
  symbols: string[]
  isWin: boolean
  multiplier: number
}

export function spinSlotMachine(): SlotResult {
  // Generate 3 random symbols
  const symbols = Array.from({ length: 3 }, () => 
    SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]
  )

  // Check for wins
  const isWin = checkWin(symbols)
  const multiplier = isWin ? calculateMultiplier(symbols) : 0

  return {
    symbols,
    isWin,
    multiplier,
  }
}

function checkWin(symbols: string[]): boolean {
  // Three of a kind
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
    return true
  }
  
  // Two cherries (special case)
  if (symbols.filter(s => s === '🍒').length >= 2) {
    return true
  }

  return false
}

function calculateMultiplier(symbols: string[]): number {
  // Three of a kind
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
    return SYMBOL_PAYOUTS[symbols[0] as keyof typeof SYMBOL_PAYOUTS] || 1
  }
  
  // Two cherries
  if (symbols.filter(s => s === '🍒').length >= 2) {
    return 2
  }

  return 0
}

export function calculatePayout(betAmount: number, multiplier: number): number {
  return betAmount * multiplier
}
