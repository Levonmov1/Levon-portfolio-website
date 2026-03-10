"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { DATA } from "@/data/site-data";
import { HoverEffect } from "@/components/ui/card-hover-effect";

type Shard = {
  clipPath: string;
  exitX: number;
  exitY: number;
  exitRotate: number;
  delay: number;
};

function generateShards(cols: number, rows: number): Shard[] {
  const shards: Shard[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x1 = (c / cols) * 100;
      const x2 = ((c + 1) / cols) * 100;
      const y1 = (r / rows) * 100;
      const y2 = ((r + 1) / rows) * 100;
      shards.push({
        clipPath: `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`,
        exitX: (c - cols / 2 + 0.5) * 250 + (Math.random() - 0.5) * 100,
        exitY: (r - rows / 2 + 0.5) * 200 + (Math.random() - 0.5) * 80,
        exitRotate: (Math.random() - 0.5) * 60,
        delay: Math.random() * 0.2,
      });
    }
  }
  return shards;
}

export default function PressSection() {
  const [state, setState] = useState<"idle" | "shattering" | "revealed">(
    "idle"
  );

  const shards = useMemo(() => generateShards(4, 4), []);

  const handleReveal = () => {
    setState("shattering");
    setTimeout(() => setState("revealed"), 900);
  };

  return (
    <section id="press" className="w-full py-20">
      <div className="max-w-5xl mx-auto px-6 relative min-h-[300px] flex items-center justify-center">
        {/* Button — idle & shattering states */}
        {state !== "revealed" && (
          <div className="relative">
            <motion.button
              onClick={state === "idle" ? handleReveal : undefined}
              className="relative text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight border-2 border-primary/60 rounded-2xl px-12 py-6 bg-transparent text-foreground cursor-pointer hover:border-primary transition-colors duration-300"
              animate={
                state === "shattering"
                  ? { scale: 0.8, opacity: 0 }
                  : {
                      boxShadow: [
                        "0 0 20px rgba(197,160,68,0.2), 0 0 60px rgba(197,160,68,0.1)",
                        "0 0 40px rgba(197,160,68,0.6), 0 0 120px rgba(197,160,68,0.3), 0 0 200px rgba(197,160,68,0.1)",
                        "0 0 20px rgba(197,160,68,0.2), 0 0 60px rgba(197,160,68,0.1)",
                      ],
                      scale: [1, 1.03, 1],
                    }
              }
              transition={
                state === "shattering"
                  ? { duration: 0.4, ease: "easeIn" }
                  : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              Press
            </motion.button>

            {/* Shatter overlay */}
            {state === "shattering" &&
              shards.map((shard, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 bg-background"
                  style={{ clipPath: shard.clipPath }}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{
                    x: shard.exitX,
                    y: shard.exitY,
                    rotate: shard.exitRotate,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: shard.delay,
                    ease: "easeIn",
                  }}
                />
              ))}
          </div>
        )}

        {/* Revealed Content */}
        {state === "revealed" && (
          <motion.div
            className="w-full"
            initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
            animate={{ clipPath: "circle(100% at 50% 50%)", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                In The Press
              </h2>
            </div>

            <HoverEffect items={[...DATA.press]} stagger />
          </motion.div>
        )}
      </div>
    </section>
  );
}
