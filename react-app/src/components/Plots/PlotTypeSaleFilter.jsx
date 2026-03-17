import { Landmark, ReceiptText } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PLOT_SALE_TYPE_OPTIONS, PLOT_TYPE_OPTIONS } from '../common/filterOptions'

export default function PlotTypeSaleFilter({
 selectedType,
 selectedSaleType,
 onToggleType,
 onToggleSaleType,
 isDesktopView = false,
}) {
 return (
 <div className={isDesktopView ? 'grid grid-cols-[1fr_auto_1fr] items-start gap-2.5' : ''}>
 <div className={isDesktopView ? '' : 'mb-2'}>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[#D1D5DB]">
 <Landmark size={10} />
 Plot Type
 </div>
 <div className="flex flex-wrap gap-1">
 {PLOT_TYPE_OPTIONS.map((type) => (
 <TagButton
 key={type}
 label={type}
 selected={selectedType.includes(type)}
 onClick={() => onToggleType(type)}
 />
 ))}
 </div>
 </div>

 {isDesktopView && <div className="mt-0.5 h-full w-px bg-[#C89B3C]/12" />}

 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[#D1D5DB]">
 <ReceiptText size={10} />
 Sale Type
 </div>
 <div className="flex flex-wrap gap-1">
 {PLOT_SALE_TYPE_OPTIONS.map((type) => (
 <TagButton
 key={type}
 label={type}
 selected={selectedSaleType.includes(type)}
 onClick={() => onToggleSaleType(type)}
 />
 ))}
 </div>
 </div>
 </div>
 )
}
