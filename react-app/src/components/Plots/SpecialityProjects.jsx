import TagButton from '../common/TagButton'
import { SPECIALITY_PROJECT_OPTIONS } from '../common/filterOptions'

export default function SpecialityProjects({ selected, onToggle }) {
 return (
 <div className="flex flex-wrap gap-1">
 {SPECIALITY_PROJECT_OPTIONS.map((item) => (
 <TagButton
 key={item}
 label={item}
 selected={selected.includes(item)}
 onClick={() => onToggle(item)}
 />
 ))}
 </div>
 )
}
