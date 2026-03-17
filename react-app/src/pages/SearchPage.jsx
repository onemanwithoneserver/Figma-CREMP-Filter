import { Heart, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import RadiusSlider from '../components/common/RadiusSlider'
import FlatsFilters from '../components/Flats/FlatsFilters'
import PlotsFilters from '../components/Plots/PlotsFilters'
import SkyVillasFilters from '../components/SkyVillas/SkyVillasFilters'
import ResultsSection from '../components/layout/ResultsSection'
import TopControls from '../components/layout/TopControls'
import VillasFilters from '../components/Villas/VillasFilters'

// --- SEARCH PANEL COMPONENT --- //
const TRENDING_SEARCHES = ['Flats in Hyderabad', 'Plots in Future City', 'Luxury Villas']
const RECENT_SEARCHES = ['Kompally flats', 'Gachibowli Villas']
const SAVED_SEARCHES = ['3BHK near office', 'Flats near Suchitra']
const SEARCHABLE_PROJECTS = ['Urban Nest - Madhapur', 'Skyline - Kokapet', 'Aero - Narsingi']

const filterEntries = (entries, query) => {
  if (!query) return entries
  const normalizedQuery = query.trim().toLowerCase()
  return entries.filter((item) => item.toLowerCase().includes(normalizedQuery))
}

function SearchRow({ label, showFavorite = true, showRemove = true }) {
  return (
    <li className="group flex items-center justify-between gap-4 rounded-[6px] p-1.5 text-[15px] font-normal text-[#333333] transition-colors duration-200 hover:bg-[#FFF3EB]">
      <span className="flex items-center gap-2 truncate" title={label}>
        <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#FF6A00]" />
        {label}
      </span>
      {showFavorite && showRemove && (
        <div className="flex items-center gap-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button className="flex items-center justify-center rounded-[5px] p-1 text-[#8C8C8C] transition-colors hover:text-[#FF6A00]">
            <Heart size={14} strokeWidth={1.75} />
          </button>
          <button className="text-[13px] font-medium text-[#8C8C8C] transition-colors hover:text-[#FF6A00]">Remove</button>
        </div>
      )}
    </li>
  )
}

function SearchGroup({ title, entries, showActions = true, hasDivider = false }) {
  if (entries.length === 0) return null;
  return (
    <section className={`flex flex-col gap-1 ${hasDivider ? 'border-t border-[#ECECEC] pt-1' : ''}`}>
      <h4 className="px-2 py-1 text-[16px] font-semibold text-[#1E1E1E]">{title}</h4>
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
            ? 'border-[#D9D9D9] shadow-md' 
            : 'border-[#ECECEC] shadow-sm hover:border-[#D9D9D9]'
          }`}
      >
        {/* Left icon swapped to Brown */}
        <div className="m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-[#1E1E1E]/10 text-[#1E1E1E]">
          <div className="h-3 w-3 rotate-45 border-2 border-current rounded-sm"></div>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 200)}
          placeholder="Search locations, projects, or builders"
          className="h-full flex-1 bg-transparent px-1 text-[14px] font-medium tracking-wide text-[#1E1E1E] placeholder:font-light placeholder:text-[#1E1E1E]/50 focus:outline-none"
        />

        <div className="m-1 flex items-center gap-1">
          {/* Filter button swapped to Orange */}
          <button
            onClick={() => {
              setIsSearchFocused(false)
              onOpenFilters?.()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#FF6A00] text-white shadow-sm transition-colors hover:bg-[#E85F00]/90 active:scale-95"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
          </button>
          
          {/* Search button swapped to Brown (Selected/Primary BG rule) */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#1E1E1E] text-white shadow-sm transition-colors hover:bg-[#1E1E1E]/90 active:scale-95"
          >
            <Search size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[5px] border border-[#1E1E1E]/10 bg-white/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(30,30,30,0.12)]">
          <div className="custom-scrollbar flex max-h-[320px] flex-col gap-2 overflow-auto p-2">
            {hasQuery && matchedResults.length > 0 && (
              <SearchGroup title="Top Matches" entries={matchedResults.slice(0, 5)} />
            )}
            <SearchGroup title="Trending Now" entries={trendingEntries} hasDivider={hasQuery && matchedResults.length > 0} />
            <SearchGroup title="Recent Searches" entries={recentEntries} hasDivider={trendingEntries.length > 0 || (hasQuery && matchedResults.length > 0)} />
            <SearchGroup title="Saved Searches" entries={savedEntries} showActions={false} hasDivider={recentEntries.length > 0 || trendingEntries.length > 0 || (hasQuery && matchedResults.length > 0)} />

            {(!hasQuery && trendingEntries.length === 0) && (
              <div className="m-2 p-2 text-center">
                <p className="text-[13px] font-light text-[#1E1E1E]/50">Start typing to find properties</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// --- MAIN SEARCH PAGE COMPONENT --- //
const FILTER_COMPONENTS = {
  Flats: FlatsFilters,
  SkyVillas: SkyVillasFilters,
  Villas: VillasFilters,
  Plots: PlotsFilters,
}

const PROPERTY_TYPES = Object.keys(FILTER_COMPONENTS)

const PROPERTY_TYPE_ICONS = {
  Flats: '🏢',
  SkyVillas: '🏙️',
  Villas: '🏡',
  Plots: '🌄',
}

const SECTION_IDS = {
  Flats: ['radius', 'unitSize', 'budget', 'projectType', 'projectStatus', 'specialOffers'],
  SkyVillas: ['radius', 'unitSize', 'budget', 'projectType', 'projectStatus', 'specialOffers'],
  Villas: ['radius', 'unitSize', 'budget', 'projectType', 'projectStatus', 'specialOffers'],
  Plots: ['radius', 'plotSize', 'budget', 'projectType', 'approvals', 'plotType', 'speciality'],
}

const createFilterState = (defaultRadius = 50) => ({
  radius: defaultRadius,
  budgetMode: 'per',
  budgetMin: '',
  budgetMax: '',
  unitSizes: [],
  unitAreaMin: '',
  unitAreaMax: '',
  villasPlotMin: '',
  villasPlotMax: '',
  villasBuiltupMin: '',
  villasBuiltupMax: '',
  plotsPlotMin: '',
  plotsPlotMax: '',
  orrDistance: '',
  projectTypes: [],
  projectStatuses: [],
  propertyAges: [],
  specialOffers: [],
  plotSizes: [],
  approvals: [],
  finalPermissions: [],
  plotTypes: [],
  saleTypes: [],
  specialityProjects: [],
})

const DEFAULT_FILTERS = {
  Flats: createFilterState(50),
  SkyVillas: createFilterState(50),
  Villas: createFilterState(50),
  Plots: createFilterState(50),
}

export default function SearchPage() {
  const [previewMode, setPreviewMode] = useState('desktop')
  const [activeType, setActiveType] = useState('SkyVillas')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [showFilters, setShowFilters] = useState({ desktop: false, tablet: false, mobile: false })
  const [isSearchOpen, setIsSearchOpen] = useState({ desktop: false, tablet: false, mobile: false })
  const [openSections, setOpenSections] = useState({
    desktop: SECTION_IDS.SkyVillas,
    tablet: SECTION_IDS.SkyVillas,
    mobile: [SECTION_IDS.SkyVillas[0]],
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
          
          {/* Property Type Toggles */}
          <div className={`${isMobile ? 'grid min-w-0 flex-1 grid-cols-4 gap-2' : 'flex min-w-0 shrink-0 gap-2'}`}>
            {PROPERTY_TYPES.map((type) => {
              const typeEmoji = PROPERTY_TYPE_ICONS[type]
              const isActive = activeType === type

              return (
                <button
                  key={`${mode}-${type}`}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`
                    ${isMobile ? 'flex w-full flex-col items-center justify-center gap-1 rounded-[5px] p-2 text-[10px]' : 'flex shrink-0 flex-col items-center justify-center gap-1 rounded-[5px] px-4 py-2 text-[12px] min-w-[80px]'}
                    font-medium tracking-wide transition-all duration-300 border
                    ${isActive
                      ? 'bg-[#1E1E1E] text-white border-[#1E1E1E] shadow-md scale-[0.98]' // Selected = Brown bg, White text
                      : 'bg-transparent text-[#4B4B4B] border-[#1E1E1E]/10 hover:bg-[#1E1E1E]/5 hover:text-[#1E1E1E]'
                    }
                  `}
                >
                  <span className={`text-[16px] leading-none ${isActive ? 'opacity-100' : 'opacity-70 grayscale'}`} role="img" aria-hidden="true">{typeEmoji}</span>
                  {type === 'SkyVillas' ? 'Sky Villas' : type}
                </button>
              )
            })}
          </div>

          {/* Desktop Radius Slider */}
          {!isMobile && (
            <div className="flex flex-1 items-center gap-4 rounded-[5px]  bg-white px-4 py-2  z-30 overflow-visible relative">
              <span className="text-[13px] font-semibold tracking-wide text-[#1E1E1E]">Radius</span>
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
            <div className="flex flex-col items-center justify-center rounded-[5px] bg-[#FF6A00] px-5 py-2 text-white shadow-md">
              <span className="text-[20px] font-bold leading-none">0</span>
              <span className="text-[10px] uppercase tracking-wider text-white/90">Projects</span>
            </div>
          )}
        </div>

        {/* Mobile Radius Slider */}
        {isMobile && (
          <div className="mt-2 flex items-center gap-4 rounded-[5px] border border-[#1E1E1E]/10 bg-white px-4 py-2 shadow-sm z-30 overflow-visible relative">
            <span className="text-[12px] font-semibold tracking-wide text-[#1E1E1E]">Radius</span>
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
        <div className=" flex items-center pt-1 ">
          <button
            type="button"
            className="rounded-[5px] px-1 py-1 text-[13px] font-medium text-[#1E1E1E] transition-all hover:bg-[#1E1E1E]/5 hover:text-[#1E1E1E]"
          >
            Clear All
          </button>
          <button
            type="button"
            className="rounded-[5px] border border-[#1E1E1E]/20 bg-white px-4 py-2 text-[13px] font-medium text-[#1E1E1E] shadow-sm transition-all hover:border-[#1E1E1E]/40 hover:bg-[#FFFFFF]"
          >
            Save Search
          </button>
          {/* Show Properties Button - Swapped to Brown (Selected/Primary BG Rule) */}
          <button
            type="button"
            className="ml-auto rounded-[5px] bg-[#1E1E1E] px-6 py-2 text-[13px] font-bold tracking-wide text-white shadow-[0_4px_12px_rgba(30,30,30,0.2)] transition-all duration-300 hover:bg-[#1E1E1E]/90 active:scale-95"
          >
            Show 0 Properties
          </button>
        </div>
      </>
    )

    if (isDesktop) {
      return (
        <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-4 z-10 relative overflow-visible">
          <div className="flex min-w-0 flex-col z-20 relative overflow-visible">{filterControls}</div>
          
          {/* Sample Ad / Premium Boost Box - REMAINS COMPLETELY UNCHANGED PER YOUR RULE */}
          <aside className="rounded-[5px] bg-[#1E1E1E] p-5 text-white shadow-lg h-full flex flex-col">
            <div className="inline-flex rounded-[3px] bg-[#FF6A00]/20 px-2 py-1 self-start">
              <p className="text-[10px] font-bold tracking-widest text-[#FF6A00] ">Sample Add</p>
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
              } rounded-[5px] border border-[#1E1E1E]/5 bg-[#FFFFFF] p-4 overflow-visible`}
            >
              {showModeFilters ? renderFilterBody(mode) : null}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans text-[#1E1E1E] overflow-visible">
      <div className="sticky top-0 z-50 bg-[#F7F7F7]/80 backdrop-blur-md pt-2 pb-2 border-b border-[#1E1E1E]/5">
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