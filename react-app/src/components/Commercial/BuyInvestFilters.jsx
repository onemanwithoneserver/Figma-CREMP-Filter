import { useState, useEffect } from 'react'
import AccordionSection from '../common/AccordionSection'
import { BudgetTabs, StyledSelect } from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import {
  COMMERCIAL_INVEST_PER_SFT_OPTIONS,
  COMMERCIAL_INVEST_OVERALL_OPTIONS,
} from '../common/filterOptions'
import PropertyTypeFilter from './PropertyTypeFilter'
import SaleTypeFilter from './SaleTypeFilter'
import SizeFilter, { SizeTabs } from './SizeFilter'

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
  const [sizeUnit, setSizeUnit] = useState('sqft')

  // Reset to 'sqft' whenever the filter is opened
  useEffect(() => {
    if (isOpen('size')) {
      setSizeUnit('sqft')
    }
  }, [isOpen('size')])

  return (
    <div className={isMobile ? 'flex flex-col gap-0.5' : 'grid grid-cols-[1fr_auto_1fr] gap-y-0.5'}>
      {/* Left column */}
      <div className="flex flex-col gap-0.5">
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
            <div className="h-px bg-gray-200 my-0.5" />
          </>
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
        <div className="h-px bg-gray-200 my-0.5" />

        <AccordionSection
          title="Sale Type"
          icon={true}
          collapsible
          open={isOpen('saleType')}
          onToggle={() => onToggleSection('saleType')}
        >
          <SaleTypeFilter
            selected={filterState.saleTypes}
            onToggle={(value) => onUpdate('saleTypes', value, true)}
          />
        </AccordionSection>
        {/* Divider between Sale Type and Size & Area for mobile view only */}
        {isMobile && <div className="h-px bg-gray-200 my-0.5" />}
      </div>

      {/* Vertical divider for desktop */}
      <div className="hidden lg:block w-px bg-gray-200 mx-0.5" />

      {/* Right column */}
      <div className="flex flex-col gap-0.5">
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
        <div className="h-px bg-gray-200 my-0.5" />

        <AccordionSection
          title="Investment Range"
          icon={true}
          collapsible
          open={isOpen('budget')}
          onToggle={() => onToggleSection('budget')}
          rightControl={
            <BudgetTabs
              mode={filterState.budgetMode}
              onModeChange={(val) => onUpdate('budgetMode', val)}
              perLabel="Per sq.ft"
              overallLabel="Total"
            />
          }
           class="h-px bg-gray-200 my-[2px]"
        >
          <div className="flex items-center gap-2 pt-2">
            <StyledSelect
              value={filterState.budgetMin}
              onChange={(val) => onUpdate('budgetMin', val)}
              placeholder="Min"
              options={filterState.budgetMode === 'per' ? COMMERCIAL_INVEST_PER_SFT_OPTIONS : COMMERCIAL_INVEST_OVERALL_OPTIONS}
            />
            <span className="text-gray-300">—</span>
            <StyledSelect
              value={filterState.budgetMax}
              onChange={(val) => onUpdate('budgetMax', val)}
              placeholder="Max"
              options={filterState.budgetMode === 'per' ? COMMERCIAL_INVEST_PER_SFT_OPTIONS : COMMERCIAL_INVEST_OVERALL_OPTIONS}
            />
          </div>
        </AccordionSection>
      </div>
      
    </div>
  )
}