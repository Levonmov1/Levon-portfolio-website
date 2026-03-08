import { Icons } from "@/components/icons";
import {
  HomeIcon,
  UserIcon,
  Building2Icon,
  HeartIcon,
  NewspaperIcon,
  MailIcon,
  LayoutGridIcon,
  PawPrintIcon,
  LandmarkIcon,
  BitcoinIcon,
  BrainCircuitIcon,
  CpuIcon,
  RocketIcon,
  ShieldCheckIcon,
  AwardIcon,
} from "lucide-react";

export const DATA = {
  name: "Levon Movsessian",
  initials: "LM",
  url: "https://levonmovsessian.com",
  tagline:
    "Building technology, businesses, and a better world — one venture at a time.",
  description:
    "Entrepreneur, technologist, and animal welfare advocate building ventures that merge innovation with purpose.",
  heroImage: "/images/hero-1.JPG",
  heroVideo: "/images/levon-dogs.mp4",
  heroRevealText: "What truly matters, lives within.",

  navbar: [
    { href: "#home", icon: HomeIcon, label: "Home" },
    { href: "#journey", icon: UserIcon, label: "Journey" },
    { href: "#ventures", icon: Building2Icon, label: "Ventures" },
    { href: "#hopes-haven", icon: HeartIcon, label: "Hope's Haven" },
    { href: "#press", icon: NewspaperIcon, label: "Press" },
    { href: "#contact", icon: MailIcon, label: "Contact" },
  ],

  hubIcon: LayoutGridIcon,

  contact: {
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/levon-movsessian-56026a114",
        icon: Icons.linkedin,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/levon_mov",
        icon: Icons.instagram,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/levonmovsessian",
        icon: Icons.x,
        navbar: true,
      },
      Facebook: {
        name: "Facebook",
        url: "https://www.facebook.com/share/1CVhY1ecQU/",
        icon: Icons.facebook,
        navbar: true,
      },
    },
  },

  journey: [
    {
      year: "2009",
      title: "REPTILIA ZOO",
      subtitle: "WHERE IT ALL BEGAN",
      location: "Vaughan, Ontario",
      description:
        "At 16, landed my first job at Reptilia Zoo — wrestling alligators, handling cobras, and falling in love with animal welfare and conservation.",
      icon: PawPrintIcon,
      bgImage: "/images/snake-orange-front.jpg",
    },
    {
      year: "2013",
      title: "REAL ESTATE & ANIMALS NEED HOMES",
      subtitle: "PURPOSE MEETS BUSINESS",
      location: "Toronto, Ontario",
      description:
        "Entered real estate and created the 'Animals Need Homes' program — donating a portion of every home sale to partner animal rescues. First venture merging business with charitable impact.",
      icon: LandmarkIcon,
      bgImage: null,
    },
    {
      year: "2013",
      title: "BITCOIN & BLOCKCHAIN PIONEER",
      subtitle: "EARLY ADOPTION",
      location: "Toronto, Ontario",
      description:
        "Early adopter of Bitcoin and blockchain technology in Toronto. Became one of the pioneers of the industry — developing blockchain technologies and handling large volumes of crypto transactions in the early days.",
      icon: BitcoinIcon,
      bgImage: null,
    },
    {
      year: "2016",
      title: "FIRST TRADING ALGORITHM",
      subtitle: "BUILDING THE FOUNDATION",
      location: "Toronto, Ontario",
      description:
        "Built a smart trading algorithm using market analytics and data to execute micro-trades. The system's consistent success over three years laid the foundation for what would become Phoenix AI.",
      icon: BrainCircuitIcon,
      bgImage: null,
    },
    {
      year: "2019",
      title: "PHOENIX AI & BALANCED PAW",
      subtitle: "SCALING UP",
      location: "Toronto, Ontario",
      description:
        "Launched Phoenix AI — sharing the proprietary trading system publicly for the first time. Co-founded Balanced Paw with wife Hope, a professional dog training academy.",
      icon: CpuIcon,
      bgImage: "/images/Car-front-snake-darkBG.JPG",
    },
    {
      year: "2023",
      title: "TUFFX L.L.C-FZ FOUNDED",
      subtitle: "GOING GLOBAL",
      location: "Dubai, UAE",
      description:
        "Founded TuffX, a UAE-based technology corporation focused on software engineering, product management, and full-scale digital solutions for businesses worldwide.",
      icon: RocketIcon,
      bgImage: "/images/car-front.JPG",
    },
    {
      year: "2025",
      title: "HOPE'S HAVEN & SERVICE PAWS",
      subtitle: "GIVING BACK",
      location: "Greater Toronto Area",
      description:
        "Founded Hope's Haven Dog Rescue Foundation and Service Paws International — combining a lifelong passion for animal welfare with entrepreneurial efficiency.",
      icon: HeartIcon,
      bgImage: null,
    },
    {
      year: "2026",
      title: "HOPE'S HAVEN — OFFICIAL CHARITY",
      subtitle: "LEGACY",
      location: "Canada",
      description:
        "Hope's Haven receives official charity status on January 1st. Growing into one of Canada's most successful dog rescues with a 98% rehoming success rate.",
      icon: AwardIcon,
      bgImage: null,
    },
  ],

  ventures: [
    {
      name: "TuffX",
      href: "https://tuffx.com",
      location: "Dubai, UAE",
      description:
        "Technology development, software engineering, and full-scale digital solutions for businesses and entrepreneurs worldwide.",
      logoDark: "/logos/tuffx-white.png",
      logoLight: "/logos/tuffx-black.png",
      founded: "2023",
    },
    {
      name: "Phoenix AI",
      href: null,
      location: "Proprietary System",
      description:
        "Advanced artificial intelligence trading system powered by large language models and sophisticated market analysis frameworks.",
      logoDark: "/logos/phoenix-ai-full.png",
      logoLight: "/logos/phoenix-ai-full.png",
      founded: "2019",
    },
    {
      name: "Balanced Paw",
      href: "https://balancedpaw.ca",
      location: "Ontario, Canada",
      description:
        "Professional dog training academy building trust, confidence, and lasting harmony between dogs and their owners.",
      logoDark: "/logos/balanced-paw-white.png",
      logoLight: "/logos/balanced-paw-black.png",
      founded: "2019",
    },
    {
      name: "Service Paws",
      href: "https://servicepaw.ca",
      location: "International",
      description:
        "International service dog certification system providing ID card verification, credentials, and accreditation for certified trainers globally.",
      logoDark: "/logos/service-paws.png",
      logoLight: "/logos/service-paws.png",
      founded: "2025",
    },
  ],

  hopesHaven: {
    logo: "/logos/hopes-haven.png",
    mission:
      "Hope's Haven is a registered Canadian charity and fully volunteer-run dog rescue dedicated to giving stray, abandoned, and abused dogs a second chance at life. We rescue dogs from crisis situations, provide full veterinary care, and carefully match each dog with the perfect forever home.",
    donateUrl: "https://www.hopeshaven.ca/donate",
    website: "https://hopeshaven.ca",
    stats: [
      { label: "Dogs Rescued", value: 100, suffix: "+" },
      { label: "Rehoming Success", value: 98, suffix: "%" },
    ],
    social: {
      instagram: "https://www.instagram.com/hopes_haven_dogrescue",
      facebook: "https://www.facebook.com/share/1BRfQV6o9B/",
    },
  },

  press: [
    {
      publication: "Yahoo Finance",
      title: "10 Entrepreneurs Leading Industries 2021",
      href: "https://finance.yahoo.com/news/10-entrepreneurs-leading-industries-2021-200800590.html",
    },
    {
      publication: "Disrupt Magazine",
      title:
        "Who is Levon Movsessian? Inside with the Crypto Expert Who is Rocking the Blockchain and Bitcoin Industry",
      href: "https://disruptmagazine.com/who-is-levon-movsessian-inside-with-the-crypto-expert-who-is-rocking-the-blockchain-and-bitcoin-industry/",
    },
    {
      publication: "California Herald",
      title:
        "The Business of Blockchain and Bitcoin: How Levon Movsessian Pioneered a Movement",
      href: "https://www.californiaherald.com/the-business-of-blockchain-and-bitcoin-how-levon-movsessian-pioneered-a-movement/",
    },
  ],

  hub: {
    menuLinks: [
      { label: "HOME", href: "#home" },
      { label: "JOURNEY", href: "#journey" },
      { label: "VENTURES", href: "#ventures" },
      { label: "HOPE'S HAVEN", href: "#hopes-haven" },
      { label: "PRESS", href: "#press" },
      { label: "CONTACT", href: "#contact" },
    ],
    socialLinks: [
      {
        label: "LINKEDIN",
        href: "https://www.linkedin.com/in/levon-movsessian-56026a114",
      },
      { label: "INSTAGRAM", href: "https://www.instagram.com/levon_mov" },
      { label: "X / TWITTER", href: "https://x.com/levonmovsessian" },
      {
        label: "FACEBOOK",
        href: "https://www.facebook.com/share/1CVhY1ecQU/",
      },
    ],
    tickerItems: [
      "TUFFX",
      "PHOENIX AI",
      "BALANCED PAW",
      "SERVICE PAWS",
      "HOPE'S HAVEN",
    ],
  },
} as const;
