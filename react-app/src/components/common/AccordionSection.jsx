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
      className={`group rounded-[5px] mb-1 border transition-all duration-300 ${
        highlight
          ? 'border-[#FF6A00]/30 bg-[#FF6A00]/5' // Swapped highlight to Orange tint
          : isOpen
          ? 'border-[#1E1E1E]/10 bg-white shadow-sm'
          : 'border-[#1E1E1E]/5 bg-[#FFFFFF] hover:border-[#1E1E1E]/15 hover:bg-white'
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
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] transition-all duration-300 ${
                highlight
                  ? 'bg-[#FF6A00]/10'
                  : isOpen
                  ? 'bg-[#1E1E1E]/10'
                  : 'bg-[#1E1E1E]/5 group-hover:bg-[#1E1E1E]/10'
              }`}>
                <span className="text-[14px] leading-none" role="img" aria-hidden="true">
                  {sectionEmoji}
                </span>
              </div>
            )}
            <span className="text-[13px] font-semibold tracking-wide text-[#1E1E1E]">
              {title}
            </span>
          </div>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={`shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-[#FF6A00]' : 'text-[#1E1E1E]/40 group-hover:text-[#1E1E1E]'
            }`}
          />
        </button>
      ) : (
        <div className={`flex w-full items-center justify-between p-2 text-left outline-none transition-all ${headerClassName}`}>
          <div className="flex items-center gap-2">
            {Icon && (
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] transition-all duration-300 ${
                highlight
                  ? 'bg-[#FF6A00]/10'
                  : isOpen
                  ? 'bg-[#1E1E1E]/10'
                  : 'bg-[#1E1E1E]/5'
              }`}>
                <span className="text-[14px] leading-none" role="img" aria-hidden="true">
                  {sectionEmoji}
                </span>
              </div>
            )}
            <span className="text-[13px] font-semibold tracking-wide text-[#1E1E1E]">
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
            className={`m-2 mt-0 border-t border-[#1E1E1E]/5 pt-2 text-[13px] text-[#1E1E1E] ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}