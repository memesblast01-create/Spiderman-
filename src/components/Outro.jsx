import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Outro.css";

gsap.registerPlugin(ScrollTrigger);

export default function Outro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".outro__title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".outro__cta",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="outro" ref={sectionRef}>
      <div className="outro__glow" />

      <h2 className="outro__title">SPIDER-MAN</h2>

      <button type="button" className="outro__cta">
        <span className="outro__cta-shine" />
        <span className="outro__cta-text">Explore All Spider-Man Parts</span>
        <span className="outro__cta-arrow">→</span>
      </button>
    </section>
  );
}
