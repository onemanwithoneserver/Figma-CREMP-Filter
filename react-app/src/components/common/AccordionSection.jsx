

const SECTION_EMOJIS = {
  Radius: '📍',
  'Search Radius': '📍',
  'Area & Configuration': '🏠',
  'Land Area': '🏘️',
  'Plot Size': '📍',
  'Investment Range': '💰',
  'Monthly Rent / Lease': '💰',
  'Project Classification': '🏗️',
  'Availability & Property Age': '🗓️',
  'Investment Benefits': '🎁',
  Approvals: '✅',
  'Plot Type & Sale': '🧾',
  'Speciality Projects': '🌱',
  // Commercial
  'Property Type': '🏢',
  'Size & Area': '📏',
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
      className={`group rounded-[5px] mb-1 transition-all duration-300 ${
        highlight
          ? 'bg-[#1C2A44]/5'
          : isOpen
          ? 'bg-[#F5F7FA]'
          : 'bg-white hover:bg-[#F9FAFB]'
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
                  ? 'bg-[#1C2A44]/10'
                  : isOpen
                  ? 'bg-[#1C2A44]/10'
                  : 'bg-[#1C2A44]/5 group-hover:bg-[#1C2A44]/10'
              }`}>
                <span className="text-[14px] leading-none" role="img" aria-hidden="true">
                  {sectionEmoji}
                </span>
              </div>
            )}
            <span className="text-[13px] font-semibold tracking-wide text-[#1C2A44]">
              {title}
            </span>
          </div>
          <span
            className={`shrink-0 text-[12px] leading-none inline-block transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-[#1C2A44]' : 'text-[#1C2A44]/35 group-hover:text-[#1C2A44]'
            }`}
          >▾</span>
        </button>
      ) : (
        <div className={`flex w-full items-center justify-between p-2 text-left outline-none transition-all ${headerClassName}`}>
          <div className="flex items-center gap-2">
            {Icon && (
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] transition-all duration-300 ${
                highlight
                  ? 'bg-[#1C2A44]/10'
                  : isOpen
                  ? 'bg-[#1C2A44]/10'
                  : 'bg-[#1C2A44]/5'
              }`}>
                <span className="text-[14px] leading-none" role="img" aria-hidden="true">
                  {sectionEmoji}
                </span>
              </div>
            )}
            <span className="text-[13px] font-semibold tracking-wide text-[#1C2A44]">
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
            className={`m-2 mt-0 border-t border-[#1C2A44]/6 pt-2 text-[13px] text-[#1C2A44] ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}