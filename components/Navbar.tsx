"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          hasScrolled
            ? "neu-flat !rounded-none shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-bold tracking-tighter text-text-primary relative group"
            whileHover={{ scale: 1.05 }}
            data-cursor
          >
            DS
            <span className="text-glow-purple neon-purple">.</span>
            <span className="absolute -inset-2 rounded-lg bg-glow-purple/0 group-hover:bg-glow-purple/5 transition-colors duration-300" />
          </motion.a>

          {/* Desktop Links + Toggle */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium tracking-widest uppercase">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 group ${
                    isActive
                      ? "neu-inset !rounded-full text-glow-purple"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {!isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-glow-purple w-0 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                  )}
                </a>
              );
            })}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-4 w-10 h-10 rounded-full neu-pill flex items-center justify-center text-text-muted hover:text-glow-purple transition-colors relative overflow-hidden"
              data-cursor
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  <motion.div
                    key="moon"
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FaMoon className="text-sm" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ y: -20, opacity: 0, rotate: 90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FaSun className="text-sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile: Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full neu-pill flex items-center justify-center text-text-muted z-[60]"
              data-cursor
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon className="text-xs" /> : <FaSun className="text-xs" />}
            </motion.button>

            {/* Hamburger */}
            <button
              className="relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              data-cursor
            >
              <motion.span
                className="block w-6 h-[2px] rounded-full origin-center"
                animate={
                  isOpen
                    ? { rotate: 45, y: 5, backgroundColor: "var(--accent-purple)" }
                    : { rotate: 0, y: 0, backgroundColor: "var(--hamburger-color)" }
                }
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-[2px] rounded-full"
                style={{ backgroundColor: "var(--hamburger-color)" }}
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-[2px] rounded-full origin-center"
                animate={
                  isOpen
                    ? { rotate: -45, y: -5, backgroundColor: "var(--accent-purple)" }
                    : { rotate: 0, y: 0, backgroundColor: "var(--hamburger-color)" }
                }
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center"
            style={{
              background: "var(--overlay-bg)",
              backdropFilter: "blur(30px)",
            }}
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="text-2xl font-bold text-text-primary tracking-wider uppercase neu-pill px-8 py-4 hover:text-glow-purple transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-glow-purple font-mono text-sm mr-3 opacity-50">
                    0{index + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-12 text-text-dim text-xs font-mono tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.4 }}
            >
              Deepakraj S — Portfolio
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
