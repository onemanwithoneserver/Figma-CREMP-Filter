export function SizeTabs({ unit, onUnitChange }) {
  const btn = (value) =>
    `px-3 py-1 rounded-[3px] text-[11px] font-semibold transition-all duration-200 ${
      unit === value
        ? 'bg-[#1C2A44] text-white shadow-sm'
        : 'text-[#1C2A44]/60 hover:text-[#1C2A44]'
    }`

  return (
    <div className="inline-flex items-center gap-0.5 rounded-[4px] border border-[#1C2A44]/10 bg-[#1C2A44]/5 p-0.5 shadow-sm">
      <button type="button" onClick={() => onUnitChange('sqft')} className={btn('sqft')}>
        Sq.ft
      </button>
      <button type="button" onClick={() => onUnitChange('acre')} className={btn('acre')}>
        Acres
      </button>
    </div>
  )
}

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
  unit = 'sqft',
}) {

  // Only show Land Area for 'Land', Built-up Area for others
  const isLand = selectedTypes && selectedTypes.length === 1 && selectedTypes[0] === 'Land';
  const showLand = isLand;
  const showBua = !isLand;

  const bothVisible = showLand && showBua
  const layoutClass = isDesktopView
    ? bothVisible
      ? 'grid grid-cols-[1fr_auto_1fr] items-start gap-2.5'
      : 'block'
    : isMobile
      ? 'grid grid-cols-1 gap-2'
      : 'grid gap-2 lg:grid-cols-2'

  const landPlaceholder = unit === 'acre'
    ? { min: 'Min (acres)', max: 'Max (acres)' }
    : { min: 'Min (sq ft)', max: 'Max (sq ft)' }

  return (
    <div className={layoutClass}>
      {showLand && (
        <div>
          <div className="flex flex-row gap-2 px-2 pt-1">
            <input
              value={landMin}
              onChange={(e) => onLandMinChange(e.target.value)}
              placeholder={landPlaceholder.min}
              className="rounded-[4px] border border-[#1C2A44]/10 bg-white px-3 py-2 text-xs text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/38 transition-all focus:border-[#1C2A44]/35 focus:shadow-[0_0_0_3px_rgba(28,42,68,0.08)] w-[100px]"
            />
            <input
              value={landMax}
              onChange={(e) => onLandMaxChange(e.target.value)}
              placeholder={landPlaceholder.max}
              className="rounded-[4px] border border-[#1C2A44]/10 bg-white px-3 py-2 text-xs text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/38 transition-all focus:border-[#1C2A44]/35 focus:shadow-[0_0_0_3px_rgba(28,42,68,0.08)] w-[100px]"
            />
          </div>
        </div>
      )}

      {isDesktopView && bothVisible && (
        <div className="mt-0.5 h-full w-px bg-[#1C2A44]/10" />
      )}

      {showBua && (
        <div>
          <div className="flex flex-row gap-2 px-2 pt-1">
            <input
              value={buaMin}
              onChange={(e) => onBuaMinChange(e.target.value)}
              placeholder="Min (sq ft)"
              className="rounded-[4px] border border-[#1C2A44]/10 bg-white px-3 py-2 text-xs text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/38 transition-all focus:border-[#1C2A44]/35 focus:shadow-[0_0_0_3px_rgba(28,42,68,0.08)] w-[100px]"
            />
            <input
              value={buaMax}
              onChange={(e) => onBuaMaxChange(e.target.value)}
              placeholder="Max (sq ft)"
              className="rounded-[4px] border border-[#1C2A44]/10 bg-white px-3 py-2 text-xs text-[#1C2A44] outline-none placeholder:text-[#1C2A44]/38 transition-all focus:border-[#1C2A44]/35 focus:shadow-[0_0_0_3px_rgba(28,42,68,0.08)] w-[100px]"
            />
          </div>
        </div>
      )}
    </div>
  )
}