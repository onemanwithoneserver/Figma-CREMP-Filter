import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

const DEFAULT_BUDGET_OPTIONS = [
  { label: 'â‚¹10L', value: '10' },
  { label: 'â‚¹20L', value: '20' },
  { label: 'â‚¹30L', value: '30' },
  { label: 'â‚¹40L', value: '40' },
  { label: 'â‚¹50L', value: '50' },
  { label: 'â‚¹75L', value: '75' },
  { label: 'â‚¹1Cr', value: '100' },
]

export function StyledSelect({ value, onChange, placeholder, options }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })

  const selected = options.find((o) => o.value === value)

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPos({
        top: rect.bottom + 4, // Tightened gap for premium feel
        left: rect.left,
        width: rect.width,
      })
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open) {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [open, updatePosition])

  function handleSelect(val) {
    onChange(val)
    setOpen(false)
  }

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none ${
          open
            ? 'border-[#1C2A44]/22 shadow-sm ring-2 ring-[#1C2A44]/12'
            : 'border-[#1C2A44]/10 hover:border-[#1C2A44]/18 hover:bg-[#1C2A44]/3'
        }`}
      >
        <span className={selected ? 'text-[#1C2A44]' : 'text-[#1C2A44]/40 font-light'}>
          {selected ? selected.label : placeholder}
        </span>
      </button>

      {/* Dropdown via Portal */}
      {open && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            width: pos.width,
          }}
          className="z-9999 overflow-hidden rounded-lg border border-[#1C2A44]/10 bg-white/98 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.10)] animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <ul className="custom-scrollbar max-h-48 overflow-y-auto p-1">
            {/* Reset / placeholder option */}
            <li>
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors duration-150 ${
                  !value
                    ? 'bg-[#1C2A44]/5 font-semibold text-[#1C2A44]'
                    : 'text-[#1C2A44]/50 hover:bg-[#1C2A44]/4 hover:text-[#1C2A44]'
                }`}
              >
                <span className="w-3" />
                {placeholder}
              </button>
            </li>

            {/* Options */}
            {options.map((option) => {
              const isActive = option.value === value
              return (
                <li key={`${option.label}-${option.value}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#1C2A44]/10 text-[#1C2A44] shadow-sm'
                        : 'text-[#1C2A44]/55 hover:bg-[#1C2A44]/4 hover:text-[#1C2A44]'
                    }`}
                  >
                    <span
                      className={`shrink-0 text-[13px] leading-none transition-opacity duration-200 ${
                        isActive ? 'opacity-100 text-[#1C2A44]' : 'opacity-0'
                      }`}
                    >✓</span>
                    {option.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>,
        document.body
      )}
    </div>
  )
}

export default function BudgetFilter({
  mode,
  min,
  max,
  onModeChange,
  onMinChange,
  onMaxChange,
    perLabel = 'Price per sq.ft',
    overallLabel = 'Total Investment',
  options = DEFAULT_BUDGET_OPTIONS,
  perOptions,
  overallOptions,
}) {
  const activeOptions = mode === 'overall' ? overallOptions ?? options : perOptions ?? options

  return (
    <div className="pt-2">
      {/* Segmented Control */}
      <div className="mb-3 inline-flex items-center gap-1 rounded-lg border border-[#1C2A44]/10 bg-[#1C2A44]/3 p-1 shadow-sm">
        <button
          type="button"
          onClick={() => onModeChange('per')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
            mode === 'per'
              ? 'bg-[#1C2A44] text-white shadow-sm'
              : 'text-[#1C2A44]/55 hover:bg-[#1C2A44]/6 hover:text-[#1C2A44]'
          }`}
        >
          {perLabel}
        </button>
        <button
          type="button"
          onClick={() => onModeChange('overall')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
            mode === 'overall'
              ? 'bg-[#1C2A44] text-white shadow-sm'
              : 'text-[#1C2A44]/55 hover:bg-[#1C2A44]/6 hover:text-[#1C2A44]'
          }`}
        >
          {overallLabel === 'Overall Budget' ? 'Total Investment' : overallLabel}
        </button>
      </div>

      {/* Min/Max Inputs */}
      <div className="flex items-center gap-2">
        <StyledSelect 
          value={min} 
          onChange={onMinChange} 
          placeholder="Min" 
          options={activeOptions} 
        />
        
        {/* Softened separator line */}
        <div className="h-px w-3 shrink-0 bg-[#1C2A44]/20 rounded-full"></div>
        
        <StyledSelect 
          value={max} 
          onChange={onMaxChange} 
          placeholder="Max" 
          options={activeOptions} 
        />
      </div>
    </div>
  )
}