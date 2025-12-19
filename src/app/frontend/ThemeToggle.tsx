"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : systemDark;
    
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-9 border rounded-xl" />;

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative h-10 w-10 flex items-center justify-center rounded-xl border border-border bg-card hover:bg-muted transition-colors overflow-hidden shadow-sm"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={dark ? "dark" : "light"}
          initial={{ y: 20, opacity: 0, rotate: 45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: -45 }}
          transition={{ duration: 0.2, ease: "anticipate" }}
        >
          {dark ? <Sun size={18} className="text-white" /> : <Moon size={18} className="text-black" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}