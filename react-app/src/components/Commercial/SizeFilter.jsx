import { LandPlot, Scale } from 'lucide-react'

export default function SizeFilter({
  landMin,
  landMax,
  onLandMinChange,
  onLandMaxChange,
  buaMin,
  buaMax,
  onBuaMinChange,
  onBuaMaxChange,
  showLand = true,
  showBua = true,
  isMobile = false,
  isDesktopView = false,
}) {
  const layoutClass = isDesktopView
    ? 'grid grid-cols-[1fr_auto_1fr] items-start gap-2.5'
    : isMobile
    ? 'grid grid-cols-1 gap-2'
    : 'grid gap-2 lg:grid-cols-2'

  return (
    <div className={layoutClass}>
      {showLand && (
        <div>
          <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-white">
            <LandPlot size={10} />
            Land Area (sq yd / acre)
          </div>
          <div className="grid grid-cols-2 gap-1">
            <input
              value={landMin}
              onChange={(e) => onLandMinChange(e.target.value)}
              placeholder="Min Area"
              className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-white outline-none placeholder:text-white/50 transition-all focus:border-[#C89B3C]/35"
            />
            <input
              value={landMax}
              onChange={(e) => onLandMaxChange(e.target.value)}
              placeholder="Max Area"
              className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-white outline-none placeholder:text-white/50 transition-all focus:border-[#C89B3C]/35"
            />
          </div>
        </div>
      )}

      {isDesktopView && showLand && showBua && (
        <div className="mt-0.5 h-full w-px bg-[#C89B3C]/12" />
      )}

      {showBua && (
        <div>
          <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-white">
            <Scale size={10} />
            Built-up Area (sq ft)
          </div>
          <div className="grid grid-cols-2 gap-1">
            <input
              value={buaMin}
              onChange={(e) => onBuaMinChange(e.target.value)}
              placeholder="Min Area"
              className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-white outline-none placeholder:text-white/50 transition-all focus:border-[#C89B3C]/35"
            />
            <input
              value={buaMax}
              onChange={(e) => onBuaMaxChange(e.target.value)}
              placeholder="Max Area"
              className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-white outline-none placeholder:text-white/50 transition-all focus:border-[#C89B3C]/35"
            />
          </div>
        </div>
      )}
    </div>
  )
}
