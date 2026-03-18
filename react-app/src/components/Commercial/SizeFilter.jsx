
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

  const hasLand = selectedTypes.includes('Land')
  const hasBuiltUp = selectedTypes.some((t) => t !== 'Land')
  const noneSelected = selectedTypes.length === 0

  const showLand = hasLand || noneSelected
  const showBua = hasBuiltUp || noneSelected

  const layoutClass = isDesktopView
    ? 'grid grid-cols-[1fr_auto_1fr] items-start gap-2.5'
    : isMobile
    ? 'grid grid-cols-1 gap-2'
    : 'grid gap-2 lg:grid-cols-2'

  const unitBtn = (unit, label) =>
    `px-1.5 py-[2px] rounded-[4px] text-[9px] font-semibold border transition-all ${
      landUnit === unit
        ? 'bg-[#C89B3C] border-[#C89B3C] text-white'
        : 'bg-white border-[#1C2A44]/15 text-[#1C2A44]/50'
    }`

  const landPlaceholder = landUnit === 'acre'
    ? { min: 'Min (acres)', max: 'Max (acres)' }
    : { min: 'Min (sq yd)', max: 'Max (sq yd)' }

  return (
    <div className={layoutClass}>
      {showLand && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] font-semibold text-[#1C2A44]">
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
          <div className="grid grid-cols-2 gap-1">
            <input
              value={landMin}
              onChange={(e) => onLandMinChange(e.target.value)}
              placeholder={landPlaceholder.min}
              className="rounded-[5px] border border-[#1C2A44]/10 bg-white px-2 py-1 text-[10.5px] text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/40 transition-all focus:border-[#1C2A44]/40"
            />
            <input
              value={landMax}
              onChange={(e) => onLandMaxChange(e.target.value)}
              placeholder={landPlaceholder.max}
              className="rounded-[5px] border border-[#1C2A44]/10 bg-white px-2 py-1 text-[10.5px] text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/40 transition-all focus:border-[#1C2A44]/40"
            />
          </div>
        </div>
      )}

      {isDesktopView && showLand && showBua && (
        <div className="mt-0.5 h-full w-px bg-[#1C2A44]/10" />
      )}

      {showBua && (
        <div>
          <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-[#1C2A44]">
            ⚖️ Built-up Area (sq ft)
          </div>
          <div className="grid grid-cols-2 gap-1">
            <input
              value={buaMin}
              onChange={(e) => onBuaMinChange(e.target.value)}
              placeholder="Min (sq ft)"
              className="rounded-[5px] border border-[#1C2A44]/10 bg-white px-2 py-1 text-[10.5px] text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/40 transition-all focus:border-[#1C2A44]/40"
            />
            <input
              value={buaMax}
              onChange={(e) => onBuaMaxChange(e.target.value)}
              placeholder="Max (sq ft)"
              className="rounded-[5px] border border-[#1C2A44]/10 bg-white px-2 py-1 text-[10.5px] text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/40 transition-all focus:border-[#1C2A44]/40"
            />
          </div>
        </div>
      )}
    </div>
  )
}
