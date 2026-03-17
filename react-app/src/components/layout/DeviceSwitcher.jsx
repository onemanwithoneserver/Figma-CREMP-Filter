const options = [
 { key: 'desktop', label: 'Desktop', icon: '🖥️' },
 { key: 'tablet', label: 'Tablet', icon: '📱' },
 { key: 'mobile', label: 'Mobile', icon: '📲' },
]

export default function DeviceSwitcher({ value, onChange }) {
 return (
 <div className="inline-flex items-center gap-px rounded-[5px] border border-[#1C2A44]/8 bg-white p-[3px]">
 {options.map(({ key, label, icon }) => {
 const isActive = value === key;
 
 return (
 <button
 key={key}
 type="button"
 onClick={() => onChange(key)}
 className={`inline-flex items-center gap-1.5 rounded-[5px] px-2.5 py-1 text-[10.5px] font-semibold tracking-[-0.01em] transition-all duration-150 ${
 isActive
 ? 'bg-[#1C2A44] text-white shadow-sm'
 : 'text-[#4A5568] hover:text-[#1C2A44] hover:bg-[#1C2A44]/5'
 }`}
 >
 <span className="text-[12px] leading-none" role="img" aria-hidden="true">{icon}</span>
 {label}
 </button>
 );
 })}
 </div>
 )
}
