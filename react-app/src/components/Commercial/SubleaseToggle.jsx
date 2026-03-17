import { Building2 } from 'lucide-react'

export default function SubleaseToggle({ enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <div className="flex items-center gap-1.5">
        <Building2 size={11} className="text-white" />
        <span className="text-[10px] font-semibold tracking-wide text-white">
          Include Sublease / Shared Space
        </span>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-300 ${
          enabled ? 'bg-[#C89B3C]' : 'bg-white/15'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            enabled ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}
