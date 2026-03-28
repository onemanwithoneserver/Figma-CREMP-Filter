// BudgetTabs component for budget mode switching
export function BudgetTabs({ mode, onModeChange, perLabel, overallLabel }) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-[4px] border border-[#1C2A44]/10 bg-[#1C2A44]/5 p-0.5 shadow-sm">
      <button
        type="button"
        onClick={() => onModeChange('per')}
        className={`rounded-[3px] px-3 py-1 text-[11px] font-semibold transition-all duration-200 ${
          mode === 'per'
            ? 'bg-[#1C2A44] text-white shadow-sm'
            : 'text-[#1C2A44]/60 hover:text-[#1C2A44]'
        }`}
      >
        {perLabel}
      </button>
      <button
        type="button"
        onClick={() => onModeChange('overall')}
        className={`rounded-[3px] px-3 py-1 text-[11px] font-semibold transition-all duration-200 ${
          mode === 'overall'
            ? 'bg-[#1C2A44] text-white shadow-sm'
            : 'text-[#1C2A44]/60 hover:text-[#1C2A44]'
        }`}
      >
        {overallLabel}
      </button>
    </div>
  )
}
import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

const DEFAULT_BUDGET_OPTIONS = [
  { label: '₹10L', value: '10' },
  { label: '₹20L', value: '20' },
  { label: '₹30L', value: '30' },
  { label: '₹40L', value: '40' },
  { label: '₹50L', value: '50' },
  { label: '₹75L', value: '75' },
  { label: '₹1Cr', value: '100' },
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
        top: rect.bottom + 4,
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
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-[4px] border bg-gradient-to-b from-white to-[#F9FAFB] px-2.5 py-1.5 text-[13px] font-medium transition-all duration-200 focus:outline-none ${
          open
            ? 'border-[#1C2A44]/30 shadow-sm ring-1 ring-[#1C2A44]/10'
            : 'border-[#1C2A44]/10 shadow-sm hover:border-[#1C2A44]/20'
        }`}
      >
        <span className={selected ? 'text-[#1C2A44]' : 'text-[#1C2A44]/50 font-normal'}>
          {selected ? selected.label : placeholder}
        </span>
      </button>

      {open && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            width: pos.width,
          }}
          className="z-[9999] overflow-hidden rounded-[4px] border border-[#1C2A44]/10 bg-white/95 shadow-sm backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <ul className="custom-scrollbar max-h-48 overflow-y-auto p-1">
            <li>
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={`flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-[12px] transition-colors duration-150 ${
                  !value
                    ? 'bg-gradient-to-r from-[#1C2A44]/5 to-transparent font-medium text-[#1C2A44]'
                    : 'text-[#1C2A44]/60 hover:bg-gradient-to-r hover:from-[#1C2A44]/5 hover:to-transparent hover:text-[#1C2A44]'
                }`}
              >
                <span className="w-3" />
                {placeholder}
              </button>
            </li>

            {options.map((option) => {
              const isActive = option.value === value
              return (
                <li key={`${option.label}-${option.value}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-[12px] font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#1C2A44]/10 to-transparent text-[#1C2A44]'
                        : 'text-[#1C2A44]/60 hover:bg-gradient-to-r hover:from-[#1C2A44]/5 hover:to-transparent hover:text-[#1C2A44]'
                    }`}
                  >
                    <span
                      className={`shrink-0 text-[10px] leading-none transition-opacity duration-200 ${
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
  perLabel = 'Per sq.ft',
  overallLabel = 'Total',
  options = DEFAULT_BUDGET_OPTIONS,
  perOptions,
  overallOptions,
}) {
  const activeOptions = mode === 'overall' ? overallOptions ?? options : perOptions ?? options

  return (
    <div className="pt-1.5 pb-1">
      <div className="mb-2.5 inline-flex items-center gap-0.5 rounded-[4px] border border-[#1C2A44]/10 bg-gradient-to-br from-[#1C2A44]/5 to-[#1C2A44]/5 p-0.5 shadow-sm">
        <button
          type="button"
          onClick={() => onModeChange('per')}
          className={`rounded-[3px] px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200 ${
            mode === 'per'
              ? 'bg-gradient-to-br from-[#1C2A44] to-[#253755] text-white shadow-sm'
              : 'text-[#1C2A44]/60 hover:bg-white/50 hover:text-[#1C2A44]'
          }`}
        >
          {perLabel}
        </button>
        <button
          type="button"
          onClick={() => onModeChange('overall')}
          className={`rounded-[3px] px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200 ${
            mode === 'overall'
              ? 'bg-gradient-to-br from-[#1C2A44] to-[#253755] text-white shadow-sm'
              : 'text-[#1C2A44]/60 hover:bg-white/50 hover:text-[#1C2A44]'
          }`}
        >
          {overallLabel === 'Overall Budget' ? 'Investment' : overallLabel}
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <StyledSelect
          value={min}
          onChange={onMinChange}
          placeholder="Min"
          options={activeOptions}
        />

        <div className="h-px w-2 shrink-0 bg-[#1C2A44]/20 rounded-full"></div>

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