import { useState } from "react";
import "./SiteHeader.css";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__scrim" />

      <div className="site-header__brand">
        <span className="site-header__brand-dot" />
        <span className="site-header__brand-text">SPIDER-MAN</span>
      </div>

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

      <div className="site-header__hairline" />
    </header>
  );
}
