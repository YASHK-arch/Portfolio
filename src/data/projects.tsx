import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
// Spline has no thesvg entry — keep the Three.js mark as its stand-in.
import { SiThreedotjs } from "react-icons/si";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  firebase: brand("Firebase", "firebase-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  // Not in the thesvg registry — keep the text marks.
  gemini: {
    title: "Google Gemini",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">AI</span>,
  },
  pytorch: {
    title: "PyTorch",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">PT</span>,
  },
  dinov2: {
    title: "DINOv2",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">🦕</span>,
  },
  leaflet: {
    title: "Leaflet.js",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">🗺️</span>,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "repoowl",
    category: "AI Developer Tool",
    title: "RepoOwl",
    src: "/assets/projects-screenshots/repoowl/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.gemini,
      ],
    },
    live: "https://repoowl-extension.vercel.app",
    github: "https://github.com/YASHK-arch/RepoOwl-extension",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AI-powered GitHub issue triage & duplicate detection — automate your
            workflow.
          </TypographyP>
          <TypographyP className="font-mono ">
            RepoOwl is an intelligent GitHub extension that automatically triages
            incoming issues, detects duplicates using LLM-driven semantic
            analysis, and surfaces actionable technical insights to keep
            repositories organized. Built with JavaScript, TypeScript, and
            PL/pgSQL, it integrates directly with GitHub&apos;s ecosystem to
            streamline open-source maintenance at scale.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Smart Issue Triage
          </TypographyH3>
          <p className="font-mono mb-2">
            Uses LLM-powered analysis to automatically categorize, label, and
            prioritize incoming issues. Detects duplicate issues through semantic
            similarity, saving maintainers hours of manual review. The system
            learns from repository context to provide increasingly accurate
            triaging over time.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Developer Analytics
          </TypographyH3>
          <p className="font-mono mb-2">
            Surfaces actionable insights about issue patterns, contributor
            activity, and repository health. Provides a dashboard with real-time
            metrics to help maintainers make data-driven decisions about their
            project&apos;s direction.
          </p>
        </div>
      );
    },
  },
  {
    id: "navner-ai",
    category: "AI Logistics Platform",
    title: "NavNER-AI",
    src: "/assets/projects-screenshots/navner/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.leaflet,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.mongo,
        PROJECT_SKILLS.gemini,
      ],
    },
    live: "https://nav-ner-ai.vercel.app",
    github: "https://github.com/YASHK-arch/NavNER-AI",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AI-powered logistics and accessibility intelligence for the North
            Eastern Region.
          </TypographyP>
          <TypographyP className="font-mono ">
            NavNER-AI is a logistics intelligence platform designed for
            India&apos;s challenging North Eastern Region terrain. It features
            real-time GIS monitoring, predictive disruption alerts, and
            offline-first field reporting to ensure resilient supply chains in
            remote and difficult-to-access areas.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Real-time GIS Monitoring
          </TypographyH3>
          <p className="font-mono mb-2">
            Interactive map-based dashboard with real-time tracking of supply
            routes, terrain analysis, and weather-integrated logistics planning.
            Uses Leaflet.js for rich geospatial visualization with custom
            overlays for road conditions and accessibility indices.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Predictive Disruption Alerts
          </TypographyH3>
          <p className="font-mono mb-2">
            AI-driven prediction engine that forecasts potential supply chain
            disruptions due to weather, terrain instability, or infrastructure
            issues. Sends proactive alerts to logistics operators with
            alternative route suggestions, enabling preemptive action.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Offline-first Field Reporting
          </TypographyH3>
          <p className="font-mono mb-2">
            Built for areas with unreliable connectivity — field agents can
            submit ground-truth reports offline. Data syncs automatically when a
            connection is restored, ensuring continuous coverage even in the most
            remote regions.
          </p>
        </div>
      );
    },
  },
  {
    id: "omnireceipt",
    category: "AI Utility",
    title: "OmniReceipt Parser",
    src: "/assets/projects-screenshots/omnireceipt/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [PROJECT_SKILLS.gemini, PROJECT_SKILLS.node],
    },
    live: "#",
    github: "https://github.com/YASHK-arch/OmniReceipt-parser",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Turn physical receipts into structured data instantly — powered by
            Google Gemini.
          </TypographyP>
          <TypographyP className="font-mono ">
            OmniReceipt-parser converts messy, crumpled receipts into clean,
            structured JSON data. Built with Next.js and Google Gemini&apos;s
            vision capabilities, it features built-in edge-case handling for
            faded text, partial receipts, and unusual formats, with detailed
            analysis logs for debugging.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            AI-Powered Extraction
          </TypographyH3>
          <p className="font-mono mb-2">
            Leverages Google Gemini&apos;s multimodal capabilities to extract
            line items, totals, tax breakdowns, dates, and merchant information
            from receipt images. Handles a wide variety of receipt formats
            including thermal prints, handwritten notes, and digital receipts.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Edge-Case Handling & Logs
          </TypographyH3>
          <p className="font-mono mb-2">
            Robust error handling for faded ink, partially visible text,
            crumpled paper, and multi-language receipts. Every extraction
            produces detailed analysis logs showing confidence scores and
            parsing decisions.
          </p>
        </div>
      );
    },
  },
  {
    id: "vision-rush",
    category: "AI / Computer Vision",
    title: "VISION RUSH",
    src: "/assets/projects-screenshots/visionrush/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.pytorch,
        PROJECT_SKILLS.dinov2,
      ],
    },
    live: "#",
    github:
      "https://github.com/YASHK-arch/VISION_RUSH-Deepfake-Detection-Engine",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Self-trained deepfake video detection using Vision Transformer with
            DINOv2 backbone.
          </TypographyP>
          <TypographyP className="font-mono ">
            VISION_RUSH is a deepfake detection engine built from scratch using
            a Vision Transformer (ViT-B/14) with a DINOv2 self-supervised
            backbone. The model is trained on a curated dataset of real and
            synthetically generated face videos to distinguish authentic footage
            from AI-generated deepfakes with high accuracy.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Vision Transformer Architecture
          </TypographyH3>
          <p className="font-mono mb-2">
            Uses ViT-B/14 with DINOv2 self-supervised pre-training as the
            backbone, fine-tuned on deepfake detection. The transformer
            architecture excels at capturing subtle facial inconsistencies that
            CNNs often miss — micro-expressions, lighting anomalies, and
            boundary artifacts around synthesized facial regions.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Training Pipeline
          </TypographyH3>
          <p className="font-mono mb-2">
            End-to-end PyTorch training pipeline with face extraction,
            augmentation, and frame sampling strategies optimized for video-level
            prediction. Includes evaluation metrics, confusion matrices, and
            per-frame confidence visualization for interpretable results.
          </p>
        </div>
      );
    },
  },
  {
    id: "flavourly",
    category: "Web Application",
    title: "FLAVOURLY",
    src: "/assets/projects-screenshots/flavourly/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.react,
      ],
      backend: [],
    },
    live: "#",
    github: "https://github.com/YASHK-arch/FLAVOURLY",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A modern recipe discovery application powered by TheMealDB.
          </TypographyP>
          <TypographyP className="font-mono ">
            FLAVOURLY is an interactive recipe discovery app built with React and Vite. It allows users to search for meals by title or ingredients, filter for vegetarian options, and manage their favorite recipes with persistent local storage.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Dynamic Recipe Discovery
          </TypographyH3>
          <p className="font-mono mb-2">
            Features real-time search capabilities, simultaneously querying both meal titles and specific ingredients across the comprehensive TheMealDB API. Includes responsive design and detailed full-screen modal overlays for viewing recipe instructions and ingredients.
          </p>
        </div>
      );
    },
  },
  {
    id: "algogate",
    category: "EdTech Platform",
    title: "AlgoGATE",
    src: "/assets/projects-screenshots/algogate/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.firebase,
      ],
    },
    live: "https://YASHK-arch.github.io/AlgoGATE",
    github: "https://github.com/YASHK-arch/AlgoGATE",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A specialized coding practice platform for GATE DA candidates.
          </TypographyP>
          <TypographyP className="font-mono ">
            AlgoGATE is an integrated practice platform tailored for the GATE Data Science and Artificial Intelligence (DA) syllabus. It merges curated algorithmic challenges with Codeforces synchronization, interactive study notes, real-time discussions, and progress tracking, providing an all-in-one preparation ecosystem.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Codeforces Synchronization
          </TypographyH3>
          <p className="font-mono mb-2">
            Auto-detects and seamlessly syncs problems solved on Codeforces into AlgoGATE's progress tracking system. Generates a unified, GitHub-style activity heatmap reflecting your combined solving streaks across platforms.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Real-time Discussions & Tracking
          </TypographyH3>
          <p className="font-mono mb-2">
            Engage in per-problem discussion threads powered by real-time Firestore synchronization. Track topic-wise mastery, visualize statistics through interactive dashboards, and organize study sessions using the built-in calendar planner.
          </p>
        </div>
      );
    },
  },
];
export default projects;
