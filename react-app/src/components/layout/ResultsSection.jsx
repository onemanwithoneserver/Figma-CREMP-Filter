export default function ResultsSection({ results, variant = 'inline' }) {
 if (variant === 'mobile') {
 return (
 <div className="flex flex-col">

 {/* Action buttons */}
 <div className="flex items-center">
 <button
 type="button"
 className="flex-1 rounded-[8px] border border-white/12 bg-[#1C2A44] px-1 py-1.5 text-[5px] font-semibold text-white transition-all hover:border-white/20 hover:text-white"
 >
 🗑️ Clear All
 </button>
 <button
 type="button"
 className="flex-1 rounded-[8px] border border-white/12 bg-[#1C2A44] px-1 py-1.5 text-[5px] font-semibold text-white transition-all hover:border-white/20 hover:text-white"
 >
 💾 Save Search
 </button>
 <button
 type="button"
 className="flex-[1.3] rounded-[8px] bg-[#C89B3C] px-1 py-1.5 text-[5px] font-bold text-[#0F1B2E] transition-all hover:bg-[#E6C36A]"
 >
 🔍 View Properties ({results.length})
 </button>
 </div>
 </div>
 )
 }

 if (variant === 'bottom') {
 return (
 <div className="flex items-center gap-1.5">
 <button
 type="button"
 className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-3.5 py-1.5 text-[10.5px] font-semibold text-white transition-all hover:border-white/8 hover:text-white"
 >
 🗑️ Clear All
 </button>
 <button
 type="button"
 className="rounded-[8px] border border-white/8 bg-[#1C2A44] px-3.5 py-1.5 text-[10.5px] font-semibold text-white transition-all hover:border-white/8 hover:text-white"
 >
 💾 Save Search
 </button>
 <button
 type="button"
 className="ml-auto rounded-[8px] bg-[#C89B3C] px-5 py-1.5 text-[10.5px] font-bold text-[#0F1B2E] transition-all hover:bg-[#E6C36A]"
 >
 🔍 View Properties ({results.length})
 </button>
 </div>
 )
 }

 return (
 <div className="flex h-full min-w-16 flex-col items-center justify-center rounded-[8px] border border-[#C89B3C] bg-[#C89B3C] px-2 py-1">
 <span className="text-[30px] font-bold leading-none text-[#0F1B2E]">
 {results.length}
 </span>
 <span className="text-[11px] font-semibold leading-none text-[#0F1B2E]">
 🏢 Projects
 </span>
 </div>
 )
}
