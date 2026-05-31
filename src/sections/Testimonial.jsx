import { memo, useRef, useEffect } from "react";
import { reviews } from "../constants";
import {
  PinnedStage,
  Beat,
  WordReveal,
  useSubProgress,
} from "../components/starlog/ds";
import { interpolate } from "../hooks/useGSAPBeat";

/* ============================================================
   TRANSMISSION 07 // INTERCEPTS
   320vh pinned. Three beats:
     1) INCOMING  0.00 → 0.15
     2) FEED      0.15 → 0.85  — marquees driven by scroll
     3) SIGNOFF   0.85 → 1.00
   ============================================================ */

const Testimonial = () => (
  <PinnedStage
    id="testimonial"
    index="07"
    callsign="REVIEWS"
    tone="coral"
    height={320}
    beatLabels={["INTRO", "FEED", "OUTRO"]}
  >
    {(p) => <TestimonialBeats p={p} />}
  </PinnedStage>
);

const TestimonialBeats = ({ p }) => {
  // Sub-progress ranges complete before each beat's fade-out so reveals
  // finish with dwell time on screen.
  const introP = useSubProgress(p, 0, 0.11);
  const feedP = useSubProgress(p, 0.18, 0.82);
  const outroP = useSubProgress(p, 0.87, 0.98);

  const firstHalf = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondHalf = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <>
      {/* ════ BEAT 1 — INCOMING ════ */}
      <Beat progress={p} range={[0, 0, 0.15, 0.20]}>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] font-body text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-6">
            Testimonials
          </span>
          <h2 className="font-display-tight italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-[-0.04em] text-white max-w-5xl">
            <WordReveal
              progress={introP}
              text="Notes from devs and teams I've built with."
              revealWindow={0.85}
            />
          </h2>
          <FadeIn progress={introP} start={0.55} end={0.72}>
            <p className="mt-10 font-body text-xs font-semibold tracking-widest text-neutral-400 uppercase">
              Scroll to read
            </p>
          </FadeIn>
        </div>
      </Beat>

      {/* ════ BEAT 2 — FEED (scroll-driven) ════ */}
      <Beat progress={p} range={[0.15, 0.20, 0.84, 0.89]}>
        <div className="absolute inset-0 flex flex-col justify-center">
          {/* Band A */}
          <div className="relative mb-6 md:mb-10">
            <div className="relative overflow-hidden">
              <BandStrip items={firstHalf} feedP={feedP} direction={1} band="A" />
            </div>
          </div>

          {/* Band B (counter-direction) */}
          <div className="relative">
            <div className="relative overflow-hidden">
              <BandStrip items={secondHalf} feedP={feedP} direction={-1} band="B" />
            </div>
          </div>

          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 pointer-events-none bg-gradient-to-r from-primary to-transparent z-20" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 pointer-events-none bg-gradient-to-l from-primary to-transparent z-20" />
        </div>
      </Beat>

      {/* ════ BEAT 3 — SIGNOFF ════ */}
      <Beat progress={p} range={[0.86, 0.91, 1.0, 1.0]}>
        <SignoffBeat outroP={outroP} />
      </Beat>
    </>
  );
};

/* ---------- FadeIn ---------- */
const FadeIn = memo(function FadeIn({ progress, start, end, children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!progress) return;
    return progress.onChange((p) => {
      if (ref.current) ref.current.style.opacity = interpolate(p, [start, end], [0, 1]);
    });
  }, [progress, start, end]);
  return <div ref={ref} style={{ opacity: 0 }}>{children}</div>;
});

/* ---------- BandStrip ---------- */
const BandStrip = memo(function BandStrip({ items, feedP, direction, band }) {
  const stripRef = useRef(null);

  useEffect(() => {
    if (!feedP) return;
    return feedP.onChange((p) => {
      if (!stripRef.current) return;
      const x = direction > 0
        ? interpolate(p, [0, 1], [10, -110])
        : interpolate(p, [0, 1], [-110, 10]);
      stripRef.current.style.transform = `translateX(${x}%)`;
    });
  }, [feedP, direction]);

  return (
    <div
      ref={stripRef}
      className="flex gap-5 will-change-transform"
      style={{ willChange: "transform" }}
    >
      {items.map((r, i) => (
        <InterceptCard key={r.username} review={r} index={i} feedP={feedP} band={band} />
      ))}
    </div>
  );
});

/* ---------- InterceptCard ---------- */
const InterceptCard = memo(function InterceptCard({ review, index, feedP, band }) {
  const glowRef = useRef(null);

  const cardWidth = 0.06;
  const baseShift = band === "A" ? 0.12 : 0.06;
  const slot = baseShift + index * cardWidth;

  useEffect(() => {
    if (!feedP || !glowRef.current) return;
    return feedP.onChange((p) => {
      const glow = interpolate(
        p,
        [slot - cardWidth / 2, slot, slot + cardWidth / 2],
        [0, 1, 0]
      );
      glowRef.current.style.opacity = glow;
    });
  }, [feedP, slot, cardWidth]);

  const tone = ["lavender", "aqua", "coral", "mint"][index % 4];
  const toneClasses = {
    lavender: { border: "border-lavender/10 hover:border-lavender/30", text: "text-lavender", glow: "shadow-[0_0_30px_-10px_rgba(122,87,219,0.2)]", dot: "bg-lavender" },
    aqua: { border: "border-aqua/10 hover:border-aqua/30", text: "text-aqua", glow: "shadow-[0_0_30px_-10px_rgba(51,194,204,0.2)]", dot: "bg-aqua" },
    coral: { border: "border-coral/10 hover:border-coral/30", text: "text-coral", glow: "shadow-[0_0_30px_-10px_rgba(234,72,132,0.2)]", dot: "bg-coral" },
    mint: { border: "border-mint/10 hover:border-mint/30", text: "text-mint", glow: "shadow-[0_0_30px_-10px_rgba(87,219,150,0.2)]", dot: "bg-mint" },
  }[tone];

  return (
    <figure
      className={`relative shrink-0 w-80 h-auto bg-white/[0.02] border ${toneClasses.border} rounded-2xl px-6 py-6 backdrop-blur-md transition-all duration-300 ${toneClasses.glow}`}
    >
      {/* Highlight glow layer driven by scroll position */}
      <div
        ref={glowRef}
        aria-hidden
        style={{ opacity: 0 }}
        className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.12] transition-opacity duration-300"
      />

      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={review.img}
            alt=""
            width="40"
            height="40"
            className="rounded-full border border-white/10 bg-white/5"
            loading="lazy"
            decoding="async"
          />
          <span className={`absolute -bottom-0.5 -right-0.5 block w-2.5 h-2.5 rounded-full border border-primary ${toneClasses.dot}`} />
        </div>
        <div className="flex flex-col leading-tight">
          <figcaption className="text-sm font-semibold text-white font-body">{review.name}</figcaption>
          <span className="text-[11px] text-neutral-400 font-body mt-0.5">
            {review.username}
          </span>
        </div>
      </div>

      <blockquote className="mt-4 text-[13px] sm:text-sm text-neutral-300 leading-relaxed font-body">
        "{review.body}"
      </blockquote>
    </figure>
  );
});

/* ---------- SignoffBeat ---------- */
const SignoffBeat = memo(function SignoffBeat({ outroP }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 text-center">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] font-body text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-6">
        Log Complete
      </span>
      <h3 className="font-display-tight italic text-4xl md:text-6xl text-white tracking-[-0.04em] leading-[1.05] max-w-3xl mb-8">
        {reviews.length} notes received. Open for new projects.
      </h3>
    </div>
  );
});

export default memo(Testimonial);
