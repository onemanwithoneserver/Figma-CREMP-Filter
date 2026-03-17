import { SPECIAL_OFFER_OPTIONS } from '../common/filterOptions'

export default function SpecialOffers({ selected, onToggle }) {
 return (
 <div className="flex flex-wrap gap-1">
 {SPECIAL_OFFER_OPTIONS.map((offer) => {
 const isSelected = selected.includes(offer)

 return (
 <button
 key={offer}
 type="button"
 onClick={() => onToggle(offer)}
 className={`rounded-[8px] border px-2 py-0.75 text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
 isSelected
 ? 'border-[#C89B3C] bg-[#C89B3C] text-[#0F1B2E]'
 : 'border-white/8 bg-[#1C2A44] text-white hover:border-[#C89B3C]/35 hover:bg-[#C89B3C]/6 hover:text-[#C89B3C]'
 }`}
 >
 {offer}
 </button>
 )
 })}
 </div>
 )
}
