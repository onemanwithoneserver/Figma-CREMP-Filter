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
    <div className="flex gap-1">
      {/* Left — Land (radio, exclusive) */}
      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleLandClick}
          className={`flex items-center gap-1 rounded-[4px] border px-2 py-2  text-xs font-medium transition-all duration-150 ${isLandSelected
            ? 'border-[#C89B3C]/45 bg-[#C89B3C]/10 text-[#B88A2C] font-semibold'
            : 'border-[#1C2A44]/10 bg-[#1C2A44]/[0.04] text-[#1C2A44]/60 hover:border-[#1C2A44]/18 hover:bg-[#1C2A44]/[0.07] hover:text-[#1C2A44]'
            }`}
        >
          <span className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${isLandSelected ? 'border-[#C89B3C]' : 'border-[#1C2A44]/30'
            }`}>
            {isLandSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]" />}
          </span>
          Land
        </button>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-[#1C2A44]/10" />

      {/* Right — Built-up types (multi-select checkboxes) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          {BUILT_UP_TYPES.map((type) => {
            const isSelected = selected.includes(type)
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleBuiltUpClick(type)}
                className={`flex items-center gap-2 rounded-[4px] border px-2 py-2  text-xs font-medium transition-all duration-150 ${isSelected
                  ? 'border-[#C89B3C]/45 bg-[#C89B3C]/10 text-[#B88A2C] font-semibold'
                  : 'border-[#1C2A44]/10 bg-[#1C2A44]/[0.04] text-[#1C2A44]/60 hover:border-[#1C2A44]/18 hover:bg-[#1C2A44]/[0.07] hover:text-[#1C2A44]'
                  }`}
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
