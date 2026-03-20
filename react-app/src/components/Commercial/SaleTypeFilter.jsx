import TagButton from '../common/TagButton'
import { SALE_TYPE_OPTIONS } from '../common/filterOptions'

export default function SaleTypeFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {SALE_TYPE_OPTIONS.map((type) => (
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
