"use client";
/**
 * HeroAvatarOrbs
 *
 * Two glowing holographic avatar badges floating around the 3-D keyboard.
 * They use `position: fixed` so they overlay the Spline WebGL canvas (which
 * is itself `fixed`). Positions are viewport-percentage based so they always
 * land in the right half of the screen where the keyboard lives.
 *
 * Architecture:
 *  - Pure CSS + SVG for glow rings / orbit arcs (no extra runtime cost)
 *  - Framer Motion for entrance spring + continuous float loop
 *  - Canvas 2-D for the fine-grained spinning particle ring
 *  - pointer-events-none on the root; pointer-events-auto on each badge <a>
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { config } from "@/data/config";
import { usePreloader } from "./preloader";
import { useMediaQuery } from "@/hooks/use-media-query";

/* ═══════════════════════════════════════════════════════
   Utility: inject global CSS keyframes once
══════════════════════════════════════════════════════ */
const KEYFRAMES = `
@keyframes orb-float-up   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-14px)} }
@keyframes orb-float-down { 0%,100%{transform:translateY(0)}  50%{transform:translateY( 14px)} }
@keyframes orb-pulse      { 0%,100%{opacity:.55;transform:scale(1)}   50%{opacity:1;transform:scale(1.06)} }
@keyframes orb-spin-cw    { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
@keyframes orb-spin-ccw   { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
@keyframes orb-particle   { 0%{transform:rotate(0deg) translateX(var(--pr)) rotate(0deg);opacity:1}
                            100%{transform:rotate(360deg) translateX(var(--pr)) rotate(-360deg);opacity:.3} }
@keyframes orb-halo-pulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.7;transform:scale(1.12)} }
`;

function useGlobalKeyframes() {
  useEffect(() => {
    if (document.getElementById("orb-kf")) return;
    const s = document.createElement("style");
    s.id = "orb-kf";
    s.textContent = KEYFRAMES;
    document.head.appendChild(s);
  }, []);
}

/* ═══════════════════════════════════════════════════════
   Canvas ring painter (fine detail inside the SVG rings)
══════════════════════════════════════════════════════ */
function useSpinCanvas(
  ref: React.RefObject<HTMLCanvasElement | null>,
  color1: string,
  color2: string,
) {
  const raf = useRef(0);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const W = c.width, H = c.height, cx = W / 2, cy = H / 2;
    let t = 0;

    const hex2rgba = (hex: string, a: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      // outer diffuse halo
      const halo = ctx.createRadialGradient(cx, cy, W * 0.28, cx, cy, W * 0.5);
      halo.addColorStop(0, hex2rgba(color1, 0.22));
      halo.addColorStop(1, hex2rgba(color1, 0));
      ctx.beginPath(); ctx.arc(cx, cy, W * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = halo; ctx.fill();

      // spinning bright dots on outer ring
      for (let p = 0; p < 14; p++) {
        const angle = t * 1.2 + (p / 14) * Math.PI * 2;
        const r = W * 0.435 + Math.sin(t * 3 + p) * W * 0.015;
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        const rs = W * (0.016 + 0.008 * Math.sin(t * 4 + p));
        const dot = ctx.createRadialGradient(px, py, 0, px, py, rs * 4);
        const col = p % 2 === 0 ? color1 : color2;
        dot.addColorStop(0, hex2rgba(col, 0.95));
        dot.addColorStop(0.5, hex2rgba(col, 0.4));
        dot.addColorStop(1, hex2rgba(col, 0));
        ctx.beginPath(); ctx.arc(px, py, rs * 4, 0, Math.PI * 2);
        ctx.fillStyle = dot; ctx.fill();
      }

      // counter-rotating faint arcs on second ring
      for (let p = 0; p < 6; p++) {
        const angle = -t * 0.7 + (p / 6) * Math.PI * 2;
        const r2 = W * 0.34;
        const px = cx + Math.cos(angle) * r2;
        const py = cy + Math.sin(angle) * r2;
        const rs = W * 0.012;
        const a2 = 0.5 + 0.5 * Math.sin(t * 2 + p);
        ctx.beginPath(); ctx.arc(px, py, rs, 0, Math.PI * 2);
        ctx.fillStyle = hex2rgba(color2, a2); ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf.current);
  }, [color1, color2]);
}

/* ═══════════════════════════════════════════════════════
   SVG orbit ring assembly
══════════════════════════════════════════════════════ */
function OrbRings({
  size,
  color,
  color2,
}: {
  size: number;
  color: string;
  color2: string;
}) {
  const cx = size / 2;
  const uid = color.replace("#", "");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0"
      style={{ overflow: "visible", pointerEvents: "none" }}
    >
      <defs>
        {/* Glow filter */}
        <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={`glow2-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── outermost halo ring (pulse) ── */}
      <circle
        cx={cx} cy={cx} r={cx * 0.96}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.25"
        filter={`url(#glow2-${uid})`}
        style={{ animation: "orb-halo-pulse 3s ease-in-out infinite" }}
      />

      {/* ── primary orbit ring (cw) ── */}
      <g style={{ transformOrigin: `${cx}px ${cx}px`, animation: "orb-spin-cw 8s linear infinite" }}>
        <circle
          cx={cx} cy={cx} r={cx * 0.93}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.55"
          strokeDasharray="6 10"
          filter={`url(#glow-${uid})`}
        />
        {/* bright node on ring */}
        <circle cx={cx} cy={cx * 0.07} r="3.5" fill={color} filter={`url(#glow-${uid})`} />
        <circle cx={cx} cy={cx * 1.93} r="3.5" fill={color2} filter={`url(#glow-${uid})`} />
      </g>

      {/* ── secondary orbit ring (ccw, slightly smaller) ── */}
      <g style={{ transformOrigin: `${cx}px ${cx}px`, animation: "orb-spin-ccw 6s linear infinite" }}>
        <circle
          cx={cx} cy={cx} r={cx * 0.82}
          fill="none"
          stroke={color2}
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="3 14"
          filter={`url(#glow-${uid})`}
        />
        <circle cx={cx} cy={cx * 0.18} r="2.5" fill={color2} filter={`url(#glow-${uid})`} />
      </g>

      {/* ── tertiary thin decorative ring (cw fast) ── */}
      <g style={{ transformOrigin: `${cx}px ${cx}px`, animation: "orb-spin-cw 3.5s linear infinite" }}>
        <circle
          cx={cx} cy={cx} r={cx * 0.72}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.3"
          strokeDasharray="2 20"
        />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   Single Badge
══════════════════════════════════════════════════════ */
interface BadgeProps {
  src: string;
  alt: string;
  href: string;
  label: string;
  /** hex e.g. "#00f2fe" */
  color: string;
  color2: string;
  /** viewport-relative position */
  style: React.CSSProperties;
  /** px for desktop */
  size: number;
  /** px for mobile */
  mobileSize?: number;
  floatDir: "up" | "down";
  delay: number;
  isMobile: boolean;
}

function AvatarBadge({
  src, alt, href, label, color, color2,
  style, size, mobileSize = 90,
  floatDir, delay, isMobile,
}: BadgeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  useSpinCanvas(canvasRef, color, color2);

  const S = isMobile ? mobileSize : size;
  const imgInset = Math.round(S * 0.145);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="pointer-events-auto select-none"
      style={{
        position: "fixed",
        width: S,
        height: S,
        zIndex: 50,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 130, damping: 15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.12, zIndex: 60 }}
    >
      {/* Continuous float */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          animation: floatDir === "up"
            ? `orb-float-up 4s ease-in-out infinite ${delay * 0.3}s`
            : `orb-float-down 5s ease-in-out infinite ${delay * 0.2}s`,
        }}
      >
        {/* Canvas spinning particle dots (behind SVG rings) */}
        <canvas
          ref={canvasRef}
          width={S * 2}
          height={S * 2}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
          }}
        />

        {/* SVG orbit rings */}
        <OrbRings size={S} color={color} color2={color2} />

        {/* Glass backdrop circle */}
        <div
          style={{
            position: "absolute",
            inset: imgInset,
            borderRadius: "50%",
            background: "rgba(5,8,22,0.55)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: `2px solid ${color}99`,
            boxShadow: `
              0 0 20px ${color}88,
              0 0 50px ${color}44,
              inset 0 0 20px ${color}22
            `,
            overflow: "hidden",
          }}
        >
          {/* Profile photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
            draggable={false}
          />
          {/* Holographic colour overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 35% 20%, ${color}33 0%, transparent 55%)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Name label — shown on hover */}
        <motion.div
          style={{
            position: "absolute",
            bottom: -(S * 0.18),
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "#e2e8f0",
            padding: "3px 10px",
            borderRadius: 999,
            background: `${color}22`,
            border: `1px solid ${color}55`,
            backdropFilter: "blur(8px)",
          }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 5 }}
          transition={{ duration: 0.18 }}
        >
          {label}
        </motion.div>
      </div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════
   Root export
══════════════════════════════════════════════════════ */
export default function HeroAvatarOrbs() {
  const { isLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReduced = useReducedMotion();
  useGlobalKeyframes();

  // Track whether the hero section is visible in the viewport
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      {
        // Trigger fade-out as soon as hero is more than 40% scrolled past
        threshold: 0,
        rootMargin: "-40% 0px 0px 0px",
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Hide while preloader is active or user prefers reduced motion
  if (isLoading || prefersReduced) return null;

  /*
   * Keyboard lives in the RIGHT half of the screen at hero state.
   * Desktop positions (vw/vh %) are tuned to the Spline scene's
   * hero-state transform (x:225, y:-100, scale:0.20 @ 1280ref).
   *
   * Mobile: orbs shrink and move to safe spots that don't clash
   * with the hero text column.
   */
  const desktopLinkedin: React.CSSProperties = { top: "38%", right: "6%" };
  const desktopGitHub: React.CSSProperties   = { top: "12%", right: "6%" };
  const mobileLinkedin: React.CSSProperties  = { bottom: "18%", left: "4%"  };
  const mobileGitHub: React.CSSProperties    = { bottom: "18%", right: "4%" };

  return (
    /* pointer-events-none wrapper — each badge enables its own */
    <motion.div
      style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 1001 }}
      animate={{
        opacity: heroVisible ? 1 : 0,
        scale: heroVisible ? 1 : 0.88,
        filter: heroVisible ? "blur(0px)" : "blur(8px)",
      }}
      transition={{
        duration: 0.55,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* ── Real photo (LinkedIn) — right cyan ── */}
      <AvatarBadge
        src="/assets/linkedin-pic.png"
        alt="Yash Kumar – LinkedIn"
        href={config.social.linkedin}
        label="LinkedIn"
        color="#00f2fe"
        color2="#00a8e8"
        style={isMobile ? mobileLinkedin : desktopLinkedin}
        size={148}
        mobileSize={82}
        floatDir="down"
        delay={4.1}
        isMobile={isMobile}
      />

      {/* ── Illustrated avatar (GitHub) — top-right violet ── */}
      <AvatarBadge
        src="/assets/github-pic.jpg"
        alt="Yash Kumar – GitHub"
        href={config.social.github}
        label="GitHub"
        color="#ba55d3"
        color2="#7c3aed"
        style={isMobile ? mobileGitHub : desktopGitHub}
        size={148}
        mobileSize={82}
        floatDir="up"
        delay={4.5}
        isMobile={isMobile}
      />
    </motion.div>
  );
}
