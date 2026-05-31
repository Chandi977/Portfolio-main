
import { memo, useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "../constants";
import {
  ChapterFrame,
  MonoLabel,
  MonoPill,
  StatusDot,
  Hairline,
} from "../components/starlog/ds";
import { interpolate } from "../hooks/useGSAPBeat";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   TRANSMISSION 06 // ARCHIVE  —  MISSION DOSSIERS
   No pinned scrollytelling. Vertical spine with dossier cards
   that reveal + out via GSAP ScrollTrigger (matching the Beat
   reveal-and-out pattern used throughout the pinned stages).
   ============================================================ */

const TONES = ["lavender", "aqua", "coral", "mint"];

const yearOf = (date) => {
  const m = (date || "").match(/(\d{4})/g);
  return m ? m[m.length - 1] : "";
};

const monthOf = (date) => {
  const m = (date || "").match(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i,
  );
  return m ? m[1].toUpperCase() : "";
};

const Experiences = () => {
  const yearRange = (() => {
    const years = experiences.map((e) => Number(yearOf(e.date))).filter(Boolean);
    return `${Math.min(...years)} – ${Math.max(...years)}`;
  })();

  const sectionRef = useRef(null);
  const spineFillRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const fill = spineFillRef.current;
    if (!el || !fill) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: 0,
      onUpdate: (self) => {
        const h = Math.max(0, Math.min(100, self.progress * 100));
        fill.style.height = `${h}%`;
      },
    });

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      st.kill();
    };
  }, []);

  return (
    <ChapterFrame id="experience" className="!mt-0">
      <div ref={sectionRef} className="relative pt-24 md:pt-28 pb-28">
        {/* ============ HEADER ============ */}
        <ManifestHeader yearRange={yearRange} count={experiences.length} />

        {/* ============ SPINE + DOSSIERS ============ */}
        <div className="relative mt-20 md:mt-28">
          <div
            aria-hidden
            className="absolute left-4 sm:left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/8"
          />
          <div
            ref={spineFillRef}
            aria-hidden
            style={{ height: "0%" }}
            className="absolute left-4 sm:left-8 md:left-1/2 md:-translate-x-1/2 top-0 w-px bg-gradient-to-b from-lavender via-aqua to-coral"
          />

          <ul className="relative space-y-24 md:space-y-32">
            {experiences.map((item, i) => (
              <DossierEntry
                key={`${item.title}-${i}`}
                item={item}
                index={i}
                total={experiences.length}
                tone={TONES[i % TONES.length]}
              />
            ))}
          </ul>
        </div>

        {/* ============ FOOTER signoff ============ */}
        <div className="relative mt-24 md:mt-32 max-w-3xl mx-auto text-center">
          <div className="mx-auto w-[min(640px,80vw)]">
            <Hairline />
          </div>
        </div>
      </div>
    </ChapterFrame>
  );
};

export default memo(Experiences);

/* ============================================================
   ManifestHeader — scroll-driven reveal + out
   ============================================================ */
const ManifestHeader = memo(function ManifestHeader({ yearRange, count }) {
  const ref = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom 15%",
      scrub: 0,
      onUpdate: (self) => {
        const p = self.progress;

        if (badgeRef.current) {
          badgeRef.current.style.opacity = interpolate(p, [0, 0.10, 0.88, 1], [0, 1, 1, 0]);
          badgeRef.current.style.transform = `translateY(${interpolate(p, [0, 0.10], [12, 0])}px)`;
        }
        if (titleRef.current) {
          titleRef.current.style.opacity = interpolate(p, [0.04, 0.18, 0.88, 1], [0, 1, 1, 0]);
          titleRef.current.style.transform = `translateY(${interpolate(p, [0.04, 0.18], [20, 0])}px)`;
        }
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = interpolate(p, [0.10, 0.28, 0.88, 1], [0, 1, 1, 0]);
        }
        if (metaRef.current) {
          metaRef.current.style.opacity = interpolate(p, [0.18, 0.38, 0.88, 1], [0, 1, 1, 0]);
          metaRef.current.style.transform = `scaleX(${interpolate(p, [0.18, 0.38], [0, 1])})`;
        }
      },
    });

    const rf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(rf);
      st.kill();
    };
  }, []);

  return (
    <header ref={ref} className="relative max-w-5xl mx-auto px-4">
      <h2
        ref={titleRef}
        style={{ opacity: 0, willChange: "transform, opacity" }}
        className="font-display-tight text-4xl md:text-6xl lg:text-7xl text-white tracking-[-0.04em] leading-[0.95]"
      >
        Proof of <span className="italic text-lavender">build,</span>
        <br className="hidden md:block" /> committed.
      </h2>

      <p
        ref={subtitleRef}
        style={{ opacity: 0 }}
        className="mt-5 max-w-xl text-neutral-400 text-base md:text-lg leading-relaxed"
      >
        Roles, systems, metrics, and shipped work - pulled into one clean
        proof layer for recruiters, teams, and collaborators.
      </p>
    </header>
  );
});



/* ============================================================
   DossierEntry — scroll-driven reveal + out
   One ScrollTrigger per entry drives all child element animations.
   ============================================================ */
const DossierEntry = memo(function DossierEntry({ item, index, total, tone }) {
  const liRef = useRef(null);
  const spineNodeRef = useRef(null);
  const articleRef = useRef(null);
  const stampRef = useRef(null);
  const logLineRefs = useRef([]);
  const routeTagRefs = useRef([]);

  const side = index % 2 === 0 ? "left" : "right";
  const fromX = side === "left" ? -40 : 40;
  const year = yearOf(item.date);
  const mo = monthOf(item.date);

  useEffect(() => {
    const el = liRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      end: "bottom 8%",
      scrub: 0,
      onUpdate: (self) => {
        const p = self.progress;

        // Spine node — scale reveal + out
        if (spineNodeRef.current) {
          const scale = interpolate(p, [0, 0.12, 0.90, 1], [0, 1, 1, 0]);
          spineNodeRef.current.style.transform = `translateX(-50%) scale(${scale})`;
        }

        // Article card — slide-in from side + up, fade out on exit
        if (articleRef.current) {
          articleRef.current.style.opacity = interpolate(p, [0, 0.15, 0.88, 1], [0, 1, 1, 0]);
          const x = interpolate(p, [0, 0.20, 0.85, 1], [fromX, 0, 0, -fromX * 0.4]);
          const y = interpolate(p, [0, 0.15, 0.88, 1], [30, 0, 0, 20]);
          articleRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }

        // Stamp — delayed reveal + out
        if (stampRef.current) {
          const stampOp = interpolate(p, [0.12, 0.30, 0.88, 1], [0, 0.18, 0.18, 0]);
          const stampScale = interpolate(p, [0.12, 0.30], [0.5, 1]);
          stampRef.current.style.opacity = stampOp;
          stampRef.current.style.transform = `scale(${stampScale}) rotate(-8deg)`;
        }

        // Log lines — staggered cascade reveal + out
        logLineRefs.current.forEach((el, i) => {
          if (!el) return;
          const start = 0.20 + i * 0.06;
          const end = start + 0.07;
          el.style.opacity = interpolate(p, [start, end, 0.88, 1], [0, 1, 1, 0]);
          el.style.transform = `translateX(${interpolate(p, [start, end], [-8, 0])}px)`;
        });

        // Route tags — staggered cascade reveal + out
        routeTagRefs.current.forEach((el, i) => {
          if (!el) return;
          const start = 0.30 + i * 0.03;
          const end = start + 0.05;
          el.style.opacity = interpolate(p, [start, end, 0.88, 1], [0, 1, 1, 0]);
          el.style.transform = `translateY(${interpolate(p, [start, end], [8, 0])}px)`;
        });
      },
    });

    const rf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(rf);
      st.kill();
    };
  }, [index, fromX]);

  const tokens = {
    lavender: {
      accent: "text-lavender",
      bg: "bg-lavender",
      border: "border-lavender/40",
      shadow: "shadow-[0_0_60px_-20px_rgba(122,87,219,0.6)]",
      from: "from-lavender/10",
    },
    aqua: {
      accent: "text-aqua",
      bg: "bg-aqua",
      border: "border-aqua/40",
      shadow: "shadow-[0_0_60px_-20px_rgba(51,194,204,0.6)]",
      from: "from-aqua/10",
    },
    coral: {
      accent: "text-coral",
      bg: "bg-coral",
      border: "border-coral/40",
      shadow: "shadow-[0_0_60px_-20px_rgba(234,72,132,0.6)]",
      from: "from-coral/10",
    },
    mint: {
      accent: "text-mint",
      bg: "bg-mint",
      border: "border-mint/40",
      shadow: "shadow-[0_0_60px_-20px_rgba(87,219,150,0.6)]",
      from: "from-mint/10",
    },
  }[tone];

  const fileNo = `06-${String(index + 1).padStart(3, "0")}`;

  return (
    <li ref={liRef} className="relative">
      {/* SPINE NODE */}
      <span
        ref={spineNodeRef}
        style={{ transform: "translateX(-50%) scale(0)", willChange: "transform" }}
        className="absolute left-4 sm:left-8 md:left-1/2 top-8 z-20"
      >
        <span className={`relative block w-3.5 h-3.5 rounded-full ${tokens.bg} ring-4 ring-primary`}>
          <span className={`absolute inset-0 rounded-full ${tokens.bg} opacity-40 animate-ping`} />
        </span>
        <span className="hidden md:block absolute right-7 top-0 -translate-y-1 font-body text-[11px] font-semibold text-neutral-400 whitespace-nowrap">
          {mo} {year}
        </span>
      </span>

      {/* Card container */}
      <div
        className={`relative pl-12 sm:pl-20 md:pl-0 ${
          side === "left"
            ? "md:pr-[calc(50%+2.5rem)]"
            : "md:pl-[calc(50%+2.5rem)] md:pr-0"
        }`}
      >
        <article
          ref={articleRef}
          style={{ opacity: 0, willChange: "transform, opacity" }}
          className={`group relative ${tokens.shadow}`}
        >
          {/* Connector line */}
          <span
            aria-hidden
            className={`hidden md:block absolute top-9 ${
              side === "left" ? "right-0 translate-x-full" : "left-0 -translate-x-full"
            } w-8 h-px ${tokens.bg} opacity-50`}
          />

          {/* CARD */}
          <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-2xl overflow-hidden p-6 md:p-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
              <span className={`font-body text-xs font-semibold tracking-wider ${tokens.accent} uppercase`}>
                {item.type || "ENGAGEMENT"} · {item.location || "—"}
              </span>
              <span className="font-body text-xs font-semibold text-neutral-400">
                {item.date}
              </span>
            </div>

            <h3 className="font-display-tight text-2xl sm:text-3xl text-white tracking-[-0.03em] leading-tight mb-1">
              {item.title}
            </h3>
            <p className={`font-body text-sm font-medium ${tokens.accent} tracking-wide mb-4`}>
              {item.job}
            </p>

            {item.description && (
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed mb-6">
                {item.description}
              </p>
            )}

            {item.contents && item.contents.length > 0 && (
              <div className="mb-6 border-l-2 border-white/10 pl-4">
                <span className="block font-body text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Key Accomplishments</span>
                <ul className="space-y-1.5">
                  {item.contents.slice(0, 4).map((c, i) => (
                    <LogLine
                      key={i}
                      text={c}
                      index={i}
                      tone={tone}
                      ref={(el) => (logLineRefs.current[i] = el)}
                    />
                  ))}
                </ul>
              </div>
            )}

            {item.metrics && item.metrics.length > 0 && (
              <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                {item.metrics.slice(0, 3).map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className={`font-display-tight text-xl md:text-2xl ${tokens.accent} tracking-tight leading-none`}>
                      {m.value}
                    </span>
                    <span className="mt-1 font-body text-[10px] font-medium text-neutral-400 uppercase tracking-wider leading-snug">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {item.technologies && (
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {item.technologies.slice(0, 12).map((t, i) => (
                  <RouteTag
                    key={t}
                    label={t}
                    index={i}
                    ref={(el) => (routeTagRefs.current[i] = el)}
                  />
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </li>
  );
});

/* ============================================================
   LogLine — ref-driven, animated by parent's ScrollTrigger
   ============================================================ */
const LogLine = memo(forwardRef(function LogLine({ text, index, tone }, ref) {
  const accent = {
    lavender: "text-lavender",
    aqua: "text-aqua",
    coral: "text-coral",
    mint: "text-mint",
  }[tone];
  return (
    <li
      ref={ref}
      style={{ opacity: 0, willChange: "transform, opacity" }}
      className="flex items-start gap-2.5 text-[13px] md:text-sm text-neutral-300 leading-snug"
    >
      <span className={`font-body text-xs font-semibold mt-0.5 tabular-nums ${accent}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span>{text}</span>
    </li>
  );
}));

/* ============================================================
   RouteTag — ref-driven, animated by parent's ScrollTrigger
   ============================================================ */
const RouteTag = memo(forwardRef(function RouteTag({ label, index }, ref) {
  return (
    <span
      ref={ref}
      style={{ opacity: 0, willChange: "transform, opacity" }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] font-body text-[11px] font-semibold text-neutral-300 uppercase"
    >
      {label}
    </span>
  );
}));
