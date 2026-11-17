// Judul section: label kecil bergaya mono + judul besar + keterangan
export default function SectionTitle({ index, label, title, subtitle }) {
  return (
    <div className="mb-12 max-w-3xl">
      {(index || label) && (
        <p className="mb-4 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-hi">
          <span className="h-px w-8 bg-hi" />
          {index && <span>{index}</span>}
          {label && <span className="text-muted">/ {label}</span>}
        </p>
      )}
      <h2 className="font-display text-4xl leading-[1.05] font-extrabold text-ink sm:text-5xl">
        {title}
        <span className="text-hi">.</span>
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </div>
  )
}
