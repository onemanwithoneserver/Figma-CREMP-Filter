import { useState, useEffect } from 'react'
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
  // Default to sqft for built-up, sqyards for land
  const [sizeUnit, setSizeUnit] = useState('sqft');
  const BUILT_UP_TYPES = ['Retail', 'Office', 'Full Building'];
  const propertyTypes = filterState.propertyTypes || [];
  const onlyBuiltUpSelected =
    propertyTypes.length > 0 &&
    propertyTypes.every((t) => BUILT_UP_TYPES.includes(t));

  useEffect(() => {
    if (isOpen('size')) {
      if (onlyBuiltUpSelected) {
        setSizeUnit('sqft');
      } else if (propertyTypes.length === 1 && propertyTypes[0] === 'Land') {
        setSizeUnit('sqyards');
      }
    }
  }, [isOpen('size')]);

  useEffect(() => {
    if (onlyBuiltUpSelected && sizeUnit !== 'sqft') {
      setSizeUnit('sqft');
    } else if (propertyTypes.length === 1 && propertyTypes[0] === 'Land' && sizeUnit !== 'sqyards' && sizeUnit !== 'acre') {
      setSizeUnit('sqyards');
    }
  }, [onlyBuiltUpSelected, propertyTypes, sizeUnit]);

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
        <div className="h-px bg-gray-200 my-[2px]" />

        <AccordionSection
          title="Size & Area"
          icon={true}
          collapsible
          open={isOpen('size')}
          onToggle={() => onToggleSection('size')}
          rightControl={
            onlyBuiltUpSelected
              ? null
              : <SizeTabs unit={sizeUnit} onUnitChange={setSizeUnit} isLand={propertyTypes.length === 1 && propertyTypes[0] === 'Land'} />
          }
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

      {/* Vertical divider for desktop */}
      <div className="hidden lg:block w-px bg-gray-200 mx-[2px]" />

      {/* Right column */}
      <div className="flex flex-col gap-[2px]">
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
        <div className="h-px bg-gray-200 my-[2px]" />

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