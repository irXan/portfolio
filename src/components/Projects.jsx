import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import { SiGithub } from "react-icons/si";
import { HiArrowUpRight } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

const projectImages = {
  "RealEstate App": "https://d1y41eupgbwbb2.cloudfront.net/images/blog/blogimage10-Best-Real-Estate-Application-For-Buyers-Sellers-in-2023.webp",
  "Watch Ecommerce App": "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2a400d122911275.60e3cc084162d.jpg",
  "PetCareHospital App": "https://i.pinimg.com/originals/bc/b3/b9/bcb3b9fac784e27728b29c397287030b.jpg",
  "Fitness Tracker": "https://cdn.dribbble.com/userupload/12969490/file/original-a27faa432dfc79dac6e22400a81850f9.jpg?resize=752x&vertical=center"
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const accentPurple = "#A855F7";
  const verticalOffset = index * 110;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    gsap.to(card, {
      rotateX, rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div className="card-wrapper" style={{
      width: "620px",
      height: "420px",
      flexShrink: 0,
      marginRight: "8rem",
      position: "relative",
      transform: `translateY(${verticalOffset}px)`,
    }}>
      <article
        ref={cardRef}
        className="uiverse-3d-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="inner-content">
          <div className="front-image-layer">
            <img src={projectImages[project.title]} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="image-overlay">
              <h3 className="floating-title">{project.title}</h3>
            </div>
          </div>

          <div className="back-content-layer">
            <div className="content-top">
              <span className="year-tag" style={{ color: accentPurple, border: `1px solid ${accentPurple}88`, padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem" }}>
                {project.year}
              </span>
              <h3 style={{ color: "white", fontSize: "1.7rem", marginTop: "1rem", fontWeight: 800 }}>{project.title}</h3>
              <p style={{ color: "#aaa", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>{project.description}</p>

              <div className="tags-container" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {project.tags.map(tag => (
                  <span key={tag} className="stack-block">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="links-footer">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn">
                <SiGithub size={18} /> Code
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="link-btn" style={{ color: accentPurple }}>
                  Live <HiArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default function Projects() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      // Staircase height calculation (important for smooth exit)
      const totalStairHeight = (projects.length - 1) * 110;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          // ADJUSTED: Dynamic end calculation prevents the extra bottom space
          end: () => `+=${getScrollAmount() + totalStairHeight}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        background: "#000",
        width: "100%",
        overflow: "hidden",
        marginBottom: "-2px" // Prevents tiny gaps between dark sections
      }}
    >
      {/* Heading Section - Reduced marginBottom to keep it close to cards */}
      <div style={{ padding: "6rem 2.5rem 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <span style={{ width: "40px", height: "1px", background: "#ff6b2b" }} />
          <p style={{ fontSize: "0.75rem", color: "#ff6b2b", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 500 }}>
            03 — Projects
          </p>
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white", lineHeight: 1.1 }}>
          Things I've built
        </h2>
      </div>

      {/* Cards Section - Removed 160vh and replaced with auto-height layout */}
      <div
        ref={pinRef}
        style={{
          minHeight: "100vh", // Keeps section full screen while pinned
          display: "flex",
          alignItems: "flex-start",
          marginTop: "3rem", // Controlled gap between heading and cards
          paddingBottom: "5rem" // Minimal padding to allow Experience section to enter smoothly
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            paddingLeft: "5rem",
            paddingRight: "15rem"
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .uiverse-3d-card {
          width: 100%;
          height: 100%;
          background: #050505;
          border-radius: 24px;
          position: relative;
          padding: 2px;
          transform-style: preserve-3d;
          transition: box-shadow 0.3s ease;
        }

        .uiverse-3d-card:hover {
          /* Restore ORANGE Glow behind cards */
          box-shadow: 0 30px 60px -12px rgba(255, 77, 0, 0.25); 
        }

        .inner-content {
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 22px;
          z-index: 1;
          position: relative;
          overflow: hidden;
          transform: translateZ(20px);
        }

        .front-image-layer {
          position: absolute;
          inset: 0;
          z-index: 5;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .uiverse-3d-card:hover .front-image-layer {
          transform: translateY(-100%);
        }

        .floating-title {
          color: white;
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          font-size: 2.2rem;
          font-weight: 900;
          text-transform: uppercase;
          text-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        .back-content-layer {
          height: 100%;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .stack-block {
          font-size: 0.7rem;
          color: white;
          padding: 5px 12px;
          border-radius: 4px;
          border: 1px solid #A855F744;
          background: rgba(168, 85, 247, 0.05);
          text-transform: uppercase;
        }

        .links-footer {
          display: flex;
          gap: 1.5rem;
          border-top: 1px solid #222;
          padding-top: 1.5rem;
        }

        .link-btn {
          text-decoration: none;
          color: #777;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          transition: 0.3s;
        }

        .link-btn:hover { color: white; }
      `}</style>
    </section>
  );
}