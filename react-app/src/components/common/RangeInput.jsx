export default function RangeInput({ minLabel = 'Min', maxLabel = 'Max' }) {
 return (
 <div className="grid grid-cols-2 gap-1.5">
 <select className="rounded-[5px] border border-(--dark)/8 bg-(--white) px-2 py-1 text-[11px] text-(--dark) transition-all focus:border-[#FF6A00]/35">
 <option>{minLabel}</option>
 </select>
 <select className="rounded-[5px] border border-(--dark)/8 bg-(--white) px-2 py-1 text-[11px] text-(--dark) transition-all focus:border-[#FF6A00]/35">
 <option>{maxLabel}</option>
 </select>
 </div>
 )
}
