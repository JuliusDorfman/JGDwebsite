"use client";

import { useState, useEffect, useRef, createContext, useContext, ReactNode } from "react";

const NeonContext = createContext({ enabled: true, toggle: () => {} });

export function NeonProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("blog-neon-styles");
    if (saved === "off") {
      setEnabled(false);
      document.body.classList.add("neon-disabled");
    }
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("blog-neon-styles", next ? "on" : "off");
      document.body.classList.toggle("neon-disabled", !next);
      return next;
    });
  };

  return (
    <NeonContext.Provider value={{ enabled, toggle }}>
      <div className={enabled ? "" : "neon-disabled"}>
        {children}
      </div>
    </NeonContext.Provider>
  );
}

export default function BlogStyleToggle() {
  const { enabled, toggle } = useContext(NeonContext);
  const [mounted, setMounted] = useState(false);
  const [stuck, setStuck] = useState(false);
  const inlineRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!inlineRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(inlineRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  const toggleClass = `blog-style-toggle ${enabled ? "blog-style-toggle--on" : "blog-style-toggle--off"}`;

  const toggleInner = (
    <>
      <span className="blog-style-toggle__label">NEON STYLING</span>
      <span className="blog-style-toggle__track">
        <span className="blog-style-toggle__knob" />
      </span>
    </>
  );

  if (!mounted) return null;

  return (
    <>
      {/* Inline toggle — sits inside the blog header */}
      <button
        ref={inlineRef}
        onClick={toggle}
        className={`${toggleClass} blog-style-toggle--inline`}
        aria-label={`Toggle neon styles ${enabled ? "off" : "on"}`}
      >
        {toggleInner}
      </button>

      {/* Fixed toggle — appears when inline scrolls out of view */}
      <button
        onClick={toggle}
        className={`${toggleClass} blog-style-toggle--fixed ${stuck ? "blog-style-toggle--visible" : ""}`}
        aria-label={`Toggle neon styles ${enabled ? "off" : "on"}`}
      >
        {toggleInner}
      </button>
    </>
  );
}
