"use client";

import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/site-data";
import BlurFade from "@/components/magicui/blur-fade";
import AnimatedCounter from "@/components/animated-counter";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function HopesHavenSection() {
  const haven = DATA.hopesHaven;

  return (
    <section id="hopes-haven">
      <div className="px-2 md:px-4 lg:px-6">
        <div className="relative dark bg-[#0a0a0a] text-white w-full rounded-2xl border border-white/10 dark:border-primary/40 overflow-hidden">
          {/* Background video — desktop only (horizontal fade) */}
          <div
            className="hidden lg:block absolute inset-0 z-0"
            style={{
              maskImage: "linear-gradient(to right, transparent 40%, black 75%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 40%, black 75%)",
            }}
          >
            <video
              src="/images/levon-rescue-video-wide.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Background video — mobile/iPad (bottom-to-top fade) */}
          <div
            className="lg:hidden absolute inset-0 z-0"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 30%, black 70%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, black 70%)",
            }}
          >
            <video
              src="/images/levon-rescue-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
            {/* Left column */}
            <div className="px-6 py-10 lg:py-14 lg:px-12 flex flex-col items-center lg:items-start text-center lg:text-left">
              <BlurFade delay={BLUR_FADE_DELAY * 1}>
                <div className="flex flex-col items-center lg:items-start">
                  <Image
                    src={haven.logo}
                    alt="Hope's Haven Dog Rescue Foundation"
                    width={120}
                    height={120}
                    className="mb-6"
                  />
                  <p className="text-[#c5a044] uppercase tracking-widest text-sm font-medium">
                    Philanthropy
                  </p>
                  <h2 className="text-white text-2xl md:text-3xl font-light mt-2">
                    Changing the World One Dog at a Time
                </h2>
                </div>
              </BlurFade>

              {/* Stats */}
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <div className="flex justify-center lg:justify-start gap-10 md:gap-16 mt-12">
                  {haven.stats.map((stat) => (
                    <AnimatedCounter
                      key={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  ))}
                </div>
              </BlurFade>

              {/* Action buttons */}
              <BlurFade delay={BLUR_FADE_DELAY * 7}>
                <div className="flex flex-col gap-4 mt-12 max-w-fit mx-auto lg:mx-0">
                  <div className="flex gap-3">
                    <Link
                      href={haven.donateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      Donate
                      <ArrowUpRight className="size-4" />
                    </Link>
                    <Link
                      href={haven.fosterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      Foster
                      <ArrowUpRight className="size-4" />
                    </Link>
                    <Link
                      href={haven.adoptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      Adopt
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>

                  <Link
                    href={haven.availableDogsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-[#c5a044] text-[#c5a044] w-full py-3 rounded-lg text-sm font-medium hover:bg-[#c5a044]/10 transition-colors"
                  >
                    View Available Dogs
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </BlurFade>
            </div>

            {/* Right column */}
            <div className="hidden lg:flex flex-col items-center justify-center px-6 py-10">
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <div className="max-w-sm text-center">
                    <p className="text-white text-base font-bold leading-relaxed">
                      {haven.description}
                    </p>
                    <p className="text-white text-base font-bold leading-relaxed mt-4">
                      {haven.vision}
                    </p>
                  <Link
                    href={haven.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-[#c5a044] text-[#c5a044] px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#c5a044]/10 transition-colors mt-5"
                  >
                    Visit Hope&apos;s Haven
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Mobile: description */}
          <div className="lg:hidden relative z-10 flex flex-col items-center pb-8 px-6 text-center">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                {haven.description}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mt-4 max-w-md">
                {haven.vision}
              </p>
              <Link
                href={haven.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#c5a044] text-sm font-medium mt-6 hover:underline"
              >
                Visit Hope&apos;s Haven
                <ArrowUpRight className="size-4" />
              </Link>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
