// Tombol serbaguna. variant="solid" (kobalt, utama) atau "outline" (garis tipis)
const styles = {
  solid: 'bg-accent text-accent-ink hover:brightness-110',
  outline: 'border border-line bg-surface/40 text-ink backdrop-blur hover:border-ink/40 hover:bg-ink/5',
}

export default function Button({ href, variant = 'solid', className = '', children, ...rest }) {
  const classes = `group inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${styles[variant]} ${className}`

  // Link ke section di halaman yang sama (#projects) -> scroll mulus
  const onClick = (e) => {
    if (href?.startsWith('#')) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
    rest.onClick?.(e)
  }

  return href ? (
    <a href={href} className={classes} {...rest} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
