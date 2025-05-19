type ResourceCategory = "article" | "documentation" | "tool" | "video" | "book" | "other";
export interface Resource {
  title: string;
  link: string;
  description: string;
  category: ResourceCategory;
  icon?: string;
}

export const resources: Resource[] = [
  {
    title: "Download Free Books (Anna's Archive)",
    link: "https://annas-archive.org",
    description: "A vast digital library offering free access to books, papers, and publications for educational purposes.",
    category: "tool"
  },
  {
    title: "Curated Resources for Software Engineering",
    link: "https://wdesert.notion.site/wdesert/Curated-Resources-e37b0646f3f14a7aa32d092bd7a71ce0",
    description: "A comprehensive collection of handpicked resources for software engineering, including tutorials, tools, and guides.",
    category: "documentation"
  },
  {
    title: "Software Engineering Roadmaps",
    link: "https://roadmap.sh",
    description: "Interactive learning paths and roadmaps for various software engineering roles and technologies.",
    category: "tool"
  },
  {
    title: "GPU Glossary",
    link: "https://modal.com/gpu-glossary",
    description: "A detailed glossary explaining key terms and concepts related to GPU technology and computing.",
    category: "documentation"
  },
  {
    title: "Explore Any Compiler",
    link: "https://godbolt.org",
    description: "An online tool for exploring and comparing compiler outputs for multiple programming languages.",
    category: "tool"
  },
  {
    title: "Linux Starter",
    link: "https://www.wikitechy.com/tutorials/linux/linux-tutorial#topic1",
    description: "A beginner-friendly tutorial covering the basics of Linux, including commands and system navigation.",
    category: "article"
  },
  {
    title: "Quant Interview Questions",
    link: "https://openquant.co/questions",
    description: "A collection of quantitative finance interview questions to prepare for technical roles in the industry.",
    category: "documentation"
  },
  {
    title: "Typescript Essentials",
    link: "https://www.totaltypescript.com/books/total-typescript-essentials",
    description: "A comprehensive guide to mastering TypeScript, covering core concepts and best practices.",
    category: "book"
  },
  {
    title: "Prof John Ousterhout's Courses",
    link: "https://web.stanford.edu/~ouster/cgi-bin/home.php",
    description: "Access to course materials and lectures from Stanford professor John Ousterhout on software design and systems.",
    category: "documentation"
  },
  {
    title: "Google's Material Design",
    link: "https://m3.material.io",
    description: "Official documentation for Google's Material Design system, offering guidelines for UI/UX development.",
    category: "documentation"
  },
  {
    title: "Game Engine Programming",
    link: "https://engine-programming.github.io",
    description: "A resource hub for learning game engine development, with tutorials and technical insights.",
    category: "documentation"
  },
  {
    title: "Little Book on OS Development",
    link: "https://littleosbook.github.io",
    description: "A concise guide to operating system development, covering key concepts and practical implementation.",
    category: "documentation"
  },
  {
    title: "Technical Guide To System Calls: Implementation And Signal Handling In Modern OS",
    link: "https://mohitmishra786.github.io/chessman/2025/03/31/Technical-Guide-to-System-Calls-Implementation-and-Signal-Handling-in-Modern-Operating-Systems.html",
    description: "An in-depth article on system calls and signal handling in modern operating systems.",
    category: "article"
  },
  {
    title: "MOJO GPU Puzzles",
    link: "https://builds.modular.com/puzzles",
    description: "Interactive puzzles designed to teach GPU programming concepts using the MOJO framework.",
    category: "tool"
  },
  {
    title: "Architecture of Open Source Applications",
    link: "https://aosabook.org",
    description: "A book series exploring the architecture and design of notable open-source software projects.",
    category: "documentation"
  },
  {
    title: "Introduction to the Theory of Computation from Bits & Gates to C/C++ & Beyond",
    link: "https://icourse.club/uploads/files/96a2b94d4be48285f2605d843a1e6db37da9a944.pdf",
    description: "A PDF textbook covering computational theory, from logic gates to advanced programming concepts.",
    category: "documentation"
  },
  {
    title: "The Book of Shaders",
    link: "https://thebookofshaders.com/",
    description: "An interactive guide to learning shader programming for graphics and visual effects.",
    category: "documentation"
  },
  {
    title: "Freya Holmer's Math Visualizations",
    link: "https://acegikmo.com/mathvis/index.html",
    description: "A collection of visual and interactive explanations of mathematical concepts for programmers and artists.",
    category: "video"
  }, {
    title: "Interfacing Between Odin & C",
    category: "video",
    link: "",
    description: "A video series on interfacing between Odin and C, covering practical examples and use cases.",
  }
];