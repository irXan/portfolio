import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const bigTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bigTextRef.current, {
        yPercent: 25,
        opacity: 0,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 82%" },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={footerRef}
      style={{
        borderTop: "1px solid rgba(255,107,43,0.1)",
        padding: "5rem 2.5rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={bigTextRef}
        className="footer-ghost"
        style={{
          position: "absolute",
          bottom: "-2rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5rem, 16vw, 14rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
        aria-hidden
      >
        IRZAN AHMAD
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: "1200px",
          margin: "0 auto",
          flexWrap: "wrap",
          gap: "2rem",
          position: "relative",
          zIndex: 1,
          marginBottom: "4rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--color-accent)",
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
              lineHeight: "var(--lh-heading)",
            }}
          >
            IA<span style={{ color: "var(--color-text)" }}>.</span>
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--color-text-muted)", fontWeight: 400, maxWidth: "260px", lineHeight: "var(--lh-body)" }}>
            Full-stack and Flutter developer building from Karachi, Pakistan.
          </p>
        </div>

        <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
          <nav aria-label="Footer">
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-text-subtle)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Navigate
            </p>
            {["About", "Stack", "Projects", "Experience", "Contact"].map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  lineHeight: "var(--lh-body)",
                  color: "var(--color-text-muted)",
                  cursor: "none",
                  marginBottom: "0.6rem",
                  textAlign: "left",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "var(--color-text-muted)";
                }}
              >
                {link}
              </button>
            ))}
          </nav>

          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-text-subtle)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Connect
            </p>
            {[
              ["GitHub", "https://github.com/irXan"],
              ["LinkedIn", "https://www.linkedin.com/in/irzan-ahmad-968000313/"],
              ["Instagram", "https://instagram.com/loo_kinforme"],
              ["Email", "mailto:irzanahmad44@gmail.com"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  lineHeight: "var(--lh-body)",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  marginBottom: "0.6rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-muted)";
                }}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,107,43,0.1)",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ flex: "1 1 0", textAlign: "left" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-subtle)", letterSpacing: "0.05em", margin: 0 }}>
            © {new Date().getFullYear()} Irzan Ahmad. Built with React and GSAP.
          </p>
        </div>

        <div style={{ flex: "1 1 0", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-subtle)", margin: 0 }}>
            Designed and developed by <span style={{ color: "var(--color-accent)" }}>Irzan Ahmad</span>
          </p>
        </div>

        <div style={{ flex: "1 1 0", display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={scrollTop}
            data-cursor
            className="top-btn-hover"
            style={{
              fontSize: "0.72rem",
              padding: "0.6rem 1.4rem",
              borderRadius: "4px",
              background: "transparent",
              border: `1px solid #FF4D00`,
              color: "white",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
          >
            ↑ Top
          </button>
        </div>

        <style>{`
  .top-btn-hover:hover {
    background-color: #FFFFFF !important; /* Button color white */
    color: #FF4D00 !important;            /* Text color orange */
    border-color: #FF4D00 !important;      /* Outline orange */
    transform: translateY(-2px);           /* Subtle lift effect */
    box-shadow: 0 10px 20px rgba(255, 77, 0, 0.2);
  }
`}</style>
      </div>
    </footer>
  );
}