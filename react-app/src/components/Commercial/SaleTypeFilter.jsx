import TagButton from '../common/TagButton'
import { SALE_TYPE_OPTIONS } from '../common/filterOptions'

export default function SaleTypeFilter({ selected, onToggle, options }) {
  const saleTypeOptions = options || SALE_TYPE_OPTIONS;
  return (
    <div className="flex flex-wrap gap-1.5 py-1.5">
      {saleTypeOptions.map((option) => (
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