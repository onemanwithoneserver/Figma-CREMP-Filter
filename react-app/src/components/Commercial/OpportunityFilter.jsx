import { Briefcase } from 'lucide-react'
import TagButton from '../common/TagButton'
import { OPPORTUNITY_OPTIONS } from '../common/filterOptions'

export default function OpportunityFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <Briefcase size={11} className="text-white" />
        <span className="text-[10px] font-semibold tracking-wide text-white">Business Opportunities</span>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {OPPORTUNITY_OPTIONS.map((opp) => (
          <TagButton
            key={opp}
            label={opp}
            selected={selected.includes(opp)}
            onClick={() => onToggle(opp)}
          />
        ))}
      </div>
    </div>
  )
}
