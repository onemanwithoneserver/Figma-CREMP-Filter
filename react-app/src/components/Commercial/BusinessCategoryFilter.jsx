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
    <div className="flex flex-col gap-1.5">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-[200px] items-center justify-between rounded-[4px] border bg-gradient-to-b from-white to-[#F9FAFB] px-2.5 py-1.5 text-[13px] font-medium transition-all duration-200 focus:outline-none ${
          open
            ? 'border-[#1C2A44]/30 shadow-sm ring-1 ring-[#1C2A44]/10'
            : 'border-[#1C2A44]/10 shadow-sm hover:border-[#1C2A44]/20'
        }`}
      >
        <span className={selected.length > 0 ? 'text-[#1C2A44]' : 'font-normal text-[#1C2A44]/50'}>
          {label}
        </span>
      </button>

      {open && createPortal(
        <div
          ref={dropdownRef}
          style={{ position: 'fixed', top: pos.top, left: pos.left, width: pos.width }}
          className="z-[9999] overflow-hidden rounded-[4px] border border-[#1C2A44]/10 bg-white/95 shadow-sm backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <ul className="custom-scrollbar max-h-48 overflow-y-auto p-1">
            {BUSINESS_CATEGORY_OPTIONS.map((cat) => {
              const isSelected = selected.includes(cat)
              return (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onToggle(cat)}
                    className={`flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-[12px] font-medium transition-colors duration-150 hover:bg-gradient-to-r hover:from-[#1C2A44]/5 hover:to-transparent hover:text-[#1C2A44] ${
                      isSelected ? 'text-[#1C2A44]' : 'text-[#1C2A44]/60'
                    }`}
                  >
                    <span
                      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border transition-all ${
                        isSelected
                          ? 'border-transparent bg-[linear-gradient(135deg,#7a5a1f,#c89b3c)] shadow-sm'
                          : 'border-[#1C2A44]/20 bg-white'
                      }`}
                    >
                      {isSelected && <span className="text-[9px] font-bold leading-none text-white">✓</span>}
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

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-1.5 rounded-[4px] border border-[#C89B3C]/20 bg-gradient-to-br from-[#C89B3C]/10 to-[#C89B3C]/5 px-1.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5a1f]"
            >
              {cat}
              <button
                type="button"
                onClick={() => onToggle(cat)}
                className="flex h-3.5 w-3.5 items-center justify-center rounded-[2px] text-[12px] leading-none text-[#7a5a1f]/60 transition-colors hover:bg-[#C89B3C]/20 hover:text-[#7a5a1f]"
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