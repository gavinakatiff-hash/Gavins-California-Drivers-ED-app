// Directory registry of Gavin's applications and projects
const APPS_DIRECTORY = [
    {
        id: "ca-dmv",
        title: "California DMV Practice Test",
        icon: "🐻",
        tagline: "120 Interactive Questions with Visual Diagrams",
        description: "Comprehensive California DMV driver's license practice test with instant feedback, custom SVG road diagrams, category filters, and full handbook explanations.",
        category: "Education & Tools",
        tags: ["PWA", "DMV Prep", "Interactive", "Offline Ready"],
        status: "Live",
        statusType: "live",
        featured: true,
        actionType: "internal", // launches the built-in DMV question app
        actionUrl: "#dmv"
    },
    {
        id: "github-hub",
        title: "GitHub Projects & Repositories",
        icon: "💻",
        tagline: "Open Source Code & Projects",
        description: "Explore all public repositories, open source software, and active coding projects on GitHub.",
        category: "Development",
        tags: ["GitHub", "Open Source", "Code"],
        status: "Active",
        statusType: "active",
        featured: false,
        actionType: "external",
        actionUrl: "https://github.com/gavinakatiff-hash"
    },
    {
        id: "web-tools",
        title: "Web Utilities & Apps",
        icon: "⚡",
        tagline: "Productivity & Developer Tools",
        description: "Collection of fast, lightweight web utilities, calculators, and interactive browser tools.",
        category: "Productivity",
        tags: ["Utilities", "Fast", "Browser"],
        status: "Coming Soon",
        statusType: "soon",
        featured: false,
        actionType: "placeholder",
        actionUrl: "#"
    }
];

window.APPS_DIRECTORY = APPS_DIRECTORY;
