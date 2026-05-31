/* eslint-disable no-undef */
import { lazy, Suspense, memo } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";

// Lazy load below-the-fold sections for better initial load performance
const Starlog = lazy(() => import("./sections/Starlog"));
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Freelance = lazy(() => import("./sections/Freelance"));
const Experiences = lazy(() => import("./sections/Experiences"));
const Testimonial = lazy(() => import("./sections/Testimonial"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

// Elegant section-entrance fallback (fade + rise instead of spinner)
const SectionLoader = memo(() => (
  <div className="flex items-center justify-center min-h-[220px]">
    <div className="flex items-center gap-2">
      <span className="block w-1 h-1 rounded-full bg-lavender/60 animate-pulse" style={{ animationDelay: "0ms" }} />
      <span className="block w-1 h-1 rounded-full bg-aqua/60 animate-pulse" style={{ animationDelay: "150ms" }} />
      <span className="block w-1 h-1 rounded-full bg-mint/60 animate-pulse" style={{ animationDelay: "300ms" }} />
    </div>
  </div>
));
SectionLoader.displayName = "SectionLoader";

const App = () => {
  return (
    <>
      {/* Global visual polish layers (pointer-events: none) */}
      <div aria-hidden className="global-grain" />
      <CustomCursor />
      <ScrollProgress />

      <div className="relative container mx-auto max-w-7xl">
        <Navbar />
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Starlog />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Freelance />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experiences />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonial />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default memo(App);
