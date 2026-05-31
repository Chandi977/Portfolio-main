import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Lenis smooth-scroll wrapper
   - Gives the page real inertia / momentum scrolling
   - Updates window.scrollY natively → useScroll (motion/react)
     and ScrollTrigger (GSAP) both see the real scroll position
   - Syncs to GSAP's ticker so ScrollTrigger and Lenis share
     the same RAF loop (no double-rAF overhead)
   - Exposes the Lenis instance via context so any component
     can call `lenis.scrollTo('#id')` for programmatic scrolling
   ============================================================ */

const NAV_OFFSET = 96;

// Context — any descendant can grab the Lenis instance
const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const previousScrollRestoration = history.scrollRestoration;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // ── Create Lenis ──────────────────────────────────────
    const lenis = new Lenis({
      lerp: 0.09,            // silky-smooth inertia — feels like butter on glass
      duration: 1.1,         // base duration for scrollTo animations
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      wheelMultiplier: 1.0,  // 1:1 with input — no artificial boost
      touchMultiplier: 1.8,  // responsive on mobile without over-scrolling
      syncTouch: true,       // unify touch with the same lerp loop
      infinite: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      autoRaf: false,        // GSAP ticker drives raf (set explicitly)
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    // ── Sync Lenis → GSAP ticker ──────────────────────────
    // Single shared RAF loop: GSAP's ticker drives Lenis.
    // This ensures ScrollTrigger and Lenis never fight.
    // lagSmoothing(60, 0.333): cap large deltas (>60ms frame drops) so scroll
    // doesn't jump after a heavy frame — smooth recovery instead of lurch.
    gsap.ticker.lagSmoothing(60, 0.333);
    const tickerCallback = (time) => {
      lenis.raf(time * 1000); // GSAP passes seconds, Lenis expects ms
    };
    gsap.ticker.add(tickerCallback);

    // Clear the browser's cached scroll position on unload so the next visit
    // always starts at the top — avoids Lenis having to smooth from a stale offset.
    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", onBeforeUnload, { passive: true });

    let disposed = false;
    let refreshRaf = 0;
    const refreshScrollSystems = () => {
      if (disposed) return;
      if (refreshRaf) return;
      refreshRaf = requestAnimationFrame(() => {
        if (disposed) return;
        refreshRaf = 0;
        lenis.resize();
        ScrollTrigger.refresh();
      });
    };

    const resizeObserver = new ResizeObserver(refreshScrollSystems);
    resizeObserver.observe(document.body);
    window.addEventListener("load", refreshScrollSystems);
    document.fonts?.ready?.then(refreshScrollSystems).catch(() => {});

    // Disable Lenis's own internal RAF — GSAP's ticker is driving it
    // (Lenis v1.x: calling raf() manually is the intended pattern
    //  when autoRaf is not set or set to false.)

    // ── Anchor-click handler ──────────────────────────────
    const onClick = (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const anchor =
        e.target.closest && e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -NAV_OFFSET });
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onClick);

    // ── Hash on load / popstate ───────────────────────────
    const scrollToHash = (immediate = false) => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      let attempts = 0;
      const tryScroll = () => {
        const target = document.getElementById(id);
        if (!target) {
          if (attempts++ < 180) requestAnimationFrame(tryScroll);
          return;
        }
        // Defer past initial layout so pinned sections measure correctly
        requestAnimationFrame(() => {
          refreshScrollSystems();
          const pinnedRevealOffset =
            target.dataset.pinnedStage === "true" ? window.innerHeight * 0.28 : 0;
          const offset = -NAV_OFFSET + pinnedRevealOffset;
          if (immediate) {
            const top = target.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo(0, top);
            lenis.scrollTo(top, { immediate: true });
            ScrollTrigger.update();
            return;
          }
          lenis.scrollTo(target, {
            offset,
            immediate: false,
          });
        });
      };
      tryScroll();
    };

    const hashTimers = [];
    if (window.location.hash) {
      for (const delay of [500, 1700, 3200, 5000]) {
        hashTimers.push(setTimeout(() => scrollToHash(true), delay));
      }
    }
    const onHashChange = () => scrollToHash(false);
    window.addEventListener("hashchange", onHashChange);

    // ── Cleanup ───────────────────────────────────────────
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("load", refreshScrollSystems);
      window.removeEventListener("beforeunload", onBeforeUnload);
      hashTimers.forEach(clearTimeout);
      disposed = true;
      resizeObserver.disconnect();
      if (refreshRaf) cancelAnimationFrame(refreshRaf);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = previousScrollRestoration;
      }
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
