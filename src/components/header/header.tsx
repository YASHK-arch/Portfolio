"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { config } from "@/data/config";
import OnlineUsers from "../realtime/online-users";
import { GitHubStarsButton } from "../ui/shadcn-io/github-stars-button";
import { links } from "./config";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const isHome = usePathname() === "/";
  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in z-[1000]",
        "flex items-center"
      )}
      style={{
        background: "hsl(var(--background) / .8)",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0, // 3.5 for loading, .5 can be added for delay
        duration: 0.8,
      }}
    >
      <div className="flex w-full items-center justify-between px-4">
        {/* Left: Author */}
        <div className="flex items-center">
          <Link href="/">
            <Button variant={"link"} className="text-md px-0">
              {config.author}
            </Button>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-sm font-medium hover:opacity-70 transition-opacity"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center">
          <FunnyThemeToggle className="w-6 h-6 mr-4 hidden md:flex" />
          {isHome && process.env.NEXT_PUBLIC_WS_URL && <OnlineUsers />}
          {config.githubUsername && config.githubRepo && (
            <GitHubStarsButton
              username={config.githubUsername}
              repo={config.githubRepo}
            />
          )}
        </div>
      </div>

      {/* Cloudy fade at the bottom of the navbar */}
      <div className="absolute top-full left-0 right-0 h-12 bg-[hsl(var(--background)/.8)] backdrop-blur-[12px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] pointer-events-none -z-10" />
    </motion.header>
  );
};

export default Header;
