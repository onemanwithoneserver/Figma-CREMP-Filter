import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function RadiusSlider({ value, onChange }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const sliderRef = useRef(null)

  const min = 1
  const max = 50
  const percentage = ((value - min) / (max - min)) * 100

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateTooltipPos = useCallback(() => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const thumbX = rect.left + (percentage / 100) * rect.width
      const thumbY = rect.top
      setTooltipPos({ x: thumbX, y: thumbY })
    }
  }, [percentage])

  return (
    <div className="flex w-full items-center gap-2">
      <div
        ref={sliderRef}
        className="relative flex-1 py-2"
        onMouseEnter={() => { setIsHovered(true); updateTooltipPos() }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={() => { if (isHovered || isActive) updateTooltipPos() }}
      >
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
          className="relative z-10 h-1.5 w-full cursor-pointer appearance-none rounded-[4px] outline-none
            [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[4px] [&::-webkit-slider-thumb]:bg-[linear-gradient(135deg,#7a5a1f,#c89b3c)] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white/80 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-95
            [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-[4px] [&::-moz-range-thumb]:bg-[linear-gradient(135deg,#7a5a1f,#c89b3c)] [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-white/80 [&::-moz-range-thumb]:shadow-sm"
          style={{
            background: `linear-gradient(to right, #7a5a1f 0%, #c89b3c ${percentage}%, rgba(28,42,68,0.10) ${percentage}%, rgba(28,42,68,0.10) 100%)`,
          }}
        />

        {mounted && createPortal(
          (isHovered || isActive) && (
            <div
              className="pointer-events-none fixed z-[9999] -translate-x-1/2 animate-in fade-in zoom-in-95 duration-200"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y - 20}px`,
              }}
            >
              <div className="relative rounded-[4px] bg-gradient-to-br from-[#1C2A44] to-[#253755] px-2 py-1 text-[11px] font-bold tracking-wide text-white shadow-sm border border-[#1C2A44]/20">
                {value} km
                <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 rounded-[1px] bg-[#253755] border-b border-r border-[#1C2A44]/20" />
              </div>
            </div>
          ),
          document.body
        )}
      </div>

      <div className="flex min-w-10 items-baseline justify-end gap-1 text-right">
        <span className="text-[13px] font-bold tabular-nums text-[#1C2A44]">{value}</span>
        <span className="text-[11px] font-medium text-[#1C2A44]/50">km</span>
      </div>
    </div>
  )
}