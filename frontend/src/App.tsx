import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Toaster } from "@/components/ui/sonner";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import VelaryonLoader from "@/components/VelaryonLoader";
import { LoaderContext } from "@/lib/loader";
import { EASE_IO } from "@/components/kit";
import { velaryonMedia as media } from "@/lib/velaryonMedia";
import Home from "@/pages/Home";

const MissionPage = lazy(() => import("@/pages/MissionPage"));
const PlatformsPage = lazy(() => import("@/pages/PlatformsPage"));
const PlatformDetailPage = lazy(() => import("@/pages/PlatformDetailPage"));
const TechnologyPage = lazy(() => import("@/pages/TechnologyPage"));
const HowItWorksPage = lazy(() => import("@/pages/HowItWorksPage"));
const CompanyPage = lazy(() => import("@/pages/CompanyPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NewsroomPage = lazy(() => import("@/pages/NewsroomPage"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const DeckPage = lazy(() => import("@/pages/DeckPage"));

type LenisWindow = { __lenis?: Lenis };

/** A panel that covers the swap on every route change, then lifts away. */
function RouteCurtain({ path }: { path: string }) {
  const prev = useRef(path);
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (prev.current === path) return;
    prev.current = path;
    setKey((k) => k + 1);
  }, [path]);
  if (key === 0) return null;
  return (
    <motion.div key={key} className="v-curtain" initial={{ clipPath: "inset(0 0 0% 0)" }} animate={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.95, delay: 0.12, ease: EASE_IO }} aria-hidden>
      <motion.img src={media.brand.mark} alt="" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, ease: EASE_IO }} />
    </motion.div>
  );
}

export default function App() {
  const [ready, setReady] = useState(() => window.location.pathname.startsWith("/deck"));
  const [loader, setLoader] = useState(() => !window.location.pathname.startsWith("/deck"));
  const location = useLocation();
  const onReveal = useCallback(() => setReady(true), []);
  const onGone = useCallback(() => setLoader(false), []);
  const presenting = location.pathname.startsWith("/deck");

  useEffect(() => {
    const titles: Record<string, string> = { "/": "Intelligence at sea", "/deck": "Company deck", "/mission": "Mission", "/platforms": "Fleet", "/how-it-works": "Autonomy", "/technology": "Technology", "/company": "Company", "/contact": "Contact", "/newsroom": "Newsroom", "/privacy": "Privacy", "/terms": "Terms" };
    const key = location.pathname.startsWith("/platforms/") ? "/platforms" : location.pathname;
    document.title = `Velaryon — ${titles[key] ?? "Not found"}`;
  }, [location.pathname]);

  useEffect(() => {
    const lenis = (window as unknown as LenisWindow).__lenis;
    if (location.hash) {
      window.requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" }));
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false, wheelMultiplier: 0.95 });
    (window as unknown as LenisWindow).__lenis = lenis;
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); delete (window as unknown as LenisWindow).__lenis; };
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as LenisWindow).__lenis;
    document.documentElement.classList.toggle("is-loading", !ready);
    if (!ready) lenis?.stop(); else lenis?.start();
  }, [ready]);

  return (
    <LoaderContext.Provider value={ready}>
      {loader && !presenting && <VelaryonLoader onReveal={onReveal} onGone={onGone} />}
      <RouteCurtain path={location.pathname} />
      <Cursor />
      {!presenting && <div className="v-grain" aria-hidden />}
      {!presenting && <div className="v-vignette" aria-hidden />}
      <a href="#main" className="v-skip">Skip to content</a>
      {!presenting && <Navbar />}
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="min-h-svh bg-abyss" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deck" element={<DeckPage />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/platforms" element={<PlatformsPage />} />
            <Route path="/platforms/:id" element={<PlatformDetailPage />} />
            <Route path="/platform" element={<Navigate to="/platforms" replace />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/newsroom" element={<NewsroomPage />} />
            <Route path="/privacy" element={<LegalPage title="Privacy" />} />
            <Route path="/terms" element={<LegalPage title="Terms" />} />
            <Route path="*" element={<LegalPage title="Not found" />} />
          </Routes>
        </Suspense>
      </main>
      {!presenting && <Footer />}
      <Toaster />
    </LoaderContext.Provider>
  );
}
