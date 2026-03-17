import { useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

export default function RadiusSlider({ value, onChange }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const sliderRef = useRef(null)

  const min = 1
  const max = 50
  const percentage = ((value - min) / (max - min)) * 100

  const updateTooltipPos = useCallback(() => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const thumbX = rect.left + (percentage / 100) * rect.width
      const thumbY = rect.top
      setTooltipPos({ x: thumbX, y: thumbY })
    }
  }, [percentage])

  return (
    <div className="flex w-full items-center gap-3">
      <div
        ref={sliderRef}
        className="relative flex-1 py-2"
        onMouseEnter={() => { setIsHovered(true); updateTooltipPos() }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={() => { if (isHovered || isActive) updateTooltipPos() }}
      >
        {/* Swapped Track to Brown fill and Grey unfilled */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onMouseDown={() => { setIsActive(true); updateTooltipPos() }}
          onMouseUp={() => setIsActive(false)}
          onTouchStart={() => { setIsActive(true); updateTooltipPos() }}
          onTouchEnd={() => setIsActive(false)}
          onChange={(e) => { onChange(Number(e.target.value)); requestAnimationFrame(updateTooltipPos) }}
          className="relative z-10 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none
            [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C89B3C] [&::-webkit-slider-thumb]:border-[2px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(200,155,60,0.3)] [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-90
            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#C89B3C] [&::-moz-range-thumb]:border-[2px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(200,155,60,0.3)]"
          style={{
            background: `linear-gradient(to right, #C89B3C 0%, #C89B3C ${percentage}%, rgba(255,255,255,0.12) ${percentage}%, rgba(255,255,255,0.12) 100%)`,
          }}
        />

        {/* Portal-based Floating Tooltip - FIXED AND VISIBLE AT DOCUMENT.BODY */}
        {createPortal(
          (isHovered || isActive) && (
            <div
              className="pointer-events-none fixed z-[9999] -translate-x-1/2 animate-in fade-in zoom-in-95 duration-200"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y - 20}px`,
              }}
            >
              <div className="relative rounded-[8px] bg-[#C89B3C] px-2.5 py-1 text-[12px] font-bold tracking-wide text-white shadow-lg">
                {value} km
                {/* Tooltip Triangle */}
                <div className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-sm bg-[#C89B3C]" />
              </div>
            </div>
          ),
          document.body
        )}
      </div>

      {/* Distance Label - Solid Brown Text */}
      <div className="flex min-w-[44px] items-baseline justify-end gap-1 text-right">
        <span className="text-[13px] font-bold tabular-nums text-white">{value}</span>
        <span className="text-[11px] font-medium text-white/60">km</span>
      </div>
    </div>
  )
}