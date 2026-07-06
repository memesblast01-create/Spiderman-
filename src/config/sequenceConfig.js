/**
 * SEQUENCE CONFIGURATION
 * ----------------------------------------------------------------
 * This is the ONLY file you need to edit to point the experience
 * at a different image sequence. Nothing else in the codebase
 * hardcodes filenames — they are all generated from these values.
 *
 * Example output with the defaults below:
 *   /frames/ezgif-frame-001.jpg
 *   /frames/ezgif-frame-002.jpg
 *   ...
 *   /frames/ezgif-frame-281.jpg
 */
export const SEQUENCE_CONFIG = {
  // Folder inside /public where frames live (must start and end with "/")
  FRAME_FOLDER: "/frames/",

  // Text that appears before the frame number
  FRAME_PREFIX: "ezgif-frame-",

  // File extension, including the leading dot
  FILE_EXTENSION: ".jpg",

  // First and last frame numbers (inclusive)
  START_FRAME: 1,
  END_FRAME: 281,

  // How many digits the frame number is padded to (3 => "001")
  ZERO_PADDING: 3,

  // Source frame rate of the sequence the frames were extracted from.
  // Used only for reference/timing calculations, not for playback speed —
  // scroll position (not time) drives which frame is shown.
  SOURCE_FPS: 30,
};

/**
 * SCROLL_PIXELS_PER_FRAME controls how much scroll distance is required
 * to advance one frame. Higher = slower, longer, more deliberate scroll.
 * Lower = faster scrubbing through the sequence.
 */
export const SCROLL_PIXELS_PER_FRAME = 9;
