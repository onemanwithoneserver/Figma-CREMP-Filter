import { Heart, LocateFixed, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

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
        className={`flex items-center gap-2 rounded-[8px] border bg-[#1C2A44] p-1 transition-all duration-300
          ${isSearchFocused 
            ? 'border-2 border-[#C89B3C] shadow-[0_0_0_2px_rgba(200,155,60,0.2)]' 
            : 'border-white/8 shadow-sm hover:border-white/12 hover:bg-[#1C2A44]'
          }`}
      >
        <div className="m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#C89B3C]/10 text-[#C89B3C]">
          <LocateFixed size={14} strokeWidth={1.5} />
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
          <button
            onClick={() => onOpenFilters?.()}
            className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[#C89B3C] transition-colors hover:bg-[#E6C36A]/10"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
          </button>
          
          <button
            className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#C89B3C] text-white transition-colors hover:bg-[#E6C36A]/90 active:bg-[#B8892F]"
          >
            <Search size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[8px] border border-white/10 bg-[#1C2A44]/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
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
          
          <div className="flex items-center justify-between border-t border-white/5 bg-[#1C2A44] p-2">
             <span className="ml-1 text-[11px] font-bold tracking-wide text-[#C89B3C]">🏢 Commercial Search</span>
             <span className="mr-1 text-[13px] text-white/40">Press ESC to close</span>
          </div>
        </div>
      )}
    </div>
  )
}