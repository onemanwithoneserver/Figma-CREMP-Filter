export default function TagButton({ label, selected = false, onClick, disabled = false }) {
 return (
 <button
 type="button"
 onClick={onClick}
 disabled={disabled}
 className={`chip-token rounded-[5px] px-2 py-0.75 text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
   selected
 ? 'border-[#C89B3C]/60 bg-[#C89B3C]/15 text-[#C89B3C] font-semibold'
 : 'border-[#1C2A44]/10 bg-[#F5F7FA] text-[#4A5568] hover:border-[#1C2A44]/20 hover:bg-[#1C2A44]/5'
 }`}
 data-selected={selected}
 >
 {label}
 </button>
 )
}

