import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const ENTRANCE = { duration: 0.75, ease: "expo.out" };
const STAGGER = 0.1;

export default function About() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // States for the Color Switch Effect
  const [isGithubHovered, setIsGithubHovered] = useState(false);
  const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);

  const orangeColor = "#FF4D00";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side text entrance
      gsap.from(leftRef.current.children, {
        xPercent: -20,
        opacity: 0,
        stagger: STAGGER,
        ...ENTRANCE,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Right side skills entrance
      gsap.from(rightRef.current.querySelectorAll(".skill-row"), {
        xPercent: 20,
        opacity: 0,
        stagger: STAGGER,
        ...ENTRANCE,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      // Progress bars animation
      rightRef.current.querySelectorAll(".skill-bar-fill").forEach((bar) => {
        gsap.from(bar, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: bar, start: "top 88%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad"
      aria-labelledby="about-heading"
      style={{ padding: "7rem 2.5rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}>
        <span className="cyan-line" aria-hidden />
        <p className="section-kicker" style={{ margin: 0 }}>
          01 — About
        </p>
      </div>

      <div
        className="about-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}
      >
        <div ref={leftRef}>
          <h2
            id="about-heading"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
            }}
          >
            Crafting mobile
            <br />
            <span style={{ color: "var(--color-accent)" }}>experiences</span> that
            <br />
            feel alive.
          </h2>

          <p style={{ color: "var(--color-text-muted)", marginBottom: "1.2rem", fontWeight: 400, maxWidth: "36rem" }}>
            I&apos;m a developer from Karachi, Pakistan, focused on MERN web apps and Flutter mobile apps that are fast,
            clean, and maintainable. I care about structure, performance, and a cohesive visual language.
          </p>

          <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", fontWeight: 400, maxWidth: "36rem" }}>
            Recent work spans mobile architecture, state management (BLoC, Provider, Riverpod), and backends with Firebase
            and Supabase — with room to grow in AI, data, and product design.
          </p>

          {/* COLOR SWITCH BUTTONS */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="https://github.com/irXan"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsGithubHovered(true)}
              onMouseLeave={() => setIsGithubHovered(false)}
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block",
                padding: "0.8rem 1.6rem",
                borderRadius: "4px",
                border: `1px solid ${orangeColor}`,
                // Logic: Orange to White
                background: isGithubHovered ? "#FFFFFF" : orangeColor,
                color: isGithubHovered ? orangeColor : "#FFFFFF",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                boxShadow: isGithubHovered ? `0 10px 20px ${orangeColor}33` : "none",
                transform: isGithubHovered ? "translateY(-2px)" : "translateY(0)"
              }}
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/irzan-ahmad-968000313/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsLinkedinHovered(true)}
              onMouseLeave={() => setIsLinkedinHovered(false)}
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block",
                padding: "0.8rem 1.6rem",
                borderRadius: "4px",
                border: `1px solid ${isLinkedinHovered ? orangeColor : "rgba(255,255,255,0.2)"}`,
                background: "transparent",
                color: isLinkedinHovered ? orangeColor : "rgba(255,255,255,0.6)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                transform: isLinkedinHovered ? "translateY(-2px)" : "translateY(0)",
                cursor: "none"
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div ref={rightRef}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-text-subtle)",
              marginBottom: "2rem",
            }}
          >
            Skill proficiency
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {skills.map((skill) => (
              <div key={skill.name} className="skill-row">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--color-text)", fontWeight: 500 }}>
                    {skill.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-accent)" }}>{skill.level}%</span>
                </div>
                <div style={{ height: "2px", background: "rgba(255,107,43,0.12)", position: "relative", overflow: "hidden", borderRadius: "1px" }}>
                  <div
                    className="skill-bar-fill"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${skill.level}%`,
                      background: orangeColor,
                      transformOrigin: "left",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}