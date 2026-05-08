import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';
import { SiGithub, SiInstagram, SiGmail } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const STAGGER = 0.1;

const socials = [
  { icon: SiGithub, label: "GitHub", href: "https://github.com/irXan" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/irzan-ahmad-968000313/" },
  { icon: SiInstagram, label: "Instagram", href: "https://instagram.com/loo_kinforme" },
  { icon: SiGmail, label: "Email", href: "mailto:irzanahmad44@gmail.com" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        xPercent: -18,
        opacity: 0,
        stagger: STAGGER,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(formRef.current.children, {
        xPercent: 18,
        opacity: 0,
        stagger: STAGGER,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        "service_4iw5i48",
        "template_jl1muqh",
        { from_name: form.name, from_email: form.email, message: form.message },
        "aDe2u2n42r38W0rjN",
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const btnStyle =
    status === "success"
      ? { background: "var(--color-accent-2)", borderColor: "rgba(124,58,237,0.5)" }
      : status === "error"
        ? { background: "var(--color-accent)", borderColor: "rgba(255,107,43,0.55)" }
        : { background: "var(--color-accent)", borderColor: "rgba(255,107,43,0.45)" };

  return (
    <section id="contact" ref={sectionRef} aria-labelledby="contact-heading" style={{ padding: "7rem 2.5rem", borderTop: "1px solid rgba(255,107,43,0.1)", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}>
        <span className="cyan-line" aria-hidden />
        <p className="section-kicker" style={{ margin: 0 }}>
          05 — Contact
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }} className="contact-grid">
        <div ref={leftRef}>
          <h2
            id="contact-heading"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.25rem)",
              fontWeight: 700,
              lineHeight: "var(--lh-heading)",
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
            }}
          >
            Let&apos;s build
            <br />
            something
            <br />
            <span style={{ color: "var(--color-accent)" }}>great together.</span>
          </h2>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-lg)", color: "var(--color-text-muted)", lineHeight: "var(--lh-body)", fontWeight: 400, maxWidth: "380px", marginBottom: "3rem" }}>
            Open to freelance projects, collaborations, and full-time opportunities. If you have an idea or a role — let&apos;s talk.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {socials.map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    transition: "color 0.2s ease",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-muted)";
                  }}
                >
                  <SocialIcon size={15} aria-hidden="true" />
                  {social.label}
                  <span style={{ opacity: 0.35 }} aria-hidden>
                    ↗
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }} >
          <div>
            <label htmlFor="contact-name" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-text-subtle)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required={true}
              autoComplete="name"
              placeholder="Irzan Ahmad"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="ui-input"
            />
          </div>

          <div>
            <label htmlFor="contact-email" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-text-subtle)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              Email address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required={true}
              autoComplete="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="ui-input"
            />
          </div>

          <div>
            <label htmlFor="contact-message" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-text-subtle)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required={true}
              rows={5}
              placeholder="Hey Irzan, I have a project in mind..."
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              className="ui-input"
              style={{ minHeight: "140px", resize: "vertical" }}
            />
          </div>

          <button type="submit" disabled={status === "sending"} data-cursor className="ui-btn" style={{ ...btnStyle, color: "var(--color-bg)", width: "fit-content", opacity: status === "sending" ? 0.75 : 1, cursor: status === "sending" ? "wait" : "none" }}>
            {status === "idle" && "Send message →"}
            {status === "sending" && "Sending…"}
            {status === "success" && "Sent successfully"}
            {status === "error" && "Failed — try again"}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
