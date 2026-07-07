import { useState } from "react";
import "./SiteHeader.css";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <button
        type="button"
        className={`site-header__hamburger ${isOpen ? "is-open" : ""}`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="site-header__hamburger-line" />
        <span className="site-header__hamburger-line" />
        <span className="site-header__hamburger-line" />
      </button>

      <div className="site-header__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" className="site-header__mark-svg">
          <circle cx="24" cy="24" r="21" className="site-header__mark-ring" />
          <g className="site-header__mark-web">
            <path d="M24 3 L24 45 M3 24 L45 24 M8 8 L40 40 M40 8 L8 40" />
            <path d="M24 3 C14 12 14 12 8 8 M24 3 C34 12 34 12 40 8" />
            <circle cx="24" cy="24" r="9" />
            <circle cx="24" cy="24" r="15" />
          </g>
        </svg>
      </div>
    </header>
  );
}
