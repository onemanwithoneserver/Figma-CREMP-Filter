export default function TagButton({ label, selected = false, onClick, disabled = false }) {
 return (
 <button
 type="button"
 onClick={onClick}
 disabled={disabled}
 className={`chip-token rounded-[5px] px-2 py-0.75 text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
 selected
 ? 'border-[#FF6A00] bg-[#FFE6D5] text-[#7A2E0E]'
 : 'border-[#ECECEC] bg-[#FFFFFF] text-[#4B4B4B] hover:border-[#FF6A00] hover:bg-[#FFF3EB]'
 }`}
 data-selected={selected}
 >
 {label}
 </button>
 )
}

