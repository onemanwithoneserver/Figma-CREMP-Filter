export default function Section({ title, children, className = '' }) {
  return (
    <section className={`mb-3 ${className}`}>
      {title ? (
        <h4 className="mb-2 text-xs font-semibold tracking-widest text-[#1C2A44]/40">
          {title}
        </h4>
      ) : null}
      {children}
    </section>
  )
}
