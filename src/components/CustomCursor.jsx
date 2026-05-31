import { useEffect, useRef, memo } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";

const CustomCursor = memo(function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    // Only on true pointer devices (not touch screens)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let isHovering = false;

    const lerp = (a, b, n) => a + (b - a) * n;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e) => {
      const interactive = e.target.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']"
      );
      if (!!interactive !== isHovering) {
        isHovering = !!interactive;
        const ring = ringRef.current;
        if (!ring) return;
        ring.style.width = isHovering ? "48px" : "28px";
        ring.style.height = isHovering ? "48px" : "28px";
        ring.style.borderColor = isHovering
          ? "rgba(122, 87, 219, 0.85)"
          : "rgba(255,255,255,0.28)";
        ring.style.background = isHovering ? "rgba(122,87,219,0.08)" : "transparent";
        ring.style.boxShadow = isHovering
          ? "0 0 20px -4px rgba(122,87,219,0.4)"
          : "none";
      }
    };

    const onDown = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(-50%,-50%) scale(0.5)";
      }
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%,-50%) scale(0.85)";
      }
    };

    const onUp = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(-50%,-50%) scale(1)";
      }
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
      }
    };

    // Run inside GSAP's ticker so this shares the same RAF cycle as Lenis
    // and all ScrollTrigger animations — one RAF loop instead of two.
    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
      ringX = lerp(ringX, mouseX, 0.11);
      ringY = lerp(ringY, mouseY, 0.11);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      gsap.ticker.remove(tick);
    };
  }, [reduceMotion]);

  return (
    <>
      <div ref={dotRef} aria-hidden className="cursor-dot" />
      <div ref={ringRef} aria-hidden className="cursor-ring" />
    </>
  );
});

export default CustomCursor;
