const SECTION_EMOJIS = {
  Radius: '🎯',
  'Search Radius': '🧭',
  'Area & Configuration': '📐',
  'Land Area': '🏞️',
  'Plot Size': '📏',
  'Investment Range': '💰',
  'Monthly Rent / Lease': '🪙',
  'Project Classification': '🏗️',
  'Availability & Property Age': '🗓️',
  'Investment Benefits': '📈',
  Approvals: '📜',
  'Plot Type & Sale': '🏷️',
  'Speciality Projects': '✨',
  // Commercial
  'Property Type': '🏢',
  'Size & Area': '🗺️',
  'Additional Options': '⚙️',
  'Sale Type': '🤝',
  'Active Business': '💼',
  'Business Category': '🗂️',
};

export default function AccordionSection({
  title,
  children,
  highlight = false,
  borderless = false,
  icon: Icon,
  sectionClassName = '',
  headerClassName = '',
  contentClassName = '',
}) {
  const isOpen = true // Forced open
  const sectionEmoji = SECTION_EMOJIS[title] || '🧩'

  return (
    <section
      className={`group rounded-sm transition-all duration-300 ${borderless
        ? 'bg-transparent'
        : highlight
          ? ''
          : ''
        } ${sectionClassName}`}
    >
      <div
        className={`flex w-full items-center justify-between px-2 py-2 text-left  outline-none transition-all ${headerClassName}`}
      >
        <div className="flex items-center gap-4">
          {Icon && (
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] transition-all duration-300 ${highlight
              ? 'bg-[#1C2A44]/10 shadow-[inset_0_0_0_1px_rgba(28,42,68,0.12)]'
              : 'bg-[#1C2A44]/10 shadow-[inset_0_0_0_1px_rgba(28,42,68,0.10)]'
              }`}>
              <span className="text-sm leading-none" role="img" aria-hidden="true">
                {sectionEmoji}
              </span>
            </div>
          )}
          <span className="text-sm font-semibold text-[#1C2A44]">
            {title}
          </span>
        </div>
      </div>

      <div
        className={`px-1 grid transition-all  duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
          <div
            className={` pb-4 text-sm text-[#1C2A44] ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
