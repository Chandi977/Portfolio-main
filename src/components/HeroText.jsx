import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const spring = { type: "spring", stiffness: 260, damping: 24 };

const HeroText = () => {
  const words = ["Production-Grade", "Scalable", "High-Performance"];

  return (
    <div className="relative z-10 mt-28 text-center md:mt-40 md:text-left [text-shadow:0_2px_24px_rgba(3,4,18,0.9)]">

      {/* "Available for work" status pill */}
      <motion.div
        className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full border border-mint/20 bg-mint/5 text-mint backdrop-blur-md"
        initial={{ opacity: 0, y: 10, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, ...spring }}
      >
        <span
          className="block w-1.5 h-1.5 rounded-full bg-mint status-pulse"
          aria-hidden
        />
        <span className="font-body text-[11px] font-semibold tracking-wider select-none">
          Available for work
        </span>
      </motion.div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-col">
        <motion.h1
          className="text-4xl font-semibold"
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, ...spring }}
        >
          Yo, I&apos;m{" "}
          <span className="text-gradient-hero">Charan</span>
        </motion.h1>

        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.72, ...spring }}
          >
            I engineer systems <br /> that are
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.88, ...spring }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>

          <motion.p
            className="text-4xl font-medium text-neutral-300"
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.04, ...spring }}
          >
            enterprise ready
          </motion.p>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex flex-col space-y-5 md:hidden">
        <motion.p
          className="text-4xl font-semibold"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, ...spring }}
        >
          Yo, I&apos;m{" "}
          <span className="text-gradient-hero">Charan</span>
        </motion.p>

        <div>
          <motion.p
            className="text-5xl font-black text-neutral-300"
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.72, ...spring }}
          >
            Building
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.88, ...spring }}
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-7xl"
            />
          </motion.div>

          <motion.p
            className="text-4xl font-black text-neutral-300"
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.04, ...spring }}
          >
            at scale
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
