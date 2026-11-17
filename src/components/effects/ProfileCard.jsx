import { lazy, Suspense, useState } from "react";
import StaticCard from "./StaticCard";

// Lanyard 3D dimuat belakangan, supaya halaman utama tetap cepat terbuka
const Lanyard = lazy(() => import("./Lanyard"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function ProfileCard() {
  const [canUse3D] = useState(supportsWebGL);

  if (!canUse3D) return <StaticCard />;

  return (
    <Suspense fallback={<StaticCard />}>
      <Lanyard />
    </Suspense>
  );
}
