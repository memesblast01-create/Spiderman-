import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LoadingScreen.css";

/**
 * Premium black loading screen. Fades out beautifully once progress
 * hits 100, then unmounts (via onExited) so it never sits behind the
 * canvas doing nothing.
 */
export default function LoadingScreen({ progress, hasError, onExited }) {
  const containerRef = useRef(null);
  const hasExitedRef = useRef(false);

  useEffect(() => {
    if (progress >= 100 && !hasExitedRef.current) {
      hasExitedRef.current = true;

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.9,
        delay: 0.35,
        ease: "power2.inOut",
        onComplete: onExited,
      });
    }
  }, [progress, onExited]);

  return (
    <div className="loading-screen" ref={containerRef}>
      <div className="loading-screen__glow" />

      <div className="loading-screen__percentage">
        {String(progress).padStart(2, "0")}
        <span className="loading-screen__percentage-symbol">%</span>
      </div>

      <div className="loading-screen__bar-track">
        <div
          className="loading-screen__bar-fill"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      <p className="loading-screen__subtitle">
        {hasError ? "Retrying dropped frames…" : "Loading the sequence"}
      </p>
    </div>
  );
}
