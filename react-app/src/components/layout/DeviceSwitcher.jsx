const options = [
 { key: 'desktop', label: 'Desktop', icon: '🖥️' },
 { key: 'tablet', label: 'Tablet', icon: '📱' },
 { key: 'mobile', label: 'Mobile', icon: '📲' },
]

export default function DeviceSwitcher({ value, onChange }) {
 return (
 <div className="inline-flex items-center gap-px rounded-[8px] border border-white/8 bg-[#1C2A44] p-[3px] backdrop-blur-sm">
 {options.map(({ key, label, icon }) => {
 const isActive = value === key;
 
 return (
 <button
 key={key}
 type="button"
 onClick={() => onChange(key)}
 className={`inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-1 text-[10.5px] font-semibold tracking-[-0.01em] transition-all duration-150 ${
 isActive
 ? 'bg-[#0F1B2E] text-[#C89B3C] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
 : 'text-white hover:text-white hover:bg-[#0F1B2E]'
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
