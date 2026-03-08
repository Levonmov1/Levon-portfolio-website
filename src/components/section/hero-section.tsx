"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";
import { DATA } from "@/data/site-data";
import BlurFade from "@/components/magicui/blur-fade";

export default function HeroSection() {
  const innerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const [maskPosition, setMaskPosition] = useState({ x: 0, y: 0 });

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile auto-animate: slowly drift the mask across the viewport
  useEffect(() => {
    if (!isMobile) return;

    let animationId: number;
    let angle = 0;

    const animate = () => {
      angle += 0.003;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = vw / 2 + Math.cos(angle) * vw * 0.3;
      const cy = vh / 2 + Math.sin(angle * 0.7) * vh * 0.2;
      setMaskPosition({ x: cx, y: cy });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isMobile]);

  // Subscribe to spring values for mask style
  useEffect(() => {
    if (isMobile) return;

    const unsubX = springX.on("change", (latestX) => {
      setMaskPosition((prev) => ({ ...prev, x: latestX }));
    });
    const unsubY = springY.on("change", (latestY) => {
      setMaskPosition((prev) => ({ ...prev, y: latestY }));
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [springX, springY, isMobile]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    },
    [isMobile, mouseX, mouseY]
  );

  const handleScrollToJourney = () => {
    const journeySection = document.getElementById("journey");
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const revealMaskStyle = {
    WebkitMaskImage: `radial-gradient(circle 350px at ${maskPosition.x}px ${maskPosition.y}px, black 0%, transparent 100%)`,
    maskImage: `radial-gradient(circle 350px at ${maskPosition.x}px ${maskPosition.y}px, black 0%, transparent 100%)`,
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full bg-background flex items-center justify-center p-2 pb-20 md:p-4 md:pb-20 lg:p-6 lg:pb-20"
    >
      {/* Inner container: rounded frame holding all hero content */}
      <div
        ref={innerRef}
        className="relative w-full h-full overflow-hidden rounded-2xl border border-border"
        onMouseMove={handleMouseMove}
      >
        {/* Seamless notch with tagline at top center */}
        <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
          <svg
            className="w-full"
            viewBox="0 0 1200 48"
            preserveAspectRatio="none"
            style={{ height: "48px" }}
          >
            {/* Fill: background color masks the frame's top border inside the notch */}
            <path
              d="M0,0 L460,0 Q480,0 480,20 L480,32 Q480,48 500,48 L700,48 Q720,48 720,32 L720,20 Q720,0 740,0 L1200,0 L1200,0 L0,0 Z"
              className="fill-background"
            />
            {/* Stroke: draws only the notch outline (sides + bottom) */}
            <path
              d="M460,0 Q480,0 480,20 L480,32 Q480,48 500,48 L700,48 Q720,48 720,32 L720,20 Q720,0 740,0"
              className="stroke-border"
              fill="none"
              strokeWidth="1"
            />
          </svg>
          <p className="absolute inset-0 flex items-center justify-center text-sm md:text-base font-semibold tracking-wide text-foreground whitespace-nowrap pointer-events-auto pt-1">
            What truly matters, lives within.
          </p>
        </div>

        {/* Base layer: Professional photo */}
        <img
          src={DATA.heroImage}
          alt="Levon Movsessian"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Reveal layer: Video of playing with dogs */}
        <div
          className="absolute inset-0 h-full w-full"
          style={revealMaskStyle}
        >
          <video
            src={DATA.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        </div>

        {/* Bottom gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
          <div className="relative z-10 max-w-3xl">
            <BlurFade delay={0.2}>
              <h1 className="text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
                LEVON MOVSESSIAN
              </h1>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p className="mt-4 max-w-xl text-lg text-white/80 md:text-xl">
                {DATA.tagline}
              </p>
            </BlurFade>

            <BlurFade delay={0.6}>
              <div className="mt-8 flex flex-col items-start gap-4">
                <button
                  onClick={handleScrollToJourney}
                  className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Explore More
                </button>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown className="h-6 w-6 text-white/60" />
                </motion.div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
