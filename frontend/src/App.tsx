import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VelaryonLoader from "@/components/VelaryonLoader";
import { LoaderContext } from "@/lib/loader";
import Home from "@/pages/Home";
import MissionPage from "@/pages/MissionPage";
import PlatformsPage from "@/pages/PlatformsPage";
import PlatformDetailPage from "@/pages/PlatformDetailPage";
import TechnologyPage from "@/pages/TechnologyPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import CompanyPage from "@/pages/CompanyPage";
import ContactPage from "@/pages/ContactPage";
import NewsroomPage from "@/pages/NewsroomPage";
import LegalPage from "@/pages/LegalPage";

export default function App() {
  const [ready, setReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
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
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </LoaderContext.Provider>
  );
}
