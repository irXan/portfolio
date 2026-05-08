import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiReact,
  SiSupabase,
  SiMongodb,
  SiNodedotjs,
  SiJavascript,
  SiPython,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiExpress,
  SiCanva,
  SiBootstrap,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiReact,
  SiSupabase,
  SiMongodb,
  SiNodedotjs,
  SiJavascript,
  SiPython,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiExpress,
  SiCanva,
  SiBootstrap,
};

const row1 = [
  { name: "Flutter", icon: "SiFlutter", brandColor: "#02569B" },
  { name: "Dart", icon: "SiDart", brandColor: "#0175C2" },
  { name: "Firebase", icon: "SiFirebase", brandColor: "#FFCA28" },
  { name: "React", icon: "SiReact", brandColor: "#61DAFB" },
  { name: "Supabase", icon: "SiSupabase", brandColor: "#3ECF8E" },
  { name: "MongoDB", icon: "SiMongodb", brandColor: "#47A248" },
  { name: "Node.js", icon: "SiNodedotjs", brandColor: "#339933" },
  { name: "JavaScript", icon: "SiJavascript", brandColor: "#F7DF1E" },
];

const row2 = [
  { name: "Python", icon: "SiPython", brandColor: "#3776AB" },
  { name: "Git", icon: "SiGit", brandColor: "#F05032" },
  { name: "GitHub", icon: "SiGithub", brandColor: "#FFFFFF" },
  { name: "Tailwind", icon: "SiTailwindcss", brandColor: "#06B6D4" },
  { name: "HTML5", icon: "SiHtml5", brandColor: "#E34F26" },
  { name: "CSS3", icon: "SiCss", brandColor: "#1572B6" },
  { name: "Express", icon: "SiExpress", brandColor: "#FFFFFF" },
  { name: "Canva", icon: "SiCanva", brandColor: "#00C4CC" },
];

const TechItem = ({ name, icon, brandColor }) => {
  const Icon = iconMap[icon];
  
  return (
    <div
      className="ui-surface"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1.5rem",
        whiteSpace: "nowrap",
        marginRight: "1rem",
        transition: "border-color 0.2s ease",
        borderColor: `${brandColor}22` 
      }}
    >
      {Icon && <Icon size={18} color={brandColor} aria-hidden />}
      <span style={{ 
        fontFamily: "var(--font-mono)", 
        fontSize: "0.8125rem", 
        color: "var(--color-text-muted)", 
        letterSpacing: "0.05em" 
      }}>
        {name}
      </span>
    </div>
  );
};
const MarqueeRow = ({ items, direction = "left" }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div className={direction === "left" ? "marquee-left" : "marquee-right"} style={{ display: "flex", width: "max-content" }}>
        {doubled.map((item, i) => (
          <TechItem key={`${item.name}-${i}`} {...item} accent={i % 2 === 0 ? "orange" : "violet"} />
        ))}
      </div>
    </div>
  );
};

export default function TechStack() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        yPercent: 15,
        opacity: 0,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={sectionRef} aria-labelledby="stack-heading" style={{ padding: "7rem 0", borderTop: "1px solid rgba(255,107,43,0.1)", overflow: "hidden" }}>
      <div style={{ padding: "0 2.5rem", maxWidth: "1200px", margin: "0 auto 3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <span className="cyan-line" aria-hidden />
          <p className="section-kicker" style={{ margin: 0 }}>
            02 — Stack
          </p>
        </div>
        <h2
          id="stack-heading"
          ref={headingRef}
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
          }}
        >
          Tools I build with
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
}
