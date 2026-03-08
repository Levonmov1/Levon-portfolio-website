"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { DATA } from "@/data/site-data";

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

function JourneyDesktop() {
  const outerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(NUM_PANELS - 1) * 100}%`]
  );

  return (
    <div
      ref={outerRef}
      style={{ height: `${NUM_PANELS * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-screen bg-background p-4 pb-20 md:p-8 md:pb-20 lg:p-12 lg:pb-20">
        <motion.div className="flex h-full gap-2 md:gap-4 lg:gap-6" style={{ x }}>
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
    <div className="relative min-w-full h-full flex-shrink-0">
      <div className="h-full w-full overflow-hidden rounded-2xl border border-primary/40">
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

      {/* Large faded number */}
      <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[20vw] font-bold leading-none text-white/[0.04] select-none pointer-events-none">
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
              className="relative rounded-xl border bg-card overflow-hidden"
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

              <div className="relative p-6">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
