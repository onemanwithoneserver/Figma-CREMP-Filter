const SECTION_EMOJIS = {
  Radius: '🎯',
  'Search Radius': '🧭',
  'Area & Configuration': '📐',
  'Land Area': '🏞️',
  'Plot Size': '📏',
  'Investment Range': '💰',
  'Monthly Rent / Lease': '🤝',
  'Project Classification': '🏗️',
  'Availability & Property Age': '🗓️',
  'Investment Benefits': '📈',
  Approvals: '📜',
  'Plot Type & Sale': '🏷️',
  'Speciality Projects': '✨',
  // Commercial
  'Property Type': '🏬',
  'Size & Area': '🗺️',
  'Additional Options': '⚙️',
  'Sale Type': '💳',
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
      className={`group rounded-[4px] transition-all duration-200 ${
        borderless
          ? 'bg-transparent'
          : highlight
            ? 'bg-gradient-to-b from-white to-[#F9FAFB]'
            : 'bg-transparent'
      } ${sectionClassName}`}
    >
      <div
        className={`flex w-full items-center justify-between px-1.5 py-1.5 text-left outline-none transition-all ${headerClassName}`}
      >
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] transition-all duration-200 ${
                highlight
                  ? 'bg-gradient-to-br from-[#1C2A44]/15 to-[#1C2A44]/5 shadow-sm border border-[#1C2A44]/10'
                  : 'bg-gradient-to-br from-[#1C2A44]/10 to-[#1C2A44]/5 shadow-sm border border-[#1C2A44]/10'
              }`}
            >
              <span className="text-[13px] leading-none grayscale opacity-80" role="img" aria-hidden="true">
                {sectionEmoji}
              </span>
            </div>
          )}
          <span className="text-[12px] font-semibold tracking-wide text-[#1C2A44]">
            {title}
          </span>
        </div>
      </div>

      <div
        className={`px-1.5 grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-visible">
          <div
            className={`pb-1.5 text-[13px] text-[#1C2A44]/80 ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}