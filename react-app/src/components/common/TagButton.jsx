import { useState, useId, useRef, useEffect } from 'react'
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

  const [position, setPosition] = useState({ top: 0, left: 0, placement: 'bottom' })
  const tooltipRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    let top = rect.bottom + window.scrollY + 8;
    let left = rect.left + window.scrollX + rect.width / 2;
    let placement = 'bottom';

    // If tooltip is rendered, check for overflow
    if (tooltipRef.current) {
      const tipRect = tooltipRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Horizontal overflow
      if (tipRect.left < 4) {
        left += 4 - tipRect.left;
      } else if (tipRect.right > vw - 4) {
        left -= (tipRect.right - vw + 4);
      }

      // Vertical overflow (bottom)
      if (tipRect.bottom > vh - 4) {
        // Try placing above
        const aboveTop = rect.top + window.scrollY - tipRect.height - 8;
        if (aboveTop > 4) {
          top = aboveTop;
          placement = 'top';
        }
      }
      // Vertical overflow (top)
      if (placement === 'top' && tipRect.top < 4) {
        // fallback to bottom
        top = rect.bottom + window.scrollY + 8;
        placement = 'bottom';
      }
    }
    setPosition({ top, left, placement });
  }

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

  // Recalculate position when tooltip is shown or window resizes
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
    // eslint-disable-next-line
  }, [showTooltip]);

  // Recalculate after tooltip renders
  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      updatePosition();
    }
    // eslint-disable-next-line
  }, [showTooltip, tooltip]);

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
       
        className={`flex items-center gap-2 rounded-[4px] border px-2 py-2  text-xs transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] focus-visible:ring-offset-1
          ${disabled ? 'cursor-not-allowed opacity-40' : ''}
          ${selected
            ? 'border-[#C89B3C]/45 bg-[#C89B3C]/10 text-[#B88A2C] font-semibold'
            : 'font-medium border-[#1C2A44]/10 bg-[#1C2A44]/[0.04] text-[#1C2A44]/60 hover:border-[#1C2A44]/18 hover:bg-[#1C2A44]/[0.07] hover:text-[#1C2A44]'
          } ${customClass}`}
        data-selected={selected}
      >
        {showCheckbox && (
          <span className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border transition-all ${selected
            ? 'border-[#C89B3C] bg-[#C89B3C]'
            : 'border-[#1C2A44]/30 bg-white'
            }`}>
            {selected && (
              <span className="text-[8px] font-bold leading-none text-white">✓</span>
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
            maxWidth: '90vw',
            minWidth: '120px',
            wordBreak: 'break-word',
            zIndex: 99999
          }}
          className="pointer-events-none text-center rounded bg-[#1C2A44] px-3 py-2 text-xs font-normal leading-relaxed text-white shadow-lg animate-in fade-in duration-200"
        >
          <span>{tooltip}</span>
          {position.placement === 'bottom' ? (
            <div className="absolute left-1/2 bottom-full -mb-px -translate-x-1/2 border-4 border-transparent border-b-[#1C2A44]"></div>
          ) : (
            <div className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-4 border-transparent border-t-[#1C2A44]"></div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}