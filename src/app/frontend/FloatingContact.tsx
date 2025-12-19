"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  User,
  Github,
  Linkedin,
  X,
} from "lucide-react";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const socialButtons = [
    {
      icon: <User className="h-5 w-5 text-white" />, // Hamesha white rahega
      href: "https://my-portfolio-zeta-ruddy-57.vercel.app/",
      color: "bg-[#40e473]",
      angle: 180,
    },
    {
      icon: <Linkedin className="h-5 w-5 text-white" />,
      href: "https://www.linkedin.com/in/tarun-kumar-295-scary-crimson",
      color: "bg-[#0A66C2]",
      angle: 135,
    },
    {
      icon: <Github className="h-5 w-5 text-white" />, // Yahan fix kiya: text-white
      href: "https://github.com/tarunkumar-sys",
      color: "bg-[#24292e]", // Background dark hai, icon white rahega
      angle: 90, // Pehle angle missing tha, ise top par rakha hai
    },
  ];

  const radius = 80;

  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <>
            {socialButtons.map((social, index) => {
              const radian = (social.angle * Math.PI) / 180;
              const x = Math.cos(radian) * radius;
              const y = -Math.sin(radian) * radius;

              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                  className={`absolute ${social.color} p-3 rounded-full shadow-xl hover:scale-110 hover:brightness-125 active:scale-95 z-40 flex items-center justify-center border border-white/10`}
                >
                  {social.icon}
                </motion.a>
              );
            })}
          </>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-all border border-primary/20"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center justify-center"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.div>
      </button>
    </div>
  );
}