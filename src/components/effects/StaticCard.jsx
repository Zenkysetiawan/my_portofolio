// Kartu foto biasa (tanpa 3D). Dipakai saat lanyard masih dimuat
// atau saat perangkat tidak mendukung WebGL.
export default function StaticCard() {
  return (
    <div className="flex h-120 items-center justify-center md:h-160">
      <div className="w-64 overflow-hidden rounded-2xl border border-blue-500/40 bg-slate-900 shadow-2xl shadow-blue-600/30 sm:w-72">
        <img
          src="/images/profile/profile.png"
          alt="Foto Zenky Setiawan"
          className="aspect-3/4 w-full object-cover"
        />
      </div>
    </div>
  );
}
