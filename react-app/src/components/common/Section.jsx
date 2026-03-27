export default function Section({ title, children, className = '' }) {
  return (
    <section className={`mb-2.5 ${className}`}>
      {title ? (
        <h4 className="mb-1.5 px-0.5 text-[11px] font-bold tracking-wider text-[#1C2A44]/50">
          {title}
        </h4>
      ) : null}
      {children}
    </section>
  )
}