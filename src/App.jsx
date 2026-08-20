import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainLayout from "./layouts/MainLayout";
import PageTransition from "./components/PageTransition";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";

import FlowerServices from "./pages/Services/FlowerServices";
import Decoration from "./pages/Services/Decoration";

import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => console.log("✅ EXIT COMPLETE:", location.pathname)}
    >
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          {/* About */}
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />

          {/* Services */}
          <Route
            path="/services"
            element={
              <PageTransition>
                <Services />
              </PageTransition>
            }
          />

          {/* Flower Services */}
          <Route
            path="/services/flowers"
            element={
              <PageTransition>
                <FlowerServices />
              </PageTransition>
            }
          />

          {/* Decoration Services */}
          <Route
            path="/services/decoration"
            element={
              <PageTransition>
                <Decoration />
              </PageTransition>
            }
          />

          {/* Gallery */}
          <Route
            path="/gallery"
            element={
              <PageTransition>
                <Gallery />
              </PageTransition>
            }
          />

          {/* Contact */}
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />

          {/* Unknown route → redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
