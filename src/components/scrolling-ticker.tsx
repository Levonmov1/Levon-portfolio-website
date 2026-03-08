"use client";

interface ScrollingTickerProps {
  items: readonly string[];
}

export default function ScrollingTicker({ items }: ScrollingTickerProps) {
  const content = items.join("  ◆  ") + "  ◆  ";

  return (
    <div className="w-full overflow-hidden border-t border-border/30 py-4">
      <div className="animate-ticker whitespace-nowrap">
        <span className="text-sm font-mono tracking-[0.3em] text-muted-foreground/60 uppercase">
          {content}
          {content}
        </span>
      </div>
    </div>
  );
}
