export default function SubleaseToggle({ value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-2 px-1.5 py-1.5">
      <span className="text-[12px] font-medium tracking-wide text-[#1C2A44]/70">Include Sublease / Shared Space</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-[18px] w-8 shrink-0 items-center rounded-[4px] border transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1C2A44]/20 ${
          value
            ? 'border-transparent bg-gradient-to-br from-[#1C2A44] to-[#253755] shadow-sm'
            : 'border-[#1C2A44]/15 bg-gradient-to-b from-[#1C2A44]/5 to-transparent hover:border-[#1C2A44]/25'
        }`}
        role="switch"
        aria-checked={value}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-[2px] bg-white shadow-sm transition-transform duration-200 ${
            value ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}