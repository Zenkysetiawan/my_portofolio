import { Component, lazy, Suspense } from 'react'
import StaticCard from './StaticCard'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

// Dicek sekali saja, begitu file ini pertama dibaca
const CAN_USE_3D = supportsWebGL()

// Fungsi untuk mengambil file Lanyard (berat) dari server
const loadLanyard = () => import('./Lanyard')
const Lanyard = lazy(loadLanyard)

if (CAN_USE_3D) {
  // Mulai mengunduh SEKARANG, bukan menunggu Hero tampil dulu
  loadLanyard().catch(() => {}) // kalau gagal, jaring pengaman di bawah yang menangani
  // Unduh gambar kartu lebih awal, supaya sudah siap saat kartu dibuat
  new Image().src = '/images/card/front.jpg'
  new Image().src = '/images/card/back.jpg'
  new Image().src = '/images/card/strap.png'
}

// Jaring pengaman: kalau Lanyard gagal dimuat atau error,
// tampilkan kartu foto biasa. Website tidak ikut rusak.
class Lanyard3DBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? <StaticCard /> : this.props.children
  }
}

// Ruang kosong seukuran lanyard, supaya halaman tidak "loncat" saat 3D muncul
function Placeholder() {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <div className="h-120 w-full md:h-160" />
      <div className="h-18" />
    </div>
  )
}

export default function ProfileCard() {
  if (!CAN_USE_3D) return <StaticCard />

  return (
    <Lanyard3DBoundary>
      <Suspense fallback={<Placeholder />}>
        <Lanyard />
      </Suspense>
    </Lanyard3DBoundary>
  )
}
