import { useState, useId, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function TagButton({ label, selected = false, onClick, disabled = false, tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [mounted, setMounted] = useState(false)
  const tooltipId = useId()
  const buttonRef = useRef(null)

  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + (rect.width / 2),
      })
    }
  }

  const handleMouseEnter = () => {
    updatePosition()
    setShowTooltip(true)
  }

  const handleFocus = () => {
    if (!disabled) {
      updatePosition()
      setShowTooltip(true)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowTooltip(false)
    }
  }

  return (
    <div
      className="inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={() => setShowTooltip(false)}
        onKeyDown={handleKeyDown}
        aria-describedby={tooltip && showTooltip ? tooltipId : undefined}

        className={`inline-flex items-center rounded-sm border px-3 py-1 text-xs font-medium tracking-wide transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-1
          ${disabled ? 'cursor-not-allowed opacity-40' : ''}
          ${selected
            ? 'border-[#C89B3C]/45 bg-[#C89B3C]/10 text-[#B88A2C] font-semibold shadow-[inset_0_0_0_1px_rgba(200,155,60,0.25)]'
            : 'border-[#1C2A44]/10 bg-[#1C2A44]/4 text-[#1C2A44]/60 hover:border-[#1C2A44]/20 hover:bg-[#1C2A44]/7 hover:text-[#1C2A44]'
          }`}
        data-selected={selected}
      >
        {label}
      </button>

      {/* The Tooltip Box */}
      {mounted && tooltip && showTooltip && createPortal(
        <div
          id={tooltipId}
          role="tooltip"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateX(-50%)',
          }}
          // CHANGED: Removed whitespace-nowrap & min-w-max. 
          // ADDED: w-48 (fixed width of 192px) and text-center to allow multiline wrapping.
          className="pointer-events-none absolute z-[99999] w-48 text-center rounded bg-[#1C2A44] px-3 py-2 text-xs font-normal leading-relaxed text-white shadow-lg animate-in fade-in duration-200"
        >
          <span>{tooltip}</span>
          <div className="absolute left-1/2 bottom-full -mb-px -translate-x-1/2 border-4 border-transparent border-b-[#1C2A44]"></div>
        </div>,
        document.body
      )}
    </div>
  )
}