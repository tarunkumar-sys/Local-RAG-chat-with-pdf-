import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Play, Shield, FileText, Zap } from "lucide-react";
import { ThemeToggle } from "./frontend/ThemeToggle";
import { InternetStatus } from "./frontend/InternetStatus";
import { FloatingContact } from "./frontend/FloatingContact";
import { Logo } from "@/components/logo";
import { Auth } from "@/components/auth";

export default function Home() {
  const { userId } = auth();
  if (userId) redirect("/dashboard");

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/10">
      {/* === INDUSTRY GRID BACKGROUND === */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 
          bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
          bg-[size:64px_64px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* === LONG WIDTH NAVBAR === */}
      <nav className="flex items-center justify-between sm:px-12 py-3 ">
        <Logo />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <InternetStatus />
        </div>
      </nav>

      {/* === HERO SECTION === */}
      <section className="relative p-5 text-center  mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-[1.1]">
          Your documents, <br />
          <span className="text-foreground">now with answers.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          The professional standard for RAG-powered document analysis. Ground
          your AI in your data with total privacy.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Auth isHero />
          <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border bg-background hover:bg-muted font-bold transition-all w-full sm:w-auto active:scale-95">
            <Play className="h-4 w-4 fill-current" />
            Watch Demo
          </button>
        </div>

        {/* TRUST MARKERS */}
        <div className="mt-20 pt-10  flex flex-wrap justify-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Enterprise Secure
          </span>
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> 50MB+ Limits
          </span>
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4" /> Instant Vectors
          </span>
        </div>
      </section>
      <FloatingContact />
    </main>
  );
}
