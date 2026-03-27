import { useState } from 'react'
import AccordionSection from '../common/AccordionSection'
import { BudgetTabs, StyledSelect } from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import {
  COMMERCIAL_RENT_PER_SFT_OPTIONS,
  COMMERCIAL_RENT_OVERALL_OPTIONS,
} from '../common/filterOptions'
import PropertyTypeFilter from './PropertyTypeFilter'
import SizeFilter, { SizeTabs } from './SizeFilter'
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
  const [sizeUnit, setSizeUnit] = useState('sqft')

  return (
    <div className={isMobile ? 'flex flex-col gap-1.5' : 'grid grid-cols-1 gap-y-1.5 lg:grid-cols-2'}>
      <div className="flex flex-col gap-1.5">
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
          title="Property Type"
          icon={true}
          collapsible
          open={isOpen('propertyType')}
          onToggle={() => onToggleSection('propertyType')}
        >
          <PropertyTypeFilter
            selected={filterState.propertyTypes}
            onChange={(newTypes) => onUpdate('propertyTypes', newTypes)}
          />
        </AccordionSection>

        <AccordionSection
          title="Size & Area"
          icon={true}
          collapsible
          open={isOpen('size')}
          onToggle={() => onToggleSection('size')}
          rightControl={<SizeTabs unit={sizeUnit} onUnitChange={setSizeUnit} />}
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
            unit={sizeUnit}
          />
        </AccordionSection>
      </div>

      <div className="flex flex-col gap-1.5">
        <AccordionSection
          title="Monthly Rent / Lease"
          icon={true}
          collapsible
          open={isOpen('budget')}
          onToggle={() => onToggleSection('budget')}
          rightControl={
            <BudgetTabs
              mode={filterState.budgetMode}
              onModeChange={(val) => onUpdate('budgetMode', val)}
              perLabel="Per Sft"
              overallLabel="Overall"
            />
          }
        >
          <div className="flex items-center gap-2 pt-2">
            <StyledSelect
              value={filterState.budgetMin}
              onChange={(val) => onUpdate('budgetMin', val)}
              placeholder="Min"
              options={filterState.budgetMode === 'per' ? COMMERCIAL_RENT_PER_SFT_OPTIONS : COMMERCIAL_RENT_OVERALL_OPTIONS}
            />
            <span className="text-gray-300">—</span>
            <StyledSelect
              value={filterState.budgetMax}
              onChange={(val) => onUpdate('budgetMax', val)}
              placeholder="Max"
              options={filterState.budgetMode === 'per' ? COMMERCIAL_RENT_PER_SFT_OPTIONS : COMMERCIAL_RENT_OVERALL_OPTIONS}
            />
          </div>
        </AccordionSection>

        <div className="px-1.5 pt-1">
          <SubleaseToggle
            value={filterState.includeSublease}
            onChange={(value) => onUpdate('includeSublease', value)}
          />
        </div>
      </div>
    </div>
  )
}