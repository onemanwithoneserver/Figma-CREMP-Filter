export default function FilterToggle({ onClick }) {
 return (
 <button
 type="button"
 onClick={onClick}
 aria-label="Toggle filters"
 className="inline-flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#FF6A00] text-white transition-all duration-150 hover:bg-[#E85F00] active:scale-95"
 >
 <span className="text-[13px] leading-none" role="img" aria-hidden="true">🎛️</span>
 </button>
 )
}
