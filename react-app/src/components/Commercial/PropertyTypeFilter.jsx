import TagButton from '../common/TagButton'

const LAND = 'Land'
const BUILT_UP_TYPES = ['Retail', 'Office', 'Full Building']

export default function PropertyTypeFilter({ selected, onChange }) {
  const isLandSelected = selected.includes(LAND)

  const handleLandClick = () => {
    if (isLandSelected) {
      onChange([])
    } else {
      onChange([LAND])
    }
  }

  const handleBuiltUpClick = (type) => {
    if (selected.includes(type)) {
      // Remove the type from selected
      onChange(selected.filter((t) => t !== type))
    } else {
      // Add the type to selected, but remove LAND if present
      onChange([
        ...selected.filter((t) => t !== LAND),
        type
      ])
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-start gap-1.5 py-1">
      <div className="flex flex-col items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={handleLandClick}
          className={`flex items-center gap-1.5 rounded-[4px] border px-2.5 py-1.5 text-[12px] font-medium transition-all duration-200 ${
            isLandSelected
              ? 'border-[#C89B3C]/40 bg-gradient-to-br from-[#C89B3C]/15 to-[#C89B3C]/5 text-[#7a5a1f] shadow-sm'
              : 'border-[#1C2A44]/15 bg-gradient-to-b from-[#1C2A44]/5 to-transparent text-[#1C2A44]/60 hover:border-[#1C2A44]/25 hover:text-[#1C2A44]'
          }`}
        >
          <span
            className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
              isLandSelected
                ? 'border-transparent bg-[linear-gradient(135deg,#7a5a1f,#c89b3c)] shadow-sm'
                : 'border-[#1C2A44]/30 bg-white'
            }`}
          >
            {isLandSelected && <span className="h-1.5 w-1.5 rounded-full bg-white"></span>}
          </span>
          Land
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          {BUILT_UP_TYPES.map((type) => {
            const isSelected = selected.includes(type)
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleBuiltUpClick(type)}
                className={`flex items-center gap-1.5 rounded-[4px] border px-2.5 py-1.5 text-[12px] font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-[#C89B3C]/40 bg-gradient-to-br from-[#C89B3C]/15 to-[#C89B3C]/5 text-[#7a5a1f] shadow-sm'
                    : 'border-[#1C2A44]/15 bg-gradient-to-b from-[#1C2A44]/5 to-transparent text-[#1C2A44]/60 hover:border-[#1C2A44]/25 hover:text-[#1C2A44]'
                }`}
              >
                {isSelected && (
                  <span className="text-[10px] leading-none text-[#7a5a1f] transition-opacity duration-200">
                    ✓
                  </span>
                )}
                {type}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}