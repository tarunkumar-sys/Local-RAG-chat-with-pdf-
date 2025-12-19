"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MuseoModerno } from "next/font/google";
import { cn } from "@/lib/utils";

const museo = MuseoModerno({
  weight: "700",
  subsets: ["latin"],
});

export const Logo = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setDark(document.documentElement.classList.contains("dark"));

    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={dark ? "/logo_dark.svg" : "/logo.svg"}
        width={50}
        height={50}
        alt="logo"
        priority
      />
      <h2 className={cn(museo.className, "text-2xl")}>ScribeNova</h2>
    </Link>
  );
};
