"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { DATA } from "@/data/site-data";
import BlurFade from "@/components/magicui/blur-fade";
import AnimatedCounter from "@/components/animated-counter";
import { Icons } from "@/components/icons";

const DogScene = dynamic(
  () => import("@/components/ui/dog-scene").then((m) => ({ default: m.DogScene })),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[300px]" /> }
);

const BLUR_FADE_DELAY = 0.04;

export default function HopesHavenSection() {
  const haven = DATA.hopesHaven;

  return (
    <section id="hopes-haven">
      <div className="px-2 md:px-4 lg:px-6">
        <div className="dark:bg-[#ABB899] bg-[#FAF3E0] text-gray-900 w-full rounded-2xl border overflow-hidden">
          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left column — text content */}
            <div className="px-6 py-16 lg:py-20 lg:px-12">
              {/* Mission */}
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <p className="text-gray-700 max-w-xl text-base md:text-lg leading-relaxed">
                  {haven.mission}
                </p>
              </BlurFade>

              {/* Animated Counters */}
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <div className="flex gap-12 md:gap-20 mt-12">
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

              {/* Buttons */}
              <BlurFade delay={BLUR_FADE_DELAY * 7}>
                <div className="flex gap-4 mt-12">
                  <Link
                    href={haven.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Donate
                  </Link>
                  <Link
                    href={haven.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-700 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-700/10 transition-colors"
                  >
                    Visit Website
                  </Link>
                </div>
              </BlurFade>

              {/* Social Icons */}
              <BlurFade delay={BLUR_FADE_DELAY * 9}>
                <div className="flex gap-4 mt-8">
                  <Link
                    href={haven.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Icons.instagram className="size-5" />
                  </Link>
                  <Link
                    href={haven.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Icons.facebook className="size-5" />
                  </Link>
                </div>
              </BlurFade>
            </div>

            {/* Right column — logo + 3D dog */}
            <div className="hidden lg:flex flex-col items-center px-6 py-6">
              {/* Logo top-center */}
              <BlurFade delay={BLUR_FADE_DELAY * 1}>
                <Image
                  src={haven.logo}
                  alt="Hope's Haven Dog Rescue Foundation"
                  width={120}
                  height={120}
                  className="max-w-[120px]"
                />
              </BlurFade>

              {/* 3D Dog — centered */}
              <div className="flex-1 w-full flex items-center justify-center min-h-[400px]">
                <DogScene className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Mobile: logo only (dog hidden to save 27MB load) */}
          <div className="lg:hidden flex justify-center pb-10 px-6">
            <BlurFade delay={BLUR_FADE_DELAY * 1}>
              <Image
                src={haven.logo}
                alt="Hope's Haven Dog Rescue Foundation"
                width={180}
                height={180}
                className="max-w-[180px]"
              />
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
