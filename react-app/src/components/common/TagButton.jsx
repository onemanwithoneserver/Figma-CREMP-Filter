import { useState, useId, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

export default function TagButton({
  label,
  selected = false,
  onClick,
  disabled = false,
  tooltip,
  showCheckbox = false,
  customClass = ''
}) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [mounted, setMounted] = useState(false)
  const tooltipId = useId()
  const buttonRef = useRef(null)

  const [position, setPosition] = useState({ top: 0, left: 0, placement: 'bottom', width: 'auto' })
  const tooltipRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    let top = rect.bottom + window.scrollY + 8;
    let left = rect.left + window.scrollX + rect.width / 2;
    let placement = 'bottom';
    const buttonWidth = rect.width;

    if (tooltipRef.current) {
      const tipRect = tooltipRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (tipRect.left < 4) {
        left += 4 - tipRect.left;
      } else if (tipRect.right > vw - 4) {
        left -= (tipRect.right - vw + 4);
      }

      if (tipRect.bottom > vh - 4) {
        const aboveTop = rect.top + window.scrollY - tipRect.height - 8;
        if (aboveTop > 4) {
          top = aboveTop;
          placement = 'top';
        }
      }
      
      if (placement === 'top' && tipRect.top < 4) {
        top = rect.bottom + window.scrollY + 8;
        placement = 'bottom';
      }
    }
    setPosition({ top, left, placement, width: buttonWidth });
  }, [])

  const handleMouseEnter = () => {
    setShowTooltip(true);
  }

  const handleFocus = () => {
    if (!disabled) {
      setShowTooltip(true);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowTooltip(false)
    }
  }

  useEffect(() => {
    if (!showTooltip) return;
    updatePosition();
    const handleResize = () => updatePosition();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [showTooltip, updatePosition]);

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      updatePosition();
    }
  }, [showTooltip, tooltip, updatePosition]);

  return (
    <div
      className={customClass.includes('w-full') ? 'block w-full' : 'inline-block'}
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
        className={`flex items-center gap-1.5 rounded-[4px] border px-2.5 py-1.5 text-[12px] transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-1
          ${disabled ? 'cursor-not-allowed opacity-40' : ''}
          ${selected
            ? 'border-[#C89B3C]/40 bg-gradient-to-br from-[#C89B3C]/15 to-[#C89B3C]/5 font-semibold text-[#7a5a1f] shadow-sm'
            : 'font-medium border-[#1C2A44]/15 bg-gradient-to-b from-[#1C2A44]/5 to-transparent text-[#1C2A44]/60 hover:border-[#1C2A44]/25 hover:text-[#1C2A44]'
          } ${customClass}`}
        data-selected={selected}
      >
        {showCheckbox && (
          <span className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border transition-all duration-200 ${
            selected
              ? 'border-transparent bg-[linear-gradient(135deg,#7a5a1f,#c89b3c)] shadow-sm'
              : 'border-[#1C2A44]/30 bg-white'
          }`}>
            {selected && (
              <span className="text-[9px] font-bold leading-none text-white">✓</span>
            )}
          </span>
        )}
        {label}
      </button>

      {mounted && tooltip && showTooltip && createPortal(
        <div
          id={tooltipId}
          ref={tooltipRef}
          role="tooltip"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateX(-50%)',
            position: 'absolute',
            maxWidth: Math.max(position.width, 120),
            width: 'max-content',
            wordBreak: 'break-word',
            zIndex: 99999
          }}
          className="pointer-events-none text-center rounded-[4px] bg-gradient-to-br from-[#1C2A44] to-[#253755] px-2 py-1.5 text-[11px] font-medium leading-relaxed text-white shadow-sm border border-[#1C2A44]/20"
        >
          <span>{tooltip}</span>
          {position.placement === 'bottom' ? (
            <div className="absolute left-1/2 bottom-full -mb-px -translate-x-1/2 border-[4px] border-transparent border-b-[#253755]"></div>
          ) : (
            <div className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-[4px] border-transparent border-t-[#253755]"></div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}