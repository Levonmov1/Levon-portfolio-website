"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HoverEffect({
  items,
  className,
  stagger = false,
}: {
  items: {
    publication: string;
    title: string;
    href: string;
  }[];
  className?: string;
  stagger?: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={item.href}
          initial={stagger ? { scale: 0, opacity: 0 } : false}
          animate={stagger ? { scale: 1, opacity: 1 } : undefined}
          transition={
            stagger
              ? {
                  delay: 0.3 + idx * 0.1,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }
              : undefined
          }
        >
          <Link
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block h-full p-2"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-primary/20 block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                  style={{
                    boxShadow:
                      "0 0 30px oklch(0.82 0.15 80 / 0.3), 0 0 60px oklch(0.82 0.15 80 / 0.12)",
                  }}
                />
              )}
            </AnimatePresence>
            <div className="relative z-10 border border-primary/40 rounded-2xl p-6 bg-card group-hover:border-primary transition-colors duration-300 h-full">
              <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="font-serif text-base uppercase tracking-[0.2em] text-primary">
                {item.publication}
              </p>
              <h3 className="text-lg font-semibold mt-2 text-foreground">
                {item.title}
              </h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
