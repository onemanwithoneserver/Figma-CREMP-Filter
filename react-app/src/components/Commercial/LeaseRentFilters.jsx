import { Building, IndianRupee, LandPlot, MapPin, Scale, ToggleRight } from 'lucide-react'
import AccordionSection from '../common/AccordionSection'
import BudgetFilter from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import {
  COMMERCIAL_RENT_PER_SFT_OPTIONS,
  COMMERCIAL_RENT_OVERALL_OPTIONS,
} from '../common/filterOptions'
import PropertyTypeFilter from './PropertyTypeFilter'
import SizeFilter from './SizeFilter'
import SubleaseToggle from './SubleaseToggle'

export default function LeaseRentFilters({
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
            icon={MapPin}
            collapsible={!isMobile}
            open={isOpen('radius')}
            onToggle={() => onToggleSection('radius')}
          >
            <RadiusSlider value={filterState.radius} onChange={(value) => onUpdate('radius', value)} />
          </AccordionSection>
        )}

        <AccordionSection
          title="Property Category"
          icon={Building}
          collapsible={!isMobile}
          open={isOpen('propertyType')}
          onToggle={() => onToggleSection('propertyType')}
        >
          <PropertyTypeFilter
            selected={filterState.propertyTypes}
            onToggle={(value) => onUpdate('propertyTypes', value, true)}
            isDesktopView={isDesktopView}
          />
        </AccordionSection>

        <AccordionSection
          title="Size & Area"
          icon={Scale}
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
            isMobile={isMobile}
            isDesktopView={isDesktopView}
          />
        </AccordionSection>
      </div>

      {/* Right Column */}
      <div className="flex flex-col">
        <AccordionSection
          title="Budget Range"
          icon={IndianRupee}
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
            perLabel="Per Sft"
            overallLabel="Overall"
            perOptions={COMMERCIAL_RENT_PER_SFT_OPTIONS}
            overallOptions={COMMERCIAL_RENT_OVERALL_OPTIONS}
          />
        </AccordionSection>

        <AccordionSection
          title="Additional Options"
          icon={ToggleRight}
          collapsible={!isMobile}
          open={isOpen('sublease')}
          onToggle={() => onToggleSection('sublease')}
        >
          <SubleaseToggle
            enabled={filterState.includeSublease}
            onToggle={() => onUpdate('includeSublease', !filterState.includeSublease)}
          />
        </AccordionSection>
      </div>
    </div>
  )
}
