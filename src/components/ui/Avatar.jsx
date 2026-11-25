// Avatar otomatis: lingkaran berwarna + huruf depan nama. Warna ditentukan dari nama,
// jadi orang yang sama selalu mendapat warna yang sama.
const COLORS = ['#3b5bff', '#ffb224', '#10b981', '#f43f5e', '#0ea5e9', '#64748b']

export default function Avatar({ name, size = 40 }) {
  const clean = (name || '?').trim()
  let hash = 0
  for (const ch of clean) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  const bg = COLORS[hash % COLORS.length]
  const dark = bg === '#ffb224'

  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-full font-display font-extrabold uppercase"
      style={{ width: size, height: size, background: bg, color: dark ? '#0b1020' : '#fff', fontSize: size * 0.42 }}
    >
      {clean[0]}
    </span>
  )
}
