import { ShoppingCart } from 'lucide-react'
import TagButton from '../common/TagButton'
import { SALE_TYPE_OPTIONS } from '../common/filterOptions'

export default function SaleTypeFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <ShoppingCart size={11} className="text-white" />
        <span className="text-[10px] font-semibold tracking-wide text-white">Sale Type</span>
      </div>
      <div className="flex flex-wrap items-center gap-1">
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
