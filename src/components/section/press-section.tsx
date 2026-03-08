"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/site-data";
import BlurFade from "@/components/magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

export default function PressSection() {
  return (
    <section id="press" className="w-full py-20">
      <div className="max-w-5xl mx-auto px-6">
        <BlurFade delay={BLUR_FADE_DELAY} inView={true}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              In The Press
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DATA.press.map((article, index) => (
            <BlurFade
              key={article.href}
              delay={BLUR_FADE_DELAY * (index + 2)}
              inView={true}
            >
              <Link
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="group relative border rounded-xl p-6 bg-card hover:border-primary/50 transition-all duration-300 h-full">
                  <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <p className="text-sm font-mono uppercase text-primary tracking-wider">
                    {article.publication}
                  </p>

                  <h3 className="text-lg font-semibold mt-2">
                    {article.title}
                  </h3>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
