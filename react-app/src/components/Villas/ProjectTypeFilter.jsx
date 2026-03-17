import TagButton from '../common/TagButton'
import { VILLAS_PROJECT_TYPE_OPTIONS } from '../common/filterOptions'

export default function ProjectTypeFilter({ selected, onToggle }) {
 return (
 <div className="flex flex-wrap gap-1">
 {VILLAS_PROJECT_TYPE_OPTIONS.map((type) => (
 <TagButton
 key={type}
 label={type}
 selected={selected.includes(type)}
 onClick={() => onToggle(type)}
 />
 ))}
 </div>
 )
}
