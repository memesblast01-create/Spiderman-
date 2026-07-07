import "./CinematicOverlay.css";

export default function CinematicOverlay() {
  return (
    <div className="cinematic-overlay" aria-hidden="true">
      <div className="cinematic-overlay__vignette" />
      <div className="cinematic-overlay__grain" />
    </div>
  );
}
