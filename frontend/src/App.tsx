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
          <Route path="/privacy" element={<LegalPage title="Privacy" />} />
          <Route path="/terms" element={<LegalPage title="Terms" />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </LoaderContext.Provider>
  );
}
