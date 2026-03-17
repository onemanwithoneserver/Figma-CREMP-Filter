import { Building2, CalendarDays, Home, IndianRupee, MapPin, Sparkles } from 'lucide-react'
import AccordionSection from '../common/AccordionSection'
import BudgetFilter from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import { VILLAS_OVERALL_OPTIONS, VILLAS_PER_SQFT_OPTIONS } from '../common/filterOptions'
import ConfigurationFilter from './ConfigurationFilter'
import ProjectStatusFilter from './ProjectStatusFilter'
import ProjectTypeFilter from './ProjectTypeFilter'
import SpecialOffers from './SpecialOffers'

export default function VillasFilters({
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
 <ConfigurationFilter
 selected={filterState.unitSizes}
 onToggle={(value) => onUpdate('unitSizes', value, true)}
 plotMin={filterState.villasPlotMin}
 plotMax={filterState.villasPlotMax}
 onPlotMinChange={(value) => onUpdate('villasPlotMin', value)}
 onPlotMaxChange={(value) => onUpdate('villasPlotMax', value)}
 builtupMin={filterState.villasBuiltupMin}
 builtupMax={filterState.villasBuiltupMax}
 onBuiltupMinChange={(value) => onUpdate('villasBuiltupMin', value)}
 onBuiltupMaxChange={(value) => onUpdate('villasBuiltupMax', value)}
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
 perOptions={VILLAS_PER_SQFT_OPTIONS}
 overallOptions={VILLAS_OVERALL_OPTIONS}
 />
 </AccordionSection>
 </div>

 {/* Right Column */}
 <div className="flex flex-col">
 <AccordionSection
 title="Project Type"
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
 title="Project Status & Age"
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
 title="Special Offers"
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
