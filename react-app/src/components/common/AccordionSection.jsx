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
  rightControl, // New prop to pass the tabs into the header row
  sectionClassName = '',
  headerClassName = '',
  contentClassName = '',
}) {
  const sectionEmoji = SECTION_EMOJIS[title] || '🧩'

  return (
    <section className={`group rounded-[4px] transition-all duration-200 ${sectionClassName}`}>
      <div className={`flex w-full items-center justify-between px-1.5 py-1.5 text-left outline-none ${headerClassName}`}>
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-gradient-to-br from-[#1C2A44]/10 to-[#1C2A44]/5 border border-[#1C2A44]/10 shadow-sm">
              <span className="text-[13px] leading-none grayscale opacity-80" role="img" aria-hidden="true">
                {sectionEmoji}
              </span>
            </div>
          )}
          <span className="text-[12px] font-bold tracking-tight text-[#1C2A44]">
            {title}
          </span>
        </div>

        {/* This renders the tabs on the same line as shown in your image */}
        {rightControl && (
          <div className="ml-auto">
            {rightControl}
          </div>
        )}
      </div>

      <div className="px-1.5 opacity-100">
        <div className="overflow-visible">
          <div className={`pb-1.5 text-[13px] text-[#1C2A44]/80 ${contentClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}