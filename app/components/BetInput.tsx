
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
      <label className="block text-sm font-medium text-muted">Bet Amount</label>
      
      {/* Preset buttons */}
      <div className="flex gap-2">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => {
              onChange(amount)
              setInputValue(amount.toString())
            }}
            disabled={disabled}
            className={`btn-secondary text-xs px-3 py-1 ${
              value === amount ? 'bg-primary text-black' : ''
            }`}
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
          className="btn-secondary px-3 py-2 disabled:opacity-50"
        >
          -
        </button>
        
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          min={min}
          max={max}
          className="input-field flex-1 text-center"
          placeholder="Enter bet amount"
        />
        
        <button
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          className="btn-secondary px-3 py-2 disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  )
}
