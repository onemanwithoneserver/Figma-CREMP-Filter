import { LayoutGrid } from 'lucide-react'
import TagButton from '../common/TagButton'
import { BUSINESS_CATEGORY_OPTIONS } from '../common/filterOptions'

export default function BusinessCategoryFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <LayoutGrid size={11} className="text-white" />
        <span className="text-[10px] font-semibold tracking-wide text-white">Business Category</span>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {BUSINESS_CATEGORY_OPTIONS.map((cat) => (
          <TagButton
            key={cat}
            label={cat}
            selected={selected.includes(cat)}
            onClick={() => onToggle(cat)}
          />
        ))}
      </div>
    </div>
  )
}
