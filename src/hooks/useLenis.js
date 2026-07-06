import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up Lenis smooth scrolling and keeps it perfectly in sync with
 * GSAP's ticker + ScrollTrigger. Scrolling stays fully locked until
 * `enabled` is true, which we only flip once every frame has preloaded.
 */
export function useLenis(enabled) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      // Hard-lock scrolling during preload.
      document.documentElement.style.overflow = "hidden";
      return;
    }

    document.documentElement.style.overflow = "";

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;

    // Every Lenis scroll tick must tell ScrollTrigger to re-check positions.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's own ticker so both stay on one rAF loop —
    // this is what removes any shaking/desync between scroll + scrub.
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
