
import { useEffect, useMemo, useRef, useState } from 'react'
import RadiusSlider from '../components/common/RadiusSlider'
import LeaseRentFilters from '../components/Commercial/LeaseRentFilters'
import BuyInvestFilters from '../components/Commercial/BuyInvestFilters'
import BusinessFilters from '../components/Commercial/BusinessFilters'
import TopControls from '../components/layout/TopControls'

// --- SEARCH PANEL COMPONENT --- //
const TRENDING_SEARCHES = ['Office Space in Hitech City', 'Retail in Banjara Hills', 'Coworking Gachibowli']
const RECENT_SEARCHES = ['Warehouse Shamshabad', 'Office Madhapur']
const SAVED_SEARCHES = ['Retail near Metro', 'Office 5000 sqft Jubilee Hills']
const SEARCHABLE_PROJECTS = ['Skyline Tower - Madhapur', 'Commerce Hub - Kokapet', 'Business Park - Narsingi']

const filterEntries = (entries, query) => {
  if (!query) return entries
  const normalizedQuery = query.trim().toLowerCase()
  return entries.filter((item) => item.toLowerCase().includes(normalizedQuery))
}

function SearchRow({ label, showFavorite = true, showRemove = true }) {
  return (
    <li className="group flex items-center justify-between gap-4 rounded-[5px] p-1.5 text-[15px] font-normal text-[#4A5568] transition-colors duration-200 hover:bg-[#1C2A44]/8">
      <span className="flex items-center gap-2 truncate" title={label}>
        <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#1C2A44]" />
        {label}
      </span>
      {showFavorite && showRemove && (
        <div className="flex items-center gap-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button className="flex items-center justify-center rounded-[5px] p-1 text-[#1C2A44]/30 transition-colors hover:text-[#1C2A44]">
            <span className="text-[14px] leading-none" role="img" aria-label="save">🤍</span>
          </button>
          <button className="text-[13px] font-medium text-[#1C2A44]/30 transition-colors hover:text-[#1C2A44]">Remove</button>
        </div>
      )}
    </li>
  )
}

function SearchGroup({ title, entries, showActions = true, hasDivider = false }) {
  if (entries.length === 0) return null;
  return (
    <section className={`flex flex-col gap-1 ${hasDivider ? 'border-t border-[#1C2A44]/8 pt-1' : ''}`}>
      <h4 className="px-2 py-1 text-[16px] font-semibold text-[#1C2A44]">{title}</h4>
      <ul className="flex flex-col gap-1">
        {entries.map((item) => (
          <SearchRow key={`${title}-${item}`} label={item} showFavorite={showActions} showRemove={showActions} />
        ))}
      </ul>
    </section>
  )
}

function FilterSearchPanel({ onOpenFilters, onSearchFocusChange, autoFocusInput = false }) {
  const [searchText, setSearchText] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const inputRef = useRef(null)

  const trendingEntries = useMemo(() => filterEntries(TRENDING_SEARCHES, searchText), [searchText])
  const recentEntries = useMemo(() => filterEntries(RECENT_SEARCHES, searchText), [searchText])
  const savedEntries = useMemo(() => filterEntries(SAVED_SEARCHES, searchText), [searchText])
  const matchedResults = useMemo(() => filterEntries(SEARCHABLE_PROJECTS, searchText), [searchText])

  const hasQuery = Boolean(searchText.trim())
  const showSuggestions = isSearchFocused

  useEffect(() => {
    if (autoFocusInput) inputRef.current?.focus()
  }, [autoFocusInput])

  useEffect(() => {
    onSearchFocusChange?.(isSearchFocused)
  }, [isSearchFocused, onSearchFocusChange])

  return (
    <div className="relative mx-auto w-full">
      <div 
        className={`flex items-center gap-2 rounded-[5px] border bg-white p-1 transition-all duration-300
          ${isSearchFocused 
            ? 'border-[#1C2A44]/40 shadow-[0_0_0_2px_rgba(28,42,68,0.12)]' 
            : 'border-[#1C2A44]/10 shadow-sm hover:border-[#1C2A44]/18'
          }`}
      >
        {/* Location pin icon */}
        <div className="m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-[#1C2A44]/10 text-[#1C2A44]">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 200)}
          placeholder="Search locations, projects, or properties"
          className="h-full flex-1 bg-transparent px-1 text-[14px] font-medium tracking-wide text-[#1C2A44] placeholder:font-light placeholder:text-[#1C2A44]/40 focus:outline-none"
        />

        <div className="m-1 flex items-center gap-1">
          {/* Filter toggle */}
          <button
            onClick={() => {
              setIsSearchFocused(false)
              onOpenFilters?.()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-[5px] text-[#1C2A44] transition-colors hover:bg-[#1C2A44]/10 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
              <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/>
              <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none"/>
              <circle cx="9" cy="18" r="2" fill="currentColor" stroke="none"/>
            </svg>
          </button>
          
          {/* Search CTA */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#1C2A44] text-white shadow-sm transition-colors hover:bg-[#15203A] active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/>
              <line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[5px] border border-[#1C2A44]/10 bg-white/98 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.10)]">
          <div className="custom-scrollbar flex max-h-[320px] flex-col gap-2 overflow-auto p-2">
            {hasQuery && matchedResults.length > 0 && (
              <SearchGroup title="🔥 Top Matches" entries={matchedResults.slice(0, 5)} />
            )}
            <SearchGroup title="📈 Trending Now" entries={trendingEntries} hasDivider={hasQuery && matchedResults.length > 0} />
            <SearchGroup title="🕒 Recent Searches" entries={recentEntries} hasDivider={trendingEntries.length > 0 || (hasQuery && matchedResults.length > 0)} />
            <SearchGroup title="⭐ Saved Searches" entries={savedEntries} showActions={false} hasDivider={recentEntries.length > 0 || trendingEntries.length > 0 || (hasQuery && matchedResults.length > 0)} />

            {(!hasQuery && trendingEntries.length === 0) && (
              <div className="m-2 p-2 text-center">
                <p className="text-[13px] font-light text-[#1C2A44]/45">Start typing to find properties</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#1C2A44]/8 bg-[#F5F7FA] px-3 py-2">
            <span className="text-[11px] font-bold tracking-wide text-[#1C2A44]">�x�¢ Commercial Search</span>
            <span className="text-[12px] text-[#1C2A44]/40">Press ESC to close</span>
          </div>
        </div>
      )}
    </div>
  )
}

// --- MAIN SEARCH PAGE COMPONENT --- //
const FILTER_COMPONENTS = {
  LeaseRent: LeaseRentFilters,
  BuyInvest: BuyInvestFilters,
  Business: BusinessFilters,
}

const MODE_TYPES = Object.keys(FILTER_COMPONENTS)

const MODE_CONFIG = {
  LeaseRent: { label: 'Lease / Rent', emoji: '🔑' },
  BuyInvest: { label: 'Buy / Invest', emoji: '🪙' },
  Business: { label: 'Business Opportunities', emoji: '💼' },

}

const SECTION_IDS = {
  LeaseRent: ['radius', 'propertyType', 'size', 'budget', 'sublease'],
  BuyInvest: ['radius', 'propertyType', 'saleType', 'size', 'budget'],
  Business: ['radius', 'opportunity', 'budget', 'category'],
}

const createFilterState = (defaultRadius = 50) => ({
  radius: defaultRadius,
  budgetMode: 'per',
  budgetMin: '',
  budgetMax: '',
  propertyTypes: [],
  saleTypes: [],
  opportunities: [],
  businessCategories: [],
  landMin: '',
  landMax: '',
  buaMin: '',
  buaMax: '',
  includeSublease: false,
})

const DEFAULT_FILTERS = {
  LeaseRent: createFilterState(50),
  BuyInvest: createFilterState(50),
  Business: createFilterState(50),
}

export default function SearchPage() {
  const [previewMode, setPreviewMode] = useState('desktop')
  const [activeType, setActiveType] = useState('LeaseRent')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [showFilters, setShowFilters] = useState({ desktop: false, tablet: false, mobile: false })
  const [isSearchOpen, setIsSearchOpen] = useState({ desktop: false, tablet: false, mobile: false })
  const [openSections, setOpenSections] = useState({
    desktop: SECTION_IDS.LeaseRent,
    tablet: SECTION_IDS.LeaseRent,
    mobile: [SECTION_IDS.LeaseRent[0]],
  })

  const ActiveFilters = useMemo(() => FILTER_COMPONENTS[activeType], [activeType])
  const activeFilterState = filters[activeType]

  useEffect(() => {
    const defaults = SECTION_IDS[activeType]
    setOpenSections((prev) => {
      // Only update if actually changed to avoid re-renders
      if (prev.desktop !== defaults || prev.tablet !== defaults || prev.mobile[0] !== defaults[0]) {
        return {
          desktop: defaults,
          tablet: defaults,
          mobile: [defaults[0]],
        }
      }
      return prev
    })
  }, [activeType])

  const updateActiveFilter = (field, value, isMultiSelect = false) => {
    setFilters((previous) => {
      const current = previous[activeType]
      const nextValue = isMultiSelect
        ? current[field].includes(value)
          ? current[field].filter((item) => item !== value)
          : [...current[field], value]
        : value

      return {
        ...previous,
        [activeType]: {
          ...current,
          [field]: nextValue,
        },
      }
    })
  }

  const toggleSection = (mode, id) => {
    if (mode === 'mobile') {
      setOpenSections((previous) => ({ ...previous, mobile: [id] }))
      return
    }

    setOpenSections((previous) => ({
      ...previous,
      [mode]: previous[mode].includes(id)
        ? previous[mode].filter((item) => item !== id)
        : [...previous[mode], id],
    }))
  }

  const toggleFiltersForMode = (mode) => {
    if (isSearchOpen[mode]) return
    setShowFilters((previous) => ({ ...previous, [mode]: !previous[mode] }))
  }

  const handleSearchFocusChange = (mode, isFocused) => {
    setIsSearchOpen((previous) => ({ ...previous, [mode]: isFocused }))
    if (isFocused) {
      setShowFilters((previous) => ({ ...previous, [mode]: false }))
    }
  }

  const renderFilterBody = (mode) => {
    const isMobile = mode === 'mobile'
    const isDesktop = mode === 'desktop'

    const filterControls = (
      <>
        {/* Top Controls Row */}
        <div className="flex flex-wrap items-stretch z-20 relative overflow-visible">
          
          {/* Mode Toggle Tabs */}
          <div className={`${isMobile ? 'grid min-w-0 flex-1 grid-cols-3 gap-2' : 'flex min-w-0 shrink-0 gap-2'}`}>
            {MODE_TYPES.map((mode) => {
              const config = MODE_CONFIG[mode]
              const isActive = activeType === mode

              return (
                <button
                  key={`${mode}-tab`}
                  type="button"
                  onClick={() => setActiveType(mode)}
                  className={`
                    ${isMobile ? 'flex w-full flex-col items-center justify-center gap-1 rounded-[5px] p-2 text-[10px]' : 'flex shrink-0 flex-col items-center justify-center gap-1 rounded-[5px] px-4 py-2 text-[12px] min-w-[100px]'}
                    font-medium tracking-wide transition-all duration-300 border
                    ${isActive
                      ? 'bg-[#1C2A44] text-white border-[#1C2A44] shadow-md scale-[0.98]'
                      : 'bg-white text-[#4A5568] border-[#1C2A44]/10 hover:bg-[#1C2A44]/5 hover:text-[#1C2A44]'
                    }
                  `}
                >
                  <span className={`text-[16px] leading-none ${isActive ? 'opacity-100' : 'opacity-70 grayscale'}`} role="img" aria-hidden="true">{config.emoji}</span>
                  {config.label}
                </button>
              )
            })}
          </div>

          {/* Desktop Radius Slider */}
          {!isMobile && (
            <div className="flex flex-1 items-center gap-4 rounded-[5px] bg-[#F5F7FA] px-4 py-2 z-30 overflow-visible relative">
              <span className="text-[13px] font-semibold tracking-wide text-[#1C2A44]">Radius</span>
              <div className="flex-1 w-full min-w-50">
                <RadiusSlider
                  value={activeFilterState.radius}
                  onChange={(value) => updateActiveFilter('radius', value)}
                />
              </div>
            </div>
          )}

          {/* Projects Count Box */}
          {!isMobile && (
            <div className="flex flex-col items-center justify-center rounded-[5px] bg-[#C89B3C] px-5 py-2 text-[#000000] shadow-md">
              <span className="text-[20px] font-bold leading-none">0</span>
              <span className="text-[10px] tracking-wider text-[#000000]/70">Projects</span>
            </div>
          )}
        </div>

        {/* Mobile Radius Slider */}
        {isMobile && (
          <div className="mt-2 flex items-center gap-4 rounded-[5px] border border-[#1C2A44]/10 bg-[#F5F7FA] px-4 py-2 shadow-sm z-30 overflow-visible relative">
            <span className="text-[12px] font-semibold tracking-wide text-[#1C2A44]">Radius</span>
            <div className="flex-1 w-full">
              <RadiusSlider
                value={activeFilterState.radius}
                onChange={(value) => updateActiveFilter('radius', value)}
              />
            </div>
          </div>
        )}

        {/* Filter Grids Area */}
        <div className="mt-1 rounded-[5px]">
          {ActiveFilters && (
            <ActiveFilters
              filterState={activeFilterState}
              onUpdate={updateActiveFilter}
              openSections={openSections[mode]}
              onToggleSection={(id) => toggleSection(mode, id)}
              isMobile={isMobile}
              showRadiusInAccordion={false}
              isDesktopView={isDesktop}
            />
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center pt-1 gap-0.5">
          <button
            type="button"
            className="rounded-[5px] px-1 py-1 text-[13px] font-medium text-[#4A5568] transition-all hover:bg-[#1C2A44]/5 hover:text-[#1C2A44]"
          >
            Clear All
          </button>
          <button
            type="button"
            className="rounded-[5px] border border-[#1C2A44]/15 bg-white px-1 py-1 text-[13px] font-medium text-[#1C2A44] shadow-sm transition-all hover:border-[#1C2A44]/25 hover:bg-[#F5F7FA]"
          >
            Save Search
          </button>
          <button
            type="button"
            className="ml-auto rounded-[5px] bg-[#C89B3C] px-3 py-2 text-[13px] font-bold tracking-wide text-[#000000] shadow-[0_4px_12px_rgba(200,155,60,0.30)] transition-all duration-300 hover:bg-[#E6C36A] active:scale-95"
          >
            View Properties
          </button>
        </div>

      </>
    )

    if (isDesktop) {
      return (
        <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-4 z-10 relative overflow-visible">
          <div className="flex min-w-0 flex-col z-20 relative overflow-visible">{filterControls}</div>
          
          {/* Sample Ad / Premium Boost Box */}
          <aside className="rounded-[5px] bg-[#1C2A44] p-5 text-white shadow-lg h-full flex flex-col">
            <div className="inline-flex rounded-[3px] bg-white/20 px-2 py-1 self-start">
              <p className="text-[10px] font-bold tracking-widest text-white">Sample Add</p>
            </div>
            <p className="mt-3 text-[14px] font-light leading-snug text-white/70">
              ..
            </p>
          </aside>
        </div>
      )
    }

    return <div className="flex flex-col z-10 relative overflow-visible">{filterControls}</div>
  }

  const renderPreview = (mode) => {
    const showModeFilters = showFilters[mode]
    
    const viewportShellClass =
      mode === 'desktop'
        ? 'mx-auto w-full max-w-[1280px]'
        : mode === 'tablet'
        ? 'mx-auto w-full max-w-[820px]'
        : 'mx-auto w-full max-w-[400px]'

    return (
      <section
        key={mode}
        id={`preview-${mode}`}
        className={`mx-auto w-full transition-all duration-300 overflow-visible ${
          previewMode === mode ? 'opacity-100' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
        }`}
      >
        <div className={`${viewportShellClass} flex flex-col gap-4 p-4 overflow-visible relative`}>
          
          {/* Top Search Bar Area */}
          <div className="z-40 mx-auto flex w-full justify-center px-2">
            <div className="w-full max-w-[500px]">
              <FilterSearchPanel
                onOpenFilters={() => toggleFiltersForMode(mode)}
                onSearchFocusChange={(isFocused) => handleSearchFocusChange(mode, isFocused)}
                autoFocusInput={false}
              />
            </div>
          </div>

          {/* Filter Body Area */}
          <div className={`relative z-30 flex w-full justify-center transition-all duration-500 ease-out ${
            showModeFilters ? 'opacity-100 translate-y-0' : 'h-0 opacity-0 overflow-hidden -translate-y-2'
          }`}>
            <div
              className={`${
                mode === 'desktop'
                  ? 'w-full max-w-[1220px]'
                  : mode === 'tablet'
                  ? 'w-full max-w-[820px]'
                  : 'w-full max-w-[400px]'
              } rounded-[5px] border border-[#1C2A44]/8 bg-[#F5F7FA] p-2 overflow-visible shadow-sm`}
            >
              {showModeFilters ? renderFilterBody(mode) : null}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1C2A44] overflow-visible">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md pt-2 pb-2 border-b border-[#1C2A44]/8 shadow-sm">
        <TopControls
          previewMode={previewMode}
          onPreviewModeChange={setPreviewMode}
        />
      </div>
      <div className="mx-auto flex w-full flex-col gap-4 pt-4 pb-12 overflow-visible">
        {renderPreview(previewMode)}
      </div>
    </div>
  )
}