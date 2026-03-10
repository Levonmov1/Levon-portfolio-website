"use client";

import { useHub } from "@/components/hub-provider";
import { DATA } from "@/data/site-data";
import ScrollingTicker from "@/components/scrolling-ticker";
import { ModeToggle } from "@/components/mode-toggle";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

export default function HubOverlay() {
  const { isOpen, close } = useHub();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    close();
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col"
        >
          {/* Top bar: theme toggle + close */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="sm:hidden"
            >
              <ModeToggle className="size-6 cursor-pointer" />
            </motion.div>
            <button
              onClick={close}
              className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 md:px-16 gap-8 md:gap-16">
            {/* Left — Name + Nav */}
            <div className="flex flex-col gap-8 md:gap-12">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-3xl md:text-5xl font-bold tracking-tighter"
              >
                {DATA.name.toUpperCase().split(" ").join("\n").split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </motion.h2>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">
                  Links / Menu
                </span>
                {DATA.hub.menuLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-2xl md:text-4xl font-bold tracking-tight text-left hover:text-primary transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Center — Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="hidden md:block relative w-[300px] h-[400px] lg:w-[350px] lg:h-[500px]"
            >
              <Image
                src="/images/vertical-walking-1.JPG"
                alt={DATA.name}
                fill
                className="object-cover rounded-2xl"
              />
            </motion.div>

            {/* Right — Social */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">
                Connect / Social
              </span>
              {DATA.hub.socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-3xl font-bold tracking-tight text-right hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Explore More button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex justify-center pb-4"
          >
            <button
              onClick={() => handleNavClick("#journey")}
              className="px-6 py-3 rounded-full border border-primary text-primary text-sm font-semibold tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Explore More
            </button>
          </motion.div>

          {/* Scrolling Ticker */}
          <ScrollingTicker items={DATA.hub.tickerItems} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
