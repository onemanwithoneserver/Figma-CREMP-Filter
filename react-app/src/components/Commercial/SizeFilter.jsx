
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

  return (
    <div className={layoutClass}>
      {showLand && (
        <div>
          <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[#1C2A44]">
            📌 Land Area (sq yd / acre)
          </div>
          <div className="grid grid-cols-2 gap-1">
            <input
              value={landMin}
              onChange={(e) => onLandMinChange(e.target.value)}
              placeholder="Min Area"
              className="rounded-[5px] border border-[#1C2A44]/10 bg-white px-2 py-1.25 text-[10.5px] text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/40 transition-all focus:border-[#1C2A44]/40"
            />
            <input
              value={landMax}
              onChange={(e) => onLandMaxChange(e.target.value)}
              placeholder="Max Area"
              className="rounded-[5px] border border-[#1C2A44]/10 bg-white px-2 py-1.25 text-[10.5px] text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/40 transition-all focus:border-[#1C2A44]/40"
            />
          </div>
        </div>
      )}

      {isDesktopView && showLand && showBua && (
        <div className="mt-0.5 h-full w-px bg-[#1C2A44]/10" />
      )}

      {showBua && (
        <div>
          <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[#1C2A44]">
            📏 Built-up Area (sq ft)
          </div>
          <div className="grid grid-cols-2 gap-1">
            <input
              value={buaMin}
              onChange={(e) => onBuaMinChange(e.target.value)}
              placeholder="Min Area"
              className="rounded-[5px] border border-[#1C2A44]/10 bg-white px-2 py-1.25 text-[10.5px] text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/40 transition-all focus:border-[#1C2A44]/40"
            />
            <input
              value={buaMax}
              onChange={(e) => onBuaMaxChange(e.target.value)}
              placeholder="Max Area"
              className="rounded-[5px] border border-[#1C2A44]/10 bg-white px-2 py-1.25 text-[10.5px] text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/40 transition-all focus:border-[#1C2A44]/40"
            />
          </div>
        </div>
      )}
    </div>
  )
}
