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
 className={`rounded-[5px] border px-2 py-0.75 text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
 isSelected
 ? 'border-[#F59E0B] bg-[#F59E0B] text-white'
 : 'border-[#1E1E1E]/8 bg-[#FFFFFF] text-[#1E1E1E] hover:border-[#F59E0B]/35 hover:bg-[#F59E0B]/6 hover:text-[#F59E0B]'
 }`}
 >
 {offer}
 </button>
 )
 })}
 </div>
 )
}
