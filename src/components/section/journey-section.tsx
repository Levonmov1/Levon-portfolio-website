"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { DATA } from "@/data/site-data";
import ImageTiles from "@/components/ui/image-tiles";

const CryptoGravity = dynamic(
  () => import("@/components/ui/crypto-gravity"),
  { ssr: false }
);


const milestones = DATA.journey;
const NUM_PANELS = milestones.length;

export default function JourneySection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return <JourneyMobile />;
  return <JourneyDesktop />;
}

const SCROLL_THRESHOLD = 150;
const PEEK_AMOUNT = 40;
const TRANSITION_COOLDOWN = 1000;
// Each panel gets this much vertical scroll space (vh) for snapping
const VH_PER_PANEL = 300;

function JourneyDesktop() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [peekOffset, setPeekOffset] = useState(0);
  const lastSnapIndex = useRef(0);
  const scrollAccum = useRef(0);
  const isTransitioning = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Use IntersectionObserver to detect when section is in view,
  // then use wheel events for snap navigation
  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;

    const onWheel = (e: WheelEvent) => {
      // Only handle when sticky container is actually stuck (visible)
      const rect = sticky.getBoundingClientRect();
      const isStuck = rect.top <= 1 && rect.top >= -1;
      if (!isStuck) return;

      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = lastSnapIndex.current + direction;

      // At boundaries — let page scroll naturally
      if (nextIndex < 0 || nextIndex >= NUM_PANELS) {
        scrollAccum.current = 0;
        setPeekOffset(0);
        return;
      }

      e.preventDefault();

      // Accumulate scroll delta
      scrollAccum.current += e.deltaY;

      // Reset peek if user stops scrolling
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        scrollAccum.current = 0;
        setPeekOffset(0);
      }, 400);

      const absAccum = Math.abs(scrollAccum.current);

      if (absAccum < SCROLL_THRESHOLD) {
        // Peek animation — nudge card in scroll direction
        const peekProgress = absAccum / SCROLL_THRESHOLD;
        setPeekOffset(peekProgress * PEEK_AMOUNT * -direction);
        return;
      }

      // Threshold reached — commit transition
      clearTimeout(resetTimer.current);
      scrollAccum.current = 0;
      setPeekOffset(0);
      isTransitioning.current = true;
      lastSnapIndex.current = nextIndex;
      setActiveIndex(nextIndex);

      // Sync the outer scroll position so it stays pinned at the right spot
      if (outerRef.current) {
        const panelHeight = (window.innerHeight * VH_PER_PANEL) / 100;
        outerRef.current.scrollTop = nextIndex * panelHeight;
        window.scrollTo({
          top: outerRef.current.offsetTop + nextIndex * panelHeight,
        });
      }

      setTimeout(() => {
        isTransitioning.current = false;
      }, TRANSITION_COOLDOWN);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(resetTimer.current);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      style={{ height: `${NUM_PANELS * VH_PER_PANEL}vh` }}
      className="relative"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-background p-4 pb-20 md:p-8 md:pb-20 lg:p-12 lg:pb-20"
      >
        <motion.div
          className="flex h-full"
          animate={{ x: `calc(-${activeIndex * 100}% + ${peekOffset}px)` }}
          transition={
            peekOffset !== 0
              ? { duration: 0.1, ease: "linear" }
              : { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }
          }
        >
          {milestones.map((milestone, index) => (
            <Panel key={`${milestone.year}-${index}`} milestone={milestone} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Panel({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[number];
  index: number;
}) {
  const Icon = milestone.icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative min-w-full h-full flex-shrink-0 pr-2 md:pr-4 lg:pr-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-primary/40">
      {/* Background image or solid dark */}
      {milestone.bgImage ? (
        <>
          <img
            src={milestone.bgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/70" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[oklch(0.1_0_0)]" />
      )}

      {/* Background video with left-fade */}
      {milestone.bgVideo && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            maskImage: "linear-gradient(to right, transparent 20%, black 55%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 20%, black 55%)",
          }}
        >
          <video
            src={milestone.bgVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Large faded number */}
      <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[20vw] font-bold leading-none text-white/[0.04] select-none pointer-events-none z-[2]">
        {num}
      </span>

      {/* Section label */}
      <div className="absolute top-12 left-8 md:top-16 md:left-16">
        <span className="text-xs md:text-sm font-mono tracking-[0.2em] text-white/40 uppercase">
          {num} / JOURNEY
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16 lg:px-24 max-w-3xl">
        {/* Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary/30 bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Year */}
        <div className="mb-4">
          <span className="text-5xl md:text-7xl font-bold text-primary tracking-tighter">
            {milestone.year}
          </span>
          <div className="mt-2 h-1 w-16 bg-primary rounded-full" />
        </div>

        {/* Subtitle */}
        <p className="text-xs md:text-sm font-mono tracking-[0.15em] text-white/50 uppercase mb-3">
          {milestone.subtitle}
        </p>

        {/* Title */}
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
          {milestone.title}
        </h3>

        {/* Description with left border accent */}
        <div className="border-l-2 border-primary/40 pl-4 md:pl-6">
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-lg">
            {milestone.description}
          </p>
          <p className="text-xs text-white/30 mt-2 font-mono">
            {milestone.location}
          </p>
        </div>
      </div>

      {/* Image tiles — desktop: large centered-right, iPad: split top/bottom */}
      {milestone.tileImages && (
        <>
          {/* Large screens */}
          <div className="hidden lg:block absolute left-[42%] top-1/2 -translate-y-1/2 w-[36%] z-[5]">
            <ImageTiles images={milestone.tileImages} />
          </div>
          {/* iPad / medium screens — all 6 at top-right */}
          <div className="hidden md:block lg:hidden absolute right-6 top-8 w-[45%] z-[5]">
            <ImageTiles images={milestone.tileImages} />
          </div>
        </>
      )}

      {/* Crypto gravity physics — desktop only, tile index 2 */}
      {index === 2 && (
        <div className="hidden md:block absolute right-0 top-0 w-[55%] h-full z-[3]">
          <CryptoGravity />
        </div>
      )}

      {/* Trading algorithm background video — tile index 3 */}
      {index === 3 && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            maskImage: "linear-gradient(to right, transparent 20%, black 55%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 20%, black 55%)",
          }}
        >
          <video
            src="/images/global-trade-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
      )}

      {/* Overlay image on right side */}
      {milestone.overlayImage && !milestone.tileImages && (
        <div className="absolute right-0 bottom-0 h-[85%] w-1/2 pointer-events-none z-[5]">
          <img
            src={milestone.overlayImage}
            alt=""
            className="absolute bottom-0 right-8 h-full w-auto object-contain object-bottom"
            draggable={false}
          />
        </div>
      )}

      {/* Progress dots at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {milestones.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? "bg-primary" : "bg-white/20"
            }`}
          />
        ))}
      </div>
      </div>
    </div>
  );
}

function JourneyMobile() {
  return (
    <div className="w-full px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter">The Journey</h2>
        <p className="mt-3 text-muted-foreground text-sm">
          From wrestling alligators to building companies — every chapter led here.
        </p>
      </div>

      <div className="space-y-6 max-w-lg mx-auto">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          const num = String(index + 1).padStart(2, "0");

          return (
            <div
              key={`${milestone.year}-${index}`}
              className="relative rounded-xl border border-primary/40 bg-card overflow-hidden"
            >
              {/* Background image */}
              {milestone.bgImage && (
                <>
                  <img
                    src={milestone.bgImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-black/80" />
                </>
              )}

              {/* Background video with bottom-to-top fade — mobile */}
              {milestone.bgVideo && (
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    maskImage: "linear-gradient(to bottom, transparent 30%, black 70%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, black 70%)",
                  }}
                >
                  <video
                    src={milestone.bgVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
              )}

              {/* Trading algorithm video — mobile, tile index 3 */}
              {index === 3 && (
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    maskImage: "linear-gradient(to bottom, transparent 30%, black 70%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, black 70%)",
                  }}
                >
                  <video
                    src="/images/global-trade-video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/70" />
                </div>
              )}

              {/* Overlay image on right side — mobile */}
              {milestone.overlayImage && !milestone.tileImages && (
                <div className="absolute right-0 bottom-0 h-[80%] w-1/3 pointer-events-none z-[1]">
                  <img
                    src={milestone.overlayImage}
                    alt=""
                    className="absolute bottom-0 right-2 h-full w-auto object-contain object-bottom opacity-40"
                    draggable={false}
                  />
                </div>
              )}

              <div className={`relative z-[2] p-6 ${milestone.bgVideo || index === 3 ? "pb-48" : ""}`}>
                {/* Number badge */}
                <span className="absolute top-4 right-4 text-4xl font-bold text-primary/10">
                  {num}
                </span>

                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary/30 bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-primary font-mono">
                    {milestone.year}
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight mb-2">
                  {milestone.title}
                </h3>

                <div className="border-l-2 border-primary/30 pl-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                  <p className="text-xs text-muted-foreground/50 mt-1 font-mono">
                    {milestone.location}
                  </p>
                </div>
              </div>

              {/* Image tiles — mobile (below text) */}
              {milestone.tileImages && (
                <div className="relative z-[2] px-6 pb-5 w-3/4 mx-auto">
                  <ImageTiles images={milestone.tileImages} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
