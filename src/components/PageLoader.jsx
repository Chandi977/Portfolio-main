import { useEffect, useState, useRef, memo } from "react";
import { AnimatePresence, motion } from "motion/react";

const PageLoader = memo(function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef(null);

  // Lock scroll while loader is visible
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [visible]);

  useEffect(() => {
    const DURATION = 1400;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      // Ease out cubic — fast at first, slows into 100%
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Hold at 100% briefly, then exit
        setTimeout(() => setVisible(false), 160);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center gap-10"
        >
          {/* Subtle noise grain */}
          <div className="starlog-grain" style={{ opacity: 0.06 }} />

          {/* Monogram mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full border border-lavender/30 bg-lavender/8"
              style={{ boxShadow: "0 0 48px -12px rgba(122,87,219,0.55)" }}
            >
              <span className="font-body text-sm font-bold tracking-[0.14em] text-white">CM</span>
            </div>
            <span className="font-mono-tight text-[10px] tracking-[0.52em] text-neutral-500 uppercase">
              Charan Mahato
            </span>
          </motion.div>

          {/* Progress track */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col items-center gap-2.5 w-36"
          >
            <div className="relative w-full h-px bg-white/10 overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-lavender via-aqua to-mint"
                style={{ width: `${progress}%`, transition: "width 60ms linear" }}
              />
            </div>
            <span className="font-mono-tight text-[10px] tracking-[0.48em] text-neutral-500 tabular-nums">
              {String(progress).padStart(3, "0")}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default PageLoader;
