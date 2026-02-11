// app/page.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const ROUTES: Record<string, string> = {
  blog: "/blog",
  github: "https://github.com/JuliusDorfman",
};

export default function Home() {
  const router = useRouter();
  const [typingDone, setTypingDone] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTypingDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = useCallback(
    (input: string) => {
      const trimmed = input.trim().toLowerCase();

      if (trimmed === "?" || trimmed === "help") {
        setShowHelp(true);
        setError("");
        setUserInput("");
        return;
      }

      setShowHelp(false);
      const dest = ROUTES[trimmed];

      if (dest) {
        if (dest.startsWith("http")) {
          window.open(dest, "_blank", "noopener,noreferrer");
        } else {
          router.push(dest);
        }
      } else {
        setError(`command not found: "${trimmed}".\ntype "?" or "help" for available commands`);
        setUserInput("");
      }
    },
    [router]
  );

  useEffect(() => {
    if (!typingDone) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        handleSubmit(userInput);
      } else if (e.key === "Backspace") {
        setUserInput((prev) => prev.slice(0, -1));
        setError("");
        setShowHelp(false);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        setUserInput((prev) => prev + e.key);
        setError("");
        setShowHelp(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [typingDone, userInput, handleSubmit]);

  return (
    <div className="home-page scanlines crt-flicker">
      <main className="home-main">
        <div className="home-status text-glow">
          <div className="typing-text">&gt; system online</div>
          {typingDone && (
            <>
              {error && <div className="prompt-error">{error}</div>}
              {showHelp && (
                <div className="prompt-help">
                  <div>available commands:</div>
                  <div>&nbsp; blog &nbsp; &nbsp;- read the blog</div>
                  <div>&nbsp; github &nbsp;- view program author</div>
                  <div>&nbsp; ? | help - show this message</div>
                </div>
              )}
              <div className="prompt-line">
                &gt; goto {userInput}
                <span className="cursor">_</span>
              </div>
            </>
          )}
        </div>

        <div
          className="home-content-wrapper"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement("span");
            ripple.className = "ripple";
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            e.currentTarget.appendChild(ripple);
            ripple.addEventListener("animationend", () => ripple.remove());

            const blemish = document.createElement("span");
            blemish.className = "blemish";
            blemish.style.left = `${x}px`;
            blemish.style.top = `${y}px`;
            const size = 4 + Math.random() * 6;
            const scaleX = 0.6 + Math.random() * 0.8;
            const scaleY = 0.6 + Math.random() * 0.8;
            const rotate = Math.random() * 360;
            const opacity = 0.3 + Math.random() * 0.4;
            blemish.style.width = `${size}px`;
            blemish.style.height = `${size}px`;
            blemish.style.transform = `translate(-50%, -50%) scale(${scaleX}, ${scaleY}) rotate(${rotate}deg)`;
            blemish.style.opacity = `${opacity}`;
            e.currentTarget.appendChild(blemish);
          }}
        >
          <div className="home-content">
            <h1 className="home-title text-glow">Julius Dorfman</h1>
            <p className="home-subtitle text-glow-sm">
              I can help you with all things web
            </p>
          </div>
        </div>

        <nav className="home-nav">
          <a className="home-nav-link" href="/blog">
            ./blog
          </a>
          <a
            className="home-nav-link"
            href="https://github.com/JuliusDorfman"
            target="_blank"
            rel="noopener noreferrer"
          >
            ./github
          </a>
        </nav>
      </main>
    </div>
  );
}
