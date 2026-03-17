import { Building2, CalendarDays, Home, IndianRupee, MapPin, Sparkles } from 'lucide-react'
import AccordionSection from '../common/AccordionSection'
import BudgetFilter from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import { FLATS_OVERALL_OPTIONS, FLATS_PER_SQFT_OPTIONS } from '../common/filterOptions'
import ProjectStatusFilter from './ProjectStatusFilter'
import ProjectTypeFilter from './ProjectTypeFilter'
import SpecialOffers from './SpecialOffers'
import UnitAreaFilter from './UnitAreaFilter'

export default function FlatsFilters({
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
 title="Area & Configuration"
 icon={Home}
 collapsible={!isMobile}
 open={isOpen('unitSize')}
 onToggle={() => onToggleSection('unitSize')}
 >
 <UnitAreaFilter
 selected={filterState.unitSizes}
 onToggle={(value) => onUpdate('unitSizes', value, true)}
 areaMin={filterState.unitAreaMin}
 areaMax={filterState.unitAreaMax}
 onAreaMinChange={(value) => onUpdate('unitAreaMin', value)}
 onAreaMaxChange={(value) => onUpdate('unitAreaMax', value)}
 isMobile={isMobile}
 isDesktopView={isDesktopView}
 />
 </AccordionSection>

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
 perOptions={FLATS_PER_SQFT_OPTIONS}
 overallOptions={FLATS_OVERALL_OPTIONS}
 />
 </AccordionSection>
 </div>

 {/* Right Column */}
 <div className="flex flex-col">
 <AccordionSection
 title="Project Classification"
 icon={Building2}
 collapsible={!isMobile}
 open={isOpen('projectType')}
 onToggle={() => onToggleSection('projectType')}
 >
 <ProjectTypeFilter
 selected={filterState.projectTypes}
 onToggle={(value) => onUpdate('projectTypes', value, true)}
 />
 </AccordionSection>

 <AccordionSection
 title="Availability & Property Age"
 icon={CalendarDays}
 collapsible={!isMobile}
 open={isOpen('projectStatus')}
 onToggle={() => onToggleSection('projectStatus')}
 >
 <ProjectStatusFilter
 selected={filterState.projectStatuses}
 onToggle={(value) => onUpdate('projectStatuses', value, true)}
 propertyAges={filterState.propertyAges}
 onTogglePropertyAge={(value) => onUpdate('propertyAges', value, true)}
 isDesktopView={isDesktopView}
 />
 </AccordionSection>

 <AccordionSection
 title="Investment Benefits"
 icon={Sparkles}
 collapsible={!isMobile}
 open={isOpen('specialOffers')}
 onToggle={() => onToggleSection('specialOffers')}
 highlight
 >
 <SpecialOffers
 selected={filterState.specialOffers}
 onToggle={(value) => onUpdate('specialOffers', value, true)}
 />
 </AccordionSection>
 </div>
 </div>
 )
}

