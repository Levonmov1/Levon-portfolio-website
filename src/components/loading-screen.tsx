'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let frame: number;
    let current = 0;
    const target = { value: 90 };

    const tick = () => {
      const diff = target.value - current;
      current += diff * 0.04;
      setProgress(Math.min(Math.round(current), 100));

      if (current < target.value - 0.5) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    const onLoad = () => {
      target.value = 100;
      current = Math.max(current, 85);

      const finish = () => {
        current += (100 - current) * 0.15;
        setProgress(Math.min(Math.round(current), 100));

        if (current >= 99.5) {
          setProgress(100);
          setTimeout(() => {
            setDone(true);
            document.body.style.overflow = '';
          }, 300);
        } else {
          requestAnimationFrame(finish);
        }
      };
      requestAnimationFrame(finish);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', onLoad);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Progress number */}
          <motion.span
            className="text-6xl md:text-8xl font-mono font-light tracking-tighter text-foreground tabular-nums"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {progress}
          </motion.span>

          {/* Progress bar */}
          <div className="mt-6 w-48 md:w-64 h-[2px] bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
