"use client";

import { DATA } from "@/data/site-data";
import BlurFade from "@/components/magicui/blur-fade";
import VentureCard from "@/components/venture-card";
import { DottedSurface } from "@/components/ui/dotted-surface";

const BLUR_FADE_DELAY = 0.04;

export default function VenturesSection() {
  return (
    <section id="ventures" className="relative w-full pt-10 pb-40 overflow-hidden">
      <DottedSurface className="!top-[30%]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <BlurFade delay={BLUR_FADE_DELAY} inView={true}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ventures
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Companies and systems built to create lasting impact.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {DATA.ventures.map((venture, index) => (
            <BlurFade
              key={venture.name}
              delay={BLUR_FADE_DELAY * (index + 2)}
              inView={true}
            >
              <VentureCard
                name={venture.name}
                href={venture.href}
                location={venture.location}
                description={venture.description}
                logoDark={venture.logoDark}
                logoLight={venture.logoLight}
                founded={venture.founded}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
