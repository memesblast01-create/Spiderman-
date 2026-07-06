import { useEffect, useRef, useState } from "react";
import { generateFrameUrls, preloadFrames } from "../utils/frameLoader.js";
import { SEQUENCE_CONFIG } from "../config/sequenceConfig.js";

/**
 * Preloads the full frame sequence exactly once and exposes loading progress.
 *
 * images: array of HTMLImageElement, stable reference, populated once loading
 *         completes (kept in a ref so the render loop never depends on
 *         React state and never re-renders because of it).
 * progress: 0-100 integer, safe to use in the loading screen UI.
 * isLoaded: true once every frame has loaded successfully.
 */
export function useImageSequence() {
  const imagesRef = useRef([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const urls = generateFrameUrls(SEQUENCE_CONFIG);

    preloadFrames(urls, (loaded, total) => {
      if (cancelled) return;
      setProgress(Math.round((loaded / total) * 100));
    })
      .then((imgs) => {
        if (cancelled) return;
        imagesRef.current = imgs;
        setProgress(100);
        setIsLoaded(true);
      })
      .catch((err) => {
        if (cancelled) return;
        // eslint-disable-next-line no-console
        console.error("Frame sequence failed to load:", err);
        setHasError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { imagesRef, progress, isLoaded, hasError, totalFrames: SEQUENCE_CONFIG.END_FRAME - SEQUENCE_CONFIG.START_FRAME + 1 };
}
