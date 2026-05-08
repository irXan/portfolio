import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const textEl = textRef.current;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
    };
    window.addEventListener("mousemove", onMove);

    let rafId;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const addHover = (e) => {
      const label = e.currentTarget.dataset.cursorLabel;
      gsap.to(ringEl, { scale: 2, opacity: 0.9, duration: 0.35, ease: "expo.out" });
      gsap.to(dot, { scale: 0, duration: 0.2, ease: "expo.out" });
      if (label && textEl) {
        textEl.textContent = label;
        gsap.to(textEl, { opacity: 1, scale: 1, duration: 0.25, ease: "expo.out" });
      }
    };
    const removeHover = () => {
      gsap.to(ringEl, { scale: 1, opacity: 0.5, duration: 0.35, ease: "expo.out" });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "expo.out" });
      if (textEl) gsap.to(textEl, { opacity: 0, scale: 0, duration: 0.2, ease: "expo.out" });
    };
    const addClick = () => {
      gsap.to(ringEl, { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1, ease: "expo.out" });
    };

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });
    window.addEventListener("mousedown", addClick);

    document.addEventListener("mouseleave", () => {
      gsap.to([dot, ringEl], { opacity: 0, duration: 0.2 });
    });
    document.addEventListener("mouseenter", () => {
      gsap.to([dot, ringEl], { opacity: 1, duration: 0.2 });
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", addClick);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          background: "#ff6b2b",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 14px rgba(255,107,43,0.85), 0 0 28px rgba(255,107,43,0.35)",
        }}
        aria-hidden
      />

      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 38,
          height: 38,
          border: "1.5px solid rgba(255,107,43,0.55)",
          borderRadius: "4px",
          transform: "translate(-50%, -50%) rotate(45deg)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0.5,
          boxShadow: "0 0 12px rgba(124,58,237,0.2), inset 0 0 10px rgba(255,107,43,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden
      >
        <div
          ref={textRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            color: "#ff6b2b",
            letterSpacing: "0.05em",
            transform: "rotate(-45deg) scale(0)",
            opacity: 0,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
}
