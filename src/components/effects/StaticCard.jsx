// Kartu biasa (tanpa 3D) memakai desain depan buatanmu.
// Dipakai saat perangkat tidak mendukung WebGL, koneksi lambat / Data Saver,
// atau kalau lanyard 3D gagal dimuat.
export default function StaticCard() {
  return (
    <div className="flex h-120 items-center justify-center md:h-160">
      <img
        src="/images/card/front.jpg"
        alt="Kartu ID Zenky Setiawan"
        className="w-64 rounded-2xl border border-line shadow-2xl shadow-accent/30 sm:w-72"
        style={{ aspectRatio: '848 / 1264' }}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}
