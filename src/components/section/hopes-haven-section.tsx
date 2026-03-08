"use client";

import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/site-data";
import BlurFade from "@/components/magicui/blur-fade";
import AnimatedCounter from "@/components/animated-counter";
import { Icons } from "@/components/icons";

const BLUR_FADE_DELAY = 0.04;

export default function HopesHavenSection() {
  const haven = DATA.hopesHaven;

  return (
    <section id="hopes-haven">
      <div className="dark:bg-[#1a2e1a] bg-[#f0f7f0] w-full rounded-2xl border overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-20">
          {/* Logo */}
          <BlurFade delay={BLUR_FADE_DELAY * 1}>
            <div className="flex justify-center mb-8">
              <Image
                src={haven.logo}
                alt="Hope's Haven Dog Rescue Foundation"
                width={200}
                height={200}
                className="max-w-[200px] mx-auto"
              />
            </div>
          </BlurFade>

          {/* Mission */}
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {haven.mission}
            </p>
          </BlurFade>

          {/* Animated Counters */}
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex justify-center gap-12 md:gap-20 mt-12">
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
            <div className="flex justify-center gap-4 mt-12">
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
                className="border border-primary text-primary px-8 py-3 rounded-xl hover:bg-primary/10 transition-colors"
              >
                Visit Website
              </Link>
            </div>
          </BlurFade>

          {/* Social Icons */}
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <div className="flex justify-center gap-4 mt-8">
              <Link
                href={haven.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icons.instagram className="size-5" />
              </Link>
              <Link
                href={haven.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icons.facebook className="size-5" />
              </Link>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
