"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/ParticleField"), { ssr: false });
const FloatingShapes = dynamic(() => import("@/components/FloatingShapes"), { ssr: false });
const NoiseOverlay = dynamic(() => import("@/components/NoiseOverlay"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export function BackgroundLayers() {
  return (
    <>
      <ParticleField />
      <FloatingShapes />
      <NoiseOverlay />
    </>
  );
}

export function ClientCursor() {
  return <CustomCursor />;
}
