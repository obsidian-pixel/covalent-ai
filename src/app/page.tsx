"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-carbon text-chalk">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-graphite shadow">
        <span className="text-2xl font-bold tracking-tight">Covalent-AI</span>
        <div>
          <button
            className="bg-electron text-carbon px-5 py-2 rounded font-semibold shadow hover:bg-electron/90 transition"
            onClick={() => router.push("/login")}
          >
            Sign In / Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 py-16 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          AI-powered Coding Assistant
        </h1>
        <p className="mb-8 text-xl text-chalk/80 max-w-2xl">
          Generate, debug, and accelerate your code with Covalent-AI. Your
          all-in-one developer copilot.
        </p>
        <button
          className="bg-electron text-carbon px-8 py-4 rounded text-xl font-bold shadow hover:bg-electron/90 transition"
          onClick={() => router.push("/login")}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-graphite py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-carbon shadow">
            <h2 className="text-2xl font-bold mb-2">Code Generation</h2>
            <p className="text-chalk/70">
              Instantly generate code snippets, functions, or entire modules in
              your favorite languages.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-carbon shadow">
            <h2 className="text-2xl font-bold mb-2">AI Debugging</h2>
            <p className="text-chalk/70">
              Find and fix bugs with AI-powered suggestions and explanations.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-carbon shadow">
            <h2 className="text-2xl font-bold mb-2">History & Collaboration</h2>
            <p className="text-chalk/70">
              Access your generation history and collaborate with your team in
              real time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-carbon text-center text-chalk/60 border-t border-graphite mt-auto">
        &copy; {new Date().getFullYear()} Covalent-AI. All rights reserved.
      </footer>
    </div>
  );
}
