export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Bases de datos"
  | "Nube"
  | "Herramientas"
  | "Metodología";

export type Skill = {
  name: string;
  category: SkillCategory;
};

export const skillCategories: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Bases de datos",
  "Nube",
  "Herramientas",
  "Metodología",
];

export const skills: Skill[] = [
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Python", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "C#", category: "Backend" },
  { name: ".NET", category: "Backend" },
  { name: "API REST", category: "Backend" },
  { name: "SQL Server", category: "Bases de datos" },
  { name: "Azure", category: "Nube" },
  { name: "AWS", category: "Nube" },
  { name: "Vercel", category: "Nube" },
  { name: "Docker", category: "Herramientas" },
  { name: "Git", category: "Herramientas" },
  { name: "GitHub", category: "Herramientas" },
  { name: "Postman", category: "Herramientas" },
  { name: "Scrum", category: "Metodología" },
  { name: "CI/CD", category: "Metodología" },
];

export function skillsByCategory(category: SkillCategory) {
  return skills.filter((skill) => skill.category === category);
}
