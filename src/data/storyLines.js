/**
 * Each line is timed as a fraction (0 to 1) of the TOTAL scroll distance,
 * not a frame number — this keeps timing stable if SCROLL_PIXELS_PER_FRAME
 * changes. Adjust `start`/`end` to resync a line with a different moment
 * in the sequence.
 *
 * side: "left" | "right" — alternates for visual rhythm.
 */
export const STORY_LINES = [
  { id: "l1", side: "left", text: "With great power…", start: 0.08, end: 0.18 },
  { id: "l2", side: "right", text: "…comes great responsibility.", start: 0.2, end: 0.3 },
  { id: "l3", side: "left", text: "The city never sleeps.", start: 0.45, end: 0.55 },
  { id: "l4", side: "right", text: "And neither does its hero.", start: 0.57, end: 0.67 },
  { id: "l5", side: "left", text: "One choice.", start: 0.78, end: 0.85 },
  { id: "l6", side: "right", text: "One chance to be more.", start: 0.87, end: 0.97 },
];
