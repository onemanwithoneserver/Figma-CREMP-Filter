import { useEffect, useMemo, useRef, useState } from 'react'
import RadiusSlider from '../components/common/RadiusSlider'
import LeaseRentFilters from '../components/Commercial/LeaseRentFilters'
import BuyInvestFilters from '../components/Commercial/BuyInvestFilters'
import BusinessFilters from '../components/Commercial/BusinessFilters'
import TopControls from '../components/layout/TopControls'

const TRENDING_SEARCHES = ['Office Space in Hitech City', 'Retail in Banjara Hills', 'Coworking Gachibowli']
const RECENT_SEARCHES = ['Warehouse Shamshabad', 'Office Madhapur']
const SAVED_SEARCHES = ['Retail near Metro', 'Office 5000 sqft Jubilee Hills']
const SEARCHABLE_PROJECTS = ['Skyline Tower - Madhapur', 'Commerce Hub - Kokapet', 'Business Park - Narsingi']

const filterEntries = (entries, query) => {
  if (!query) return entries
  const searchPattern = new RegExp(query, 'i')
  return entries.filter((item) => searchPattern.test(item))
}

function SearchRow({ label, showFavorite = true, showRemove = true }) {
  return (
    <li className="group flex items-center justify-between gap-2 rounded-[4px] px-2 py-1 text-[13px] font-normal text-[#1C2A44]/60 transition-all duration-150 hover:bg-gradient-to-r hover:from-[#1C2A44]/5 hover:to-transparent hover:text-[#1C2A44]">
      <span className="flex items-center gap-2 truncate" title={label}>
        <span className="h-1.5 w-1.5 shrink-0 rounded-[4px] bg-gradient-to-br from-[#1C2A44]/40 to-[#1C2A44]/20" />
        {label}
      </span>
      {showFavorite && showRemove && (
        <div className="flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button className="flex items-center justify-center rounded-[4px] p-1 text-[#1C2A44]/40 transition-colors hover:bg-[#1C2A44]/10 hover:text-[#1C2A44]">
            <span className="text-[14px] leading-none" role="img" aria-label="save">🤍</span>
          </button>
          <button className="text-[12px] font-medium text-[#1C2A44]/40 transition-colors hover:text-[#1C2A44]">Remove</button>
        </div>
      )}
    </li>
  )
}

function SearchGroup({ title, entries, showActions = true, hasDivider = false }) {
  if (entries.length === 0) return null
  return (
    <section className={`flex flex-col gap-1 ${hasDivider ? 'border-t border-gray-200 pt-1.5' : ''}`}>
      <h4 className="px-2 pb-0.5 pt-1.5 text-[11px] font-semibold tracking-widest text-[#1C2A44]/50">{title}</h4>
      <ul className="flex flex-col gap-0.5">
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

  const hasQuery = Boolean(searchText)
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
        className={`${
          isSearchFocused
            ? 'border-[#1C2A44]/30 shadow-sm'
            : 'border-[#1C2A44]/10 shadow-sm hover:border-[#1C2A44]/20'
        } flex items-center gap-1.5 rounded-[4px] border bg-gradient-to-b from-white to-[#F9FAFB] p-1 transition-all duration-200`}
      >
        <div className="m-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-gradient-to-br from-[#1C2A44]/10 to-[#1C2A44]/5 text-[#1C2A44]">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
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
          className="h-full flex-1 bg-transparent px-1 text-[13px] font-medium tracking-wide text-[#1C2A44] placeholder:font-normal placeholder:text-[#1C2A44]/40 focus:outline-none"
        />

        <div className="m-0.5 flex items-center gap-1">
          <button
            onClick={() => {
              setIsSearchFocused(false)
              onOpenFilters?.()
            }}
            className="flex h-7 w-7 items-center justify-center rounded-[4px] text-[#1C2A44] transition-colors hover:bg-[#1C2A44]/10 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
              <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
              <circle cx="9" cy="18" r="2" fill="currentColor" stroke="none" />
            </svg>
          </button>

          <button className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-gradient-to-br from-[#1C2A44] to-[#2A3F66] text-white shadow-sm transition-all hover:opacity-90 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-[4px] border border-[#1C2A44]/10 bg-white/95 shadow-sm backdrop-blur-xl">
          <div className="custom-scrollbar flex max-h-72 flex-col gap-1.5 overflow-auto p-1.5">
            {hasQuery && matchedResults.length > 0 && (
              <SearchGroup title="🔥 TOP MATCHES" entries={matchedResults.slice(0, 5)} />
            )}
            <SearchGroup title="📈 TRENDING NOW" entries={trendingEntries} hasDivider={hasQuery && matchedResults.length > 0} />
            <SearchGroup title="🕒 RECENT SEARCHES" entries={recentEntries} hasDivider={trendingEntries.length > 0 || (hasQuery && matchedResults.length > 0)} />
            <SearchGroup title="⭐ SAVED SEARCHES" entries={savedEntries} showActions={false} hasDivider={recentEntries.length > 0 || trendingEntries.length > 0 || (hasQuery && matchedResults.length > 0)} />

            {!hasQuery && trendingEntries.length === 0 && (
              <div className="m-2 p-2 text-center">
                <p className="text-[12px] font-normal text-[#1C2A44]/50">Start typing to find properties</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-gradient-to-r from-white to-[#F9FAFB] px-3 py-1.5">
            <span className="text-[11px] font-bold tracking-wide text-[#1C2A44]">COMMERCIAL SEARCH</span>
            <span className="text-[11px] text-[#1C2A44]/50">PRESS ESC TO CLOSE</span>
          </div>
        </div>
      )}
    </div>
  )
}

const FILTER_COMPONENTS = {
  BuyInvest: BuyInvestFilters,
  LeaseRent: LeaseRentFilters,
  Business: BusinessFilters,
}

const MODE_TYPES = Object.keys(FILTER_COMPONENTS)

const MODE_CONFIG = {
  BuyInvest: { label: 'Buy / Invest', emoji: '🪙' },
  LeaseRent: { label: 'Lease / Rent', emoji: '🔑' },
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
    mobile: SECTION_IDS.LeaseRent,
  })

  const ActiveFilters = useMemo(() => FILTER_COMPONENTS[activeType], [activeType])
  const activeFilterState = filters[activeType]

  useEffect(() => {
    const defaults = SECTION_IDS[activeType]
    setOpenSections((prev) => {
      if (prev.desktop !== defaults || prev.tablet !== defaults || prev.mobile[0] !== defaults[0]) {
        return {
          desktop: defaults,
          tablet: defaults,
          mobile: defaults,
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
        {/* Top Section with Divider */}
        <div className="z-20 relative flex flex-wrap items-stretch overflow-visible  pb-1 ">
          <div className={`${isMobile ? 'grid min-w-0 flex-1 grid-cols-3 gap-0.5' : 'flex min-w-0 shrink-0 gap-1.5'}`}>
            {MODE_TYPES.map((typeMode) => {
              const config = MODE_CONFIG[typeMode]
              const isActive = activeType === typeMode

              return (
                <button
                  key={`${typeMode}-tab`}
                  type="button"
                  onClick={() => setActiveType(typeMode)}
                  className={`
                    ${isMobile ? 'flex w-full flex-col items-center justify-center  rounded-[4px] px-1 py-1 text-[10px]' : 'flex min-w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-[4px] px-2 py-1.5 text-[11px]'}
                    border font-medium tracking-wide transition-all duration-200
                    ${isActive
                      ? 'border-transparent bg-gradient-to-br from-[#1C2A44] to-[#154eb1] text-white shadow-sm'
                      : 'border-[#1C2A44]/10 bg-gradient-to-b from-white to-[#F9FAFB] text-[#1C2A44]/60 hover:border-[#1C2A44]/20 hover:text-[#1C2A44]'
                    }
                  `}
                >
                   <span className={`text-[12px] leading-none ${isActive ? 'opacity-100' : 'opacity-60 grayscale'}`} role="img" aria-hidden="true">  {config.emoji}</span> 
                 
                  
                  {config.label}
                </button>
              )
            })}
          </div>

          {!isMobile && (
            <div className="z-30 relative flex flex-1 items-center gap-2 overflow-visible px-3 py-1">
              <span className="text-[12px] font-semibold text-[#1C2A44]">Radius</span>
              <div className="min-w-40 flex-1 w-full">
                <RadiusSlider
                  value={activeFilterState.radius}
                  onChange={(value) => updateActiveFilter('radius', value)}
                />
              </div>
            </div>
          )}

          {!isMobile && (
            <div className="flex flex-col items-center justify-center rounded-[4px] bg-gradient-to-r from-[#5c4018] to-[#8c6828] px-2 py-1 text-white shadow-sm">
              <span className="text-[18px] font-bold leading-none">0</span>
              <span className="text-[12px] font-semibold tracking-wider text-white">Projects Found</span>
            </div>
          )}
        </div>

        {/* Mobile Radius with Divider */}
        {isMobile && (
          <div className="flex items-center gap-2 bg-white px-1 py-1">
            <span className="text-[11px] font-semibold text-[#1C2A44]">Radius</span>
            <div className="flex-1 w-full">
              <RadiusSlider
                value={activeFilterState.radius}
                onChange={(value) => updateActiveFilter('radius', value)}
              />
            </div>
          </div>
        )}

        {/* Filter Body Area */}
        <div className="py-1">
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

        {/* Footer Actions with Divider */}
        <div className="flex items-center gap-2 pt-1 mt-2">
          <button
            type="button"
            className="rounded-[4px] px-2 py-1.5 text-[11px] font-medium text-[#1C2A44]/60 transition-all hover:bg-[#1C2A44]/5 hover:text-[#1C2A44] active:scale-95"
          >
            Clear All
          </button>
          <button
            type="button"
            className="rounded-[4px] border border-[#1C2A44]/15 bg-gradient-to-b from-white to-[#F9FAFB] px-3 py-1.5 text-[11px] font-semibold text-[#1C2A44] shadow-sm transition-all hover:border-[#1C2A44]/25 active:scale-95"
          >
            Save Search
          </button>
          <button
            type="button"
            className="relative overflow-hidden ml-auto flex items-center justify-center gap-2 rounded-[4px] bg-gradient-to-br from-[#7a5a1f] to-[#c89b3c] px-4 py-1.5 text-[12px] font-semibold tracking-wide text-white shadow-sm border border-white/20 transition-all duration-200 hover:from-[#6a4d1a] hover:to-[#b8892e] hover:-translate-y-[1px] active:scale-95 active:translate-y-0 active:shadow-none after:absolute after:top-0 after:-left-[50%] after:h-full after:w-[50%] after:bg-white/20 after:-skew-x-[25deg] after:transition-all after:duration-500 hover:after:left-[120%]"
          >
            View Properties
          </button>
        </div>
      </>
    )

    if (isDesktop) {
      return (
        <div className="z-10 relative grid grid-cols-[minmax(0,1fr)_300px] gap-2 overflow-visible">
          <div className="z-20 relative flex min-w-0 flex-col overflow-visible">{filterControls}</div>

          <aside className="flex h-full flex-col items-center rounded-[4px] border border-[#1C2A44]/10 p-2 text-white shadow-sm">
            <div className="inline-flex self-start rounded-[4px] bg-white/10 px-1.5 py-0.5">
              <p className="text-[10px] font-bold tracking-widest text-[#1C2A44]">Sample AD</p>
            </div>
            <p className="mt-3 text-[12px] font-normal leading-relaxed text-white/70">
              ..
            </p>
          </aside>
        </div>
      )
    }

    return <div className="z-10 relative flex flex-col overflow-visible">{filterControls}</div>
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
        className={`mx-auto w-full overflow-visible transition-all duration-200 ${
          previewMode === mode ? 'opacity-100' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'
        }`}
      >
        <div className={`${viewportShellClass} relative flex flex-col gap-1.5 p-1.5 overflow-visible`}>
          <div className="z-40 mx-auto flex w-full justify-center px-1">
            <div className="w-full max-w-125">
              <FilterSearchPanel
                onOpenFilters={() => toggleFiltersForMode(mode)}
                onSearchFocusChange={(isFocused) => handleSearchFocusChange(mode, isFocused)}
                autoFocusInput={false}
              />
            </div>
          </div>

          <div
            className={`relative z-30 flex w-full justify-center transition-all duration-300 ease-out ${
              showModeFilters ? 'translate-y-0 opacity-100' : '-translate-y-1 h-0 overflow-hidden opacity-0'
            }`}
          >
            <div
              className={`${
                mode === 'desktop'
                  ? 'w-full max-w-305'
                  : mode === 'tablet'
                    ? 'w-full max-w-205'
                    : 'w-full max-w-100'
              } rounded-[4px] bg-white ${mode === 'mobile' ? 'p-1.5' : 'p-2'} overflow-visible shadow-sm border border-[#1C2A44]/10`}
            >
              {showModeFilters ? renderFilterBody(mode) : null}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB] font-sans text-[#1C2A44] overflow-visible">
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 pb-1.5 pt-1.5 shadow-sm backdrop-blur-md">
        <TopControls
          previewMode={previewMode}
          onPreviewModeChange={setPreviewMode}
        />
      </div>
      <div className="mx-auto flex w-full flex-col gap-2 pb-12 pt-3 overflow-visible">
        {renderPreview(previewMode)}
      </div>
    </div>
  )
}