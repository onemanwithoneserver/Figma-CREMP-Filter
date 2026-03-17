import TagButton from '../common/TagButton'

const LAND = 'Land'
const BUILT_UP_TYPES = ['Retail Space', 'Office Space', 'Coworking', 'Full Building']

export default function PropertyTypeFilter({ selected, onChange }) {
  const isLandSelected = selected.includes(LAND)

  const handleLandClick = () => {
    if (isLandSelected) {
      onChange(selected.filter((t) => t !== LAND))
    } else {
      onChange([LAND]) // radio — clears all others
    }
  }

  const handleBuiltUpClick = (type) => {
    const withoutLand = selected.filter((t) => t !== LAND) // deselect Land when picking built-up
    if (withoutLand.includes(type)) {
      onChange(withoutLand.filter((t) => t !== type))
    } else {
      onChange([...withoutLand, type])
    }
  }

  return (
    <div className="flex gap-4">
      {/* Left — Land (radio, exclusive) */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-semibold tracking-wide text-[#1C2A44]">Plot</span>
        <button
          type="button"
          onClick={handleLandClick}
          className={`flex items-center gap-1.5 rounded-[5px] border px-2 py-1 text-[10.5px] font-medium transition-all duration-150 ${
            isLandSelected
              ? 'border-[#C89B3C]/60 bg-[#C89B3C]/15 text-[#C89B3C] font-semibold'
              : 'border-[#1C2A44]/10 bg-[#F5F7FA] text-[#4A5568] hover:border-[#1C2A44]/20 hover:bg-[#1C2A44]/5'
          }`}
        >
          <span className={`inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            isLandSelected ? 'border-[#C89B3C]' : 'border-[#1C2A44]/30'
          }`}>
            {isLandSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]" />}
          </span>
          Land
        </button>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-[#1C2A44]/10" />

      {/* Right — Built-up types (multi-select checkboxes) */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-semibold tracking-wide text-[#1C2A44]">Built-up Space</span>
        <div className="flex flex-wrap gap-1">
          {BUILT_UP_TYPES.map((type) => {
            const isSelected = selected.includes(type)
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleBuiltUpClick(type)}
                className={`flex items-center gap-1.5 rounded-[5px] border px-2 py-1 text-[10.5px] font-medium transition-all duration-150 ${
                  isSelected
                    ? 'border-[#C89B3C]/60 bg-[#C89B3C]/15 text-[#C89B3C] font-semibold'
                    : 'border-[#1C2A44]/10 bg-[#F5F7FA] text-[#4A5568] hover:border-[#1C2A44]/20 hover:bg-[#1C2A44]/5'
                }`}
              >
                <span className={`inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] border transition-all ${
                  isSelected ? 'border-[#C89B3C] bg-[#C89B3C]' : 'border-[#1C2A44]/30 bg-white'
                }`}>
                  {isSelected && <span className="text-[8px] font-bold leading-none text-white">✓</span>}
                </span>
                {type}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
