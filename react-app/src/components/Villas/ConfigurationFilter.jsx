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
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-(--dark)">
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

 {isDesktopView && <div className="mt-0.5 h-full w-px bg-[#1E1E1E]/12" />}

 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-(--dark)">
 <LandPlot size={10} />
 Land Area (sq yd)
 </div>
 <div className="grid grid-cols-2 gap-1">
 <input
 value={plotMin}
 onChange={(event) => onPlotMinChange(event.target.value)}
 placeholder="Min"
 className="rounded-[5px] border border-(--dark)/8 bg-white px-2 py-1.25 text-[10.5px] text-(--dark) outline-none placeholder:text-(--dark) transition-all focus:border-[#FF6A00]/35"
 />
 <input
 value={plotMax}
 onChange={(event) => onPlotMaxChange(event.target.value)}
 placeholder="Max"
 className="rounded-[5px] border border-(--dark)/8 bg-white px-2 py-1.25 text-[10.5px] text-(--dark) outline-none placeholder:text-(--dark) transition-all focus:border-[#FF6A00]/35"
 />
 </div>
 </div>

 {isDesktopView && <div className="mt-0.5 h-full w-px bg-[#1E1E1E]/12" />}

 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-(--dark)">
 <Scale size={10} />
 Builtup Area (Sft)
 </div>
 <div className="grid grid-cols-2 gap-1">
 <input
 value={builtupMin}
 onChange={(event) => onBuiltupMinChange(event.target.value)}
 placeholder="Min"
 className="rounded-[5px] border border-(--dark)/8 bg-white px-2 py-1.25 text-[10.5px] text-(--dark) outline-none placeholder:text-(--dark) transition-all focus:border-[#FF6A00]/35"
 />
 <input
 value={builtupMax}
 onChange={(event) => onBuiltupMaxChange(event.target.value)}
 placeholder="Max"
 className="rounded-[5px] border border-(--dark)/8 bg-white px-2 py-1.25 text-[10.5px] text-(--dark) outline-none placeholder:text-(--dark) transition-all focus:border-[#FF6A00]/35"
 />
 </div>
 </div>
 </div>
 )
}
