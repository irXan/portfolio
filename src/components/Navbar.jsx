import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = ["About", "Stack", "Projects", "Experience", "Contact"];

export default function Navbar({ animationReady }) {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isResumeHovered, setIsResumeHovered] = useState(false);

  // Handle responsive check for JS-driven styles
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    LINKS.forEach((link) => {
      const sectionId = link.toLowerCase();
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive) setActiveSection(link);
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  useEffect(() => {
    if (!animationReady) return;
    gsap.from(navRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 0.75,
      ease: "expo.out",
    });
  }, [animationReady]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const orangeColor = "#FF4D00";

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        // DYNAMIC PADDING BASED ON SCREEN SIZE
        padding: isMobile ? "0.8rem 1.25rem" : "1.2rem 2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        background: scrolled || menuOpen ? "rgba(0,0,0,0.98)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${orangeColor}22` : "none",
      }}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: isMobile ? "1.2rem" : "1.4rem",
          fontWeight: 800,
          background: "none",
          border: "none",
          cursor: "pointer",
          letterSpacing: "-0.02em",
          transition: "all 0.3s ease",
          color: isLogoHovered ? "#FFFFFF" : orangeColor,
        }}
      >
        IA<span style={{ color: isLogoHovered ? orangeColor : "#FFFFFF" }}>.</span>
      </button>

      {/* Desktop Links - Only show if not mobile */}
      {!isMobile && (
        <div style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
          {LINKS.map((link) => {
            const isActive = activeSection === link;
            return (
              <button
                key={link}
                type="button"
                onClick={() => scrollTo(link)}
                style={{
                  background: "none", border: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? orangeColor : "var(--color-text-muted)",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                {link}
                {isActive && (
                  <span style={{
                    position: "absolute", bottom: "-6px", left: "50%",
                    transform: "translateX(-50%)", width: "4px", height: "4px",
                    borderRadius: "50%", backgroundColor: orangeColor
                  }} />
                )}
              </button>
            );
          })}

          <a
            href="/resume.pdf"
            download="Irzan_Ahmad_Resume.pdf"
            onMouseEnter={() => setIsResumeHovered(true)}
            onMouseLeave={() => setIsResumeHovered(false)}
            style={{
              padding: "0.55rem 1.2rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              textDecoration: "none",
              borderRadius: "4px",
              border: `1px solid ${orangeColor}`,
              background: isResumeHovered ? "#FFFFFF" : orangeColor,
              color: isResumeHovered ? orangeColor : "#FFFFFF",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              cursor: "pointer"
            }}
          >
            Resume
          </a>
        </div>
      )}

      {/* Mobile Toggle */}
      {isMobile && (
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: `1px solid ${orangeColor}44`,
            color: orangeColor,
            padding: "0.4rem 0.8rem",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            borderRadius: "4px"
          }}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      )}

      {/* Full-Screen Mobile Menu Overlay */}
      {menuOpen && isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            background: "#000000", // Solid black to hide background clutter
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", // Align text to the left
            justifyContent: "center",
            padding: "0 10% 0 10%", // Left-side breathing room
            zIndex: 2000, // Higher than the nav itself
            gap: "1.5rem",
          }}
        >
          {LINKS.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => scrollTo(link)}
              style={{
                background: "none",
                border: "none",
                color: activeSection === link ? orangeColor : "#FFFFFF",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 10vw, 4rem)", // Large, modern typography
                fontWeight: 800,
                textAlign: "left",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                cursor: "pointer",
              }}
            >
              {link}
              {activeSection === link && (
                <span style={{ color: orangeColor, marginLeft: "10px" }}>.</span>
              )}
            </button>
          ))}

          <a
            href="/resume.pdf"
            style={{
              marginTop: "2rem",
              color: orangeColor,
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textDecoration: "none",
              borderBottom: `1px solid ${orangeColor}`
            }}
          >
            Download Resume ↗
          </a>
        </div>
      )}
    </nav>
  );
}