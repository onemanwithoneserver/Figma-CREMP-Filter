export default function SubleaseToggle({ value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 px-1 py-1.5">
      <span className="text-[11px] font-medium tracking-wide text-[#1C2A44]/55">Include Sublease / Shared Space</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-sm border transition-colors duration-300 ${
          value ? 'bg-[#1C2A44]/80 border-[#1C2A44]' : 'bg-[#1C2A44]/10 border-[#1C2A44]/15'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-[3px] bg-white shadow-sm transition-transform duration-300 ${
            value ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

