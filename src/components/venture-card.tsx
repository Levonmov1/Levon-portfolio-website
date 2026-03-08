"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

interface VentureCardProps {
  name: string;
  href: string | null;
  location: string;
  description: string;
  logoDark: string;
  logoLight: string;
  founded: string;
}

export default function VentureCard({
  name,
  href,
  location,
  description,
  logoDark,
  logoLight,
  founded,
}: VentureCardProps) {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? logoDark : logoLight;

  const cardContent = (
    <GlowCard glowColor="orange" customSize className="group w-full h-full p-6">
      {href && (
        <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      )}

      <div className="relative z-10">
        <div className="mb-4">
          <Image
            src={logoSrc}
            alt={name}
            width={200}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </div>

        <h3 className="text-xl font-bold">{name}</h3>

        <p className="text-sm text-muted-foreground mt-1">
          {location} &middot; Founded {founded}
        </p>

        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
    </GlowCard>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
