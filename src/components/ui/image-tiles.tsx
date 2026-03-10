'use client'
import { motion, Variants } from 'motion/react';

interface ImageTilesProps {
  images: string[];
  columns?: 3;
}

const tileVariants: { rotation: number; x: number; y: number }[] = [
  { rotation: -3, x: -4, y: -3 },
  { rotation: 2, x: 2, y: -5 },
  { rotation: -2, x: 4, y: -2 },
  { rotation: 3, x: -3, y: 3 },
  { rotation: -2, x: 5, y: 2 },
  { rotation: 3, x: -2, y: 4 },
];

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.12,
    },
  },
};

function makeTileVariants(i: number): Variants {
  const t = tileVariants[i % tileVariants.length];
  return {
    initial: { rotate: 0, x: 0, y: 0, opacity: 0, scale: 0.8 },
    animate: {
      rotate: t.rotation,
      x: t.x,
      y: t.y,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 14,
      },
    },
    hover: {
      rotate: 0,
      scale: 1.08,
      y: t.y - 8,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };
}

export default function ImageTiles({ images, columns }: ImageTilesProps) {
  const tiles = images;

  return (
    <motion.div
      className="grid grid-cols-3 gap-2 lg:gap-3"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {tiles.map((src, i) => (
        <motion.div
          key={i}
          className="overflow-hidden rounded-xl shadow-lg bg-white cursor-pointer"
          variants={makeTileVariants(i)}
          whileHover="hover"
          animate="animate"
        >
          <img
            src={src}
            alt={`Tile ${i + 1}`}
            className="w-full h-full object-cover p-1.5 rounded-xl"
            draggable={false}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
