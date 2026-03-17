import { ChevronDown } from 'lucide-react'

const SECTION_EMOJIS = {
  Radius: '📍',
  'Search Radius': '📍',
  'Area & Configuration': '🏠',
  'Land Area': '🏘️',
  'Plot Size': '📏',
  'Budget Range': '💰',
  'Project Classification': '🏗️',
  'Availability & Property Age': '🗓️',
  'Investment Benefits': '🎁',
  Approvals: '✅',
  'Plot Type & Sale': '🧾',
  'Speciality Projects': '🌱',
  // Commercial
  'Property Category': '🏢',
  'Size & Area': '📐',
  'Additional Options': '⚙️',
  'Sale Type': '🛒',
  'Business Opportunities': '💼',
  'Business Category': '🗂️',
}

export default function AccordionSection({
  title,
  open,
  onToggle,
  children,
  collapsible = true,
  highlight = false,
  icon: Icon,
  sectionClassName = '',
  headerClassName = '',
  contentClassName = '',
}) {
  const isOpen = collapsible ? open : true
  const sectionEmoji = SECTION_EMOJIS[title] || '🧩'

  return (
    <section
      className={`group rounded-[8px] mb-1 border transition-all duration-300 ${
        highlight
          ? 'border-[#C89B3C]/30 bg-[#C89B3C]/5' // Swapped highlight to Orange tint
          : isOpen
          ? 'border-white/10 bg-[#1C2A44] shadow-sm'
          : 'border-white/5 bg-[#1C2A44] hover:border-white/15 hover:bg-[#1C2A44]'
      } ${sectionClassName}`}
    >
      {collapsible ? (
        <button
          type="button"
          onClick={onToggle}
          className={`flex w-full items-center justify-between p-2 text-left outline-none transition-all ${headerClassName}`}
        >
          <div className="flex items-center gap-2">
            {Icon && (
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] transition-all duration-300 ${
                highlight
                  ? 'bg-[#C89B3C]/10'
                  : isOpen
                  ? 'bg-[#C89B3C]/10'
                  : 'bg-[#C89B3C]/5 group-hover:bg-[#C89B3C]/10'
              }`}>
                <span className="text-[14px] leading-none" role="img" aria-hidden="true">
                  {sectionEmoji}
                </span>
              </div>
            )}
            <span className="text-[13px] font-semibold tracking-wide text-white">
              {title}
            </span>
          </div>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={`shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-[#C89B3C]' : 'text-white/40 group-hover:text-white'
            }`}
          />
        </button>
      ) : (
        <div className={`flex w-full items-center justify-between p-2 text-left outline-none transition-all ${headerClassName}`}>
          <div className="flex items-center gap-2">
            {Icon && (
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] transition-all duration-300 ${
                highlight
                  ? 'bg-[#C89B3C]/10'
                  : isOpen
                  ? 'bg-[#C89B3C]/10'
                  : 'bg-[#C89B3C]/5'
              }`}>
                <span className="text-[14px] leading-none" role="img" aria-hidden="true">
                  {sectionEmoji}
                </span>
              </div>
            )}
            <span className="text-[13px] font-semibold tracking-wide text-white">
              {title}
            </span>
          </div>
        </div>
      )}

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`m-2 mt-0 border-t border-white/5 pt-2 text-[13px] text-white ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}