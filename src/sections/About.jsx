import { memo, useRef, useEffect } from "react";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import {
  PinnedStage,
  Beat,
  WordReveal,
  ScrollCounter,
  MonoLabel,
  StatusDot,
  Hairline,
  useSubProgress,
} from "../components/starlog/ds";
import { interpolate } from "../hooks/useGSAPBeat";

const SKILLS = [
  { label: "MERN Stack",       code: "STACK",  group: "core",   tone: "lavender" },
  { label: "System Design",    code: "ARCH",   group: "core",   tone: "aqua" },
  { label: "Node / Express",   code: "API.RT", group: "back",   tone: "mint" },
  { label: "React.js",         code: "UI.19",  group: "front",  tone: "lavender" },
  { label: "MongoDB",          code: "DB.NS",  group: "data",   tone: "coral" },
  { label: "Redis / FlashKV",  code: "CACHE",  group: "data",   tone: "aqua" },
  { label: "AWS · EC2 · S3",   code: "CLOUD",  group: "infra",  tone: "mint" },
  { label: "WebSockets",       code: "WS.RT",  group: "back",   tone: "coral" },
  { label: "REST APIs",        code: "HTTP",   group: "back",   tone: "lavender" },
  { label: "JWT Auth",         code: "AUTH",   group: "back",   tone: "aqua" },
  { label: "DSA / Algorithms", code: "ALGO",   group: "core",   tone: "mint" },
  { label: "Docker · CI/CD",   code: "DEPLOY", group: "infra",  tone: "coral" },
];

const TELEMETRY = [
  { from: 0,   to: 382, label: "GITHUB CONTRIBUTIONS / 2026", tone: "lavender" },
  { from: 0,   to: 17,  label: "PRODUCTION SYSTEMS SHIPPED",  tone: "aqua" },
  { from: 0,   to: 600, suffix: "+", label: "DSA SOLVED",     tone: "mint" },
  { from: 240, to: 38,  suffix: "ms", label: "P99 LATENCY",   tone: "coral" },
];

const About = () => (
  <PinnedStage
    id="about"
    index="03"
    callsign="PROFILE"
    tone="lavender"
    height={420}
    beatLabels={["STATEMENT", "TELEMETRY", "CAPABILITIES", "ORIGIN", "HANDOFF"]}
  >
    {(p) => <AboutBeats p={p} />}
  </PinnedStage>
);

const AboutBeats = ({ p }) => {
  const beat1P = useSubProgress(p, 0.00, 0.13);
  const beat2P = useSubProgress(p, 0.22, 0.35);
  const beat3P = useSubProgress(p, 0.44, 0.57);
  const beat4P = useSubProgress(p, 0.66, 0.80);
  const beat5P = useSubProgress(p, 0.88, 0.97);

  return (
    <>
      <Beat progress={p} range={[0, 0, 0.18, 0.23]}>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 text-center">
          <div className="flex items-center gap-3 mb-8">
            <StatusDot tone="lavender" />
            <MonoLabel tone="lavender">README · 03.01 · OPEN</MonoLabel>
          </div>
          <h2 className="font-display-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.04em] text-white max-w-5xl">
            <WordReveal
              progress={beat1P}
              text="Hi, I'm Chandi Charan Mahato - a full-stack engineer building production-grade, enterprise-ready systems."
              revealWindow={0.7}
            />
          </h2>
          <ScrollIndicator progress={beat1P} start={0.78} end={0.95} />
        </div>
      </Beat>

      <Beat progress={p} range={[0.18, 0.22, 0.40, 0.45]}>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12">
          <FadeIn progress={beat2P} start={0} end={0.15}>
            <div className="flex items-center gap-3 mb-10">
              <StatusDot tone="aqua" />
              <MonoLabel tone="aqua">::TELEMETRY · 03.02 · LIVE</MonoLabel>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 max-w-6xl w-full">
            {TELEMETRY.map((t, i) => (
              <TelemetryRoll key={t.label} pBeat={beat2P} index={i} {...t} />
            ))}
          </div>
          <FadeIn progress={beat2P} start={0.55} end={0.75}>
            <p className="mt-12 text-neutral-400 max-w-2xl text-center text-sm md:text-base italic font-display-tight">
              Telemetry from production. Caches tuned, APIs shipped, infrastructure scaled,
              and a habit of ensuring reliability at scale.
            </p>
          </FadeIn>
        </div>
      </Beat>

      <Beat progress={p} range={[0.40, 0.44, 0.62, 0.67]}>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10">

          {/* ── Section label row ── */}
          <FadeIn progress={beat3P} start={0} end={0.12}>
            <div className="flex items-center gap-3 mb-4">
              <StatusDot tone="coral" />
              <MonoLabel tone="coral">::CAPABILITIES · 03.03 · MANIFEST</MonoLabel>
              <span className="block w-5 h-px bg-white/10" />
              <div className="flex items-center gap-1.5 px-2 py-0.5 border border-white/[0.08] rounded-md bg-white/[0.03]">
                <span className="block w-1 h-1 rounded-full bg-coral/70" />
                <MonoLabel>{SKILLS.length} ENTRIES</MonoLabel>
              </div>
            </div>
          </FadeIn>

          {/* ── Section title ── */}
          <FadeIn progress={beat3P} start={0.02} end={0.14}>
            <h3 className="font-display-tight text-4xl sm:text-5xl md:text-6xl text-white tracking-[-0.04em] mb-2 text-center">
              Stack{" "}
              <span className="relative italic text-coral">
                loadout.
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral/50 to-transparent"
                />
              </span>
            </h3>
          </FadeIn>

          {/* ── Legend row ── */}
          <FadeIn progress={beat3P} start={0.06} end={0.20}>
            <div className="mb-7 flex items-center gap-3 font-mono-tight text-[9px] tracking-[0.32em] text-neutral-600 uppercase">
              <span className="text-neutral-700">◀</span>
              <span>INDEX</span>
              <span className="block h-px w-8 bg-white/[0.07]" />
              <span>MODULE · VER</span>
              <span className="block h-px w-8 bg-white/[0.07]" />
              <span>GROUP</span>
              <span className="text-neutral-700">▶</span>
            </div>
          </FadeIn>

          {/* ── Skill grid ── */}
          <div className="relative max-w-5xl w-full">
            <PremiumGridBg pBeat={beat3P} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-3.5 relative z-10">
              {SKILLS.map((s, i) => (
                <SkillCard key={s.label} pBeat={beat3P} index={i} total={SKILLS.length} {...s} />
              ))}
            </div>
          </div>

          {/* ── Status footer ── */}
          <FadeIn progress={beat3P} start={0.50} end={0.62}>
            <div className="mt-6 flex items-center gap-4 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <span className="flex items-center gap-2 font-mono-tight text-[9px] tracking-[0.38em] text-neutral-500 uppercase">
                <span className="block w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_8px_#57db96]" />
                SYNC
              </span>
              <span className="block h-3 w-px bg-white/[0.08]" />
              <span className="font-mono-tight text-[9px] tracking-[0.35em] text-neutral-500 uppercase">
                {SKILLS.length} / {SKILLS.length} MODULES LOADED
              </span>
              <span className="block h-3 w-px bg-white/[0.08]" />
              <span className="flex items-center gap-2 font-mono-tight text-[9px] tracking-[0.38em] text-neutral-500 uppercase">
                <span className="block w-1.5 h-1.5 rounded-full bg-aqua shadow-[0_0_8px_#33c2cc]" />
                LIVE
              </span>
            </div>
          </FadeIn>
        </div>
      </Beat>

      <Beat progress={p} range={[0.62, 0.66, 0.86, 0.91]}>
        <OriginBeat beat4P={beat4P} />
      </Beat>

      <Beat progress={p} range={[0.86, 0.90, 1.0, 1.0]}>
        <HandoffBeat beat5P={beat5P} />
      </Beat>
    </>
  );
};

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

const ScrollIndicator = memo(function ScrollIndicator({ progress, start, end }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!progress) return;
    return progress.onChange((p) => {
      if (ref.current) ref.current.style.opacity = interpolate(p, [start, end], [0, 1]);
    });
  }, [progress, start, end]);
  return (
    <div ref={ref} style={{ opacity: 0 }} className="mt-10 flex items-center gap-4">
      <span className="block w-8 h-px bg-lavender/60" />
      <MonoLabel tone="aqua">SCROLL TO CONTINUE ↓</MonoLabel>
      <span className="block w-8 h-px bg-aqua/60" />
    </div>
  );
});

const TelemetryRoll = memo(function TelemetryRoll({ pBeat, index, from, to, suffix = "", label, tone }) {
  const ref = useRef(null);
  const start = 0.05 + index * 0.04;
  const end = 0.40 + index * 0.04;
  const counterP = useSubProgress(pBeat, start, end);

  useEffect(() => {
    if (!pBeat) return;
    return pBeat.onChange((p) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity = interpolate(p, [start - 0.03, start + 0.03], [0, 1]);
      el.style.transform = `translateY(${interpolate(p, [start - 0.03, start + 0.03], [40, 0])}px)`;
    });
  }, [pBeat, start]);

  const toneClass = {
    lavender: "text-lavender",
    aqua: "text-aqua",
    coral: "text-coral",
    mint: "text-mint",
  }[tone];

  return (
    <div ref={ref} style={{ opacity: 0, willChange: "transform, opacity" }} className="border-l-2 border-lavender/40 pl-4">
      <MonoLabel tone="neutral" className="block mb-2">{label}</MonoLabel>
      <div className={`font-display-tight text-5xl md:text-6xl tracking-[-0.04em] ${toneClass}`}>
        <ScrollCounter progress={counterP} from={from} to={to} suffix={suffix} />
      </div>
    </div>
  );
});

/* ── Premium animated background for the grid ──────────────── */
const PremiumGridBg = memo(function PremiumGridBg({ pBeat }) {
  const svgRef  = useRef(null);
  const linesRef = useRef([]);
  const dotsRef = useRef(null);

  useEffect(() => {
    if (!pBeat) return;
    return pBeat.onChange((p) => {
      if (svgRef.current)  svgRef.current.style.opacity  = interpolate(p, [0.04, 0.22], [0, 1]);
      if (dotsRef.current) dotsRef.current.style.opacity = interpolate(p, [0.15, 0.35], [0, 0.55]);
      const dash = interpolate(p, [0.04, 0.28], [200, 0]);
      linesRef.current.forEach((line) => {
        if (line) line.setAttribute("stroke-dashoffset", dash);
      });
    });
  }, [pBeat]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div ref={dotsRef} style={{ opacity: 0 }} className="absolute inset-0" aria-hidden>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="premDots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.07)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#premDots)" />
        </svg>
      </div>
      <svg
        ref={svgRef}
        aria-hidden
        style={{ opacity: 0 }}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 220"
      >
        {[0.25, 0.5, 0.75].map((y, i) => (
          <line
            key={`h${y}`}
            ref={(el) => (linesRef.current[i] = el)}
            x1="0" y1={220 * y} x2="400" y2={220 * y}
            stroke="rgba(122,87,219,0.16)"
            strokeDasharray="4 7"
            strokeDashoffset="200"
          />
        ))}
        {[0.25, 0.5, 0.75].map((x, i) => (
          <line
            key={`v${x}`}
            ref={(el) => (linesRef.current[3 + i] = el)}
            x1={400 * x} y1="0" x2={400 * x} y2="220"
            stroke="rgba(51,194,204,0.11)"
            strokeDasharray="4 7"
            strokeDashoffset="200"
          />
        ))}
        <g stroke="rgba(122,87,219,0.30)" strokeWidth="0.7" fill="none">
          <polyline points="0,8 0,0 8,0" />
          <polyline points="392,0 400,0 400,8" />
          <polyline points="400,212 400,220 392,220" />
          <polyline points="8,220 0,220 0,212" />
        </g>
      </svg>
    </div>
  );
});

/* ── Skill card — premium redesign ──────────────────────────── */
const RIPPLE_ORDER = [5, 6, 4, 7, 1, 2, 9, 10, 0, 3, 8, 11];

const TONE_CONFIG = {
  lavender: {
    border:   "border-lavender/[0.18] group-hover:border-lavender/50",
    text:     "text-lavender",
    bar:      "bg-lavender",
    badgeBg:  "bg-lavender/[0.10]",
    badgeBorder: "border-lavender/[0.22]",
    glowRgba: "rgba(122,87,219,0.18)",
    topGlow:  "rgba(122,87,219,0.22)",
    shadow:   "group-hover:shadow-[0_20px_48px_-12px_rgba(122,87,219,0.50),inset_0_1px_0_rgba(122,87,219,0.14)]",
  },
  aqua: {
    border:   "border-aqua/[0.18] group-hover:border-aqua/50",
    text:     "text-aqua",
    bar:      "bg-aqua",
    badgeBg:  "bg-aqua/[0.10]",
    badgeBorder: "border-aqua/[0.22]",
    glowRgba: "rgba(51,194,204,0.18)",
    topGlow:  "rgba(51,194,204,0.22)",
    shadow:   "group-hover:shadow-[0_20px_48px_-12px_rgba(51,194,204,0.50),inset_0_1px_0_rgba(51,194,204,0.14)]",
  },
  coral: {
    border:   "border-coral/[0.18] group-hover:border-coral/50",
    text:     "text-coral",
    bar:      "bg-coral",
    badgeBg:  "bg-coral/[0.10]",
    badgeBorder: "border-coral/[0.22]",
    glowRgba: "rgba(234,72,132,0.18)",
    topGlow:  "rgba(234,72,132,0.22)",
    shadow:   "group-hover:shadow-[0_20px_48px_-12px_rgba(234,72,132,0.50),inset_0_1px_0_rgba(234,72,132,0.14)]",
  },
  mint: {
    border:   "border-mint/[0.18] group-hover:border-mint/50",
    text:     "text-mint",
    bar:      "bg-mint",
    badgeBg:  "bg-mint/[0.10]",
    badgeBorder: "border-mint/[0.22]",
    glowRgba: "rgba(87,219,150,0.18)",
    topGlow:  "rgba(87,219,150,0.22)",
    shadow:   "group-hover:shadow-[0_20px_48px_-12px_rgba(87,219,150,0.50),inset_0_1px_0_rgba(87,219,150,0.14)]",
  },
};

const SkillCard = memo(function SkillCard({ pBeat, index, total, label, code, group, tone }) {
  const ref        = useRef(null);
  const accentRef  = useRef(null);
  const topGlowRef = useRef(null);
  const botGlowRef = useRef(null);
  const scanRef    = useRef(null);

  const rank  = RIPPLE_ORDER.indexOf(index);
  const start = 0.05 + (rank / total) * 0.35;
  const end   = start + 0.10;

  useEffect(() => {
    if (!pBeat) return;
    return pBeat.onChange((p) => {
      const el = ref.current;
      if (!el) return;
      const t = Math.max(0, Math.min(1, (p - start) / (end - start)));
      el.style.opacity   = t;
      el.style.transform = `translateY(${(1 - t) * 30}px) scale(${0.88 + t * 0.12})`;

      if (accentRef.current) {
        accentRef.current.style.transform = `scaleX(${t})`;
        accentRef.current.style.opacity   = t > 0.05 ? 1 : 0;
      }
      if (topGlowRef.current) topGlowRef.current.style.opacity = t * 0.7;
      if (botGlowRef.current) botGlowRef.current.style.opacity = t * 0.5;
      if (scanRef.current) {
        const sx  = interpolate(p, [start, end], [-130, 130]);
        const sop = interpolate(p, [start, start + 0.04, end - 0.02, end], [0, 1, 1, 0]);
        scanRef.current.style.transform = `translateX(${sx}%)`;
        scanRef.current.style.opacity   = sop;
      }
    });
  }, [pBeat, start, end]);

  const tok = TONE_CONFIG[tone];

  return (
    <div
      ref={ref}
      style={{ opacity: 0, willChange: "transform, opacity" }}
      className={`group relative overflow-hidden rounded-2xl border ${tok.border} ${tok.shadow}
        bg-gradient-to-b from-white/[0.05] via-[#080b1c]/80 to-[#030412]
        transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]`}
    >
      {/* Top tone accent bar — scaleX draws in on reveal */}
      <div
        ref={accentRef}
        style={{ transformOrigin: "left", transform: "scaleX(0)", opacity: 0 }}
        className={`absolute inset-x-0 top-0 h-[2px] ${tok.bar}`}
      />

      {/* Top ambient glow — bleeds down from the accent bar */}
      <div
        ref={topGlowRef}
        style={{
          opacity: 0,
          background: `linear-gradient(180deg, ${tok.topGlow} 0%, transparent 65%)`,
        }}
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
      />

      {/* Bottom radial glow — warms from the base */}
      <div
        ref={botGlowRef}
        style={{
          opacity: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 120%, ${tok.glowRgba} 0%, transparent 100%)`,
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* SVG corner brackets — engineering feel */}
      <svg
        aria-hidden
        className={`absolute top-2.5 right-2.5 w-2.5 h-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-40 ${tok.text}`}
        viewBox="0 0 10 10" fill="none"
      >
        <polyline points="6,1 10,1 10,10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <svg
        aria-hidden
        className={`absolute bottom-2.5 left-2.5 w-2.5 h-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-40 ${tok.text}`}
        viewBox="0 0 10 10" fill="none"
      >
        <polyline points="4,9 0,9 0,0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      {/* Ghost watermark: large index number */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-2 -right-1 select-none font-mono-tight font-bold leading-none text-white/[0.028]"
        style={{ fontSize: "5rem" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* ── Card body ── */}
      <div className="relative flex flex-col gap-0 px-4 pt-4 pb-4">

        {/* Row 1: index + code badge */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="font-mono-tight text-[9px] tracking-[0.44em] text-neutral-700">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div
            className={`flex items-center gap-1.5 rounded-md border px-2 py-0.5 ${tok.badgeBg} ${tok.badgeBorder}`}
          >
            <span className={`block h-[5px] w-[5px] rounded-full ${tok.bar} opacity-80`} />
            <span className={`font-mono-tight text-[8.5px] tracking-[0.30em] ${tok.text}`}>
              {code}
            </span>
          </div>
        </div>

        {/* Row 2: skill label */}
        <div className="mb-3 font-body text-[13.5px] font-semibold leading-snug tracking-[-0.01em] text-white/90 md:text-[14.5px]">
          {label}
        </div>

        {/* Row 3: group pill */}
        <div className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1">
          <span className={`block h-1 w-1 rounded-full ${tok.bar} opacity-50`} />
          <span className="font-mono-tight text-[7.5px] uppercase tracking-[0.42em] text-neutral-600">
            {group}
          </span>
        </div>
      </div>

      {/* Shimmer sweep on reveal */}
      <span
        ref={scanRef}
        aria-hidden
        style={{ opacity: 0 }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />
    </div>
  );
});

/* ── Origin beat ────────────────────────────────────────────── */
const OriginBeat = memo(function OriginBeat({ beat4P }) {
  const leftRef      = useRef(null);
  const globeWrapRef = useRef(null);
  const outerRingRef = useRef(null);
  const coordRef     = useRef(null);
  const crosshairRef = useRef(null);
  const trackingRef  = useRef(null);
  const cornerRefs   = useRef([]);

  useEffect(() => {
    if (!beat4P) return;
    return beat4P.onChange((p) => {
      if (leftRef.current)
        leftRef.current.style.opacity = interpolate(p, [0.02, 0.22], [0, 1]);
      if (globeWrapRef.current)
        globeWrapRef.current.style.transform = `scale(${interpolate(p, [0, 0.5, 1], [0.85, 1, 1.02])})`;
      if (outerRingRef.current)
        outerRingRef.current.style.transform = `rotate(${interpolate(p, [0, 1], [-12, 12])}deg)`;
      if (coordRef.current)
        coordRef.current.style.opacity = interpolate(p, [0.18, 0.45], [0, 1]);
      if (crosshairRef.current)
        crosshairRef.current.style.opacity = interpolate(p, [0.35, 0.6], [0, 0.7]);
      if (trackingRef.current)
        trackingRef.current.style.opacity = interpolate(p, [0.5, 0.75], [0, 1]);
      const delays = [0, 0.05, 0.10, 0.15];
      cornerRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = interpolate(p, [0.25 + delays[i], 0.45 + delays[i]], [0, 1]);
      });
    });
  }, [beat4P]);

  return (
    <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 md:px-12 pt-32 md:pt-40 pb-24">
      <div ref={leftRef} style={{ opacity: 0 }} className="lg:col-span-4 flex flex-col justify-center max-w-md mx-auto lg:mx-0">
        <div className="flex items-center gap-3 mb-5">
          <StatusDot tone="aqua" />
          <MonoLabel tone="aqua">::ENV · ORIGIN · LOCK</MonoLabel>
        </div>
        <h3 className="font-display-tight text-4xl md:text-5xl lg:text-6xl text-white tracking-[-0.035em] leading-[1] mb-6">
          Shipping from <span className="italic text-aqua">Noida.</span>
        </h3>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
          Building from northern India and shipping for teams across time zones.
          The globe spins live — drag it to look around.
        </p>
        <div ref={coordRef} style={{ opacity: 0 }} className="grid grid-cols-2 gap-px bg-white/10 starlog-clip border border-aqua/20">
          {[
            { k: "LAT",  v: "28.5355° N", tone: "lavender" },
            { k: "LON",  v: "77.3910° E", tone: "lavender" },
            { k: "TZ",   v: "UTC +5:30",  tone: "aqua" },
            { k: "LOCK", v: "1.000",      tone: "mint" },
          ].map((row) => (
            <div key={row.k} className="bg-primary/85 px-3 py-2.5">
              <div className="font-mono-tight text-[9px] tracking-[0.32em] text-neutral-500 uppercase">{row.k}</div>
              <div className={`font-mono-tight text-[11px] tracking-[0.18em] mt-1 ${
                row.tone === "aqua" ? "text-aqua" : row.tone === "mint" ? "text-mint" : "text-lavender"
              }`}>{row.v}</div>
            </div>
          ))}
        </div>
        <div ref={trackingRef} style={{ opacity: 0 }} className="mt-6 flex items-center gap-3 font-mono-tight text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
          <span className="block w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
          <span>10 SERVICES · ONLINE</span>
        </div>
      </div>

      <div className="lg:col-span-8 relative flex items-center justify-center min-h-0">
        <div ref={globeWrapRef} className="relative w-[min(82vmin,640px)] aspect-square" style={{ willChange: "transform" }}>
          <div ref={outerRingRef} className="absolute inset-[-6%] pointer-events-none" style={{ willChange: "transform" }}>
            <svg viewBox="-100 -100 200 200" className="w-full h-full">
              <circle r="98" fill="none" stroke="rgba(122,87,219,0.22)" strokeDasharray="0.6 2" />
              <circle r="86" fill="none" stroke="rgba(51,194,204,0.16)" />
              {[0, 90, 180, 270].map((deg) => (
                <g key={deg} transform={`rotate(${deg})`}>
                  <line x1="0" y1="-99" x2="0" y2="-92" stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
                </g>
              ))}
              <text x="0"    y="-103" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="4" fontFamily="Space Mono" letterSpacing="0.6">N</text>
              <text x="103"  y="2"    textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="4" fontFamily="Space Mono" letterSpacing="0.6">E</text>
              <text x="0"    y="108"  textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="4" fontFamily="Space Mono" letterSpacing="0.6">S</text>
              <text x="-103" y="2"    textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="4" fontFamily="Space Mono" letterSpacing="0.6">W</text>
            </svg>
          </div>
          <Globe className="!max-w-none" />
          <div ref={crosshairRef} style={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-12 h-12 border border-coral/60 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-coral shadow-[0_0_12px_#ea4884]" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 font-mono-tight text-[9px] tracking-[0.32em] text-coral whitespace-nowrap">
              NOIDA · 28.5°N
            </div>
          </div>
          {[
            { pos: "top-2 left-2",     toneClass: "text-lavender border-lavender/30", k: "EPOCH", v: "2026.144" },
            { pos: "top-2 right-2",    toneClass: "text-aqua border-aqua/30",         k: "HDG",   v: "088°" },
            { pos: "bottom-2 left-2",  toneClass: "text-mint border-mint/30",         k: "ALT",   v: "GEO·1" },
            { pos: "bottom-2 right-2", toneClass: "text-coral border-coral/30",       k: "LOCK",  v: "1.000" },
          ].map((cr, i) => (
            <div
              key={cr.k}
              ref={(el) => (cornerRefs.current[i] = el)}
              style={{ opacity: 0 }}
              className={`absolute ${cr.pos} hidden md:flex items-center gap-2 px-2 py-1 bg-primary/90 border ${cr.toneClass} font-mono-tight text-[9px] tracking-[0.25em]`}
            >
              <span className="text-neutral-500">{cr.k}</span>
              <span className="block w-px h-2.5 bg-white/15" />
              <span>{cr.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

/* ── Handoff beat ────────────────────────────────────────────── */
const HandoffBeat = memo(function HandoffBeat({ beat5P }) {
  const scaleRef = useRef(null);
  const hairRef  = useRef(null);

  useEffect(() => {
    if (!beat5P) return;
    return beat5P.onChange((p) => {
      if (scaleRef.current)
        scaleRef.current.style.transform = `scale(${interpolate(p, [0, 0.6], [0.94, 1])})`;
      if (hairRef.current)
        hairRef.current.style.transform = `scaleX(${interpolate(p, [0, 0.7], [0, 1])})`;
    });
  }, [beat5P]);

  return (
    <div ref={scaleRef} className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 text-center" style={{ willChange: "transform" }}>
      <MonoLabel tone="lavender" className="mb-6">END · MODULE 03</MonoLabel>
      <h3 className="font-display-tight text-4xl md:text-6xl lg:text-7xl text-white tracking-[-0.04em] leading-[1] mb-8 max-w-4xl">
        Want to build high-performance software <span className="italic text-aqua">at scale</span>?
      </h3>
      <CopyEmailButton />
      <div ref={hairRef} style={{ transformOrigin: "center", transform: "scaleX(0)" }} className="mt-12 w-[min(640px,80vw)]">
        <Hairline />
        <div className="mt-3 flex justify-between font-mono-tight text-[10px] tracking-[0.4em] text-neutral-500">
          <span>03 · IDENTITY</span>
          <span>↓ 04 · SERVICES</span>
        </div>
      </div>
    </div>
  );
});

export default memo(About);
