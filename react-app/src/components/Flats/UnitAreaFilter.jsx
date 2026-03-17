import { Ruler, Scale } from 'lucide-react'
import TagButton from '../common/TagButton'
import { UNIT_SIZE_OPTIONS } from '../common/filterOptions'

export default function UnitAreaFilter({
 selected,
 onToggle,
 areaMin,
 areaMax,
 onAreaMinChange,
 onAreaMaxChange,
 isMobile = false,
 isDesktopView = false,
}) {
 const layoutClass = isDesktopView
 ? 'grid grid-cols-[1fr_auto_1fr] items-start gap-2.5'
 : isMobile
 ? 'grid grid-cols-1 gap-2'
 : 'grid gap-2 lg:grid-cols-[1fr_auto_1fr] lg:items-end'

 return (
 <div className={layoutClass}>
 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-white">
 <Ruler size={10} />
 Unit Configuration
 </div>
 <div className="flex flex-wrap gap-1">
 {UNIT_SIZE_OPTIONS.map((unit) => (
 <TagButton
 key={unit}
 label={unit}
 selected={selected.includes(unit)}
 onClick={() => onToggle(unit)}
 />
 ))}
 </div>
 </div>

 {isDesktopView && <div className="mt-0.5 h-full w-px bg-[#C89B3C]/12" />}
 {!isDesktopView && (
 <span className={isMobile ? 'hidden' : 'hidden text-[10px] text-white lg:block'}>–</span>
 )}

 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-white">
 <Scale size={10} />
 Built-up Area (sq ft)
 </div>
 <div className="grid grid-cols-2 gap-1">
 <input
 value={areaMin}
 onChange={(event) => onAreaMinChange(event.target.value)}
 placeholder="Min Area"
 className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-white outline-none placeholder:text-white transition-all focus:border-[#C89B3C]/35"
 />
 <input
 value={areaMax}
 onChange={(event) => onAreaMaxChange(event.target.value)}
 placeholder="Max Area"
 className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-2 py-1.25 text-[10.5px] text-white outline-none placeholder:text-white transition-all focus:border-[#C89B3C]/35"
 />
 </div>
 </div>
 </div>
 )
}

