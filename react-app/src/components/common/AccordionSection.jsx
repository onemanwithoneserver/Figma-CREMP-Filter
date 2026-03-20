

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
  'Size & Area': '🗺️',
  'Additional Options': '⚙️',
  'Sale Type': '🤝',
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
  borderless = false,
  icon: Icon,
  sectionClassName = '',
  headerClassName = '',
  contentClassName = '',
}) {
  const isOpen = collapsible ? open : true
  const sectionEmoji = SECTION_EMOJIS[title] || '🧩'

  return (
    <section
      className={`group rounded-sm transition-all duration-300 ${
        borderless
          ? 'bg-transparent'
          : highlight
          ? 'bg-[#1C2A44]/4 shadow-[inset_0_0_0_1px_rgba(28,42,68,0.09)]'
          : isOpen
          ? 'bg-white shadow-[0_2px_12px_rgba(28,42,68,0.08),inset_0_0_0_1px_rgba(28,42,68,0.07)]'
          : 'bg-white shadow-[inset_0_0_0_1px_rgba(28,42,68,0.07)] '
      } ${sectionClassName}`}
    >
      {collapsible ? (
        <button
          type="button"
          onClick={onToggle}
          className={`flex w-full items-center justify-between px-2 py-2 text-left outline-none transition-all ${headerClassName}`}
        >
          <div className="flex items-center gap-4">
            {Icon && (
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-all duration-300 ${
                highlight
                  ? 'bg-[#1C2A44]/10 shadow-[inset_0_0_0_1px_rgba(28,42,68,0.12)]'
                  : isOpen
                  ? 'bg-[#1C2A44]/10 shadow-[inset_0_0_0_1px_rgba(28,42,68,0.10)]'
                  : 'bg-[#1C2A44]/5 group-hover:bg-[#1C2A44]/10'
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
          <span
            className={`shrink-0 text-[24px] leading-none inline-block transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-[#1C2A44]' : 'text-[#1C2A44]/35 group-hover:text-[#1C2A44]'
            }`}
          >▾</span>
        </button>
      ) : (
        <div className={`flex w-full items-center justify-between px-2 py-4 text-left outline-none transition-all ${headerClassName}`}>
          <div className="flex items-center gap-4">
            {Icon && (
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-all duration-300 ${
                highlight
                  ? 'bg-[#1C2A44]/10'
                  : isOpen
                  ? 'bg-[#1C2A44]/10'
                  : 'bg-[#1C2A44]/5'
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
      )}

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-4 py-2 text-sm text-[#1C2A44] ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}