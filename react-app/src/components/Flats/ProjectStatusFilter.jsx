import { CalendarClock, TimerReset } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PROJECT_STATUS_OPTIONS, PROPERTY_AGE_OPTIONS } from '../common/filterOptions'

export default function ProjectStatusFilter({ selected, onToggle, propertyAges = [], onTogglePropertyAge, isDesktopView = false }) {
 return (
 <div className={`pt-0.5 ${isDesktopView ? 'grid grid-cols-[1fr_auto_1fr] items-start gap-2.5' : 'flex flex-col gap-2.5'}`}>
 <div className="flex flex-col gap-1">
 <div className="flex items-center gap-1.5">
 <TimerReset size={11} className="text-white" />
 <span className="text-[10px] font-semibold tracking-wide text-white">Possession Timeline</span>
 </div>
 <div className="flex flex-wrap items-center gap-1">
 {PROJECT_STATUS_OPTIONS.map((status) => (
 <TagButton key={status} label={status} selected={selected.includes(status)} onClick={() => onToggle(status)} />
 ))}
 </div>
 </div>
 {isDesktopView && <div className="mt-0.5 h-full w-px bg-[#C89B3C]/12" />}
 <div className="flex flex-col gap-1">
 <div className="flex items-center gap-1.5">
 <CalendarClock size={11} className="text-white" />
 <span className="text-[10px] font-semibold tracking-wide text-white">Property Condition</span>
 </div>
 <div className="flex flex-wrap items-center gap-1">
 {PROPERTY_AGE_OPTIONS.map((age) => (
 <TagButton key={age} label={age} selected={propertyAges.includes(age)} onClick={() => onTogglePropertyAge(age)} />
 ))}
 </div>
 </div>
 </div>
 )
}