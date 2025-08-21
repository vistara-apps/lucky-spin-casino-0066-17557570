'use client'

import { useState } from 'react'

interface BetInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  disabled?: boolean
}

export function BetInput({ value, onChange, min = 1, max = 1000, disabled }: BetInputProps) {
  const [inputValue, setInputValue] = useState(value.toString())

  const handleIncrement = () => {
    const newValue = Math.min(value + 10, max)
    onChange(newValue)
    setInputValue(newValue.toString())
  }

  const handleDecrement = () => {
    const newValue = Math.max(value - 10, min)
    onChange(newValue)
    setInputValue(newValue.toString())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    const numValue = parseInt(newValue) || min
    if (numValue >= min && numValue <= max) {
      onChange(numValue)
    }
  }

  const presetAmounts = [10, 25, 50, 100]

  return (
    <div className="space-y-3">
      <label htmlFor="bet-amount" className="block text-sm font-medium text-muted">Bet Amount</label>
      
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => {
              onChange(amount)
              setInputValue(amount.toString())
            }}
            disabled={disabled}
            className={`btn-secondary text-xs px-2 py-1 sm:px-3 sm:py-1 ${
              value === amount ? 'bg-primary text-black' : ''
            }`}
            aria-label={`Set bet to ${amount}`}
            aria-pressed={value === amount}
          >
            {amount}
          </button>
        ))}
      </div>

      {/* Input with steppers */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          className="btn-secondary px-2 py-1 sm:px-3 sm:py-2 disabled:opacity-50"
          aria-label="Decrease bet amount"
        >
          <span aria-hidden="true">-</span>
        </button>
        
        <input
          id="bet-amount"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          min={min}
          max={max}
          className="input-field flex-1 text-center text-sm sm:text-base"
          placeholder="Enter bet amount"
          aria-label="Bet amount"
        />
        
        <button
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          className="btn-secondary px-2 py-1 sm:px-3 sm:py-2 disabled:opacity-50"
          aria-label="Increase bet amount"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
      
      {/* Max bet indicator */}
      <div className="text-xs text-muted text-right">
        Max bet: {max}
      </div>
    </div>
  )
}
