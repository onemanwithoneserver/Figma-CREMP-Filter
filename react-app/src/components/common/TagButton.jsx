export default function TagButton({ label, selected = false, onClick, disabled = false }) {
 return (
 <button
 type="button"
 onClick={onClick}
 disabled={disabled}
 className={`chip-token rounded-[8px] px-2 py-0.75 text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
 selected
 ? 'border-[#C89B3C] bg-[#C89B3C] text-[#0F1B2E]'
 : 'border-white/8 bg-[#1C2A44] text-[#D1D5DB] hover:border-[#C89B3C] hover:bg-[#C89B3C]/10'
 }`}
 data-selected={selected}
 >
 {label}
 </button>
 )
}

