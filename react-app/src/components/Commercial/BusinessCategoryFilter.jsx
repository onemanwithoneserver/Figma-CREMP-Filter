import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BUSINESS_CATEGORY_OPTIONS } from '../common/filterOptions'

export default function BusinessCategoryFilter({ selected, onToggle }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })

  const label =
    selected.length === 0
      ? 'Select categories…'
      : selected.length === 1
      ? selected[0]
      : `${selected.length} categories selected`

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 4, left: rect.left, width: rect.width })
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
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

  return (
    <div className="flex flex-col gap-1">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-[5px] border bg-white p-2 text-[13px] font-medium transition-all duration-300 focus:outline-none ${
          open
            ? 'border-[#1C2A44]/20 shadow-sm ring-2 ring-[#1C2A44]/15'
            : 'border-[#1C2A44]/10 hover:border-[#1C2A44]/18 hover:bg-[#1C2A44]/5'
        }`}
      >
        <span className={selected.length > 0 ? 'text-[#1C2A44]' : 'font-light text-[#1C2A44]/40'}>
          {label}
        </span>
        <span
          className={`shrink-0 text-[12px] leading-none inline-block transition-transform duration-300 ${
            open ? 'rotate-180 text-[#1C2A44]' : 'text-[#1C2A44]/35'
          }`}
        >▾</span>
      </button>

      {/* Portal Dropdown */}
      {open && createPortal(
        <div
          ref={dropdownRef}
          style={{ position: 'fixed', top: pos.top, left: pos.left, width: pos.width }}
          className="z-9999 overflow-hidden rounded-[5px] border border-[#1C2A44]/10 bg-white/98 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.10)] animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <ul className="custom-scrollbar max-h-48 overflow-y-auto p-1">
            {BUSINESS_CATEGORY_OPTIONS.map((cat) => {
              const isSelected = selected.includes(cat)
              return (
                <li key={cat} className="mt-1 first:mt-0">
                  <button
                    type="button"
                    onClick={() => onToggle(cat)}
                    className={`flex w-full items-center gap-2 rounded-[5px] p-2 text-[13px] font-medium transition-colors duration-200 ${
                      isSelected
                        ? 'bg-[#1C2A44]/12 text-[#1C2A44]'
                        : 'text-[#1C2A44]/55 hover:bg-[#1C2A44]/5 hover:text-[#1C2A44]'
                    }`}
                  >
                    <span
                      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border transition-all ${
                        isSelected ? 'border-[#C89B3C] bg-[#C89B3C]' : 'border-[#1C2A44]/25 bg-white'
                      }`}
                    >
                      {isSelected && <span className="text-[8px] font-bold leading-none text-white">✓</span>}
                    </span>
                    {cat}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>,
        document.body
      )}

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-1 rounded-[5px] bg-[#C89B3C]/15 px-2 py-0.5 text-[10px] font-medium text-[#C89B3C]"
            >
              {cat}
              <button
                type="button"
                onClick={() => onToggle(cat)}
                className="leading-none text-[#C89B3C]/70 hover:text-[#C89B3C]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
