"use client";
import { motion } from "motion/react";
import Link from "next/link";
import styles from "./style.module.scss";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { config } from "@/data/config";
import OnlineUsers from "../realtime/online-users";
import { GitHubStarsButton } from "../ui/shadcn-io/github-stars-button";
import PokeballMenu from "../pokeball-menu/pokeball-menu";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {

  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in z-[9999]",
        "flex flex-col bg-transparent"
      )}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{
        delay: loader ? 3.5 : 0,
        duration: 0.8,
      }}
    >
      <div className="flex w-full items-center justify-between px-4">
        {/* Left: Author + Profile Avatars */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant={"link"} className="text-md px-0 font-black tracking-widest uppercase">
              {config.author}
            </Button>
          </Link>

          {/* Profile Image Avatars */}
          <div className={styles.avatarGroup}>
            {/* LinkedIn Avatar */}
            <motion.a
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.avatarWrapper, styles.linkedinAvatar)}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: loader ? 4.0 : 0.3,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              title="LinkedIn Profile"
            >
              <div className={styles.avatar}>
                <img
                  src="/assets/linkedin-pic.png"
                  alt="Yash Kumar - LinkedIn"
                  className={styles.avatarImg}
                />
              </div>
            </motion.a>

            {/* GitHub Avatar */}
            <motion.a
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.avatarWrapper, styles.githubAvatar)}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: loader ? 4.2 : 0.5,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              title="GitHub Profile"
            >
              <div className={styles.avatar}>
                <img
                  src="/assets/github-pic.jpg"
                  alt="Yash Kumar - GitHub"
                  className={styles.avatarImg}
                />
              </div>
            </motion.a>
          </div>
        </div>

        {/* Right: Actions (Order: 1. Chat Box, 2. GitHub Stars, 3. Menu Toggle) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* 1. Discord Chat / Online Users Icon */}
          <OnlineUsers />

          {/* 3. GitHub Stars Button */}
          {config.githubUsername && config.githubRepo && (
            <GitHubStarsButton
              username={config.githubUsername}
              repo={config.githubRepo}
            />
          )}

          {/* 4. Pokeball Menu Button */}
          <PokeballMenu />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
