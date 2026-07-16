import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { experience } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const ROLES = ["Flutter · Dart", "Full-stack · Mobile", "Product-minded dev", "Karachi · Open to work"];

const EASE = "expo.out";
const STAGGER = 0.1;
const DUR = 0.85;

export default function Hero() {
  const rootRef = useRef(null);
  const parallaxRef = useRef(null);
  const roleRef = useRef(null);
  const [photoFailed, setPhotoFailed] = useState(false);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      const tl = gsap.timeline({ defaults: { ease: EASE, duration: DUR }, delay: 0.08 });

      tl.from(q(".hero-eyebrow"), { y: 14, opacity: 0 }, 0);
      tl.from(q(".name-irzan"), { yPercent: 110, opacity: 0 }, STAGGER);
      tl.from(q(".name-ahmad"), { yPercent: 110, opacity: 0 }, STAGGER * 2);
      tl.from(q(".name-underline"), { scaleX: 0, transformOrigin: "left center", duration: 0.7 }, STAGGER * 3);
      tl.from(q(".hero-tag"), { y: 12, opacity: 0 }, STAGGER * 4);
      tl.from(q(".hero-role"), { y: 10, opacity: 0 }, STAGGER * 5);
      tl.from(q(".hero-bio-chunk"), { y: 18, opacity: 0, stagger: STAGGER }, STAGGER * 6);
      tl.from(q(".hero-cta-row > *"), { y: 14, opacity: 0, stagger: STAGGER, duration: 0.75 }, STAGGER * 7);
      tl.from(q(".hero-stat"), { y: 20, opacity: 0, stagger: STAGGER, duration: 0.75 }, STAGGER * 8);
      tl.from(q(".hero-exp-card"), { y: 20, opacity: 0, stagger: STAGGER * 0.8 }, STAGGER * 9);

      let st;
      if (parallaxRef.current) {
        st = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
          onUpdate: (self) => {
            gsap.set(parallaxRef.current, {
              y: self.progress * 48,
              opacity: 1 - self.progress * 0.15,
            });
          },
        });
      }

      let roleIndex = 0;
      const tick = () => {
        roleIndex = (roleIndex + 1) % ROLES.length;
        if (!roleRef.current) return;
        gsap.to(roleRef.current, {
          y: -6,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            if (!roleRef.current) return;
            roleRef.current.textContent = ROLES[roleIndex];
            gsap.fromTo(roleRef.current, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: EASE });
          },
        });
      };
      const interval = setInterval(tick, 2800);

      return () => {
        clearInterval(interval);
        st?.kill();
      };
    },
    { scope: rootRef, dependencies: [photoFailed] },
  );

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={rootRef} className="hero-section" aria-labelledby="hero-heading">
      {/* Centered Image */}
      <div className="hero-image-centered">
        {!photoFailed && (
          <div ref={parallaxRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
            <img
              src="/profile.png"
              width={960}
              height={1200}
              alt="Irzan Ahmad — professional portrait, cinematic lighting"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onError={() => setPhotoFailed(true)}
            />
          </div>
        )}
      </div>

      {/* Left Content Overlay */}
      <div className="hero-left-content">
        <div className="hero-copy-wrap">
          <p
            className="hero-eyebrow hero-ready"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-subtle)",
              marginBottom: "1.25rem",
            }}
          >
            Full-stack · Developer
          </p>

          <h1
            id="hero-heading"
            className="hero-ready"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 8.5vw, 6.25rem)",
              fontWeight: 700,
              lineHeight: 0.98,
              margin: "0 0 1.75rem",
              color: "var(--color-text)",
            }}
          >
            <span className="sr-only">Irzan Ahmad — </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="name-irzan" style={{ display: "block" }} aria-hidden>
                IRZAN
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden", maxWidth: "100%" }}>
              <span className="name-ahmad-line">
                <span
                  className="name-ahmad"
                  style={{
                    display: "block",
                    color: "transparent",
                    WebkitTextStroke: "1.5px var(--color-accent)",
                  }}
                  aria-hidden
                >
                  AHMAD
                </span>
                <span
                  className="name-underline"
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
                    transformOrigin: "left",
                  }}
                  aria-hidden
                />
              </span>
            </span>
          </h1>

          <div
            className="hero-tag ui-surface hero-ready"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--color-accent)",
                boxShadow: "0 0 12px var(--color-accent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
              }}
            >
              Available for projects
            </span>
          </div>

          <p
            ref={roleRef}
            className="hero-role hero-role-track hero-ready"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--color-accent-2)",
              marginBottom: "1.25rem",
              letterSpacing: "0.08em",
            }}
          >
            {ROLES[0]}
          </p>

          <div className="hero-bio-block hero-ready" style={{ marginBottom: "0.25rem" }}>
            <p className="hero-lead">
              <span className="hero-bio-chunk" style={{ display: "block", marginBottom: "0.75rem" }}>
                I&apos;m a <strong>cross-platform app developer</strong> from{" "}
                <span className="hero-pill">Karachi</span>. I design and ship{" "}
                <strong>production-ready mobile and web apps</strong> end-to-end — from screens, navigation, and UX
                polish to APIs, authentication, data, and release-ready builds.
              </span>

              <span className="hero-bio-chunk" style={{ display: "block" }}>
                Focused on building <strong>clean, scalable architectures</strong> with Flutter and Backend.
                I bridge the gap between complex backend logic and <strong>minimalist user interfaces</strong> to
                deliver high-performance digital products that scale.
              </span>
            </p>
          </div>

          <div className="hero-stats-row hero-ready">
            {[
              ["1+", "Years shipping"],
              ["3+", "Projects"],
              ["2+", "Core stacks"],
            ].map(([num, label]) => (
              <div key={label} className="hero-stat">
                <span className="hero-stat-num">{num}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Experience Cards */}
      <div className="hero-right-experience">
        <div className="hero-exp-list">
          {experience.slice(0, 3).map((item, i) => (
            <article key={i} className="hero-exp-card">
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

              <h3 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.25rem", lineHeight: "var(--lh-heading)" }}>
                {item.role}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-text-subtle)",
                  marginBottom: "0.5rem",
                }}
              >
                @ {item.company}
              </p>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.6", fontWeight: 400 }}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
