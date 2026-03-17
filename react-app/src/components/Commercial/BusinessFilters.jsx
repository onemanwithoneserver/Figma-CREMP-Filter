import { Briefcase, IndianRupee, LayoutGrid, MapPin } from 'lucide-react'
import AccordionSection from '../common/AccordionSection'
import RadiusSlider from '../common/RadiusSlider'
import { BUSINESS_INVEST_OPTIONS } from '../common/filterOptions'
import OpportunityFilter from './OpportunityFilter'
import BusinessCategoryFilter from './BusinessCategoryFilter'

export default function BusinessFilters({
  filterState,
  onUpdate,
  openSections,
  onToggleSection,
  isMobile,
  showRadiusInAccordion = isMobile,
}) {
  const isOpen = (id) => openSections.includes(id)

  return (
    <div className={isMobile ? 'flex flex-col gap-y-0.5' : 'grid grid-cols-1 gap-x-2 gap-y-0.5 lg:grid-cols-2'}>
      {/* Left Column */}
      <div className="flex flex-col">
        {showRadiusInAccordion && (
          <AccordionSection
            title="Search Radius"
            icon={MapPin}
            collapsible={!isMobile}
            open={isOpen('radius')}
            onToggle={() => onToggleSection('radius')}
          >
            <RadiusSlider value={filterState.radius} onChange={(value) => onUpdate('radius', value)} />
          </AccordionSection>
        )}

        <AccordionSection
          title="Business Opportunities"
          icon={Briefcase}
          collapsible={!isMobile}
          open={isOpen('opportunity')}
          onToggle={() => onToggleSection('opportunity')}
        >
          <OpportunityFilter
            selected={filterState.opportunities}
            onToggle={(value) => onUpdate('opportunities', value, true)}
          />
        </AccordionSection>

        <AccordionSection
          title="Budget Range"
          icon={IndianRupee}
          collapsible={!isMobile}
          open={isOpen('budget')}
          onToggle={() => onToggleSection('budget')}
        >
          <div className="pt-1">
            <div className="mb-2">
              <span className="text-[10px] font-semibold tracking-wide text-white">Investment Range</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <select
                value={filterState.budgetMin}
                onChange={(e) => onUpdate('budgetMin', e.target.value)}
                className="rounded-[8px] border border-white/10 bg-[#1C2A44] px-2 py-1.5 text-[11px] text-white outline-none transition-all focus:border-[#C89B3C]/35"
              >
                <option value="">Min Investment</option>
                {BUSINESS_INVEST_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={filterState.budgetMax}
                onChange={(e) => onUpdate('budgetMax', e.target.value)}
                className="rounded-[8px] border border-white/10 bg-[#1C2A44] px-2 py-1.5 text-[11px] text-white outline-none transition-all focus:border-[#C89B3C]/35"
              >
                <option value="">Max Investment</option>
                {BUSINESS_INVEST_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </AccordionSection>
      </div>

      {/* Right Column */}
      <div className="flex flex-col">
        <AccordionSection
          title="Business Category"
          icon={LayoutGrid}
          collapsible={!isMobile}
          open={isOpen('category')}
          onToggle={() => onToggleSection('category')}
          highlight
        >
          <BusinessCategoryFilter
            selected={filterState.businessCategories}
            onToggle={(value) => onUpdate('businessCategories', value, true)}
          />
        </AccordionSection>
      </div>
    </div>
  )
}
