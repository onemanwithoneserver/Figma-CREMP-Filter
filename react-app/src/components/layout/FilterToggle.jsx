export default function FilterToggle({ onClick }) {
 return (
 <button
 type="button"
 onClick={onClick}
 aria-label="Toggle filters"
 className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#C89B3C] text-white transition-all duration-150 hover:bg-[#E6C36A] active:scale-95"
 >
 <span className="text-[13px] leading-none" role="img" aria-hidden="true">🎛️</span>
 </button>
 )
}
