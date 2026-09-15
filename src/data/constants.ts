// thoda zada ts ho gya idhar
export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  PYTHON = "python",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  NPM = "npm",
  FIREBASE = "firebase",
  LINUX = "linux",
  DOCKER = "docker",
  VERCEL = "vercel",
  PYTORCH = "pytorch",
  WORDPRESS = "wordpress",
  VIM = "vim",
  NGINX = "nginx",
  AWS = "aws",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  meme?: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "yeeting code into the DOM since '95, no cap! 💯🚀",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    meme: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXQ1czdvY3B1bnh1ZXFkczVwamVwZ2Zzb213eWZ2bnV2a3lkd2dpMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vzxCxKfLIuYus/giphy.gif",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "JavaScript's overachieving cousin who's always flexing 💯🔒",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    meme: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc203OTdmdDRyZDBoZTltc3R2NWd0OXd0ZXEya3gxc2x6d3Roa3Y4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6HduXFeAC7aW1n16ci/giphy.gif",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription: "the internet's granddad,  still bussin' fr fr! 💀🔥",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    meme: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Zra2dwZmh0bmlzMnRuYWh0NWttaHp4cTdjbHcxdzlodmsyNm1raCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0IyajjbNiRvCr7RC/giphy.gif",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "CSS",
    shortDescription: "styling with the ultimate drip, no cap 💁‍♂️🔥",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    meme: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Zra2dwZmh0bmlzMnRuYWh0NWttaHp4cTdjbHcxdzlodmsyNm1raCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0IyajjbNiRvCr7RC/giphy.gif",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription: `"use using" 
using use = useUsing("use")`,
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    meme: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDFxNXZtM3c5OGdlZmMwd2s5ZjZ0NXFxNXFleWp4MzZxMngwY2JvdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yJFeycRK2DB4c/giphy.gif",
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "the drama queen of front-end frameworks, and we stan! 👑📜",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    meme: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDczemZydzY5dmtoaXVwYWNneWNxNzJpYjZzdTFqZ2p2MGYxMnFnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cwbvB0MXZfnry/giphy.gif",
  },
  [SkillNames.TAILWIND]: {
    id: 8,
    name: "tailwind",
    label: "Tailwind",
    shortDescription: "utility classes hitting different fr fr 🌪️🔥",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    meme: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTRwbDFhM3ZrNXVpeHZibG52eDZzeTJpaTM3dGhqZDdqZXF6M3gyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L3X9GvVhP1nY23Ah6u/giphy.gif",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript said 'sike, I'm backend now', deadass! 🔙🔚",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    meme: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWV0OXl3M2Z2Nzk5ZWEzejE2NGxkYng1MTc1ZGlsYTlhbzFtbzU3MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3k03Ft974KXPAkhnGk/giphy.gif",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "express",
    label: "Express",
    shortDescription: "middlewares go dummy hard, no cap! 🚂💨",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    meme: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmQzZjdpM3plaHhmbW1uNGVuOWJpaDkwaXZ3enBkcGJzbm90N2UwcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GdJz3mScUhC5W/giphy.gif",
  },
  [SkillNames.PYTHON]: {
    id: 11,
    name: "python",
    label: "Python",
    shortDescription: "import antigravity — the OG scripting king 🐍🔥",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 12,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "SQL but make it fashion, purr 💅🐘",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    meme: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM25hdGxieXg5emlkZjVtNnRvNmRzMXh2emx6MG5zNWFpNGN2OWY5ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fcGtso5E3XiMlgj0X7/giphy.gif",
  },
  [SkillNames.MONGODB]: {
    id: 13,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "flexin' with that NoSQL drip, respectfully! 💪🍃",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    meme: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGF4c3hyY3FtZDFvOHNzZjFzbzI0ejFic2M5MzI2amI4YXE5azgyeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/111ebonMs90YLu/giphy.gif",
  },
  [SkillNames.GIT]: {
    id: 14,
    name: "git",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    meme: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmpkZndicTZ0ZG9sMmV0ZTdxeHg4NzUwNjNiaHNsbnBrNmV2NnphayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wijMRo7UZXSqA/giphy.gif",
  },
  [SkillNames.GITHUB]: {
    id: 15,
    name: "github",
    label: "GitHub",
    shortDescription: "sliding into those pull requests, IYKYK! 🐙",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    meme: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc203OTdmdDRyZDBoZTltc3R2NWd0OXd0ZXEya3gxc2x6d3Roa3Y4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6HduXFeAC7aW1n16ci/giphy.gif",
  },
  [SkillNames.NPM]: {
    id: 16,
    name: "npm",
    label: "NPM",
    shortDescription: "package manager said 'I gotchu fam', period! 📦💯",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    meme: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDVlbHQwejFjYnhtdjB0Zjh1a3p5OW5uMDhscmF0b2pvd3ljeG54eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rM17TGfBLhMrK/giphy.gif",
  },
  [SkillNames.FIREBASE]: {
    id: 17,
    name: "firebase",
    label: "Firebase",
    shortDescription:
      "your app's ultimate wingman, but watch out, vendor lock-in vibes! 🔥👌",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    meme: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXppbXd2cmZxcXUwcDF0N2JkamNsemtxYnB6M2E0NTdvaWc5amE2NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a5viI92PAF89q/giphy.gif",
  },
  [SkillNames.LINUX]: {
    id: 18,
    name: "linux",
    label: "Linux",
    shortDescription: "where 'chmod 777' is the ultimate flex 🔓🙌",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    meme: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc203OTdmdDRyZDBoZTltc3R2NWd0OXd0ZXEya3gxc2x6d3Roa3Y4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6HduXFeAC7aW1n16ci/giphy.gif",
  },
  [SkillNames.DOCKER]: {
    id: 19,
    name: "docker",
    label: "Docker",
    shortDescription: "The best containerization! 🐳🔥",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    meme: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmN3M3ZtNnJncmlmZjVwcXVvNTJ3MDdoejUxdGNheDI1amt4dHN1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ENagATV1Gr9eg/giphy.gif",
  },
  [SkillNames.VERCEL]: {
    id: 20,
    name: "vercel",
    label: "Vercel",
    shortDescription:
      "The triangle company, helps you deploy and go touch grass! 🚀🌿",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    meme: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN29wdXIzZWRjY2J0aTJrd2o4ZWVhOGRxOWJuYnJxZmdmaXVpNGZlMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NEvPzZ8bd1V4Y/giphy.gif",
  },
  [SkillNames.PYTORCH]: {
    id: 21,
    name: "pytorch",
    label: "PyTorch",
    shortDescription: "tensors go brrr, deep learning on steroids! 🧠🔥",
    color: "#ee4c2c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  [SkillNames.WORDPRESS]: {
    id: 22,
    name: "wordpress",
    label: "WordPress",
    shortDescription: "5-minute install turned into 5-hour plugin debugging, no cap! 🔌💀",
    color: "#21759b",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
    meme: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHA1bjV3bmhxNDgxOGhldDBqcWN2bHJ4cXozaXFkMWJhODlqZ3VmcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UeT0nnRnkuaUo/giphy.gif",
  },
  [SkillNames.VIM]: {
    id: 23,
    name: "vim",
    label: "Vim",
    shortDescription: "trapped in the terminal forever, `:wq!` is the secret escape key ⌨️🔒",
    color: "#019733",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
    meme: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGFxbmo1amI5YnVveDl4ZG5pZzZ4dXV4Yjhja290czZpcWYxcWxjcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0U6fOIos1YqYcKxFCB/giphy.gif",
  },
  [SkillNames.NGINX]: {
    id: 24,
    name: "nginx",
    label: "Nginx",
    shortDescription: "reverse proxying traffic like a smooth operator, 502 bad gateway who? 🚦⚡",
    color: "#009639",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    meme: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXY5MnA4OHJwNWw4ZDNjNHozM25rM3hrenB2cHI4Mm1wYWU0MGNqaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pGVrRLHRzoRcQ/giphy.gif",
  },
  [SkillNames.AWS]: {
    id: 25,
    name: "aws",
    label: "AWS",
    shortDescription: "S3 bucket left open? cloud bill goes straight to the moon! ☁️💸",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    meme: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXFkcGk1OXZyd3ZvOXl0enozdmpjOW01b3lrYnJnZ254eHVqZnBpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5VKbvrjxpVJCM/giphy.gif",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "May 2026",
    endDate: "Present",
    title: "Open Source Contributor",
    company: "GirlScript Summer of Code (GSSOC '26)",
    description: [
      "Contributing to open-source projects as part of the GirlScript Summer of Code program.",
      "Collaborating with maintainers on real-world codebases, fixing bugs, and implementing new features.",
      "Building community tools and fostering open-source collaboration across multiple repositories.",
      "Developing technical skills through code reviews, pair programming, and mentorship.",
    ],
    skills: [
      SkillNames.JS,
      SkillNames.TS,
      SkillNames.REACT,
      SkillNames.NEXTJS,
      SkillNames.PYTHON,
      SkillNames.GIT,
      SkillNames.GITHUB,
    ],
  },
  {
    id: 2,
    startDate: "Mar 2026",
    endDate: "Present",
    title: "Independent Developer & Builder",
    company: "Self-employed",
    description: [
      "Built RepoOwl — an AI-powered GitHub extension for issue triage and duplicate detection (9 stars, 5 forks).",
      "Shipped NavNER-AI — an AI logistics platform for the North Eastern Region with GIS monitoring and predictive alerts.",
      "Created OmniReceipt-parser, turning physical receipts into structured data using Google Gemini.",
      "Developed VISION_RUSH — a deepfake detection engine using Vision Transformer (ViT-B/14 with DINOv2 backbone).",
    ],
    skills: [
      SkillNames.JS,
      SkillNames.TS,
      SkillNames.NEXTJS,
      SkillNames.REACT,
      SkillNames.PYTHON,
      SkillNames.PYTORCH,
      SkillNames.NODEJS,
      SkillNames.MONGODB,
      SkillNames.VERCEL,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
