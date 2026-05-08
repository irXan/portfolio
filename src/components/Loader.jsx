import { useEffect, useRef } from "react";
import gsap from "gsap";

const STAGGER = 0.1;

export default function Loader({ onComplete }) {
  const overlayRef = useRef(null);
  const tagRef = useRef(null);
  const lineTrackRef = useRef(null);
  const lineFillRef = useRef(null);
  const counterRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    gsap.set(lettersRef.current, {
      opacity: 0,
      rotateX: -88,
      y: 36,
      transformOrigin: "50% 100%",
      transformPerspective: 700,
    });
    gsap.set(tagRef.current, { opacity: 0, y: 12 });
    gsap.set(counterRef.current, { opacity: 0 });
    gsap.set(lineTrackRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "expo.inOut",
          onComplete,
        });
      },
    });

    tl.to(
      lettersRef.current,
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        stagger: STAGGER,
        duration: 0.72,
        ease: "back.out(1.35)",
      },
      0.08,
    );

    tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "expo.out" }, 0.32);
    tl.to(lineTrackRef.current, { opacity: 1, duration: 0.3, ease: "expo.out" }, 0.42);
    tl.to(counterRef.current, { opacity: 1, duration: 0.3, ease: "expo.out" }, 0.42);

    const count = { val: 0 };
    tl.to(
      lineFillRef.current,
      { scaleX: 1, duration: 1.25, ease: "expo.inOut", transformOrigin: "left" },
      0.52,
    );
    tl.to(
      count,
      {
        val: 100,
        duration: 1.25,
        ease: "expo.inOut",
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = Math.round(count.val) + "%";
        },
      },
      0.52,
    );

    tl.to(
      lettersRef.current,
      {
        color: "#ff6b2b",
        textShadow: "0 0 32px rgba(255,107,43,0.55)",
        stagger: 0.05,
        duration: 0.35,
        ease: "expo.out",
      },
      1.78,
    );
  }, [onComplete]);

  const name = "IRZAN AHMAD".split("");

  const letterStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(4.5rem, min(16vw, 22vh), 13rem)",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    color: "#ffffff",
    display: "inline-block",
    lineHeight: 0.92,
    width: "auto",
    transformStyle: "preserve-3d",
    willChange: "transform, opacity",
  };

  return (
    <div
      ref={overlayRef}
      className="loader-overlay"
      style={{ flexDirection: "column", gap: "1.5rem", background: "#000000", padding: "0 clamp(0.75rem, 3vw, 2rem)" }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          width: "min(96vw, 1600px)",
          maxWidth: "100%",
          perspective: "800px",
          perspectiveOrigin: "50% 40%",
          overflow: "visible",
          gap: "clamp(0.01em, 0.35vw, 0.06em)",
        }}
      >
        {name.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            style={{
              ...letterStyle,
              ...(char === " " ? { width: "clamp(0.2em, 1.5vw, 0.45em)", minWidth: "0.15em" } : {}),
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <p
        ref={tagRef}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.65rem, 1.8vw, 0.8rem)",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Flutter dev &amp; vibe coder · Karachi
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1rem", width: "min(92vw, 520px)", maxWidth: "100%" }}>
        <div
          ref={lineTrackRef}
          style={{
            width: "100%",
            height: "2px",
            borderRadius: "1px",
            background: "rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            ref={lineFillRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #7c3aed, #ff6b2b)",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>
        <p
          ref={counterRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "rgba(255,107,43,0.75)",
            letterSpacing: "0.12em",
          }}
        >
          0%
        </p>
      </div>
    </div>
  );
}
