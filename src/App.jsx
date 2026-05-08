import { useState, useCallback } from "react";
import SEO from "./components/SEO";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <SEO />
      <Cursor />
      <div
        className="noise"
        style={{ position: "fixed", inset: 0, zIndex: 9996, pointerEvents: "none" }}
        aria-hidden
      />

      {!loaded && <Loader onComplete={handleLoaded} />}

      <div
        style={{
          opacity: loaded ? 1 : 0,
          visibility: loaded ? "visible" : "hidden",
          transition: "opacity 0.15s ease",
        }}
      >
        <header>
          <Navbar animationReady={loaded} />
        </header>
        <main id="main-content">
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
