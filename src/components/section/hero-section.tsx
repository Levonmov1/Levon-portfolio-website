"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";
import { DATA } from "@/data/site-data";
import BlurFade from "@/components/magicui/blur-fade";

export default function HeroSection() {
  const innerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  // Apply mask directly to DOM via rAF — works in all browsers, no flash on load
  useEffect(() => {
    let rafId: number;
    const update = () => {
      if (maskRef.current) {
        const x = springX.get();
        const y = springY.get();
        const v = `radial-gradient(circle 350px at ${x}px ${y}px, black 0%, transparent 100%)`;
        const s = maskRef.current.style;
        s.setProperty('-webkit-mask-image', v);
        s.setProperty('mask-image', v);
        s.setProperty('-webkit-mask-size', '100% 100%');
        s.setProperty('mask-size', '100% 100%');
        s.setProperty('-webkit-mask-repeat', 'no-repeat');
        s.setProperty('mask-repeat', 'no-repeat');
        s.opacity = "1";
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [springX, springY]);

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
      mouseX.set(vw / 2 + Math.cos(angle) * vw * 0.3);
      mouseY.set(vh / 2 + Math.sin(angle * 0.7) * vh * 0.2);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isMobile, mouseX, mouseY]);

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

  return (
    <section
      id="home"
      className="relative h-screen w-full bg-background flex items-center justify-center p-2 pb-20 md:p-4 md:pb-20 lg:p-6 lg:pb-20"
    >
      {/* Inner container: rounded frame holding all hero content */}
      <div
        ref={innerRef}
        className="relative w-full h-full overflow-hidden rounded-2xl border border-border border-t-0"
        onMouseMove={handleMouseMove}
      >
        {/* Mobile notch — wider to fit text on small screens */}
        <div className="absolute -top-px left-0 w-full z-30 pointer-events-none md:hidden">
          <svg className="w-full" viewBox="0 0 1200 28" preserveAspectRatio="none" style={{ height: "28px" }}>
            <path
              d="M0,0 L150,0 C200,0 220,28 280,28 L920,28 C980,28 1000,0 1050,0 L1200,0 L1200,0 L0,0 Z"
              className="fill-background"
            />
            <path
              d="M0,0 L150,0 C200,0 220,28 280,28 L920,28 C980,28 1000,0 1050,0 L1200,0"
              className="stroke-border"
              fill="none"
              strokeWidth="1"
            />
          </svg>
          <p className="absolute inset-0 flex items-end justify-center text-sm font-semibold tracking-wide text-foreground whitespace-nowrap pointer-events-auto pb-1">
            What truly matters, lives within.
          </p>
        </div>

        {/* Tablet notch — medium width for iPad-sized screens */}
        <div className="absolute -top-px left-0 w-full z-30 pointer-events-none hidden md:block lg:hidden">
          <svg className="w-full" viewBox="0 0 1200 28" preserveAspectRatio="none" style={{ height: "28px" }}>
            <path
              d="M0,0 L300,0 C340,0 355,28 400,28 L800,28 C845,28 860,0 900,0 L1200,0 L1200,0 L0,0 Z"
              className="fill-background"
            />
            <path
              d="M0,0 L300,0 C340,0 355,28 400,28 L800,28 C845,28 860,0 900,0 L1200,0"
              className="stroke-border"
              fill="none"
              strokeWidth="1"
            />
          </svg>
          <p className="absolute inset-0 flex items-end justify-center text-sm font-semibold tracking-wide text-foreground whitespace-nowrap pointer-events-auto pb-1">
            What truly matters, lives within.
          </p>
        </div>

        {/* Desktop notch — narrower, elegant proportions */}
        <div className="absolute -top-px left-0 w-full z-30 pointer-events-none hidden lg:block">
          <svg className="w-full" viewBox="0 0 1200 28" preserveAspectRatio="none" style={{ height: "28px" }}>
            <path
              d="M0,0 L420,0 C450,0 460,28 500,28 L700,28 C740,28 750,0 780,0 L1200,0 L1200,0 L0,0 Z"
              className="fill-background"
            />
            <path
              d="M0,0 L420,0 C450,0 460,28 500,28 L700,28 C740,28 750,0 780,0 L1200,0"
              className="stroke-border"
              fill="none"
              strokeWidth="1"
            />
          </svg>
          <p className="absolute inset-0 flex items-end justify-center text-base font-semibold tracking-wide text-foreground whitespace-nowrap pointer-events-auto pb-1">
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
          ref={maskRef}
          className="absolute inset-0 h-full w-full z-20"
          style={{ opacity: 0 }}
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
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 z-30">
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
