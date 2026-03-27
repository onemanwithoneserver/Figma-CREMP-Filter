import TagButton from '../common/TagButton'
import { OPPORTUNITY_OPTIONS } from '../common/filterOptions'

export default function OpportunityFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-1.5 py-1.5">
      {OPPORTUNITY_OPTIONS.map((opp) => (
        <TagButton
          key={opp}
          label={opp}
          selected={selected.includes(opp)}
          onClick={() => onToggle(opp)}
        />
      ))}
    </div>
  )
}