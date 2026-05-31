import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "charan.f.sde@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className="btn-glow btn-shimmer group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-lavender/35 bg-gradient-to-br from-lavender/15 via-primary/80 to-primary/90 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_-14px_rgba(122,87,219,0.6)] hover:border-lavender/65 hover:shadow-[0_0_44px_-10px_rgba(122,87,219,0.75)] transition-all duration-300"
      aria-label={copied ? "Email copied!" : "Copy collab email to clipboard"}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
          >
            <img src="assets/copy-done.svg" className="w-4.5" alt="" aria-hidden />
            <span>Email copied</span>
            <span className="text-mint text-xs">✓</span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <img src="assets/copy.svg" className="w-4.5" alt="" aria-hidden />
            <span>Copy collab email</span>
          </motion.span>
        )}
      </AnimatePresence>

      {/* Glow ring that pulses on copied state */}
      {copied && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border border-mint/50 animate-ping"
        />
      )}
    </motion.button>
  );
};

export default CopyEmailButton;
