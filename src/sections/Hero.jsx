import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, memo, useMemo, useRef, useEffect } from "react";
import Loader from "../components/Loader";
import { useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { interpolate } from "../hooks/useGSAPBeat";

gsap.registerPlugin(ScrollTrigger);

const Rig = memo(function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta,
    );
  });
});

const MemoizedAstronaut = memo(Astronaut);

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const inView = useInView(containerRef, { margin: "200px" });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: 0,
      onUpdate: (self) => {
        const p = self.progress;
        if (heroContentRef.current) {
          heroContentRef.current.style.opacity = interpolate(p, [0, 0.55], [1, 0]);
          heroContentRef.current.style.transform = `translateY(${interpolate(p, [0, 0.55], [0, -48])}px)`;
        }
      },
    });
    return () => st.kill();
  }, []);

  const astronautProps = useMemo(
    () => ({
      scale: isMobile ? 0.23 : 0.3,
      position: isMobile ? [0, -1.5, 0] : [1.3, -1, 0],
    }),
    [isMobile],
  );

  const canvasProps = useMemo(
    () => ({
      camera: { position: [0, 1, 3] },
      dpr: [1, 2],
      performance: { min: 0.5 },
      gl: { antialias: true, powerPreference: "high-performance" },
    }),
    [],
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative left-1/2 flex h-[100dvh] min-h-[100dvh] w-screen -translate-x-1/2 items-start overflow-hidden"
    >
      {/* Ambient atmosphere orbs — subtle color depth on top of the sky */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
        {/* Lavender upper-right bloom */}
        <div
          className="ambient-orb"
          style={{
            width: "min(52vw, 680px)",
            height: "min(52vw, 680px)",
            top: "-18%",
            right: "-8%",
            background: "radial-gradient(circle, rgba(122,87,219,0.18) 0%, transparent 68%)",
            filter: "blur(56px)",
            animation: "float-orb 22s ease-in-out infinite",
          }}
        />
        {/* Aqua lower-left bloom */}
        <div
          className="ambient-orb"
          style={{
            width: "min(38vw, 480px)",
            height: "min(38vw, 480px)",
            bottom: "8%",
            left: "-4%",
            background: "radial-gradient(circle, rgba(51,194,204,0.12) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "float-orb 28s ease-in-out infinite alternate-reverse",
            animationDelay: "-9s",
          }}
        />
        {/* Coral accent mid-right */}
        <div
          className="ambient-orb"
          style={{
            width: "min(28vw, 340px)",
            height: "min(28vw, 340px)",
            top: "38%",
            right: "18%",
            background: "radial-gradient(circle, rgba(234,72,132,0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float-orb 20s ease-in-out infinite",
            animationDelay: "-5s",
          }}
        />
      </div>

      <div
        ref={heroContentRef}
        className="relative z-10 mx-auto w-full max-w-7xl c-space"
        style={{ willChange: "transform, opacity" }}
      >
        <HeroText />
      </div>

      <ParallaxBackground />

      <figure
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ willChange: "transform" }}
      >
        {!isMobile && inView && (
          <Canvas {...canvasProps}>
            <Suspense fallback={<Loader />}>
              <Float floatIntensity={0.5} speed={1.5}>
                <MemoizedAstronaut {...astronautProps} />
              </Float>
              <Rig />
            </Suspense>
          </Canvas>
        )}
      </figure>
    </section>
  );
};

export default memo(Hero);
