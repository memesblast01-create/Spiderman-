import { useCallback, useEffect, useRef } from "react";

/**
 * Keeps a canvas element sized to exactly fill the viewport at the
 * device's real pixel density (crisp on Retina), and exposes a
 * `drawCover` function that paints an image onto it using
 * "cover" semantics — fills the frame, preserves aspect ratio,
 * crops overflow, never stretches.
 */
export function useCanvasResize(canvasRef) {
  const ctxRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5); // cap for perf on very high-DPR phones
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
    sizeRef.current = { width, height, dpr };
  }, [canvasRef]);

  useEffect(() => {
    resize();

    let frame = null;
    const onResize = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(resize);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [resize]);

  /**
   * Draws `img` centered on the canvas, scaled so it fully covers the
   * viewport (like CSS background-size: cover) without distortion.
   */
  const drawCover = useCallback((img) => {
    const ctx = ctxRef.current;
    if (!ctx || !img) return;
    const { width, height } = sizeRef.current;

    const canvasRatio = width / height;
    const imgRatio = img.width / img.height;

    let drawWidth;
    let drawHeight;

    if (imgRatio > canvasRatio) {
      // Image is relatively wider — fit height, crop sides.
      drawHeight = height;
      drawWidth = height * imgRatio;
    } else {
      // Image is relatively taller — fit width, crop top/bottom.
      drawWidth = width;
      drawHeight = width / imgRatio;
    }

    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  return { ctxRef, sizeRef, drawCover, resize };
}
