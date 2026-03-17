import { Heart, LocateFixed, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

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

export default function FilterSearchPanel({ onOpenFilters, autoFocusInput = false }) {
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

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div 
        className={`flex items-center gap-2 rounded-[5px] border bg-[#FFFFFF] p-1 transition-all duration-300
          ${isSearchFocused 
            ? 'border-2 border-[#FF6A00] shadow-[0_0_0_2px_rgba(255,106,0,0.15)]' 
            : 'border-[#ECECEC] shadow-sm hover:border-[#D9D9D9] hover:bg-white'
          }`}
      >
        <div className="m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-[#FF6A00]/10 text-[#FF6A00]">
          <LocateFixed size={14} strokeWidth={1.5} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 200)}
          placeholder="Search locations, projects, or builders"
          className="h-full flex-1 bg-transparent px-1 text-[14px] font-medium tracking-wide text-[#1E1E1E] placeholder:font-light placeholder:text-[#1E1E1E]/40 focus:outline-none"
        />

        <div className="m-1 flex items-center gap-1">
          <button
            onClick={() => onOpenFilters?.()}
            className="flex h-8 w-8 items-center justify-center rounded-[5px] text-[#FF6A00] transition-colors hover:bg-[#E85F00]/10"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
          </button>
          
          <button
            className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#FF6A00] text-white transition-colors hover:bg-[#E85F00]/90 active:bg-[#C94F00]"
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
          
          <div className="flex items-center justify-between border-t border-[#1E1E1E]/5 bg-[#FFFFFF] p-2">
             <span className="ml-1 text-[11px] font-bold tracking-wide text-[#FF6A00]">Premium Search</span>
             <span className="mr-1 text-[13px] text-[#8C8C8C]">Press ESC to close</span>
          </div>
        </div>
      )}
    </div>
  )
}