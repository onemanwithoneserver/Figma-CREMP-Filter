export default function TagButton({ label, selected = false, onClick, disabled = false }) {
 return (
 <button
 type="button"
 onClick={onClick}
 disabled={disabled}
 className={`inline-flex items-center border rounded-[5px] px-2 py-[3px] text-[10.5px] font-medium tracking-[0.01em] transition-all duration-150 ${
   selected
 ? 'border-[#C89B3C]/50 bg-[#C89B3C]/12 text-[#C89B3C] font-semibold'
 : 'border-[#1C2A44]/10 bg-[#1C2A44]/5 text-[#1C2A44]/55 hover:border-[#1C2A44]/20 hover:bg-[#1C2A44]/8 hover:text-[#1C2A44]'
 }`}
 data-selected={selected}
 >
 {label}
 </button>
 )
}

