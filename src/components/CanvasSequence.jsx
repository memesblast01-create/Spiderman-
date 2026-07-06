import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCanvasResize } from "../hooks/useCanvasResize.js";
import { SCROLL_PIXELS_PER_FRAME } from "../config/sequenceConfig.js";
import AnimatedText from "./AnimatedText.jsx";
import "./CanvasSequence.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * The cinematic core: pins a fullscreen canvas for the duration of the
 * sequence and scrubs through frames as the user scrolls. Frame drawing
 * is fully decoupled from React render — everything after mount runs off
 * refs inside a single requestAnimationFrame loop, so scrolling never
 * triggers a re-render.
 */
export default function CanvasSequence({ imagesRef, totalFrames }) {
  const pinRef = useRef(null);
  const canvasRef = useRef(null);
  const { drawCover } = useCanvasResize(canvasRef);

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnRef = useRef(-1);
  const rafIdRef = useRef(null);

  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollLength = totalFrames * SCROLL_PIXELS_PER_FRAME;

  // --- ScrollTrigger: maps scroll progress -> target frame index ---
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: `+=${scrollLength}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        targetFrameRef.current = Math.round(self.progress * (totalFrames - 1));
        if (self.progress > 0.002 && showScrollHint) {
          setShowScrollHint(false);
        }
      },
    });

    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollLength, totalFrames]);

  // --- Render loop: lerp toward target frame, draw only on change ---
  useEffect(() => {
    const LERP_FACTOR = 0.35;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const next = current + (target - current) * LERP_FACTOR;
      currentFrameRef.current = Math.abs(target - next) < 0.02 ? target : next;

      const frameIndex = Math.round(currentFrameRef.current);
      if (frameIndex !== lastDrawnRef.current) {
        const img = imagesRef.current[frameIndex];
        if (img) {
          drawCover(img);
          lastDrawnRef.current = frameIndex;
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [drawCover, imagesRef]);

  return (
    <div className="canvas-sequence" ref={pinRef}>
      <canvas ref={canvasRef} className="canvas-sequence__canvas" />

      <div className={`canvas-sequence__scroll-hint ${showScrollHint ? "" : "is-hidden"}`}>
        <span>Scroll</span>
        <div className="canvas-sequence__scroll-hint-line" />
      </div>

      <AnimatedText pinTriggerRef={pinRef} scrollLength={scrollLength} />
    </div>
  );
}
