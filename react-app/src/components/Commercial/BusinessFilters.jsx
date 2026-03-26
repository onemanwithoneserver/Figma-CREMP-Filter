import AccordionSection from '../common/AccordionSection'
import RadiusSlider from '../common/RadiusSlider'
// 1. Import your newly added options array
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

  // 2. Add custom logic to handle the array manipulation
  const handleCategoryToggle = (clickedValue) => {
    // Get all real categories (excluding 'Select All')
    const actualCategories = BUSINESS_CATEGORY_OPTIONS.filter(opt => opt !== 'Select All')
    const currentSelected = filterState.businessCategories || []

    if (clickedValue === 'Select All') {
      // Check if everything is currently selected
      const isAllSelected = currentSelected.includes('Select All') || currentSelected.length >= actualCategories.length

      if (isAllSelected) {
        // If everything is selected, clear the array
        // Note: Passing the array without the 'true' 3rd argument usually replaces the state entirely
        onUpdate('businessCategories', [])
      } else {
        // If not all are selected, select everything (including the 'Select All' string for the UI)
        onUpdate('businessCategories', [...BUSINESS_CATEGORY_OPTIONS])
      }
    } else {
      // Logic for clicking a standard individual category
      let newSelected;

      if (currentSelected.includes(clickedValue)) {
        // Unchecking an item: remove the item, and also ensure 'Select All' gets removed
        newSelected = currentSelected.filter(item => item !== clickedValue && item !== 'Select All')
      } else {
        // Checking an item: add it to the array
        newSelected = [...currentSelected, clickedValue]

        // Auto-check 'Select All' if clicking this item means all actual categories are now selected
        const selectedActualsCount = newSelected.filter(item => item !== 'Select All').length
        if (selectedActualsCount === actualCategories.length) {
          newSelected.push('Select All')
        }
      }

      // Update the state with the newly calculated array
      onUpdate('businessCategories', newSelected)
    }
  }

  return (
    <div className={isMobile ? 'flex flex-col gap-y-1' : 'grid grid-cols-1 gap-x-4 gap-y-1 lg:grid-cols-2'}>
      {/* Left Column */}
      <div className="flex flex-col gap-y-1">
        {showRadiusInAccordion && (
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

        <AccordionSection
          title="Investment Range"
          icon={true}
          collapsible
          open={isOpen('budget')}
          onToggle={() => onToggleSection('budget')}
        >
          <div className="grid grid-cols-2 gap-2">
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
      <div className="flex flex-col gap-y-1">
        <AccordionSection
          title="Business Category"
          icon={true}
          collapsible
          open={isOpen('category')}
          onToggle={() => onToggleSection('category')}
          highlight
        >
          {/* 3. Pass the new handler here instead of the inline function */}
          <BusinessCategoryFilter
            selected={filterState.businessCategories}
            onToggle={handleCategoryToggle}
          />
        </AccordionSection>
      </div>
    </div>
  )
}