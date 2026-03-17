import AccordionSection from '../common/AccordionSection'
import BudgetFilter from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import {
  COMMERCIAL_INVEST_PER_SFT_OPTIONS,
  COMMERCIAL_INVEST_OVERALL_OPTIONS,
} from '../common/filterOptions'
import PropertyTypeFilter from './PropertyTypeFilter'
import SaleTypeFilter from './SaleTypeFilter'
import SizeFilter from './SizeFilter'

export default function BuyInvestFilters({
  filterState,
  onUpdate,
  openSections,
  onToggleSection,
  isMobile,
  showRadiusInAccordion = isMobile,
  isDesktopView = false,
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
          title="Property Type"
          icon={true}
          collapsible={!isMobile}
          open={isOpen('propertyType')}
          onToggle={() => onToggleSection('propertyType')}
        >
          <PropertyTypeFilter
            selected={filterState.propertyTypes}
            onChange={(newTypes) => onUpdate('propertyTypes', newTypes)}
          />
        </AccordionSection>

        <AccordionSection
          title="Sale Type"
          icon={true}
          collapsible={!isMobile}
          open={isOpen('saleType')}
          onToggle={() => onToggleSection('saleType')}
        >
          <SaleTypeFilter
            selected={filterState.saleTypes}
            onToggle={(value) => onUpdate('saleTypes', value, true)}
          />
        </AccordionSection>
      </div>

      {/* Right Column */}
      <div className="flex flex-col">
        <AccordionSection
          title="Size & Area"
          icon={true}
          collapsible={!isMobile}
          open={isOpen('size')}
          onToggle={() => onToggleSection('size')}
        >
          <SizeFilter
            landMin={filterState.landMin}
            landMax={filterState.landMax}
            onLandMinChange={(value) => onUpdate('landMin', value)}
            onLandMaxChange={(value) => onUpdate('landMax', value)}
            buaMin={filterState.buaMin}
            buaMax={filterState.buaMax}
            onBuaMinChange={(value) => onUpdate('buaMin', value)}
            onBuaMaxChange={(value) => onUpdate('buaMax', value)}
            selectedTypes={filterState.propertyTypes}
            isMobile={isMobile}
            isDesktopView={isDesktopView}
          />
        </AccordionSection>

        <AccordionSection
          title="Investment Range"
          icon={true}
          collapsible={!isMobile}
          open={isOpen('budget')}
          onToggle={() => onToggleSection('budget')}
        >
          <BudgetFilter
            mode={filterState.budgetMode}
            min={filterState.budgetMin}
            max={filterState.budgetMax}
            onModeChange={(value) => onUpdate('budgetMode', value)}
            onMinChange={(value) => onUpdate('budgetMin', value)}
            onMaxChange={(value) => onUpdate('budgetMax', value)}
            perLabel="Price per sq.ft"
            overallLabel="Total Investment"
            perOptions={COMMERCIAL_INVEST_PER_SFT_OPTIONS}
            overallOptions={COMMERCIAL_INVEST_OVERALL_OPTIONS}
          />
        </AccordionSection>
      </div>
    </div>
  )
}
