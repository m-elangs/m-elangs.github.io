export interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  iconType: string;
  badgeBg?: string;
  textColor?: string;
}

export const techList: TechItem[] = [
  { name: "Laravel", category: "Backend", iconType: "laravel" },
  { name: "HTML5", category: "Frontend", iconType: "html5" },
  { name: "CSS3", category: "Frontend", iconType: "css3" },
  { name: "JavaScript", category: "Frontend", iconType: "javascript" },
  { name: "Python", category: "Backend", iconType: "python" },
  { name: "React.js", category: "Frontend", iconType: "react" },
  { name: "TypeScript", category: "Frontend", iconType: "typescript" },
  { name: "Node.js", category: "Backend", iconType: "nodejs" },
  { name: "MySQL", category: "Database", iconType: "mysql" },
  { name: "Tailwind CSS", category: "Frontend", iconType: "tailwind" },
  { name: "Next.js", category: "Frontend", iconType: "nextjs" },
  { name: "PHP", category: "Backend", iconType: "php" },
  { name: "Git", category: "Tools", iconType: "git" },
  { name: "GitHub", category: "Tools", iconType: "github" },
  { name: "Figma", category: "Tools", iconType: "figma" },
  { name: "Postman", category: "Tools", iconType: "postman" },
];
