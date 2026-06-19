import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiSpringboot,
  SiOpencv,
  SiMysql,
  SiVite,
  SiHtml5,
  SiCss,
  SiExpress,
} from "react-icons/si";
import { FaJava, FaCode } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Skills                                                            */
/* ------------------------------------------------------------------ */

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    skills: [
      { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    label: "Backend & DBs",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#00ED64" },
      { name: "MySQL", icon: SiMysql, color: "#00758F" },
    ],
  },
  {
    label: "AI & Core CS",
    skills: [
      { name: "Python", icon: SiPython, color: "#FFD43B" },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "DSA", icon: FaCode, color: "#FF6B6B" },
    ],
  },
];

/** Flattened skill list for the marquee */
export const allSkills: Skill[] = skillCategories.flatMap((cat) => cat.skills);

/* ------------------------------------------------------------------ */
/*  Experiences                                                       */
/* ------------------------------------------------------------------ */

export interface Experience {
  title: string;
  company: string;
  description: string;
  tech: string[];
}

export const experiences: Experience[] = [
  {
    title: "Java Springboot Intern",
    company: "May 2025 — June 2025",
    description:
      "Developed full-stack web applications using React frontend with Spring Boot backend, implementing CSRF protection and PostgreSQL database integration.",
    tech: ["React", "Spring Boot", "CSRF", "PostgreSQL"],
  },
  {
    title: "MERN Stack Intern",
    company: "AlgoTutor — 2025",
    description:
      "Built full-stack applications with REST APIs, authentication, CORS handling, and MongoDB database integration.",
    tech: ["React", "Node.js", "REST APIs", "CORS", "MongoDB"],
  },
];

/* ------------------------------------------------------------------ */
/*  Projects                                                          */
/* ------------------------------------------------------------------ */

export interface Project {
  title: string;
  tech: string[];
  desc: string;
  note?: string;
  live?: string;
  repos: { label: string; url: string }[];
}

/** Maps tech names → icon components for project badges */
export const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "React (Vite)": SiReact,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  "Spring Boot": SiSpringboot,
  PostgreSQL: SiPostgresql,
  Vite: SiVite,
};

export const projects: Project[] = [
  {
    title: "Crave Food Blog",
    tech: ["React (Vite)", "Spring Boot", "PostgreSQL"],
    desc: "A full-stack food blog handling complex relational data. Deployed via Vercel (frontend), Render (backend), and Neon (database).",
    live: "https://crave-woad.vercel.app/",
    repos: [
      {
        label: "Repo",
        url: "https://github.com/Nightwing-007/Crave-FoodBlog",
      },
    ],
  },
  {
    title: "MERN Food Blog",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    desc: "A full-stack food blogging platform built with the MERN stack, featuring CRUD operations, responsive design, and cloud deployment.",
    note: "Backend spins down during inactivity",
    live: "https://mern-food-blog-frontend.vercel.app/",
    repos: [
      {
        label: "Frontend",
        url: "https://github.com/Nightwing-007/MERN-Food-Blog-Frontend",
      },
      {
        label: "Backend",
        url: "https://github.com/Nightwing-007/MERN-Food-Blog-Backend",
      },
    ],
  },
];

export interface NotableMention {
  title: string;
  url: string;
}

export const notableMentions: NotableMention[] = [
  {
    title: "Flood Risk Prediction",
    url: "https://github.com/Nightwing-007/Flood-Risk-Prediction-Model",
  },
  {
    title: "Leetcode Wrapped",
    url: "https://github.com/Nightwing-007/Leetcode_Wrapped",
  },
  {
    title: "Complaint Management System",
    url: "https://github.com/Nightwing-007/Complaint-Management-and-Resolution-Tracking-System",
  },
];
