const options = [
 { key: 'desktop', label: 'Desktop', icon: '🖥️' },
 { key: 'tablet', label: 'Tablet', icon: '📱' },
 { key: 'mobile', label: 'Mobile', icon: '📲' },
]

export default function DeviceSwitcher({ value, onChange }) {
 return (
 <div className="inline-flex items-center gap-px rounded-[5px] border border-[#1E1E1E]/8 bg-white p-[3px] backdrop-blur-sm">
 {options.map(({ key, label, icon }) => {
 const isActive = value === key;
 
 return (
 <button
 key={key}
 type="button"
 onClick={() => onChange(key)}
 className={`inline-flex items-center gap-1.5 rounded-[5px] px-2.5 py-1 text-[10.5px] font-semibold tracking-[-0.01em] transition-all duration-150 ${
 isActive
 ? 'bg-[#F7F7F7] text-[#FF6A00] shadow-[inset_0_0_0_1px_rgba(30,30,30,0.06)]'
 : 'text-[#1E1E1E] hover:text-[#1E1E1E] hover:bg-[#F7F7F7]'
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
