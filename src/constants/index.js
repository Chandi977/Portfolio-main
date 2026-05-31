export const mySocials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/chandi-charan-mahato-3631a7178/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_chara.n_/", // Replace if you use a different handle
    icon: "/assets/socials/instagram.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/Chandi977",
    icon: "/assets/socials/github.svg", // Make sure this icon exists in your assets
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/Chandi977/",
    icon: "/assets/socials/leetcode.svg", // Add an icon if you have one for LeetCode
  },
];

export const freelanceServices = [
  {
    title: "Launch the MVP",
    description:
      "From raw idea to live demo: I plan, build, polish, and deploy product-ready web experiences.",
    points: [
      "MERN apps with clean product flows",
      "Auth, APIs, dashboards, and integrations",
      "Fast deploys with performance baked in",
    ],
  },
  {
    title: "Glow-Up the Stack",
    description:
      "Already have something live? I tighten the experience, clean up bottlenecks, and make it demo-worthy.",
    points: [
      "UI polish and smoother user journeys",
      "Caching, queues, and real-time upgrades",
      "Bug fixes, refactors, and launch hardening",
    ],
  },
  {
    title: "Build Partner Mode",
    description:
      "Need a dev who can think product, architecture, and execution? I plug in and move the build forward.",
    points: [
      "Architecture reviews and roadmap calls",
      "Proofs of concept and feature spikes",
      "Hands-on engineering support",
    ],
  },
];

export const freelanceDetails = [
  { label: "Availability", value: "Open for selected remote builds" },
  { label: "Engagements", value: "MVPs, revamps, sprints, or demos" },
  { label: "Response Time", value: "Replies within 24-48 hours" },
];

// constants.js

export const myProjects = [
  {
    id: 1,
    title: "Promove.cloud - National Innovation Platform",
    category: "Live Product",
    description:
      "An Instant Execution Engine that turns student projects and execution potential into a verifiable Innovation Score.",
    fullDescription:
      "Promove.cloud is a live innovation platform built to bridge the gap between student potential and industry execution. It features job listings, industry problem boards, investment pools, and a verifiable Innovation Score system.",
    features: [
      "Innovation Score engine",
      "Job & industry problem board",
      "Investment pool access",
      "Modern dark-themed UI",
      "Production-grade deployment",
    ],
    technologies: [
      "Web Technologies",
      "Cloud Deployment",
      "Responsive Design",
      "Production Infrastructure",
    ],
    image: "/assets/projects/promove.webp",
    href: "https://promove.cloud",
    github: "",
    stats: {
      year: "2025",
      duration: "Ongoing",
      role: "Full Stack Builder",
    },
  },
  {
    id: 2,
    title: "Prem Industries - Corporate Platform",
    category: "Live Product",
    description:
      "Official corporate web gateway and enterprise communication hub for Prem Industries India Ltd.",
    fullDescription:
      "Engineered and deployed the central digital platform for Prem Industries India Ltd. (premindustries.net), handling corporate communications, client portals, and brand presentation.",
    features: [
      "Corporate site — premindustries.net",
      "Client inquiry gateway",
      "AWS-hosted infrastructure",
      "Highly responsive modern UI",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS EC2",
      "AWS S3",
      "AWS CloudFront",
      "JWT Authentication",
    ],
    image: "/assets/projects/premindustries-net.webp",
    href: "https://premindustries.net",
    github: "",
    stats: {
      year: "2025",
      duration: "Ongoing",
      role: "Full Stack Developer",
    },
  },
  {
    id: 3,
    title: "Prem Packaging - Digital Business Ecosystem",
    category: "Live Product Suite",
    description:
      "A complete enterprise suite for Prem Packaging featuring a custom design showcase, wholesale e-commerce store with dynamic sizing calculators, and a companion client/workforce mobile application.",
    fullDescription:
      "Engineered the digital infrastructure for Prem Packaging (prempackaging.com). This includes a main corporate website with product customization showcase, store.prempackaging.com for B2B e-commerce with automated dynamic pricing calculators, and a cross-platform React Native app for order tracking, leave workflows, and workforce coordination.",
    features: [
      "B2B custom catalog showcase & RFQ flow",
      "E-commerce store with dynamic size calculators",
      "Secure client invoices, ledger tracking & Redis caching",
      "React Native mobile app with FCM push alerts",
      "Workforce shift logging & leave workflows",
    ],
    technologies: [
      "React Native",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "AWS (EC2, S3, CloudFront)",
      "Firebase Cloud Messaging",
    ],
    image: "/assets/projects/prem-store.webp",
    href: "https://store.prempackaging.com",
    github: "",
    stats: {
      year: "2025",
      duration: "Ongoing",
      role: "Lead Full Stack Developer",
    },
  },
  {
    id: 4,
    title: "Teak & Traditions - Premium Furniture Store",
    category: "Live E-Commerce",
    description:
      "A premium online furniture store by Aura Furnishings — handcrafted teak and wood collections with room-based browsing, EMI options, and bulk/GST ordering.",
    fullDescription:
      "Full e-commerce build for Teak & Traditions covering product discovery by room or style, partial payments and EMI, wishlist, cart, bulk/GST invoicing, and a curated 'Ready to Ship' category.",
    features: [
      "Shop by room, style, and product",
      "Partial payment & EMI support",
      "Wishlist and cart",
      "Bulk orders & GST invoicing",
      "Ready to Ship section",
      "Responsive storefront",
    ],
    technologies: [
      "E-Commerce Platform",
      "Responsive Design",
      "Payment Integration",
      "Product Catalog",
    ],
    image: "/assets/projects/teakandtraditions.webp",
    href: "https://teakandtraditions.com",
    github: "",
    stats: {
      year: "2025",
      duration: "Delivered",
      role: "Full Stack Builder",
    },
  },
  {
    id: 5,
    title: "PH Steels - B2B Steel Trading Platform",
    category: "Live Product",
    description:
      "B2B web presence for PH Steels, an authorized JSW dealer, wholesale trader, and distributor of steel plates, sheets, coils, and industrial products in Ghaziabad.",
    fullDescription:
      "Built and deployed a clean B2B product catalog and inquiry platform for PH Steels (phsteel.in) in Ghaziabad — covering their full product range (CR/HR coils, steel plates, MS pipes), company profile, and direct enquiry flow.",
    features: [
      "Full product catalog with categories",
      "Company profile & GST details",
      "Send enquiry flow",
      "Search across products & services",
      "Responsive layout",
    ],
    technologies: [
      "Web Technologies",
      "Responsive Design",
      "Product Catalog",
      "B2B Platform",
    ],
    image: "/assets/projects/phsteels.webp",
    href: "https://www.phsteel.in",
    github: "",
    stats: {
      year: "2025",
      duration: "Delivered",
      role: "Full Stack Builder",
    },
  },
  {
    id: 6,
    title: "URL Shortener Service - Analytics-Ready MERN Build",
    category: "Full Stack Showcase",
    description:
      "A clean URL-shortening demo with auth, analytics, expiry, rate limits, background jobs, and Redis-style speed.",
    fullDescription:
      "A production-style URL shortener built to show real backend thinking: fast redirects, cached lookups, queued analytics, abuse protection, and cleanup workers.",
    features: [
      "Custom short URL generation",
      "High-speed redirection with Redis & FlashKV",
      "JWT-based authentication & authorization",
      "Rate limiting & abuse prevention",
      "Click analytics processed asynchronously",
      "Background workers for cleanup & metrics",
      "Centralized logging",
    ],
    technologies: [
      "MongoDB",
      "Mongoose",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT Authentication",
      "UUID",
      "Input Validation",
      "Async Processing",
      "FlashKV (Custom Redis-like Cache)",
      "TTL & Expiry Handling",
      "express-rate-limit",
      "Retry Strategies",
      "Winston Logger",
      "AWS EC2",
      "AWS S3",
      "AWS IAM",
      "Environment Variables (.env)",
      "REST APIs",
      "System Design",
      "Git & GitHub",
    ],
    image: "/assets/projects/Url-shortner.webp",
    href: "https://github.com/Chandi977/MERN_URL_shortner",
    github: "https://github.com/Chandi977/MERN_URL_shortner",
    stats: {
      year: "2024",
      duration: "2 months",
      role: "Full Stack Builder",
    },
  },
  {
    id: 7,
    title: "FlashKV - Tiny Redis-Style Cache Engine",
    category: "Systems Showcase",
    description:
      "A C++ key-value cache demo built from scratch to explore concurrency, TTL expiry, and low-latency storage.",
    fullDescription:
      "FlashKV is a multithreaded in-memory store with thread-safe operations, TTL-based expiration, and a lightweight Redis-inspired command model.",
    features: [
      "Thread-safe in-memory storage",
      "SET, GET, DELETE, EXPIRE operations",
      "TTL-based key expiration",
      "Multithreaded request handling",
      "Optimized data structures",
    ],
    technologies: [
      "C++17",
      "STL (unordered_map, vector, deque)",
      "Multithreading",
      "Concurrency Control",
      "Mutex & Atomic Operations",
      "Socket Programming",
      "Custom Protocol Parsing",
      "TTL & Expiry Algorithms",
      "In-Memory Databases",
      "Low-Latency Systems",
      "System Design",
    ],
    image: "/assets/projects/FlashKv.webp",
    href: "https://github.com/Chandi977/FlashKv",
    github: "https://github.com/Chandi977/FlashKv",
    stats: {
      year: "2024",
      duration: "1 month",
      role: "Systems Builder",
    },
  },
  {
    id: 8,
    title: "YouTube Clone - Video Streaming Demo",
    category: "Full Stack Showcase",
    description:
      "A video-platform showcase with uploads, auth, background transcoding, cloud media, and streaming-ready APIs.",
    fullDescription:
      "Built as a full-stack media app demo: users can upload videos, backend workers process media with FFmpeg, and cloud storage handles delivery.",
    features: [
      "Secure video upload & streaming",
      "FFmpeg-based video transcoding",
      "Background processing with workers",
      "JWT authentication",
      "Cloud media storage",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "FFmpeg",
      "Video Transcoding Pipelines",
      "BullMQ",
      "Background Workers",
      "Redis (Upstash)",
      "JWT Authentication",
      "UUID",
      "Cloudinary",
      "AWS S3",
      "Winston Logger",
      "REST APIs",
      "MVC Architecture",
      "Git & GitHub",
    ],
    image: "/assets/projects/youtube.webp",
    href: "https://client-nine-green-46.vercel.app/",
    github: "https://github.com/Chandi977/Youtube-frontend",
    stats: {
      year: "2024",
      duration: "2 months",
      role: "Full Stack Builder",
    },
  },
  {
    id: 9,
    title: "Zenith - Emergency Route Simulator",
    category: "Mobile + Backend Showcase",
    description:
      "An Android emergency-routing concept with real-time ambulance tracking, optimized routes, and instant alerts.",
    fullDescription:
      "Zenith pairs a Flutter Android app with a Node.js backend to demonstrate live location updates, traffic-aware route logic, maps integration, and emergency notifications.",
    features: [
      "Android application built with Flutter",
      "Real-time ambulance tracking",
      "Traffic-aware route optimization",
      "WebSocket-based live updates",
      "Emergency notifications",
      "Asynchronous backend processing",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Android Platform",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "WebSockets",
      "Event-Driven Architecture",
      "Firebase Cloud Messaging",
      "Google Maps API",
      "Google Places API",
      "A* Pathfinding Algorithm",
      "Redis",
      "Background Workers",
      "REST APIs",
      "System Design",
      "AWS EC2",
    ],
    image: "/assets/projects/zenith-ar.webp",
    href: "https://github.com/Chandi977/AR-Based-Emergency-Route-Simulator",
    github: "https://github.com/Chandi977/AR-Based-Emergency-Route-Simulator",
    stats: {
      year: "2025",
      duration: "Ongoing",
      role: "Backend + Realtime Builder",
    },
  },
  {
    id: 10,
    title: "Speakbot - Voice Command Assistant",
    category: "Automation Showcase",
    description:
      "A Python assistant demo that listens, understands basic commands, and pulls useful info from external APIs.",
    fullDescription:
      "A lightweight automation assistant combining speech input, text output, weather lookup, Wikipedia search, and command workflows.",
    features: [
      "Voice-based commands",
      "Weather & location lookup",
      "Wikipedia & movie search",
      "Automation workflows",
    ],
    technologies: [
      "Python",
      "REST APIs",
      "OpenWeather API",
      "Wikipedia API",
      "Geolocation APIs",
      "Speech-to-Text",
      "Text-to-Speech",
      "Automation Scripts",
    ],
    image: "/assets/projects/speakbot.webp",
    href: "https://github.com/Chandi977/Speakbot-Command-Following-Bot",
    github: "https://github.com/Chandi977/Speakbot-Command-Following-Bot",
    stats: {
      year: "2023",
      duration: "1 month",
      role: "Automation Builder",
    },
  },
  {
    id: 11,
    title: "Banjara Tour & Travel - Booking Website",
    category: "Web Showcase",
    description:
      "A travel-agency website demo with packages, booking inquiries, sessions, and responsive pages.",
    fullDescription:
      "A PHP and MySQL travel platform built around package browsing, inquiry capture, session handling, and simple admin-style workflows.",
    features: [
      "Tour package management",
      "Booking & inquiry forms",
      "Session-based authentication",
      "Responsive UI",
    ],
    technologies: [
      "Core PHP",
      "HTML5",
      "CSS3",
      "JavaScript",
      "MySQL",
      "Session Handling",
      "Form Validation",
      "XAMPP",
      "Git",
    ],
    image: "/assets/projects/banjara.webp",
    href: "https://github.com/Chandi977/Banjara-Tour-and-Travel",
    github: "https://github.com/Chandi977/Banjara-Tour-and-Travel",
    stats: {
      year: "2022",
      duration: "2 months",
      role: "Web Builder",
    },
  },
  {
    id: 12,
    title: "Netflix Clone - Streaming UI Replica",
    category: "Frontend Showcase",
    description:
      "A streaming-style React UI demo with Firebase auth, protected routes, and responsive content sections.",
    fullDescription:
      "A frontend showcase focused on clean layout, auth flow, dynamic UI sections, and a familiar streaming-app experience.",
    features: [
      "User authentication",
      "Dynamic UI rendering",
      "Protected routes",
      "Responsive design",
    ],
    technologies: [
      "React.js",
      "Firebase Authentication",
      "Firebase Firestore",
      "JavaScript (ES6)",
      "CSS3",
      "REST APIs",
      "Git & GitHub",
    ],
    image: "/assets/projects/netflix.webp",
    href: "https://github.com/Chandi977/Netflixclone",
    github: "https://github.com/Chandi977/Netflixclone",
    stats: {
      year: "2022",
      duration: "1 month",
      role: "Frontend Builder",
    },
  },
];

export const reviews = [
  {
    name: "Sanskar",
    username: "@sanskar",
    body: "Clean UI, smooth motion, and the projects feel ready to demo.",
    img: "https://robohash.org/sanskar",
  },
  {
    name: "Aditya",
    username: "@aditya",
    body: "The build quality feels sharp. Every section has real showcase energy.",
    img: "https://robohash.org/aditya",
  },
  {
    name: "Riya",
    username: "@riya",
    body: "The portfolio is easy to scan, but still feels fresh and cinematic.",
    img: "https://robohash.org/riya",
  },
  {
    name: "Suraj",
    username: "@suraj",
    body: "Strong backend thinking with a presentation style that actually stands out.",
    img: "https://robohash.org/suraj",
  },
  {
    name: "Anurag",
    username: "@anurag",
    body: "Responsive, polished, and packed with the kind of details recruiters notice.",
    img: "https://robohash.org/anurag",
  },
  {
    name: "Neha",
    username: "@neha",
    body: "The attention to microcopy, motion, and product context is very strong.",
    img: "https://robohash.org/neha",
  },
  {
    name: "Priyanshu",
    username: "@priyanshu",
    body: "The systems projects make the portfolio more than just a pretty UI.",
    img: "https://robohash.org/priyanshu",
  },
  {
    name: "Jyoti",
    username: "@jyoti",
    body: "Creative presentation with practical engineering depth behind it.",
    img: "https://robohash.org/jyoti",
  },
  {
    name: "Kabir",
    username: "@kabir",
    body: "Polished enough for clients, technical enough for engineering teams.",
    img: "https://robohash.org/kabir",
  },
  {
    name: "Anjul",
    username: "@anjul",
    body: "Fast, modern, and confident. The showcase format works really well.",
    img: "https://robohash.org/anjul",
  },
];

// constants.js

export const experiences = [
  {
    date: "Dec 2025 - Present",
    title: "Full Stack Developer",
    job: "Prem Packaging (Prem Industries India Ltd.)",
    location: "Ghaziabad, Uttar Pradesh, India",
    type: "Full-time",
    description:
      "Building production-grade backend services and cloud-hosted business systems with a focus on speed, reliability, and clean workflows.",
    contents: [
      "Built and maintained 5+ backend services powering product catalogs, order flows, and admin operations.",
      "Designed 15+ REST APIs with search, filters, auth rules, and clean MongoDB data flows.",
      "Used AWS EC2, S3, CloudFront, and IAM to keep services deployable, secure, and available.",
      "Added Redis caching to reduce repeated database reads by around 40%.",
      "Shipped frontend builds through AWS Amplify while keeping backend connectivity stable.",
      "Fixed 20+ production issues across env setup, IAM access, and database connectivity.",
    ],
    achievements: [
      "Reduced average API response times by 30-40% through caching and query optimization",
      "Improved system reliability by resolving critical production configuration issues",
      "Kept business-critical backend flows stable for daily operations",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "AWS EC2",
      "AWS S3",
      "AWS CloudFront",
      "AWS IAM",
      "AWS Amplify",
      "REST APIs",
      "Git & GitHub",
    ],
    metrics: [
      {
        value: "15+",
        label: "REST APIs shipped and maintained",
      },
      {
        value: "30–40%",
        label: "API latency reduction",
      },
    ],
    website: "https://www.prempackaging.com",
    certificate: "",
  },

  {
    date: "Aug 2025 - Nov 2025",
    title: "MERN Stack Developer",
    job: "GeeksforGeeks (Internship)",
    location: "Remote",
    type: "Internship",
    description:
      "MERN internship focused on building full-stack projects with secure auth, reusable UI, and practical APIs.",
    contents: [
      "Built 5+ MERN systems with login flows, role-based access, and connected data models.",
      "Implemented JWT authentication across backend services.",
      "Created 20+ reusable React components and reduced unnecessary UI re-renders.",
      "Integrated REST APIs and third-party services for real-world app scenarios.",
      "Solved 200+ DSA problems alongside full-stack project work.",
    ],
    achievements: [
      "Delivered multiple full-stack demos with secure authentication",
      "Improved frontend performance through reusable component patterns",
      "Strengthened backend access control with JWT-based security",
    ],
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT",
      "REST APIs",
      "JavaScript (ES6+)",
      "Git & GitHub",
    ],
    metrics: [
      {
        value: "5+",
        label: "End-to-end systems delivered",
      },
      {
        value: "20+",
        label: "Reusable frontend components built",
      },
    ],
    website: "https://www.geeksforgeeks.org",
    certificate: "",
  },

  {
    date: "Jun 2025",
    title: "Software Engineering Virtual Experience",
    job: "J.P. Morgan Chase & Co. (Forage)",
    location: "Virtual",
    type: "Virtual Experience",
    description:
      "Enterprise-style engineering simulation focused on financial data, frontend fixes, and production-like tasks.",
    contents: [
      "Completed 4 simulation tasks across data visualization, UI enhancements, and bug fixes.",
      "Built a stock-price data feed interface with Python, React, and TypeScript.",
      "Processed and visualized financial data streams with enterprise-style tooling.",
      "Explored how scalable systems are used inside investment-banking technology.",
    ],
    achievements: [
      "Delivered a functional financial-data visualization interface",
      "Gained hands-on context for enterprise financial systems",
    ],
    technologies: [
      "Python",
      "React",
      "TypeScript",
      "Data Visualization",
      "Financial Systems",
    ],
    metrics: [
      {
        value: "4",
        label: "Enterprise simulation tasks completed",
      },
    ],
    website: "https://www.theforage.com",
    certificate: "",
  },

  {
    date: "Oct 2021 - Nov 2021",
    title: "Web Development Intern",
    job: "Adityapur Auto Cluster (AAC)",
    location: "Jamshedpur, Jharkhand",
    type: "Internship",
    description:
      "Frontend internship focused on practical UI screens, forms, and internal web flows.",
    contents: [
      "Implemented 10+ responsive UI screens using HTML5, CSS3, and Flexbox.",
      "Built static pages and forms for internal digital systems.",
      "Improved consistency with shared CSS and reusable layout patterns.",
      "Fixed UI defects through review feedback and iteration.",
    ],
    achievements: [
      "Delivered multiple responsive interfaces for internal users",
      "Improved frontend maintainability with standardized styling",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "Flexbox",
      "JavaScript",
      "Responsive Design",
    ],
    metrics: [
      {
        value: "10+",
        label: "UI screens delivered",
      },
    ],
    website: "",
    certificate: "",
  },
];
