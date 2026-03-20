const options = [
 { key: 'desktop', label: 'Desktop', icon: '🖥️' },
 { key: 'tablet', label: 'Tablet', icon: '📱' },
 { key: 'mobile', label: 'Mobile', icon: '📲' },
]

export default function DeviceSwitcher({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border border-[#1C2A44]/10 bg-[#1C2A44]/3 p-1">
      {options.map(({ key, label, icon }) => {
        const isActive = value === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold tracking-[-0.01em] transition-all duration-150 ${
              isActive
                ? 'bg-[#1C2A44] text-white shadow-sm'
                : 'text-[#1C2A44]/50 hover:text-[#1C2A44] hover:bg-[#1C2A44]/6'
            }`}
          >
            <span className="text-sm leading-none" role="img" aria-hidden="true">{icon}</span>
            {label}
          </button>
        );
      })}
    </div>
  )
}
