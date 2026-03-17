export default function RangeInput({ minLabel = 'Min', maxLabel = 'Max' }) {
 return (
 <div className="grid grid-cols-2 gap-1.5">
 <select className="rounded-[8px] border border-white/8 bg-(--white) px-2 py-1 text-[11px] text-[#D1D5DB] transition-all focus:border-[#C89B3C]/35">
 <option>{minLabel}</option>
 </select>
 <select className="rounded-[8px] border border-white/8 bg-(--white) px-2 py-1 text-[11px] text-[#D1D5DB] transition-all focus:border-[#C89B3C]/35">
 <option>{maxLabel}</option>
 </select>
 </div>
 )
}
