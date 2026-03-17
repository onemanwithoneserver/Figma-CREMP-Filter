import Section from '../common/Section'
import TagButton from '../common/TagButton'

const sizes = ['150 Sq.Yd', '200 Sq.Yd', '300 Sq.Yd', '400 Sq.Yd+']

export default function PlotSizeFilter() {
 return (
 <Section title="Plot Size">
 <div className="flex flex-wrap gap-1">
 {sizes.map((size) => (
 <TagButton key={size} label={size} />
 ))}
 </div>
 </Section>
 )
}
