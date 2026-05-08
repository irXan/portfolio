import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const STAGGER = 0.1;

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.from(".exp-card", {
        yPercent: 20,
        opacity: 0,
        stagger: STAGGER,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      style={{
        padding: "4rem 2.5rem 7rem", 
        maxWidth: "900px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255,107,43,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <span className="cyan-line" aria-hidden />
        <p className="section-kicker" style={{ margin: 0 }}>
          04 — Experience
        </p>
      </div>

      <h2 id="experience-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "2.5rem" }}>
        My journey so far
      </h2>

      <div style={{ position: "relative", paddingLeft: "2rem" }}>
        <div
          ref={lineRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "1px",
            background: "linear-gradient(to bottom, var(--color-accent), rgba(255,107,43,0.2), transparent)",
          }}
          aria-hidden
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {experience.map((item, i) => (
            <article key={i} className="exp-card" style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "-2.4rem",
                  top: "0.35rem",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--color-accent)",
                  boxShadow: "0 0 10px var(--color-accent)",
                }}
                aria-hidden
              />

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                {item.year}
              </p>

              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.25rem", lineHeight: "var(--lh-heading)" }}>
                {item.role}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--color-text-subtle)",
                  marginBottom: "0.75rem",
                }}
              >
                @ {item.company}
              </p>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--color-text-muted)", lineHeight: "var(--lh-body)", fontWeight: 400, maxWidth: "600px" }}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
