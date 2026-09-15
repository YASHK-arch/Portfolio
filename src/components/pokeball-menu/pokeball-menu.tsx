"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/components/header/config";
import { cn } from "@/lib/utils";
import styles from "./pokeball-menu.module.css";

const PokeballMenu = () => {
  const [open, setOpen] = useState(false);
  const [currentHref, setCurrentHref] = useState("/");
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname: path, hash } = window.location;
    setCurrentHref(path + hash);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  return (
    <div className={styles.container} ref={ref}>
      {/* Pokeball button */}
      <div
        className={styles.ball}
        role="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <motion.div
          className={cn(styles.half, styles.halfTop)}
          animate={open ? "open" : "closed"}
          variants={{
            closed: { rotate: 0, y: 0, opacity: 1 },
            open: { rotate: -34, y: -7, opacity: 0.85 },
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 18,
          }}
          style={{ transformOrigin: "50% 100%" }}
        />
        <motion.div
          className={cn(styles.half, styles.halfBottom)}
          animate={open ? "open" : "closed"}
          variants={{
            closed: { rotate: 0, y: 0, opacity: 1 },
            open: { rotate: 34, y: 7, opacity: 0.85 },
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 18,
          }}
          style={{ transformOrigin: "50% 0%" }}
        />
        <div className={styles.band} />
        <motion.div
          className={styles.btn}
          animate={open ? "open" : "closed"}
          variants={{
            closed: { scale: 1 },
            open: { scale: 1.25 },
          }}
        />
      </div>

      {/* Popup menu list */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.menu}
            initial={{ opacity: 0, scale: 0.86, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <div className={styles.menuHead}>
              <span className={styles.miniBall} />
              <span className={styles.menuTitle}>Gotta catch the menu</span>
            </div>

            <nav className={styles.list}>
              {links.map((link, i) => {
                const active = currentHref === link.href;
                return (
                  <motion.div
                    key={`pkm_${i}`}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      target={link.target}
                      onClick={() => setOpen(false)}
                      className={cn(
                        styles.linkItem,
                        active && styles.linkItemActive
                      )}
                    >
                      <span className={styles.pokeballDot} />
                      {link.title}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PokeballMenu;