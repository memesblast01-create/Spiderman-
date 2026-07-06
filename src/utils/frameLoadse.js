import { SEQUENCE_CONFIG } from "../config/sequenceConfig.js";

/**
 * Pads a frame number with leading zeros according to ZERO_PADDING.
 */
function padFrameNumber(num, padding) {
  return String(num).padStart(padding, "0");
}

/**
 * Generates the full list of frame URLs from SEQUENCE_CONFIG.
 * This is the single source of truth for filenames — nothing else
 * in the app should construct a frame path by hand.
 */
export function generateFrameUrls(config = SEQUENCE_CONFIG) {
  const { FRAME_FOLDER, FRAME_PREFIX, FILE_EXTENSION, START_FRAME, END_FRAME, ZERO_PADDING } =
    config;

  const urls = [];
  for (let i = START_FRAME; i <= END_FRAME; i++) {
    const padded = padFrameNumber(i, ZERO_PADDING);
    urls.push(`${FRAME_FOLDER}${FRAME_PREFIX}${padded}${FILE_EXTENSION}`);
  }
  return urls;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 400;

function loadSingleImage(url, attempt = 1) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Decoding hint — lets the browser decode off the main thread where supported.
    img.decoding = "async";

    img.onload = () => resolve(img);
    img.onerror = () => {
      if (attempt < MAX_RETRIES) {
        setTimeout(() => {
          loadSingleImage(url, attempt + 1).then(resolve, reject);
        }, RETRY_DELAY_MS * attempt);
      } else {
        reject(new Error(`Failed to load frame after ${MAX_RETRIES} attempts: ${url}`));
      }
    };

    img.src = url;
  });
}

/**
 * Preloads every frame in the sequence.
 *
 * - Deduplicates: if called twice, in-flight/completed loads are reused
 *   via the `inFlight` cache rather than re-requested.
 * - Retries failed loads automatically (network blips, etc).
 * - Reports progress via onProgress(loadedCount, totalCount).
 *
 * Returns an array of HTMLImageElement in the same order as the input URLs.
 */
export function preloadFrames(urls, onProgress) {
  let loadedCount = 0;
  const total = urls.length;
  const inFlight = new Map();

  const promises = urls.map((url) => {
    if (!inFlight.has(url)) {
      const promise = loadSingleImage(url).then((img) => {
        loadedCount += 1;
        if (onProgress) onProgress(loadedCount, total);
        return img;
      });
      inFlight.set(url, promise);
    }
    return inFlight.get(url);
  });

  return Promise.all(promises);
}
