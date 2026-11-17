// Kartu foto biasa (tanpa 3D). Dipakai saat lanyard masih dimuat
// atau saat perangkat tidak mendukung WebGL.
export default function StaticCard() {
  return (
    <div className="flex h-120 items-center justify-center md:h-160">
      <div className="w-64 overflow-hidden rounded-2xl border border-line bg-accent p-2 shadow-2xl shadow-accent/30 sm:w-72">
        <img
          src="/images/profile/profile.png"
          alt="Foto Zenky Setiawan"
          className="aspect-3/4 w-full rounded-xl object-cover"
        />
        <p className="px-1 pt-3 pb-1 font-display text-lg font-extrabold text-white">
          Zenky Setiawan<span className="text-hi">.</span>
        </p>
      </div>
    </div>
  )
}
