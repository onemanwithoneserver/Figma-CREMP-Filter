import { Building, LandPlot } from 'lucide-react'
import TagButton from '../common/TagButton'
import { COMMERCIAL_PROPERTY_TYPE_OPTIONS } from '../common/filterOptions'

export default function PropertyTypeFilter({ selected, onToggle, isDesktopView = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <Building size={11} className="text-white" />
        <span className="text-[10px] font-semibold tracking-wide text-white">Property Category</span>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {COMMERCIAL_PROPERTY_TYPE_OPTIONS.map((type) => (
          <TagButton
            key={type}
            label={type}
            selected={selected.includes(type)}
            onClick={() => onToggle(type)}
          />
        ))}
      </div>
    </div>
  )
}
