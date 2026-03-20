export default function TagButton({ label, selected = false, onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center rounded-sm border px-3 py-1 text-xs font-medium tracking-wide transition-all duration-150
        ${disabled ? 'cursor-not-allowed opacity-40' : ''}
        ${
          selected
            ? 'border-[#C89B3C]/45 bg-[#C89B3C]/10 text-[#B88A2C] font-semibold shadow-[inset_0_0_0_1px_rgba(200,155,60,0.25)]'
            : 'border-[#1C2A44]/10 bg-[#1C2A44]/4 text-[#1C2A44]/60 hover:border-[#1C2A44]/20 hover:bg-[#1C2A44]/7 hover:text-[#1C2A44]'
        }`}
      data-selected={selected}
    >
      {label}
    </button>
  )
}


