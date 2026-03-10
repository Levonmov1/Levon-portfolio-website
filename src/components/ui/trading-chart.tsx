"use client";

import { motion } from "motion/react";

// Deterministic candle data — no Math.random() to avoid hydration mismatches
const CANDLES = Array.from({ length: 24 }, (_, i) => {
  const base = 100 + Math.sin(i * 0.7) * 30 + Math.sin(i * 1.3) * 15;
  const open = base + ((i * 7) % 11) - 5;
  const close = base + ((i * 13) % 17) - 8;
  const high = Math.max(open, close) + ((i * 3) % 7);
  const low = Math.min(open, close) - ((i * 5) % 6);
  return { open, close, high, low, isGreen: close >= open };
});

// Price range for scaling
const allPrices = CANDLES.flatMap((c) => [c.high, c.low]);
const minPrice = Math.min(...allPrices) - 5;
const maxPrice = Math.max(...allPrices) + 5;
const priceRange = maxPrice - minPrice;

// Chart layout
const CHART_W = 600;
const CHART_H = 300;
const PAD_X = 20;
const PAD_Y = 20;
const plotW = CHART_W - PAD_X * 2;
const plotH = CHART_H - PAD_Y * 2;

function priceToY(price: number) {
  return PAD_Y + plotH - ((price - minPrice) / priceRange) * plotH;
}

function indexToX(i: number) {
  return PAD_X + (i / (CANDLES.length - 1)) * plotW;
}

const candleWidth = plotW / CANDLES.length * 0.6;

// Moving average points (midpoint of each candle)
const maPoints = CANDLES.map((c, i) => {
  const mid = (c.open + c.close) / 2;
  return `${indexToX(i)},${priceToY(mid)}`;
}).join(" ");

// Grid lines
const gridLevels = 5;
const gridPrices = Array.from(
  { length: gridLevels },
  (_, i) => minPrice + (priceRange / (gridLevels - 1)) * i
);

export default function TradingChart() {
  return (
    <div className="w-full h-full flex items-center justify-center opacity-35">
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full h-auto max-h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Glow filter for MA line */}
        <defs>
          <filter id="ma-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal grid lines */}
        {gridPrices.map((price, i) => (
          <line
            key={`hg-${i}`}
            x1={PAD_X}
            y1={priceToY(price)}
            x2={CHART_W - PAD_X}
            y2={priceToY(price)}
            stroke="white"
            strokeOpacity={0.05}
            strokeWidth={0.5}
          />
        ))}

        {/* Vertical grid lines */}
        {Array.from({ length: 6 }, (_, i) => {
          const x = PAD_X + (plotW / 5) * i;
          return (
            <line
              key={`vg-${i}`}
              x1={x}
              y1={PAD_Y}
              x2={x}
              y2={CHART_H - PAD_Y}
              stroke="white"
              strokeOpacity={0.05}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Candlesticks */}
        {CANDLES.map((candle, i) => {
          const x = indexToX(i);
          const color = candle.isGreen
            ? "oklch(0.7 0.15 145)"
            : "oklch(0.65 0.2 25)";
          const bodyTop = priceToY(Math.max(candle.open, candle.close));
          const bodyBottom = priceToY(Math.min(candle.open, candle.close));
          const bodyHeight = Math.max(bodyBottom - bodyTop, 1);

          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: i * 0.04,
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{ originX: `${x}px`, originY: `${priceToY((candle.open + candle.close) / 2)}px` }}
            >
              {/* Wick */}
              <line
                x1={x}
                y1={priceToY(candle.high)}
                x2={x}
                y2={priceToY(candle.low)}
                stroke={color}
                strokeWidth={1}
              />
              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                fill={color}
                rx={1}
              />
            </motion.g>
          );
        })}

        {/* Moving average line */}
        <motion.polyline
          points={maPoints}
          fill="none"
          stroke="oklch(0.78 0.12 85)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ma-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
