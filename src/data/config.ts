const config = {
  title: "Yash Kumar | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Yash Kumar, a full-stack developer and AI/ML enthusiast specializing in intelligent web applications, deepfake detection, and open-source tools. Discover my latest work, including RepoOwl, NavNER-AI, OmniReceipt-parser, and more. Let's build something amazing together!",
    short:
      "Discover the portfolio of Yash Kumar, a full-stack developer building AI-powered tools and innovative web experiences.",
  },
  keywords: [
    "Yash Kumar",
    "portfolio",
    "full-stack developer",
    "AI/ML",
    "data science",
    "web development",
    "RepoOwl",
    "NavNER-AI",
    "OmniReceipt-parser",
    "deepfake detection",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    "open source",
    "GSSOC",
  ],
  author: "Yash Kumar",
  email: "yashkumar02006@gmail.com",
  site: "https://yashkumar.dev",

  // for github stars button
  githubUsername: "YASHK-arch",
  githubRepo: "Portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: "https://www.linkedin.com/in/yash-kumar-836847279/",
    github: "https://github.com/YASHK-arch",
    youtube: "https://www.youtube.com/@beyondyourthoughts",
  },
  discord: {
    serverId: process.env.NEXT_PUBLIC_DISCORD_SERVER_ID || "1549330289933946972",
    channelId: process.env.NEXT_PUBLIC_DISCORD_CHANNEL_ID || "1549330291514933263",
    inviteUrl: "https://discord.gg/pk2hEkJMP",
  },
};
export { config };
