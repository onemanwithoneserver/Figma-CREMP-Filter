export default function SubleaseToggle({ value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 px-1 py-2">
      <span className="text-xs font-medium text-[#1C2A44]/55">Include Sublease / Shared Space</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-[3px] border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C2A44]/20 ${
          value ? 'bg-[#1C2A44] border-[#1C2A44]/80' : 'bg-[#1C2A44]/8 border-[#1C2A44]/14'
        }`}
        role="switch"
        aria-checked={value}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-[3px] bg-white shadow-sm transition-transform duration-200 ${
            value ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

