import { BadgeCheck, Building2, IndianRupee, LandPlot, ListFilter, MapPin, Sparkles } from 'lucide-react'
import AccordionSection from '../common/AccordionSection'
import BudgetFilter from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import { PLOTS_OVERALL_OPTIONS, PLOTS_PER_SQYD_OPTIONS } from '../common/filterOptions'
import ApprovalsFilter from './ApprovalsFilter'
import FinalLayoutPermissionFilter from './FinalLayoutPermissionFilter'
import PlotSizeFilter from './PlotSizeFilter'
import PlotTypeSaleFilter from './PlotTypeSaleFilter'
import ProjectTypeFilter from './ProjectTypeFilter'
import SpecialityProjects from './SpecialityProjects'

export default function PlotsFilters({
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
 title="Land Area"
 icon={LandPlot}
 collapsible={!isMobile}
 open={isOpen('plotSize')}
 onToggle={() => onToggleSection('plotSize')}
 >
 <PlotSizeFilter
 plotMin={filterState.plotsPlotMin}
 plotMax={filterState.plotsPlotMax}
 onPlotMinChange={(value) => onUpdate('plotsPlotMin', value)}
 onPlotMaxChange={(value) => onUpdate('plotsPlotMax', value)}
 orrDistance={filterState.orrDistance}
 onOrrDistanceChange={(value) => onUpdate('orrDistance', value)}
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
 perLabel="Per Sq Yd"
 overallLabel="Overall"
 perOptions={PLOTS_PER_SQYD_OPTIONS}
 overallOptions={PLOTS_OVERALL_OPTIONS}
 />
 </AccordionSection>

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
 </div>

 {/* Right Column */}
 <div className="flex flex-col">
 <AccordionSection
 title="Approvals"
 icon={BadgeCheck}
 collapsible={!isMobile}
 open={isOpen('approvals') || isOpen('finalPermission')}
 onToggle={() => onToggleSection('approvals')}
 >
 <div
 className={
 isDesktopView
 ? 'grid grid-cols-[1fr_auto_1fr] items-start gap-2.5'
 : isMobile
 ? 'grid grid-cols-1 gap-2'
 : 'grid gap-2 lg:grid-cols-2'
 }
 >
 <ApprovalsFilter
 selected={filterState.approvals}
 onToggle={(value) => onUpdate('approvals', value, true)}
 />
 {isDesktopView && <div className="mt-0.5 h-full w-px bg-[#C89B3C]/12" />}
 <FinalLayoutPermissionFilter
 selected={filterState.finalPermissions}
 onToggle={(value) => onUpdate('finalPermissions', value, true)}
 />
 </div>
 </AccordionSection>

 <AccordionSection
 title="Plot Type & Sale"
 icon={ListFilter}
 collapsible={!isMobile}
 open={isOpen('plotType')}
 onToggle={() => onToggleSection('plotType')}
 >
 <PlotTypeSaleFilter
 selectedType={filterState.plotTypes}
 selectedSaleType={filterState.saleTypes}
 onToggleType={(value) => onUpdate('plotTypes', value, true)}
 onToggleSaleType={(value) => onUpdate('saleTypes', value, true)}
 isDesktopView={isDesktopView}
 />
 </AccordionSection>

 <AccordionSection
 title="Specialty Projects"
 icon={Sparkles}
 collapsible={!isMobile}
 open={isOpen('speciality')}
 onToggle={() => onToggleSection('speciality')}
 highlight
 >
 <SpecialityProjects
 selected={filterState.specialityProjects}
 onToggle={(value) => onUpdate('specialityProjects', value, true)}
 />
 </AccordionSection>
 </div>
 </div>
 )
}
