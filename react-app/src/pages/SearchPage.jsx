import { Heart, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import RadiusSlider from '../components/common/RadiusSlider'
import LeaseRentFilters from '../components/Commercial/LeaseRentFilters'
import BuyInvestFilters from '../components/Commercial/BuyInvestFilters'
import BusinessFilters from '../components/Commercial/BusinessFilters'
import ResultsSection from '../components/layout/ResultsSection'
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
    <li className="group flex items-center justify-between gap-4 rounded-[8px] p-1.5 text-[15px] font-normal text-[#D1D5DB] transition-colors duration-200 hover:bg-[#C89B3C]/10">
      <span className="flex items-center gap-2 truncate" title={label}>
        <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#C89B3C]" />
        {label}
      </span>
      {showFavorite && showRemove && (
        <div className="flex items-center gap-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button className="flex items-center justify-center rounded-[8px] p-1 text-white/40 transition-colors hover:text-[#C89B3C]">
            <Heart size={14} strokeWidth={1.75} />
          </button>
          <button className="text-[13px] font-medium text-white/40 transition-colors hover:text-[#C89B3C]">Remove</button>
        </div>
      )}
    </li>
  )
}

function SearchGroup({ title, entries, showActions = true, hasDivider = false }) {
  if (entries.length === 0) return null;
  return (
    <section className={`flex flex-col gap-1 ${hasDivider ? 'border-t border-white/8 pt-1' : ''}`}>
      <h4 className="px-2 py-1 text-[16px] font-semibold text-white">{title}</h4>
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
        className={`flex items-center gap-2 rounded-[10px] border bg-[#1C2A44] p-1 transition-all duration-300
          ${isSearchFocused 
            ? 'border-[#C89B3C]/40 shadow-[0_0_0_2px_rgba(200,155,60,0.15)]' 
            : 'border-white/8 shadow-sm hover:border-white/12'
          }`}
      >
        {/* Location pin icon */}
        <div className="m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#C89B3C]/10 text-[#C89B3C]">
          <Search size={14} strokeWidth={1.5} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 200)}
          placeholder="Search locations, projects, or properties"
          className="h-full flex-1 bg-transparent px-1 text-[14px] font-medium tracking-wide text-white placeholder:font-light placeholder:text-white/40 focus:outline-none"
        />

        <div className="m-1 flex items-center gap-1">
          {/* Filter toggle */}
          <button
            onClick={() => {
              setIsSearchFocused(false)
              onOpenFilters?.()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[#C89B3C] transition-colors hover:bg-[#C89B3C]/10 active:scale-95"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
          </button>
          
          {/* Search CTA */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#C89B3C] text-[#0F1B2E] shadow-sm transition-colors hover:bg-[#E6C36A] active:scale-95"
          >
            <Search size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[10px] border border-white/10 bg-[#1C2A44]/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div className="custom-scrollbar flex max-h-[320px] flex-col gap-2 overflow-auto p-2">
            {hasQuery && matchedResults.length > 0 && (
              <SearchGroup title="🔥 Top Matches" entries={matchedResults.slice(0, 5)} />
            )}
            <SearchGroup title="📈 Trending Now" entries={trendingEntries} hasDivider={hasQuery && matchedResults.length > 0} />
            <SearchGroup title="🕒 Recent Searches" entries={recentEntries} hasDivider={trendingEntries.length > 0 || (hasQuery && matchedResults.length > 0)} />
            <SearchGroup title="⭐ Saved Searches" entries={savedEntries} showActions={false} hasDivider={recentEntries.length > 0 || trendingEntries.length > 0 || (hasQuery && matchedResults.length > 0)} />

            {(!hasQuery && trendingEntries.length === 0) && (
              <div className="m-2 p-2 text-center">
                <p className="text-[13px] font-light text-white/50">Start typing to find properties</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 bg-[#1C2A44] px-3 py-2">
            <span className="text-[11px] font-bold tracking-wide text-[#C89B3C]">🏢 Commercial Search</span>
            <span className="text-[12px] text-white/40">Press ESC to close</span>
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
  BuyInvest: { label: 'Buy / Invest', emoji: '🏪' },
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
                    ${isMobile ? 'flex w-full flex-col items-center justify-center gap-1 rounded-[8px] p-2 text-[10px]' : 'flex shrink-0 flex-col items-center justify-center gap-1 rounded-[8px] px-4 py-2 text-[12px] min-w-[100px]'}
                    font-medium tracking-wide transition-all duration-300 border
                    ${isActive
                      ? 'bg-[#C89B3C] text-[#0F1B2E] border-[#C89B3C] shadow-md scale-[0.98]'
                      : 'bg-transparent text-[#D1D5DB] border-white/10 hover:bg-[#C89B3C]/5 hover:text-white'
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
            <div className="flex flex-1 items-center gap-4 rounded-[8px]  bg-[#1C2A44] px-4 py-2  z-30 overflow-visible relative">
              <span className="text-[13px] font-semibold tracking-wide text-white">📍 Radius</span>
              <div className="flex-1 w-full min-w-50">
                <RadiusSlider
                  value={activeFilterState.radius}
                  onChange={(value) => updateActiveFilter('radius', value)}
                />
              </div>
            </div>
          )}

          {/* Projects Count Box - Swapped to Orange */}
          {!isMobile && (
            <div className="flex flex-col items-center justify-center rounded-[8px] bg-[#C89B3C] px-5 py-2 text-[#0F1B2E] shadow-md">
              <span className="text-[20px] font-bold leading-none">0</span>
              <span className="text-[10px] uppercase tracking-wider text-[#0F1B2E]/80">Projects</span>
            </div>
          )}
        </div>

        {/* Mobile Radius Slider */}
        {isMobile && (
          <div className="mt-2 flex items-center gap-4 rounded-[8px] border border-white/10 bg-[#1C2A44] px-4 py-2 shadow-sm z-30 overflow-visible relative">
            <span className="text-[12px] font-semibold tracking-wide text-white">📍 Radius</span>
            <div className="flex-1 w-full">
              <RadiusSlider
                value={activeFilterState.radius}
                onChange={(value) => updateActiveFilter('radius', value)}
              />
            </div>
          </div>
        )}

        {/* Filter Grids Area */}
        <div className="mt-1 rounded-[8px]">
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
        <div className=" flex items-center pt-1 ">
          <button
            type="button"
            className="rounded-[8px] px-1 py-1 text-[13px] font-medium text-white transition-all hover:bg-[#C89B3C]/5 hover:text-white"
          >
            🗑️ Clear All
          </button>
          <button
            type="button"
            className="rounded-[8px] border border-white/20 bg-[#1C2A44] px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-all hover:border-white/40 hover:bg-[#1C2A44]"
          >
            💾 Save Search
          </button>
          {/* Show Properties Button - Swapped to Brown (Selected/Primary BG Rule) */}
          <button
            type="button"
            className="ml-auto rounded-[8px] bg-[#C89B3C] px-6 py-2 text-[13px] font-bold tracking-wide text-[#0F1B2E] shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-[#C89B3C]/90 active:scale-95"
          >
            🔍 View Properties (0)
          </button>
        </div>
      </>
    )

    if (isDesktop) {
      return (
        <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-4 z-10 relative overflow-visible">
          <div className="flex min-w-0 flex-col z-20 relative overflow-visible">{filterControls}</div>
          
          {/* Sample Ad / Premium Boost Box - REMAINS COMPLETELY UNCHANGED PER YOUR RULE */}
          <aside className="rounded-[8px] bg-[#C89B3C] p-5 text-[#0F1B2E] shadow-lg h-full flex flex-col">
            <div className="inline-flex rounded-[3px] bg-[#0F1B2E]/20 px-2 py-1 self-start">
              <p className="text-[10px] font-bold tracking-widest text-[#0F1B2E] ">Sample Add</p>
            </div>
            <p className="mt-3 text-[14px] font-light leading-snug text-[#0F1B2E]/70">
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
              } rounded-[8px] border border-white/5 bg-[#1C2A44] p-4 overflow-visible`}
            >
              {showModeFilters ? renderFilterBody(mode) : null}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F1B2E] font-sans text-white overflow-visible">
      <div className="sticky top-0 z-50 bg-[#0F1B2E]/80 backdrop-blur-md pt-2 pb-2 border-b border-white/5">
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