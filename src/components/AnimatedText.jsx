import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_LINES } from "../data/storyLines.js";
import "./AnimatedText.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Renders every story line as an absolutely-positioned overlay and wires
 * each one to its own scrubbed GSAP timeline: fade+rise in, hold, fade+
 * rise out. Ranges never overlap (see storyLines.js) so only one line is
 * ever visible at a time.
 *
 * `pinTriggerRef` is the same element CanvasSequence pins, and
 * `scrollLength` is the total extra scroll distance created for the
 * whole sequence — both are needed so each line's start/end fraction
 * maps onto the correct real scroll range.
 */
export default function AnimatedText({ pinTriggerRef, scrollLength }) {
  const lineRefs = useRef({});

  useEffect(() => {
    if (!pinTriggerRef.current || !scrollLength) return;

    const triggers = STORY_LINES.map((line) => {
      const el = lineRefs.current[line.id];
      if (!el) return null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTriggerRef.current,
          start: `top+=${line.start * scrollLength} top`,
          end: `top+=${line.end * scrollLength} top`,
          scrub: true,
        },
      });

      tl.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" })
        .to(el, { opacity: 1, duration: 0.36 })
        .to(el, { opacity: 0, y: -26, duration: 0.32, ease: "power2.in" });

      return tl.scrollTrigger;
    });

    return () => {
      triggers.forEach((t) => t && t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollLength]);

  return (
    <div className="animated-text">
      {STORY_LINES.map((line) => (
        <p
          key={line.id}
          ref={(el) => (lineRefs.current[line.id] = el)}
          className={`animated-text__line animated-text__line--${line.side}`}
          style={{ opacity: 0 }}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}
