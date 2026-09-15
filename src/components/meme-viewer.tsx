"use client";

/**
 * MemeViewer
 *
 * A fixed bottom-right panel that listens for the custom `skill-hover` DOM
 * event fired by the Spline keyboard scene. When a skill is hovered/pressed,
 * it slides in and shows the corresponding meme GIF. When the keycap is
 * released the panel fades back out.
 *
 * The mapping of skill → GIF lives in `content/meme.txt` (parsed into
 * constants.ts at build-time via the `meme?: string` field on Skill).
 */

import { useEffect, useRef, useState } from "react";
import { Skill } from "@/data/constants";

export default function MemeViewer() {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [visible, setVisible] = useState(false);
  const [inTechStack, setInTechStack] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Monitor whether user is currently at the Tech Stack section (#skills)
  useEffect(() => {
    const skillsEl = document.getElementById("skills");
    if (!skillsEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInTechStack(isIntersecting);
        if (!isIntersecting) {
          setVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(skillsEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: CustomEvent<Skill | null>) => {
      if (hideTimer.current) clearTimeout(hideTimer.current);

      if (e.detail && e.detail.meme && inTechStack) {
        setSkill(e.detail);
        setVisible(true);
      } else {
        // keep the GIF on screen for 1.2 s after hover-out so it doesn't flicker
        hideTimer.current = setTimeout(() => setVisible(false), 1200);
      }
    };

    window.addEventListener("skill-hover", handler as EventListener);
    return () => {
      window.removeEventListener("skill-hover", handler as EventListener);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [inTechStack]);

  // Don't render at all if no meme URL on this skill
  const gifUrl = skill?.meme;
  if (!gifUrl) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        // brutalist look — hard border, hard shadow, zero radius
        border: "2px solid var(--brand)",
        boxShadow: "var(--brutal-shadow)",
        background: "hsl(var(--background))",
        width: 220,
        overflow: "hidden",

        // slide-in / fade-out animation
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
        pointerEvents: "none",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "hsl(var(--accent))",
          borderBottom: "2px solid var(--brand)",
          padding: "4px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 900,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "hsl(var(--accent-foreground))",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {skill?.label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "hsl(var(--accent-foreground))",
            opacity: 0.6,
            whiteSpace: "nowrap",
          }}
        >
          fr fr 🔥
        </span>
      </div>

      {/* GIF */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={gifUrl}
        src={gifUrl}
        alt={`${skill?.label} meme`}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}
