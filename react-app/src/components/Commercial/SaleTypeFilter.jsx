import TagButton from '../common/TagButton'
import { SALE_TYPE_OPTIONS } from '../common/filterOptions'

export default function SaleTypeFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2 pt-1 pb-2">
      {SALE_TYPE_OPTIONS.map((option) => (
        <TagButton
          key={option.label}
          label={option.label}
          tooltip={option.tooltip}
          selected={selected.includes(option.label)}
          onClick={() => onToggle(option.label)}
          showCheckbox={true}
        />
      ))}
    </div>
  )
}