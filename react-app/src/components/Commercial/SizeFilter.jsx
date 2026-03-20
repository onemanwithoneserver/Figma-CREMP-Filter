
import { useState } from 'react'

export default function SizeFilter({
  landMin,
  landMax,
  onLandMinChange,
  onLandMaxChange,
  buaMin,
  buaMax,
  onBuaMinChange,
  onBuaMaxChange,
  selectedTypes = [],  // drives which fields show
  isMobile = false,
  isDesktopView = false,
}) {
  const [landUnit, setLandUnit] = useState('sqyd')  // 'sqyd' | 'acre'

  const showLand = true
  const showBua = true

  const bothVisible = showLand && showBua
  const layoutClass = isDesktopView
    ? bothVisible
      ? 'grid grid-cols-[1fr_auto_1fr] items-start gap-2.5'
      : 'block'
    : isMobile
    ? 'grid grid-cols-1 gap-2'
    : 'grid gap-2 lg:grid-cols-2'

  const unitBtn = (unit, label) =>
    `px-2 py-1 rounded-sm text-[11px] font-semibold border transition-all ${
      landUnit === unit
        ? 'bg-[#C89B3C] border-[#C89B3C] text-white'
        : 'bg-white border-[#1C2A44]/15 text-[#1C2A44]/50 hover:border-[#1C2A44]/25 hover:text-[#1C2A44]'
    }`

  const landPlaceholder = landUnit === 'acre'
    ? { min: 'Min (acres)', max: 'Max (acres)' }
    : { min: 'Min (sq yd)', max: 'Max (sq yd)' }

  return (
    <div className={layoutClass}>
      {showLand && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1C2A44]">
              📌 Land Area
            </div>
            <div className="flex gap-0.5">
              <button
                type="button"
                onClick={() => setLandUnit('sqyd')}
                className={unitBtn('sqyd', 'Sq Yd')}
              >
                Sq Yd
              </button>
              <button
                type="button"
                onClick={() => setLandUnit('acre')}
                className={unitBtn('acre', 'Acre')}
              >
                Acre
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={landMin}
              onChange={(e) => onLandMinChange(e.target.value)}
              placeholder={landPlaceholder.min}
              className="rounded-md border border-[#1C2A44]/10 bg-white px-3 py-2 text-xs text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/38 transition-all focus:border-[#1C2A44]/35 focus:shadow-[0_0_0_3px_rgba(28,42,68,0.08)]"
            />
            <input
              value={landMax}
              onChange={(e) => onLandMaxChange(e.target.value)}
              placeholder={landPlaceholder.max}
              className="rounded-md border border-[#1C2A44]/10 bg-white px-3 py-2 text-xs text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/38 transition-all focus:border-[#1C2A44]/35 focus:shadow-[0_0_0_3px_rgba(28,42,68,0.08)]"
            />
          </div>
        </div>
      )}

      {isDesktopView && bothVisible && (
        <div className="mt-0.5 h-full w-px bg-[#1C2A44]/10" />
      )}

      {showBua && (
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#1C2A44]">
            ⚖️ Built-up Area (sq ft)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={buaMin}
              onChange={(e) => onBuaMinChange(e.target.value)}
              placeholder="Min (sq ft)"
              className="rounded-md border border-[#1C2A44]/10 bg-white px-3 py-2 text-xs text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/38 transition-all focus:border-[#1C2A44]/35 focus:shadow-[0_0_0_3px_rgba(28,42,68,0.08)]"
            />
            <input
              value={buaMax}
              onChange={(e) => onBuaMaxChange(e.target.value)}
              placeholder="Max (sq ft)"
              className="rounded-md border border-[#1C2A44]/10 bg-white px-3 py-2 text-xs text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/38 transition-all focus:border-[#1C2A44]/35 focus:shadow-[0_0_0_3px_rgba(28,42,68,0.08)]"
            />
          </div>
        </div>
      )}
    </div>
  )
}
