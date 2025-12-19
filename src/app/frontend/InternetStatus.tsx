"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export function InternetStatus() {
  const [online, setOnline] = useState(true);
  const [speed, setSpeed] = useState<number | null>(null);

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  useEffect(() => {
    if (!online) {
      setSpeed(null);
      return;
    }

    const testSpeed = async () => {
      const start = performance.now();
      await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
        cache: "no-store",
      });
      const end = performance.now();
      const duration = (end - start) / 1000;
      const estimatedMbps = (0.5 * 8) / duration; // ~0.5MB estimate
      setSpeed(Math.round(estimatedMbps));
    };

    testSpeed();
    const interval = setInterval(testSpeed, 5000);
    return () => clearInterval(interval);
  }, [online]);

  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl 
    bg-slate-100 dark:bg-black border text-xs"
    >
      {online ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <span>{speed ? `${speed} Mbps` : "Checking..."}</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-500" />
          <span>Offline</span>
        </>
      )}
    </div>
  );
}
