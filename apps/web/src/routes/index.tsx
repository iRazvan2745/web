import { createFileRoute } from "@tanstack/react-router";
import { MyWork } from "@/components/intersections/myWork";
import { FirstSection } from "@/components/sections/first";
import { Footer } from "@/components/footer";
import { SecondSection } from "@/components/sections/second";
import ReactLenis, { type LenisRef } from "lenis/react";
import { frame, cancelFrame } from "motion/react";
import { useRef, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <div className="text-foreground">
      <div className="sticky inset-0 top-14.25 flex items-center justify-center z-20 lg:hidden mx-auto">
        <p className="text-foreground bg-background text-lg font-mono border-b border-x px-1">
          use a device with a wider screen pls
        </p>
      </div>
      <ReactLenis ref={lenisRef} />
      <FirstSection />
      <MyWork />
      <SecondSection />
      <Footer />
    </div>
  );
}
