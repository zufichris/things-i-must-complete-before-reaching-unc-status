export const roadmapData =[
  {
    "id": "votesphere",
    "title": "VoteSphere",
    "category": "Web Applications",
    "description": "A decentralized voting platform with blockchain verification",
    "duration": "8 weeks",
    "prerequisites": [],
    "phases": [
      {
        "title": "Planning",
        "description": "Define project scope and requirements",
        "tasks": [
          "Research existing voting platforms",
          "Define key features and user stories",
          "Create wireframes and mockups",
          "Set up project repository and documentation",
          "Plan database schema"
        ]
      },
      {
        "title": "Backend Development",
        "description": "Build the server-side components",
        "tasks": [
          "Set up Node.js/Express server",
          "Implement user authentication",
          "Create RESTful API endpoints",
          "Develop blockchain verification system",
          "Write unit tests for backend functionality"
        ]
      },
      {
        "title": "Frontend Development",
        "description": "Create the user interface",
        "tasks": [
          "Set up React application with TypeScript",
          "Implement responsive UI components",
          "Connect frontend to backend API",
          "Create voting interface with real-time updates",
          "Implement admin dashboard"
        ]
      },
      {
        "title": "Deployment & Testing",
        "description": "Finalize and deploy the application",
        "tasks": [
          "Perform end-to-end testing",
          "Optimize performance",
          "Deploy to cloud platform",
          "Set up CI/CD pipeline",
          "Document deployment process"
        ]
      }
    ]
  },
  {
    "id": "chainforge",
    "title": "ChainForge",
    "category": "Blockchain",
    "description": "A framework for building and deploying smart contracts",
    "duration": "10 weeks",
    "prerequisites": ["votesphere"],
    "phases": [
      {
        "title": "Research",
        "description": "Explore blockchain technologies and smart contract platforms",
        "tasks": [
          "Compare Ethereum, Solana, and other blockchain platforms",
          "Research smart contract security best practices",
          "Analyze existing smart contract frameworks",
          "Define framework architecture",
          "Create technical specification"
        ]
      },
      {
        "title": "Core Development",
        "description": "Build the core framework components",
        "tasks": [
          "Develop smart contract templates",
          "Create contract compilation pipeline",
          "Implement testing framework",
          "Build deployment utilities",
          "Develop contract interaction library"
        ]
      },
      {
        "title": "Tools & Integration",
        "description": "Create developer tools and integrations",
        "tasks": [
          "Build CLI tool for contract management",
          "Develop VS Code extension",
          "Create documentation generator",
          "Implement monitoring dashboard",
          "Build API for third-party integrations"
        ]
      },
      {
        "title": "Documentation & Release",
        "description": "Prepare framework for public release",
        "tasks": [
          "Write comprehensive documentation",
          "Create tutorial and example projects",
          "Perform security audit",
          "Set up project website",
          "Prepare for open-source release"
        ]
      }
    ]
  },
  {
    "id": "worldcraft",
    "title": "WorldCraft",
    "category": "Game Development",
    "description": "A procedural world generation engine for games",
    "duration": "12 weeks",
    "prerequisites": [],
    "phases": [
      {
        "title": "Engine Design",
        "description": "Design the core architecture of the generation engine",
        "tasks": [
          "Research procedural generation algorithms",
          "Define engine architecture and components",
          "Create technical specification",
          "Design plugin system",
          "Plan performance optimization strategies"
        ]
      },
      {
        "title": "Core Systems",
        "description": "Implement the fundamental generation systems",
        "tasks": [
          "Develop terrain generation system",
          "Implement biome distribution algorithm",
          "Create river and water body generation",
          "Build vegetation placement system",
          "Develop climate simulation"
        ]
      },
      {
        "title": "Advanced Features",
        "description": "Add complex generation features",
        "tasks": [
          "Implement settlement generation",
          "Create road and path network system",
          "Develop cave and underground structure generation",
          "Build resource distribution algorithm",
          "Implement history and lore generation"
        ]
      },
      {
        "title": "Integration & Tools",
        "description": "Create tools and engine integrations",
        "tasks": [
          "Develop Unity integration",
          "Create Unreal Engine plugin",
          "Build standalone world editor",
          "Implement export formats for various engines",
          "Create visualization and debugging tools"
        ]
      }
    ]
  },
  {
    "id": "shopsense",
    "title": "ShopSense",
    "category": "AI Applications",
    "description": "AI-Driven E-Commerce Personalization Engine",
    "duration": "10 weeks",
    "prerequisites": [],
    "phases": [
      {
        "title": "Data Architecture",
        "description": "Design the data collection and processing pipeline",
        "tasks": [
          "Define data schema for user behavior tracking",
          "Create data ingestion pipeline",
          "Implement data cleaning and preprocessing",
          "Design feature extraction system",
          "Set up data warehousing solution"
        ]
      },
      {
        "title": "AI Model Development",
        "description": "Build and train recommendation models",
        "tasks": [
          "Develop collaborative filtering algorithm",
          "Implement content-based recommendation system",
          "Create hybrid recommendation model",
          "Build real-time personalization engine",
          "Develop A/B testing framework"
        ]
      },
      {
        "title": "API & Integration",
        "description": "Create APIs and integration points",
        "tasks": [
          "Design RESTful API for recommendations",
          "Implement webhook system for events",
          "Create SDK for e-commerce platforms",
          "Build admin dashboard for configuration",
          "Develop analytics reporting system"
        ]
      },
      {
        "title": "Optimization & Scaling",
        "description": "Optimize performance and prepare for scale",
        "tasks": [
          "Implement caching strategy",
          "Optimize model inference time",
          "Set up auto-scaling infrastructure",
          "Perform load testing",
          "Implement monitoring and alerting"
        ]
      }
    ]
  },
  {
    "id": "healthlink",
    "title": "HealthLink",
    "category": "Healthcare",
    "description": "Telemedicine Platform with AI Diagnostics",
    "duration": "14 weeks",
    "prerequisites": ["shopsense"],
    "phases": [
      {
        "title": "Requirements & Compliance",
        "description": "Define requirements and ensure regulatory compliance",
        "tasks": [
          "Research healthcare regulations (HIPAA, GDPR)",
          "Define security and privacy requirements",
          "Create system architecture diagram",
          "Develop compliance documentation",
          "Plan data retention and protection strategies"
        ]
      },
      {
        "title": "Core Platform",
        "description": "Build the telemedicine platform foundation",
        "tasks": [
          "Implement secure user authentication",
          "Develop patient and doctor portals",
          "Create appointment scheduling system",
          "Build secure video consultation feature",
          "Implement electronic health records system"
        ]
      },
      {
        "title": "AI Diagnostics",
        "description": "Develop AI-powered diagnostic tools",
        "tasks": [
          "Collect and preprocess medical imaging datasets",
          "Train diagnostic models for common conditions",
          "Implement symptom analysis system",
          "Create diagnostic suggestion engine",
          "Develop medical report generation"
        ]
      },
      {
        "title": "Mobile & Integration",
        "description": "Extend platform to mobile and integrate with existing systems",
        "tasks": [
          "Develop iOS and Android applications",
          "Implement push notifications for appointments",
          "Create integration with pharmacy systems",
          "Build API for medical device integration",
          "Develop offline functionality for remote areas"
        ]
      }
    ]
  },
  {
    "id": "mythicforge",
    "title": "MythicForge",
    "category": "Game Development",
    "description": "Procedural Open-World Game Engine",
    "duration": "16 weeks",
    "prerequisites": ["worldcraft"],
    "phases": [
      {
        "title": "Engine Architecture",
        "description": "Design and implement core engine architecture",
        "tasks": [
          "Design entity component system",
          "Implement rendering pipeline",
          "Create physics simulation system",
          "Develop audio engine",
          "Build input handling system"
        ]
      },
      {
        "title": "World Generation",
        "description": "Create procedural world generation systems",
        "tasks": [
          "Implement terrain generation algorithms",
          "Develop biome and ecosystem simulation",
          "Create weather and climate systems",
          "Build flora and fauna generation",
          "Implement day/night cycle and celestial bodies"
        ]
      },
      {
        "title": "AI & Simulation",
        "description": "Develop AI and simulation systems",
        "tasks": [
          "Create NPC behavior system",
          "Implement pathfinding and navigation",
          "Develop economy and resource simulation",
          "Build faction and relationship systems",
          "Implement procedural quest generation"
        ]
      },
      {
        "title": "Tools & Workflow",
        "description": "Create development tools and workflow",
        "tasks": [
          "Build world editor and visualization tools",
          "Implement asset pipeline and management",
          "Create debugging and profiling tools",
          "Develop scripting system for game logic",
          "Build modding support and documentation"
        ]
      }
    ]
  },
  {
    "id": "greentrade",
    "title": "GreenTrade",
    "category": "Blockchain",
    "description": "Sustainable Energy Trading Platform",
    "duration": "12 weeks",
    "prerequisites": ["chainforge"],
    "phases": [
      {
        "title": "Market Research",
        "description": "Research energy markets and blockchain integration",
        "tasks": [
          "Analyze existing energy trading platforms",
          "Research renewable energy certification",
          "Study energy market regulations",
          "Identify key stakeholders and user needs",
          "Define platform requirements and constraints"
        ]
      },
      {
        "title": "Blockchain Development",
        "description": "Develop blockchain infrastructure for energy trading",
        "tasks": [
          "Design energy credit tokenization system",
          "Implement smart contracts for trading",
          "Create verification and certification system",
          "Develop consensus mechanism for energy validation",
          "Build secure wallet and key management"
        ]
      },
      {
        "title": "Trading Platform",
        "description": "Build the trading platform interface and backend",
        "tasks": [
          "Develop real-time trading interface",
          "Implement order matching engine",
          "Create energy production and consumption tracking",
          "Build analytics and reporting dashboard",
          "Implement automated trading strategies"
        ]
      },
      {
        "title": "Integration & Deployment",
        "description": "Integrate with energy systems and deploy platform",
        "tasks": [
          "Develop IoT device integration for energy metering",
          "Create API for grid operators and utilities",
          "Implement regulatory compliance reporting",
          "Build mobile application for monitoring",
          "Deploy and test on production environment"
        ]
      }
    ]
  },
  {
    "id": "storyforge",
    "title": "StoryForge",
    "category": "AI Applications",
    "description": "AI-Powered Content Creation Platform",
    "duration": "10 weeks",
    "prerequisites": ["shopsense"],
    "phases": [
      {
        "title": "AI Model Development",
        "description": "Develop and train content generation models",
        "tasks": [
          "Fine-tune large language models for creative writing",
          "Train image generation models for illustrations",
          "Develop style transfer algorithms for visual content",
          "Create character and plot development models",
          "Implement content quality evaluation system"
        ]
      },
      {
        "title": "Creation Tools",
        "description": "Build intuitive content creation tools",
        "tasks": [
          "Develop collaborative text editor with AI assistance",
          "Create image generation and editing interface",
          "Implement storyboarding and narrative planning tools",
          "Build character development workshop",
          "Develop world-building and lore management system"
        ]
      },
      {
        "title": "Publishing & Distribution",
        "description": "Create publishing and distribution platform",
        "tasks": [
          "Implement content management system",
          "Build audience targeting and analytics",
          "Develop monetization and royalty tracking",
          "Create multi-format export (ebook, audio, print)",
          "Implement content protection and rights management"
        ]
      },
      {
        "title": "Community & Collaboration",
        "description": "Build community and collaboration features",
        "tasks": [
          "Develop user profiles and portfolios",
          "Implement feedback and review system",
          "Create collaborative project management",
          "Build community challenges and prompts",
          "Develop mentorship and learning resources"
        ]
      }
    ]
  },
  {
    "id": "rayforge",
    "title": "RayForge",
    "category": "Graphics",
    "description": "Real-Time Ray Tracing Renderer",
    "duration": "14 weeks",
    "prerequisites": [],
    "phases": [
      {
        "title": "Core Architecture",
        "description": "Design and implement core rendering architecture",
        "tasks": [
          "Design renderer architecture and pipeline",
          "Implement basic ray tracing algorithm",
          "Develop acceleration structure (BVH, KD-tree)",
          "Create material system and BRDF implementation",
          "Build scene graph and object management"
        ]
      },
      {
        "title": "Advanced Features",
        "description": "Implement advanced rendering techniques",
        "tasks": [
          "Develop global illumination algorithms",
          "Implement denoising filters",
          "Create physically-based materials",
          "Build volumetric lighting and participating media",
          "Implement subsurface scattering"
        ]
      },
      {
        "title": "Optimization",
        "description": "Optimize for real-time performance",
        "tasks": [
          "Implement GPU acceleration (CUDA, OptiX)",
          "Develop hybrid rasterization/ray tracing pipeline",
          "Create level-of-detail system",
          "Implement temporal reprojection and caching",
          "Optimize memory usage and data structures"
        ]
      },
      {
        "title": "Integration & Tools",
        "description": "Create tools and engine integrations",
        "tasks": [
          "Develop integration with popular game engines",
          "Build material editor and node-based shader system",
          "Create scene setup and lighting tools",
          "Implement profiling and debugging utilities",
          "Develop documentation and examples"
        ]
      }
    ]
  },
  {
    "id": "cosmocraft",
    "title": "CosmoCraft",
    "category": "Graphics",
    "description": "Procedural Planet Generator",
    "duration": "12 weeks",
    "prerequisites": ["rayforge", "worldcraft"],
    "phases": [
      {
        "title": "Core Systems",
        "description": "Develop core planetary generation systems",
        "tasks": [
          "Implement spherical terrain generation",
          "Create tectonic plate simulation",
          "Develop climate and weather systems",
          "Build ocean and water simulation",
          "Implement erosion and geological processes"
        ]
      },
      {
        "title": "Ecosystems & Life",
        "description": "Create ecosystem and life generation",
        "tasks": [
          "Develop biome distribution algorithm",
          "Create procedural flora generation",
          "Implement fauna and ecosystem simulation",
          "Build evolutionary system for species development",
          "Create alien life form generator"
        ]
      },
      {
        "title": "Civilization & Structures",
        "description": "Implement civilization and structure generation",
        "tasks": [
          "Develop intelligent species simulation",
          "Create city and settlement generation",
          "Implement transportation network algorithms",
          "Build architectural style generator",
          "Develop historical simulation for ruins and artifacts"
        ]
      },
      {
        "title": "Rendering & Visualization",
        "description": "Create rendering and visualization systems",
        "tasks": [
          "Implement atmospheric scattering",
          "Develop cloud and weather visualization",
          "Create level-of-detail system for planet viewing",
          "Build interactive exploration interface",
          "Implement VR support for immersive exploration"
        ]
      }
    ]
  },
  {
    "id": "graviton",
    "title": "Graviton",
    "category": "Physics Simulation",
    "description": "Interactive Spacetime Curvature Simulator",
    "duration": "10 weeks",
    "prerequisites": ["rayforge"],
    "phases": [
      {
        "title": "Physics Engine",
        "description": "Develop relativistic physics simulation engine",
        "tasks": [
          "Implement general relativity equations",
          "Create spacetime metric solver",
          "Develop geodesic calculation system",
          "Build gravitational wave simulation",
          "Implement N-body simulation with relativistic effects"
        ]
      },
      {
        "title": "Visualization",
        "description": "Create visualization systems for relativistic effects",
        "tasks": [
          "Develop light ray tracing in curved spacetime",
          "Implement gravitational lensing visualization",
          "Create event horizon and black hole rendering",
          "Build time dilation and length contraction effects",
          "Develop interactive reference frames"
        ]
      },
      {
        "title": "Interactive Tools",
        "description": "Build interactive tools for exploration and learning",
        "tasks": [
          "Create mass and energy distribution editor",
          "Implement interactive observer positioning",
          "Develop scenario creation and management",
          "Build measurement and analysis tools",
          "Create guided educational scenarios"
        ]
      },
      {
        "title": "Scientific Validation",
        "description": "Validate simulation against known physics",
        "tasks": [
          "Implement validation against analytical solutions",
          "Create comparison with observational data",
          "Develop error analysis and visualization",
          "Build benchmark suite for accuracy testing",
          "Create documentation of physical models and limitations"
        ]
      }
    ]
  },
  {
    "id": "nanokernel",
    "title": "NanoKernel",
    "category": "Systems Programming",
    "description": "Lightweight Operating System Kernel",
    "duration": "16 weeks",
    "prerequisites": [],
    "phases": [
      {
        "title": "Architecture & Boot",
        "description": "Develop architecture support and boot process",
        "tasks": [
          "Implement multiarchitecture support (x86_64, ARM64)",
          "Create bootloader and early initialization",
          "Develop memory management and paging",
          "Implement interrupt handling system",
          "Build CPU and hardware detection"
        ]
      },
      {
        "title": "Core Kernel",
        "description": "Implement core kernel functionality",
        "tasks": [
          "Develop process and thread management",
          "Create scheduler and context switching",
          "Implement synchronization primitives",
          "Build virtual memory system",
          "Develop system call interface"
        ]
      },
      {
        "title": "Drivers & Hardware",
        "description": "Create driver framework and hardware support",
        "tasks": [
          "Implement device driver framework",
          "Develop basic device drivers (disk, network, display)",
          "Create file system implementation",
          "Build USB and peripheral support",
          "Implement power management"
        ]
      },
      {
        "title": "User Space & Tools",
        "description": "Develop user space environment and tools",
        "tasks": [
          "Create basic shell and command-line utilities",
          "Implement standard library for applications",
          "Develop package management system",
          "Build development tools and compiler support",
          "Create documentation and tutorials"
        ]
      }
    ]
  },
  {
    "id": "netforge",
    "title": "NetForge",
    "category": "Systems Programming",
    "description": "High-Performance Network Protocol Stack",
    "duration": "12 weeks",
    "prerequisites": ["nanokernel"],
    "phases": [
      {
        "title": "Core Architecture",
        "description": "Design and implement core network stack architecture",
        "tasks": [
          "Design modular protocol architecture",
          "Implement zero-copy buffer management",
          "Create async I/O and event handling",
          "Develop packet processing pipeline",
          "Build protocol state machine framework"
        ]
      },
      {
        "title": "Protocol Implementation",
        "description": "Implement network protocols",
        "tasks": [
          "Develop Ethernet and link layer protocols",
          "Implement IPv4/IPv6 stack",
          "Create TCP with advanced congestion control",
          "Build UDP and QUIC implementations",
          "Develop DNS, DHCP, and network services"
        ]
      },
      {
        "title": "Performance Optimization",
        "description": "Optimize for high performance",
        "tasks": [
          "Implement kernel bypass (DPDK, netmap)",
          "Create lock-free data structures",
          "Develop CPU affinity and NUMA awareness",
          "Build hardware offloading support",
          "Implement advanced congestion control algorithms"
        ]
      },
      {
        "title": "Tools & Applications",
        "description": "Create networking tools and applications",
        "tasks": [
          "Develop network monitoring and analysis tools",
          "Create performance benchmarking suite",
          "Build protocol fuzzing and testing framework",
          "Implement example applications (web server, proxy)",
          "Create documentation and API reference"
        ]
      }
    ]
  },
  {
    "id": "iotforge",
    "title": "IoTForge",
    "category": "Systems Programming",
    "description": "Embedded IoT Framework",
    "duration": "10 weeks",
    "prerequisites": ["netforge"],
    "phases": [
      {
        "title": "Core Framework",
        "description": "Develop core embedded framework",
        "tasks": [
          "Create hardware abstraction layer",
          "Implement real-time scheduler",
          "Develop power management system",
          "Build memory-constrained runtime",
          "Implement secure boot and firmware update"
        ]
      },
      {
        "title": "Connectivity",
        "description": "Implement connectivity and protocols",
        "tasks": [
          "Develop lightweight network stack",
          "Implement IoT protocols (MQTT, CoAP)",
          "Create Bluetooth LE and Thread support",
          "Build secure communication layer",
          "Implement mesh networking capabilities"
        ]
      },
      {
        "title": "Security",
        "description": "Implement security features",
        "tasks": [
          "Develop secure element integration",
          "Create cryptographic library for constrained devices",
          "Implement secure storage and key management",
          "Build authentication and authorization framework",
          "Develop threat detection and monitoring"
        ]
      },
      {
        "title": "Tools & Integration",
        "description": "Create development tools and cloud integration",
        "tasks": [
          "Build device management platform",
          "Develop OTA update system",
          "Create debugging and monitoring tools",
          "Implement cloud service integration",
          "Build example applications and documentation"
        ]
      }
    ]
  },
  {
    "id": "keyvault",
    "title": "KeyVault",
    "category": "Data Structures & Algorithms",
    "description": "A high-performance in-memory key-value store with B+ trees and LSM trees, designed to master DSA and lock in your 10x developer grind.",
    "duration": "8 weeks",
    "prerequisites": ["nanokernel"],
    "phases": [
      {
        "title": "Planning & Open-Source Study",
        "description": "Define the store’s scope and analyze Redis for indexing insights.",
        "tasks": [
          "Research B+ trees and LSM trees (LevelDB papers)",
          "Define requirements (1M ops/sec, <1ms latency)",
          "Clone Redis; study src/dict.c for hash tables",
          "Set up GitHub repo with src/, tests/, docs/journal.md",
          "Journal: Why B+ trees for range queries? (200 words)"
        ]
      },
      {
        "title": "Core Storage & Indexing",
        "description": "Build the key-value store with advanced indexing.",
        "tasks": [
          "Implement hash table in C for O(1) lookups (src/store.c)",
          "Develop B+ tree for range queries (src/btree.c)",
          "Add write-ahead logging for persistence",
          "Write unit tests with Check for indexing",
          "Record 2min video explaining B+ tree splits"
        ]
      },
      {
        "title": "Transactions & API",
        "description": "Add concurrent transactions and a REST API.",
        "tasks": [
          "Implement MVCC for thread-safe transactions",
          "Build REST API with libevent (POST /set, GET /get)",
          "Submit PR to Redis (e.g., add new command)",
          "Journal: Reflect on Redis contribution (200 words)",
          "Publish 500-word blog post on MVCC (Dev.to)"
        ]
      },
      {
        "title": "Optimization & Showcase",
        "description": "Tune performance and flex your 10x skills.",
        "tasks": [
          "Stress-test with 1M ops/sec (wrk tool)",
          "Optimize B+ tree memory (<100MB for 10K keys)",
          "Add latency metrics (Prometheus client)",
          "Share demo video on X (@zufichris_) with #UncStatus",
          "Journal: Reflect on 10x productivity (200 words)"
        ]
      }
    ]
  },
  {
    "id": "pathforge",
    "title": "PathForge",
    "category": "Data Structures & Algorithms",
    "description": "A route planner for robotics using A* and RRT, built to dominate DSA and elevate your 10x coding with journaling focus.",
    "duration": "8 weeks",
    "prerequisites": ["keyvault"],
    "phases": [
      {
        "title": "Planning & Graph Study",
        "description": "Scope the planner and dive into OSRM for routing algorithms.",
        "tasks": [
          "Research A* and RRT algorithms (CLRS, Ch. 24)",
          "Define requirements (100K nodes, <10ms path)",
          "Clone OSRM; analyze engine/routing_algorithms/",
          "Set up repo with clang-format and README.md",
          "Journal: Why A* for robotics? (200 words)"
        ]
      },
      {
        "title": "Core Graph Planner",
        "description": "Build the planner with A* and RRT for dynamic paths.",
        "tasks": [
          "Implement adjacency list in C++ (src/graph.c)",
          "Develop A* with Manhattan heuristic (src/a_star.c)",
          "Add RRT for obstacle avoidance",
          "Write unit tests with Google Test",
          "Record 2min video explaining RRT sampling"
        ]
      },
      {
        "title": "Coordination & API",
        "description": "Add multi-robot coordination and a C API.",
        "tasks": [
          "Implement conflict-free paths for 5 robots",
          "Build C API for robot integration (include/pathforge.h)",
          "Submit PR to OSRM (e.g., optimize preprocessing)",
          "Journal: Reflect on OSRM contribution (200 words)",
          "Publish 500-word blog post on A* vs RRT (Medium)"
        ]
      },
      {
        "title": "Optimization & Showcase",
        "description": "Polish and share your 10x robotics masterpiece.",
        "tasks": [
          "Stress-test with 100 obstacles, 5 robots",
          "Optimize A* for <10ms on 1K nodes",
          "Add path computation metrics (custom logger)",
          "Share demo video on X with #UncStatus",
          "Journal: Reflect on DSA mastery (200 words)"
        ]
      }
    ]
  },
  {
    "id": "textforge",
    "title": "TextForge",
    "category": "Data Structures & Algorithms",
    "description": "A lightweight text search engine using inverted indices and suffix trees, crafted to sharpen your DSA and journaling for 10x impact.",
    "duration": "8 weeks",
    "prerequisites": ["pathforge"],
    "phases": [
      {
        "title": "Planning & Search Study",
        "description": "Scope the search engine and analyze Lucene for indexing tricks.",
        "tasks": [
          "Research inverted indices and suffix trees (Lucene papers)",
          "Define requirements (1M docs, <10ms query)",
          "Clone Lucene; study core/index/ for indexing",
          "Set up repo with rustfmt and docs/journal.md",
          "Journal: Why suffix trees for search? (200 words)"
        ]
      },
      {
        "title": "Core Search Engine",
        "description": "Build the search engine with inverted indices.",
        "tasks": [
          "Implement inverted index in Rust (src/index.rs)",
          "Add suffix tree for substring queries (src/suffix.rs)",
          "Develop tokenization and stemming",
          "Write unit tests for search accuracy",
          "Record 2min video explaining inverted indices"
        ]
      },
      {
        "title": "Fuzzy Matching & API",
        "description": "Add fuzzy matching and a REST API for queries.",
        "tasks": [
          "Implement Levenshtein automata for fuzzy search",
          "Build REST API with actix-web (GET /search)",
          "Submit PR to Lucene (e.g., new index option)",
          "Journal: Reflect on Lucene contribution (200 words)",
          "Publish 500-word blog post on fuzzy matching (Dev.to)"
        ]
      },
      {
        "title": "Optimization & Showcase",
        "description": "Tune for speed and share your 10x search prowess.",
        "tasks": [
          "Stress-test with 1M docs, 10K queries/sec",
          "Optimize suffix tree memory (<256MB)",
          "Add query latency metrics (custom logger)",
          "Share demo video on X with #UncStatus",
          "Journal: Reflect on 10x communication (200 words)"
        ]
      }
    ]
  },
  {
  "id": "riscvemu",
  "title": "RISC-V Emulator",
  "category": "Computer Architecture",
  "description": "A RISC-V emulator to master CPU architecture and instruction sets, using hash tables for fast instruction decoding.",
  "duration": "10 weeks",
  "prerequisites": ["nanokernel"],
  "phases": [
    {
      "title": "Architecture Basics & Planning",
      "description": "Learn CPU architecture and scope the emulator.",
      "tasks": [
        "Study RISC-V ISA (Patterson & Hennessy, Ch. 4)",
        "Define emulator requirements (RV32I, 1K instructions/sec)",
        "Clone QEMU; analyze target/riscv/ for decoding",
        "Set up repo with src/, tests/, docs/journal.md",
        "Journal: Why hash tables for instruction decoding? (200 words)"
      ]
    },
    {
      "title": "Core Emulator Development",
      "description": "Build the emulator with DSA-driven decoding.",
      "tasks": [
        "Implement instruction decoder in C (src/decode.c)",
        "Develop hash table for opcode lookup (src/opcode.c)",
        "Add register file and ALU operations",
        "Write unit tests for RV32I instructions",
        "Record 2min video explaining hash table decoding"
      ]
    },
    {
      "title": "Memory & Interrupts",
      "description": "Add memory system and interrupt handling.",
      "tasks": [
        "Implement memory hierarchy with page tables",
        "Develop interrupt controller for traps",
        "Submit PR to QEMU (e.g., add debug metric)",
        "Journal: Reflect on QEMU contribution (200 words)",
        "Publish 500-word blog post on RISC-V ISA (Medium)"
      ]
    },
    {
      "title": "Testing & Showcase",
      "description": "Optimize and share your emulator.",
      "tasks": [
        "Stress-test with 1K instructions/sec (custom benchmark)",
        "Optimize hash table for <1µs decode",
        "Add execution metrics (custom logger)",
        "Share demo video on X with #UncStatus",
        "Journal: Reflect on architecture mastery (200 words)"
      ]
    }
  ]
},
{
  "id": "taskblaze",
  "title": "TaskBlaze",
  "category": "Threading",
  "description": "A concurrent task scheduler using skip lists to master threading and lock in your 10x concurrency skills.",
  "duration": "8 weeks",
  "prerequisites": ["nanokernel"],
  "phases": [
    {
      "title": "Threading Basics & Planning",
      "description": "Learn threading concepts and scope the scheduler.",
      "tasks": [
        "Study POSIX threads and concurrency (Kerrisk, Ch. 30)",
        "Define requirements (100K tasks/sec, <1ms latency)",
        "Clone FreeRTOS; analyze tasks.c for threading",
        "Set up repo with src/, tests/, docs/journal.md",
        "Journal: Why skip lists for task priority? (200 words)"
      ]
    },
    {
      "title": "Core Scheduler Development",
      "description": "Build the scheduler with concurrent skip lists.",
      "tasks": [
        "Implement skip list in C (src/skiplist.c)",
        "Develop lock-free queue for task submission",
        "Add POSIX thread pool for execution",
        "Write unit tests with Check",
        "Record 2min video explaining skip list concurrency"
      ]
    },
    {
      "title": "API & Deadlock Handling",
      "description": "Add API and deadlock detection.",
      "tasks": [
        "Build CLI for task management (src/cli.c)",
        "Implement cycle-detection for deadlocks",
        "Submit PR to FreeRTOS (e.g., add priority metric)",
        "Journal: Reflect on FreeRTOS contribution (200 words)",
        "Publish 500-word blog post on lock-free queues (Dev.to)"
      ]
    },
    {
      "title": "Testing & Showcase",
      "description": "Optimize and flex your threading skills.",
      "tasks": [
        "Stress-test with 100K tasks/sec (custom benchmark)",
        "Optimize skip list memory (<10MB)",
        "Add latency metrics (custom logger)",
        "Share demo video on X with #UncStatus",
        "Journal: Reflect on threading mastery (200 words)"
      ]
    }
  ]
},
{
  "id": "cachesim",
  "title": "CacheSim",
  "category": "CPU",
  "description": "A cache simulator to master CPU cache behavior, using LRU queues for eviction policies and boosting your DSA skills.",
  "duration": "8 weeks",
  "prerequisites": ["riscvemu"],
  "phases": [
    {
      "title": "CPU Cache Basics & Planning",
      "description": "Learn cache concepts and scope the simulator.",
      "tasks": [
        "Study cache hierarchies (Hennessy & Patterson, Ch. 5)",
        "Define requirements (L1/L2 simulation, 1M accesses/sec)",
        "Clone gem5; analyze src/mem/cache/ for policies",
        "Set up repo with src/, tests/, docs/journal.md",
        "Journal: Why LRU queues for eviction? (200 words)"
      ]
    },
    {
      "title": "Core Cache Simulator",
      "description": "Build the simulator with LRU eviction.",
      "tasks": [
        "Implement cache lines in C++ (src/cache.c)",
        "Develop LRU queue for eviction (src/lru.c)",
        "Add direct-mapped cache simulation",
        "Write unit tests for cache hits/misses",
        "Record 2min video explaining LRU eviction"
      ]
    },
    {
      "title": "Advanced Policies & Metrics",
      "description": "Add set-associative caches and metrics.",
      "tasks": [
        "Implement 4-way set-associative cache",
        "Add miss rate tracking",
        "Submit PR to gem5 (e.g., add cache metric)",
        "Journal: Reflect on gem5 contribution (200 words)",
        "Publish 500-word blog post on cache policies (Medium)"
      ]
    },
    {
      "title": "Testing & Showcase",
      "description": "Optimize and share your cache simulator.",
      "tasks": [
        "Stress-test with 1M accesses/sec (custom benchmark)",
        "Optimize LRU queue for <1µs access",
        "Add hit/miss metrics (custom logger)",
        "Share demo video on X with #UncStatus",
        "Journal: Reflect on CPU mastery (200 words)"
      ]
    }
  ]
},
{
  "id": "memforge",
  "title": "MemForge",
  "category": "Memory Management",
  "description": "A custom memory allocator to master heap management, using buddy systems and journaling your 10x optimization journey.",
  "duration": "8 weeks",
  "prerequisites": ["nanokernel"],
  "phases": [
    {
      "title": "Memory Basics & Planning",
      "description": "Learn memory management and scope the allocator.",
      "tasks": [
        "Study heap allocation (Knuth, Vol. 1)",
        "Define requirements (1M allocs/sec, <10% fragmentation)",
        "Clone jemalloc; analyze src/jemalloc.c for allocation",
        "Set up repo with src/, tests/, docs/journal.md",
        "Journal: Why buddy systems for allocation? (200 words)"
      ]
    },
    {
      "title": "Core Allocator Development",
      "description": "Build the allocator with buddy system.",
      "tasks": [
        "Implement buddy allocator in C (src/alloc.c)",
        "Add free list with binary tree (src/freelist.c)",
        "Support malloc/free-like API",
        "Write unit tests for allocation",
        "Record 2min video explaining buddy allocation"
      ]
    },
    {
      "title": "Thread Safety & Metrics",
      "description": "Add thread safety and allocation metrics.",
      "tasks": [
        "Implement thread-safe allocation with mutexes",
        "Add fragmentation tracking",
        "Submit PR to jemalloc (e.g., add debug metric)",
        "Journal: Reflect on jemalloc contribution (200 words)",
        "Publish 500-word blog post on heap management (Dev.to)"
      ]
    },
    {
      "title": "Testing & Showcase",
      "description": "Optimize and showcase your allocator.",
      "tasks": [
        "Stress-test with 1M allocs/sec (custom benchmark)",
        "Optimize fragmentation (<10%)",
        "Add allocation metrics (custom logger)",
        "Share demo video on X with #UncStatus",
        "Journal: Reflect on memory mastery (200 words)"
      ]
    }
  ]
},
{
  "id": "minicc",
  "title": "MiniCC",
  "category": "Compilers",
  "description": "A Mini-C compiler to master parsing and codegen, using ASTs and locking in your 10x compiler skills.",
  "duration": "10 weeks",
  "prerequisites": ["riscvemu"],
  "phases": [
    {
      "title": "Compiler Basics & Planning",
      "description": "Learn compiler concepts and scope Mini-C.",
      "tasks": [
        "Study lexing and parsing (Dragon Book, Ch. 3)",
        "Define Mini-C grammar (subset of C)",
        "Clone LLVM; analyze lib/Parse for parsing",
        "Set up repo with src/, tests/, docs/journal.md",
        "Journal: Why ASTs for parsing? (200 words)"
      ]
    },
    {
      "title": "Core Compiler Development",
      "description": "Build lexer and parser with ASTs.",
      "tasks": [
        "Implement lexer in C (src/lexer.c)",
        "Develop recursive descent parser (src/parser.c)",
        "Build AST for expressions (src/ast.c)",
        "Write unit tests for parsing",
        "Record 2min video explaining AST construction"
      ]
    },
    {
      "title": "Codegen & Optimization",
      "description": "Add code generation and basic optimization.",
      "tasks": [
        "Generate x86_64 assembly from AST",
        "Implement constant folding optimization",
        "Submit PR to LLVM (e.g., add parser debug)",
        "Journal: Reflect on LLVM contribution (200 words)",
        "Publish 500-word blog post on codegen (Medium)"
      ]
    },
    {
      "title": "Testing & Showcase",
      "description": "Test and share your compiler.",
      "tasks": [
        "Test with 100 Mini-C programs (custom harness)",
        "Optimize AST memory (<1MB)",
        "Add compilation metrics (custom logger)",
        "Share demo video on X with #UncStatus",
        "Journal: Reflect on compiler mastery (200 words)"
      ]
    }
  ]
},
{
  "id": "raftlib",
  "title": "RaftLib",
  "category": "Distributed Systems",
  "description": "A Raft consensus library to master distributed systems, using state machines and journaling your 10x journey.",
  "duration": "10 weeks",
  "prerequisites": ["netforge"],
  "phases": [
    {
      "title": "Distributed Systems Basics & Planning",
      "description": "Learn Raft and scope the library.",
      "tasks": [
        "Study Raft consensus (raft.github.io)",
        "Define requirements (3-node cluster, <10ms commit)",
        "Clone etcd; analyze raft/ for state machines",
        "Set up repo with src/, tests/, docs/journal.md",
        "Journal: Why state machines for Raft? (200 words)"
      ]
    },
    {
      "title": "Core Raft Development",
      "description": "Build Raft with state machine logic.",
      "tasks": [
        "Implement leader election in C (src/raft.c)",
        "Develop log replication with FSM (src/fsm.c)",
        "Add heartbeat mechanism",
        "Write unit tests for consensus",
        "Record 2min video explaining Raft election"
      ]
    },
    {
      "title": "API & Fault Tolerance",
      "description": "Add API and fault tolerance.",
      "tasks": [
        "Build C API for Raft operations (include/raft.h)",
        "Implement node failure recovery",
        "Submit PR to etcd (e.g., add debug log)",
        "Journal: Reflect on etcd contribution (200 words)",
        "Publish 500-word blog post on Raft consensus (Medium)"
      ]
    },
    {
      "title": "Testing & Showcase",
      "description": "Test and share your Raft library.",
      "tasks": [
        "Stress-test with 3 nodes, 100 commits/sec",
        "Optimize commit latency (<10ms)",
        "Add consensus metrics (custom logger)",
        "Share demo video on X with #UncStatus",
        "Journal: Reflect on distributed systems mastery (200 words)"
      ]
    }
  ]
},
{
  "id": "keyvault",
  "title": "KeyVault",
  "category": "Databases",
  "description": "A high-performance key-value store with B+ trees, mastering database internals and locking in your 10x DSA skills.",
  "duration": "8 weeks",
  "prerequisites": ["nanokernel"],
  "phases": [
    {
      "title": "Database Basics & Planning",
      "description": "Learn database concepts and scope the store.",
      "tasks": [
        "Study B+ trees and LSM trees (LevelDB papers)",
        "Define requirements (1M ops/sec, <1ms latency)",
        "Clone Redis; analyze src/dict.c for hash tables",
        "Set up repo with src/, tests/, docs/journal.md",
        "Journal: Why B+ trees for databases? (200 words)"
      ]
    },
    {
      "title": "Core Storage Development",
      "description": "Build the store with B+ tree indexing.",
      "tasks": [
        "Implement hash table in C (src/store.c)",
        "Develop B+ tree for range queries (src/btree.c)",
        "Add write-ahead logging",
        "Write unit tests with Check",
        "Record 2min video explaining B+ tree splits"
      ]
    },
    {
      "title": "Transactions & API",
      "description": "Add transactions and REST API.",
      "tasks": [
        "Implement MVCC for thread-safe transactions",
        "Build REST API with libevent (POST /set)",
        "Submit PR to Redis (e.g., add command)",
        "Journal: Reflect on Redis contribution (200 words)",
        "Publish 500-word blog post on MVCC (Dev.to)"
      ]
    },
    {
      "title": "Testing & Showcase",
      "description": "Optimize and showcase your database.",
      "tasks": [
        "Stress-test with 1M ops/sec (wrk)",
        "Optimize B+ tree memory (<100MB)",
        "Add latency metrics (Prometheus client)",
        "Share demo video on X with #UncStatus",
        "Journal: Reflect on database mastery (200 words)"
      ]
    }
  ]
},
{
  "id": "fsforge",
  "title": "FSForge",
  "category": "File Systems",
  "description": "A custom file system to master storage, using B-trees for indexing and journaling your 10x systems journey.",
  "duration": "10 weeks",
  "prerequisites": ["nanokernel"],
  "phases": [
    {
      "title": "File System Basics & Planning",
      "description": "Learn file system concepts and scope FSForge.",
      "tasks": [
        "Study file systems (Arpaci-Dusseau, Ch. 40)",
        "Define requirements (1K files, <1ms access)",
        "Clone ext4; analyze fs/ext4/ for B-trees",
        "Set up repo with src/, tests/, docs/journal.md",
        "Journal: Why B-trees for file indexing? (200 words)"
      ]
    },
    {
      "title": "Core File System Development",
      "description": "Build the file system with B-tree indexing.",
      "tasks": [
        "Implement inode structure in C (src/inode.c)",
        "Develop B-tree for file indexing (src/btree.c)",
        "Add block allocation",
        "Write unit tests for file ops",
        "Record 2min video explaining B-tree indexing"
      ]
    },
    {
      "title": "Features & Integration",
      "description": "Add file operations and kernel integration.",
      "tasks": [
        "Implement read/write operations",
        "Integrate with NanoKernel VFS",
        "Submit PR to ext4 (e.g., add debug metric)",
        "Journal: Reflect on ext4 contribution (200 words)",
        "Publish 500-word blog post on file systems (Medium)"
      ]
    },
    {
      "title": "Testing & Showcase",
      "description": "Test and share your file system.",
      "tasks": [
        "Stress-test with 1K file ops/sec (custom benchmark)",
        "Optimize B-tree memory (<10MB)",
        "Add access metrics (custom logger)",
        "Share demo video on X with #UncStatus",
        "Journal: Reflect on file system mastery (200 words)"
      ]
    }
  ]
}
]
