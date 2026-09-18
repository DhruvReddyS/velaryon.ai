import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import RouteProgress from "@/components/RouteProgress";
import VelaryonLoader from "@/components/VelaryonLoader";
import { LoaderContext } from "@/lib/loader";
import Home from "@/pages/Home";
import MissionPage from "@/pages/MissionPage";
import PlatformPage from "@/pages/PlatformPage";
import TechnologyPage from "@/pages/TechnologyPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import CompanyPage from "@/pages/CompanyPage";
import ContactPage from "@/pages/ContactPage";
import NewsroomPage from "@/pages/NewsroomPage";
import LegalPage from "@/pages/LegalPage";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function App() {
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduce]);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <LoaderContext.Provider value={ready}>
      {!ready && <VelaryonLoader onDone={() => setReady(true)} />}
      <Cursor />
      <RouteProgress />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        key={location.pathname}
        aria-hidden
        className="route-wipe pointer-events-none fixed inset-0 z-[80] origin-top bg-abyss"
      />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/newsroom" element={<NewsroomPage />} />
          <Route path="/privacy" element={<LegalPage title="Privacy" />} />
          <Route path="/terms" element={<LegalPage title="Terms" />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </LoaderContext.Provider>
  );
}
