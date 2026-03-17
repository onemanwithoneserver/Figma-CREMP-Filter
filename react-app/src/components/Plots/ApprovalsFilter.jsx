import { CheckCircle2 } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PLOT_APPROVAL_OPTIONS } from '../common/filterOptions'

export default function ApprovalsFilter({ selected, onToggle }) {
 return (
 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]">
 <CheckCircle2 size={10} />
 Approvals
 </div>
 <div className="flex flex-wrap gap-1">
 {PLOT_APPROVAL_OPTIONS.map((approval) => (
 <TagButton
 key={approval}
 label={approval}
 selected={selected.includes(approval)}
 onClick={() => onToggle(approval)}
 />
 ))}
 </div>
 </div>
 )
}
