import AccordionSection from '../common/AccordionSection'
import RadiusSlider from '../common/RadiusSlider'
import { BUSINESS_INVEST_OPTIONS, BUSINESS_CATEGORY_OPTIONS } from '../common/filterOptions'
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
  
  const handleCategoryToggle = (clickedValue) => {
    const actualCategories = BUSINESS_CATEGORY_OPTIONS.filter(opt => opt !== 'Select All')
    const currentSelected = filterState.businessCategories || []

    if (clickedValue === 'Select All') {
      const isAllSelected = currentSelected.includes('Select All') || currentSelected.length >= actualCategories.length

      if (isAllSelected) {
        onUpdate('businessCategories', [])
      } else {
        onUpdate('businessCategories', [...BUSINESS_CATEGORY_OPTIONS])
      }
    } else {
      let newSelected

      if (currentSelected.includes(clickedValue)) {
        newSelected = currentSelected.filter(item => item !== clickedValue && item !== 'Select All')
      } else {
        newSelected = [...currentSelected, clickedValue]
        const selectedActualsCount = newSelected.filter(item => item !== 'Select All').length
        if (selectedActualsCount === actualCategories.length) {
          newSelected.push('Select All')
        }
      }
      onUpdate('businessCategories', newSelected)
    }
  }

    return (
      <div className={isMobile ? 'flex flex-col gap-[2px]' : 'grid grid-cols-[1fr_auto_1fr] gap-y-[2px]'}>
        {/* Left column */}
        <div className="flex flex-col gap-[2px]">
          {showRadiusInAccordion && (
            <>
              <AccordionSection
                title="Search Radius"
                icon={true}
                collapsible
                borderless
                open={isOpen('radius')}
                onToggle={() => onToggleSection('radius')}
              >
                <RadiusSlider value={filterState.radius} onChange={(value) => onUpdate('radius', value)} />
              </AccordionSection>
              <div className="h-px bg-gray-200 my-[2px]" />
            </>
          )}

          <AccordionSection
            title="Active Business"
            icon={true}
            collapsible
            open={isOpen('opportunity')}
            onToggle={() => onToggleSection('opportunity')}
          >
            <OpportunityFilter
              selected={filterState.opportunities}
              onToggle={(value) => onUpdate('opportunities', value, true)}
            />
          </AccordionSection>
          <div className="h-px bg-gray-200 my-[2px]" />

          <AccordionSection
            title=" Budget"
            icon={true}
            collapsible
            open={isOpen('budget')}
            onToggle={() => onToggleSection('budget')}
          >
            <div className="grid grid-cols-3 gap-[2px]">
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

        {/* Vertical divider for desktop */}
        <div className="hidden lg:block w-px bg-gray-200 mx-[2px]" />

        {/* Right column */}
        <div className="flex flex-col gap-[2px]">
          <AccordionSection
            title="Business Category"
            icon={true}
            collapsible
            open={isOpen('category')}
            onToggle={() => onToggleSection('category')}
            highlight
          >
            <BusinessCategoryFilter
              selected={filterState.businessCategories}
              onToggle={handleCategoryToggle}
            />
          </AccordionSection>
        </div>
      </div>
    )
}