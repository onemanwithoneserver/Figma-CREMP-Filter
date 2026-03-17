import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Check } from 'lucide-react'

const DEFAULT_BUDGET_OPTIONS = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '75', value: '75' },
  { label: '100', value: '100' },
]

function StyledSelect({ value, onChange, placeholder, options }) {
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
        className={`flex w-full items-center justify-between rounded-[5px] border bg-white p-2 text-[13px] font-medium transition-all duration-300 focus:outline-none ${
          open
            ? 'border-[#1E1E1E]/30 shadow-sm ring-2 ring-[#1E1E1E]/5'
            : 'border-[#1E1E1E]/10 hover:border-[#1E1E1E]/20 hover:bg-[#FFFFFF]'
        }`}
      >
        <span className={selected ? 'text-[#1E1E1E]' : 'text-[#1E1E1E]/50 font-light'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180 text-[#1E1E1E]' : 'text-[#1E1E1E]/40'
          }`}
        />
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
          className="z-[9999] overflow-hidden rounded-[5px] border border-[#1E1E1E]/10 bg-white/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(30,30,30,0.12)] animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <ul className="custom-scrollbar max-h-48 overflow-y-auto p-1">
            {/* Reset / placeholder option */}
            <li>
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={`flex w-full items-center gap-2 rounded-[5px] p-2 text-[12px] transition-colors duration-200 ${
                  !value
                    ? 'bg-[#1E1E1E]/5 font-medium text-[#1E1E1E]'
                    : 'text-[#1E1E1E]/60 hover:bg-[#1E1E1E]/5 hover:text-[#1E1E1E]'
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
                <li key={`${option.label}-${option.value}`} className="mt-1">
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center gap-2 rounded-[5px] p-2 text-[13px] font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-[#1E1E1E] text-white shadow-sm' // Selected rule: Brown bg, white text
                        : 'text-[#1E1E1E]/80 hover:bg-[#1E1E1E]/5 hover:text-[#1E1E1E]'
                    }`}
                  >
                    <Check
                      size={14}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      className={`shrink-0 transition-opacity duration-200 ${
                        isActive ? 'opacity-100 text-white' : 'opacity-0'
                      }`}
                    />
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
    <div className="pt-1">
      {/* Segmented Control - Tab Rules Applied */}
      <div className="mb-3 inline-flex items-center gap-1 rounded-[5px] border border-[#1E1E1E]/10 bg-[#FFFFFF] p-1 shadow-sm">
        <button
          type="button"
          onClick={() => onModeChange('per')}
          className={`rounded-[5px] px-3 py-1.5 text-[12px] font-medium tracking-wide transition-all duration-300 ${
            mode === 'per'
              ? 'bg-[#1E1E1E] text-white shadow-md scale-[0.98]' // Selected Rule: Brown bg, white text
              : 'text-[#4B4B4B] hover:bg-[#1E1E1E]/5 hover:text-[#1E1E1E]'
          }`}
        >
          {perLabel}
        </button>
        <button
          type="button"
          onClick={() => onModeChange('overall')}
          className={`rounded-[5px] px-3 py-1.5 text-[12px] font-medium tracking-wide transition-all duration-300 ${
            mode === 'overall'
              ? 'bg-[#1E1E1E] text-white shadow-md scale-[0.98]' // Selected Rule: Brown bg, white text
              : 'text-[#4B4B4B] hover:bg-[#1E1E1E]/5 hover:text-[#1E1E1E]'
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
        <div className="h-px w-3 shrink-0 bg-[#1E1E1E]/20 rounded-full"></div>
        
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