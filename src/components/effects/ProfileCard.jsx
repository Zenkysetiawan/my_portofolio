import { Component, lazy, Suspense, useEffect, useState } from "react";
import StaticCard from "./StaticCard";

// ---------- Pengaturan yang boleh lu ubah ----------

// Selagi 3D menunggu giliran diunduh, tampilkan apa?
//   false = ruang kosong (tidak ada kedip, kartu 3D muncul perlahan)
//   true  = kartu desainmu yang diam, lalu diganti 3D
const SHOW_CARD_WHILE_WAITING = false;

// Koneksi yang dianggap terlalu lambat untuk 3D (hanya terbaca di Chrome/Android)
const SLOW_CONNECTIONS = ["slow-2g", "2g"];

// ---------- Pengecekan perangkat ----------

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Pengguna menyalakan Data Saver, atau koneksinya lambat?
function isDataConstrained() {
  const conn = navigator.connection;
  if (!conn) return false; // browser tidak memberi info = anggap aman
  return (
    conn.saveData === true || SLOW_CONNECTIONS.includes(conn.effectiveType)
  );
}

// Dicek sekali saja, begitu file ini pertama dibaca
const CAN_USE_3D = supportsWebGL() && !isDataConstrained();

// ---------- Memuat lanyard (berat) ----------

const loadLanyard = () => import("./Lanyard");
const Lanyard = lazy(loadLanyard);

// Jalankan fungsi SETELAH halaman selesai dimuat dan browser lagi senggang.
// Jadi teks, navbar, dan bagian lain tampil dulu; lanyard menyusul.
function afterFirstPaint(callback) {
  const whenIdle = () => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(callback, { timeout: 2000 });
    } else {
      setTimeout(callback, 300);
    }
  };
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}

function preloadCardImages() {
  new Image().src = "/images/card/front.jpg";
  new Image().src = "/images/card/back.jpg";
  new Image().src = "/images/card/strap.png";
}

// Jaring pengaman: kalau Lanyard gagal dimuat atau error,
// tampilkan kartu foto biasa. Website tidak ikut rusak.
class Lanyard3DBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <StaticCard /> : this.props.children;
  }
}

// Ruang kosong seukuran lanyard, supaya halaman tidak "loncat" saat 3D muncul
function Placeholder() {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <div className="h-120 w-full md:h-160" />
      <div className="h-18" />
    </div>
  );
}

export default function ProfileCard() {
  // "go" menjadi true saat sudah waktunya mengunduh lanyard
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (!CAN_USE_3D) return;
    let cancelled = false;
    afterFirstPaint(() => {
      if (cancelled) return;
      preloadCardImages();
      loadLanyard().catch(() => {}); // kalau gagal, jaring pengaman yang menangani
      setGo(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Perangkat tidak cocok untuk 3D: kartu desain yang diam
  if (!CAN_USE_3D) return <StaticCard />;

  // Belum waktunya mengunduh 3D
  if (!go) return SHOW_CARD_WHILE_WAITING ? <StaticCard /> : <Placeholder />;

  return (
    <Lanyard3DBoundary>
      <Suspense fallback={<Placeholder />}>
        <Lanyard />
      </Suspense>
    </Lanyard3DBoundary>
  );
}
