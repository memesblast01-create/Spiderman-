import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Outro.css";

gsap.registerPlugin(ScrollTrigger);

export default function Outro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      tl.fromTo(
        ".outro__eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".outro__title",
          { opacity: 0, y: 46, letterSpacing: "0.14em" },
          { opacity: 1, y: 0, letterSpacing: "0.02em", duration: 1, ease: "power3.out" },
          "-=0.35"
        )
        .fromTo(
          ".outro__subtitle",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".outro__cta",
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
          "-=0.4"
        )
        .fromTo(
          ".outro__footnote",
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power1.out" },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="outro" ref={sectionRef}>
      <div className="outro__web" aria-hidden="true">
        <svg viewBox="0 0 600 600" className="outro__web-svg">
          <g>
            <path d="M300 20 L300 580 M20 300 L580 300 M75 75 L525 525 M525 75 L75 525" />
            <path d="M300 20 C160 100 100 160 20 300 C100 440 160 500 300 580 C440 500 500 440 580 300 C500 160 440 100 300 20 Z" />
            <path d="M300 90 C195 155 155 195 90 300 C155 405 195 445 300 510 C405 445 445 405 510 300 C445 195 405 155 300 90 Z" />
            <path d="M300 160 C230 205 205 230 160 300 C205 370 230 395 300 440 C370 395 395 370 440 300 C395 230 370 205 300 160 Z" />
          </g>
        </svg>
      </div>

      <div className="outro__glow" />

      <p className="outro__eyebrow">The story continues</p>

      <h2 className="outro__title">SPIDER-MAN</h2>

      <p className="outro__subtitle">
        One scroll was just the beginning. The full saga — every suit, every city, every fight —
        is waiting.
      </p>

      <button type="button" className="outro__cta">
        <span className="outro__cta-shine" />
        <span className="outro__cta-text">Explore All Spider-Man Parts</span>
        <span className="outro__cta-arrow">→</span>
      </button>

      <p className="outro__footnote">New chapters added regularly</p>
    </section>
  );
}
