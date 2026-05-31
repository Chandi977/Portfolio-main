import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "freelance", label: "Services" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "testimonial", label: "Testimonials" },
];

const TRACKED_SECTION_IDS = [
  "home",
  ...NAV_ITEMS.map((item) => item.id),
  "contact",
];

/* Stagger variants for mobile nav items */
const mobileListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
  exit: {},
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12 } },
};

/* Arrow icon */
const ArrowRight = () => (
  <svg
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);

        const marker = window.innerHeight * 0.32;
        for (const id of TRACKED_SECTION_IDS) {
          const section = document.getElementById(id);
          if (!section) continue;
          const bounds = section.getBoundingClientRect();
          if (bounds.top <= marker && bounds.bottom >= marker) {
            setActive(id);
            break;
          }
        }

        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleToggle = useCallback(() => setIsOpen((o) => !o), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const springTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 380, damping: 34 };

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6"
    >
      {/* ── Floating pill ── */}
      <div
        className={`relative mx-auto flex h-[62px] max-w-6xl items-center gap-3 overflow-hidden rounded-2xl border px-3 pl-4 transition-all duration-500 sm:px-4 sm:pl-5 ${
          scrolled || isOpen
            ? "border-white/[0.10] bg-[#030412]/85 shadow-[0_12px_56px_rgba(3,4,18,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl"
            : "border-white/[0.07] bg-[#030412]/40 shadow-[0_4px_28px_rgba(3,4,18,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-lg"
        }`}
      >
        {/* Inner top-edge shimmer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
        />

        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={handleClose}
          aria-label="Charan Mahato – back to top"
          className="group flex shrink-0 items-center gap-3 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/50"
        >
          {/* Monogram badge */}
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-lavender/25 bg-gradient-to-br from-lavender/20 via-lavender/10 to-transparent transition-all duration-300 group-hover:border-lavender/45 group-hover:shadow-[0_0_14px_rgba(122,87,219,0.25)]">
            <span className="font-mono text-[11px] font-bold tracking-[0.15em] text-lavender">
              CM
            </span>
            {/* Soft inner glow on hover */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-xl bg-lavender/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>

          {/* Name + role */}
          <div className="hidden flex-col sm:flex">
            <span className="font-body text-[13.5px] font-semibold leading-tight tracking-[-0.02em] text-white">
              Charan Mahato
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.08em] text-neutral-500">
              FULL-STACK ENGINEER
            </span>
          </div>
        </a>

        {/* Divider */}
        <div aria-hidden className="hidden h-5 w-px bg-white/[0.07] xl:block" />

        {/* ── Desktop navigation ── */}
        <nav
          aria-label="Primary navigation"
          className="mx-auto hidden xl:block"
        >
          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative flex min-h-[38px] items-center rounded-xl px-4 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/50 ${
                      isActive
                        ? "text-white"
                        : "text-neutral-500 hover:text-white/80"
                    }`}
                  >
                    {/* Animated pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 rounded-xl bg-white/[0.08]"
                        transition={springTransition}
                      />
                    )}

                    {/* Hover bg (non-active) */}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-xl transition-colors duration-150 hover:bg-white/[0.04]" />
                    )}

                    <span className="relative z-10">{item.label}</span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        aria-hidden
                        className="absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-lavender shadow-[0_0_6px_rgba(122,87,219,0.8)]"
                        transition={springTransition}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Right actions ── */}
        <div className="ml-auto flex items-center gap-2">
          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={handleClose}
            aria-current={active === "contact" ? "location" : undefined}
            className={`hidden min-h-[38px] shrink-0 items-center gap-2 rounded-xl px-4 text-[13px] font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/50 xl:flex ${
              active === "contact"
                ? "bg-lavender text-white shadow-[0_0_20px_rgba(122,87,219,0.4)]"
                : "border border-lavender/[0.22] bg-lavender/[0.10] text-lavender hover:bg-lavender/[0.18] hover:border-lavender/40 hover:shadow-[0_0_16px_rgba(122,87,219,0.22)]"
            }`}
          >
            Contact
            <ArrowRight />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.04] text-white/60 transition-all duration-200 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/50 xl:hidden"
          >
            {/* Hamburger / X morphing bars */}
            <span className="relative flex h-4 w-[18px] flex-col justify-between" aria-hidden>
              <span
                className={`block h-px w-full origin-center bg-current transition-all duration-300 ${
                  isOpen ? "translate-y-[7.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px origin-center bg-current transition-all duration-250 ${
                  isOpen ? "w-0 opacity-0" : "w-full opacity-100"
                }`}
              />
              <span
                className={`block h-px w-full origin-center bg-current transition-all duration-300 ${
                  isOpen ? "-translate-y-[7.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ── Scroll glow rule beneath pill ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-x-4 top-[74px] h-px bg-gradient-to-r from-transparent via-lavender/20 to-transparent sm:inset-x-6"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
            }
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/[0.09] bg-[#030412]/90 shadow-[0_28px_64px_rgba(3,4,18,0.75),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl xl:hidden"
          >
            {/* Top shimmer */}
            <div
              aria-hidden
              className="pointer-events-none h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent"
            />

            {/* Nav links – staggered */}
            <motion.ul
              className="grid gap-0.5 p-2 sm:grid-cols-2"
              variants={reduceMotion ? {} : mobileListVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <motion.li
                    key={item.id}
                    variants={reduceMotion ? {} : mobileItemVariants}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={handleClose}
                      aria-current={isActive ? "location" : undefined}
                      className={`group flex min-h-[44px] items-center gap-3 rounded-xl px-4 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/50 ${
                        isActive
                          ? "bg-lavender/[0.10] text-white"
                          : "text-neutral-400 hover:bg-white/[0.05] hover:text-white/80"
                      }`}
                    >
                      {/* Dot */}
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-150 ${
                          isActive
                            ? "bg-lavender shadow-[0_0_6px_rgba(122,87,219,0.7)]"
                            : "bg-white/10 group-hover:bg-white/25"
                        }`}
                      />
                      {item.label}
                      {/* Active right indicator */}
                      {isActive && (
                        <span className="ml-auto text-lavender/50">
                          <ArrowRight />
                        </span>
                      )}
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Contact CTA row */}
            <div className="border-t border-white/[0.06] p-2 pt-2">
              <a
                href="#contact"
                onClick={handleClose}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-lavender/[0.22] bg-lavender/[0.10] px-5 text-sm font-semibold text-lavender transition-all duration-200 hover:bg-lavender/[0.18] hover:border-lavender/40 hover:shadow-[0_0_20px_rgba(122,87,219,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/50"
              >
                Contact Me
                <ArrowRight />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default memo(Navbar);
