import AccordionSection from '../common/AccordionSection'
import RadiusSlider from '../common/RadiusSlider'
import { BUSINESS_INVEST_OPTIONS } from '../common/filterOptions'
import { StyledSelect } from '../common/BudgetFilter'
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
            icon={true}
            collapsible={!isMobile}
            open={isOpen('radius')}
            onToggle={() => onToggleSection('radius')}
          >
            <RadiusSlider value={filterState.radius} onChange={(value) => onUpdate('radius', value)} />
          </AccordionSection>
        )}

        <AccordionSection
          title="Business Opportunities"
          icon={true}
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
          title="Investment Range"
          icon={true}
          collapsible={!isMobile}
          open={isOpen('budget')}
          onToggle={() => onToggleSection('budget')}
        >
          <div className="grid grid-cols-2 gap-1.5">
            <StyledSelect
              value={filterState.budgetMin}
              onChange={(value) => onUpdate('budgetMin', value)}
              placeholder="Min Investment"
              options={BUSINESS_INVEST_OPTIONS}
            />
            <StyledSelect
              value={filterState.budgetMax}
              onChange={(value) => onUpdate('budgetMax', value)}
              placeholder="Max Investment"
              options={BUSINESS_INVEST_OPTIONS}
            />
          </div>
        </AccordionSection>
      </div>

      {/* Right Column */}
      <div className="flex flex-col">
        <AccordionSection
          title="Business Category"
          icon={true}
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
