import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = memo(function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${self.progress})`;
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 right-0 z-[9998] h-[2px]"
    >
      <div
        ref={barRef}
        style={{ transformOrigin: "left", transform: "scaleX(0)", willChange: "transform" }}
        className="absolute inset-0 bg-gradient-to-r from-lavender via-aqua to-coral"
      />
    </div>
  );
});

export default ScrollProgress;
