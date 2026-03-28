export function SizeTabs({ unit, onUnitChange, isLand }) {
  const btn = (value) =>
    `px-3 py-1 rounded-[3px] text-[11px] font-semibold transition-all duration-200 ${
      unit === value
        ? 'bg-[#1C2A44] text-white shadow-sm'
        : 'text-[#1C2A44]/60 hover:text-[#1C2A44]'
    }`;

  return (
    <div></div>
  );
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
      ? 'grid grid-cols-[1fr_auto_1fr] items-start gap-[2px]'
      : 'block'
    : isMobile
      ? 'grid grid-cols-1 gap-[2px]'
      : 'grid gap-[2px] lg:grid-cols-2'

  let landPlaceholder = { min: 'Min', max: 'Max' };
  if (isLand) {
    landPlaceholder = { min: 'Min (sq yards)', max: 'Max (sq yards)' };
  }

  return (
    <div className={layoutClass}>
      {showLand && (
        <div>
          <div className="flex flex-row gap-[2px] px-[2px] pt-[2px]">
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
          <div className="flex flex-row gap-[2px] px-[2px] pt-[2px]">
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