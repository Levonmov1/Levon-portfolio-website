"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  animate,
  useTransform,
} from "motion/react";

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  label: string;
}

export default function AnimatedCounter({
  value,
  suffix,
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const display = useTransform(springValue, (latest) =>
    Math.round(latest).toString()
  );
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 2 });
    }
  }, [isInView, motionValue, value]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="text-5xl md:text-6xl font-bold text-primary tabular-nums">
        <DisplayValue display={display} />
        {suffix}
      </span>
      <span className="text-sm text-muted-foreground uppercase tracking-wider mt-2">
        {label}
      </span>
    </div>
  );
}

function DisplayValue({
  display,
}: {
  display: ReturnType<typeof useTransform<number, string>>;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = v;
      }
    });
    return unsubscribe;
  }, [display]);

  return <span ref={ref}>0</span>;
}
