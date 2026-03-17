import { useState, useRef, useEffect } from 'react'
import { BUSINESS_CATEGORY_OPTIONS } from '../common/filterOptions'

export default function BusinessCategoryFilter({ selected, onToggle }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const label =
    selected.length === 0
      ? 'Select categories…'
      : selected.length === 1
      ? selected[0]
      : `${selected.length} categories selected`

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-[5px] border px-2.5 py-1.5 text-[11px] transition-all ${
          open
            ? 'border-[#C89B3C]/50 bg-white text-[#1C2A44]'
            : 'border-[#1C2A44]/10 bg-[#F5F7FA] text-[#4A5568] hover:border-[#1C2A44]/20'
        }`}
      >
        <span className={selected.length > 0 ? 'text-[#1C2A44] font-medium' : ''}>{label}</span>
        <span
          className={`text-[10px] transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          style={{ display: 'inline-block' }}
        >
          ▾
        </span>
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="rounded-[6px] border border-[#1C2A44]/10 bg-white shadow-md">
          {BUSINESS_CATEGORY_OPTIONS.map((cat) => {
            const isSelected = selected.includes(cat)
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onToggle(cat)}
                className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[11px] transition-colors first:rounded-t-[6px] last:rounded-b-[6px] ${
                  isSelected
                    ? 'bg-[#C89B3C]/10 text-[#C89B3C] font-semibold'
                    : 'text-[#1C2A44] hover:bg-[#F5F7FA]'
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
            )
          })}
        </div>
      )}

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-1 rounded-full bg-[#C89B3C]/15 px-2 py-0.5 text-[10px] font-medium text-[#C89B3C]"
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
