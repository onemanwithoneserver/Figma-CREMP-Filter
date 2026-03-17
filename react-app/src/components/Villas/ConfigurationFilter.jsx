import { Home, LandPlot, Scale } from 'lucide-react'
import TagButton from '../common/TagButton'

const VILLA_CONFIGURATION_OPTIONS = ['2BHK', '3BHK', '4BHK', '5BHK', '6BHK']

export default function ConfigurationFilter({
 selected,
 onToggle,
 plotMin,
 plotMax,
 onPlotMinChange,
 onPlotMaxChange,
 builtupMin,
 builtupMax,
 onBuiltupMinChange,
 onBuiltupMaxChange,
 isMobile = false,
 isDesktopView = false,
}) {
 const desktopLayoutClass = isDesktopView
 ? 'grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-2.5'
 : isMobile
 ? 'grid grid-cols-1 gap-2'
 : 'grid gap-2 lg:grid-cols-3'

 return (
 <div className={desktopLayoutClass}>
 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[#D1D5DB]">
 <Home size={10} />
 Unit Configuration
 </div>
 <div className="flex flex-wrap gap-1">
 {VILLA_CONFIGURATION_OPTIONS.map((config) => (
 <TagButton
 key={config}
 label={config}
 selected={selected.includes(config)}
 onClick={() => onToggle(config)}
 />
 ))}
 </div>
 </div>

 {isDesktopView && <div className="mt-0.5 h-full w-px bg-[#C89B3C]/12" />}

 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[#D1D5DB]">
 <LandPlot size={10} />
 Land Area (sq yd)
 </div>
 <div className="grid grid-cols-2 gap-1">
 <input
 value={plotMin}
 onChange={(event) => onPlotMinChange(event.target.value)}
 placeholder="Min"
 className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-[#D1D5DB] outline-none placeholder:text-[#D1D5DB] transition-all focus:border-[#C89B3C]/35"
 />
 <input
 value={plotMax}
 onChange={(event) => onPlotMaxChange(event.target.value)}
 placeholder="Max"
 className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-[#D1D5DB] outline-none placeholder:text-[#D1D5DB] transition-all focus:border-[#C89B3C]/35"
 />
 </div>
 </div>

 {isDesktopView && <div className="mt-0.5 h-full w-px bg-[#C89B3C]/12" />}

 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[#D1D5DB]">
 <Scale size={10} />
 Built-up Area (sq ft)
 </div>
 <div className="grid grid-cols-2 gap-1">
 <input
 value={builtupMin}
 onChange={(event) => onBuiltupMinChange(event.target.value)}
 placeholder="Min"
 className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-[#D1D5DB] outline-none placeholder:text-[#D1D5DB] transition-all focus:border-[#C89B3C]/35"
 />
 <input
 value={builtupMax}
 onChange={(event) => onBuiltupMaxChange(event.target.value)}
 placeholder="Max"
 className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-[#D1D5DB] outline-none placeholder:text-[#D1D5DB] transition-all focus:border-[#C89B3C]/35"
 />
 </div>
 </div>
 </div>
 )
}
