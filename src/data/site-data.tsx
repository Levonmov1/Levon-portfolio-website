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
  TurtleIcon,
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
      icon: TurtleIcon,
      bgImage: null,
      bgVideo: null,
      tileImages: [
        "/images/reptilia-1.jpg",
        "/images/reptilia-2.jpg",
        "/images/reptilia-3.jpg",
        "/images/reptilia-4.jpg",
        "/images/reptilia-5.jpg",
        "/images/reptilia-6.jpg",
      ],
      overlayImage: null,
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
      bgVideo: "/images/Levon-Animal-Shoot.mp4",
      tileImages: null,
      overlayImage: null,
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
      bgVideo: null,
      tileImages: null,
      overlayImage: null,
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
      bgVideo: null,
      tileImages: null,
      overlayImage: null,
    },
    {
      year: "2019",
      title: "PHOENIX AI",
      subtitle: "SCALING UP",
      location: "Toronto, Ontario",
      description:
        "Launched Phoenix AI — sharing the proprietary trading system publicly for the first time. A platform built on years of algorithmic research, giving traders access to institutional-grade analytics and automated strategies.",
      icon: CpuIcon,
      bgImage: "/images/Car-front-snake-darkBG.JPG",
      bgVideo: null,
      tileImages: null,
      overlayImage: null,
    },
    {
      year: "2023",
      title: "TUFFX FOUNDED",
      subtitle: "GOING GLOBAL",
      location: "Dubai, UAE",
      description:
        "Founded TuffX, a UAE-based technology corporation focused on software engineering, product management, and full-scale digital solutions for businesses worldwide.",
      icon: RocketIcon,
      bgImage: "/images/car-front.JPG",
      bgVideo: null,
      tileImages: null,
      overlayImage: null,
    },
    {
      year: "2025",
      title: "HOPE'S HAVEN DOG RESCUE FOUNDATION",
      subtitle: "GIVING BACK",
      location: "Greater Toronto Area",
      description:
        "Founded Hope's Haven Dog Rescue Foundation — a registered charity dedicated to rescuing, rehabilitating, and rehoming dogs in need across the Greater Toronto Area. What started as a lifelong passion for animal welfare became a mission to give every dog a second chance at a loving home.",
      icon: HeartIcon,
      bgImage: "/images/Levon-hope-beach.jpg",
      bgVideo: null,
      tileImages: null,
      overlayImage: null,
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
    description:
      "Dedicated to the rescue, rehabilitation, and rehoming of dogs in need. We partner with shelters and foster networks to give every dog a second chance at life.",
    vision:
      "Our long-term vision extends beyond rescue, we're building a network that supports sustainable animal welfare across communities.",
    donateUrl: "https://hopeshaven.ca/donate",
    fosterUrl: "https://hopeshaven.ca/foster",
    adoptUrl: "https://www.hopeshaven.ca/adopt",
    availableDogsUrl: "https://www.hopeshaven.ca/available-dogs",
    website: "https://hopeshaven.ca",
    stats: [
      { label: "Dogs Rescued", value: 100, suffix: "+" },
      { label: "Foster Families", value: 50, suffix: "+" },
      { label: "Successful Adoptions", value: 95, suffix: "%" },
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
