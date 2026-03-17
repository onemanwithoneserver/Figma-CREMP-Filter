import { FileBadge } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PLOT_FINAL_PERMISSION_OPTIONS } from '../common/filterOptions'

export default function FinalLayoutPermissionFilter({ selected, onToggle }) {
 return (
 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]">
 <FileBadge size={10} />
 Layout Permission
 </div>
 <div className="flex flex-wrap gap-1">
 {PLOT_FINAL_PERMISSION_OPTIONS.map((item) => (
 <TagButton
 key={item}
 label={item}
 selected={selected.includes(item)}
 onClick={() => onToggle(item)}
 />
 ))}
 </div>
 </div>
 )
}
