"use client";
import { useRouter, usePathname } from "next/navigation";

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex bg-carbon text-chalk">
      {/* Side Nav */}
      <aside className="w-64 bg-graphite flex flex-col py-8 px-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Covalent-AI</h2>
        <nav className="flex flex-col gap-4">
          <button
            className={`text-left px-4 py-2 rounded font-semibold transition ${
              pathname.startsWith("/account")
                ? "bg-electron text-carbon"
                : "hover:bg-carbon/40"
            }`}
            onClick={() => router.push("/account")}
          >
            Account Settings
          </button>
          <button
            className={`text-left px-4 py-2 rounded font-semibold transition ${
              pathname.startsWith("/generate")
                ? "bg-electron text-carbon"
                : "hover:bg-carbon/40"
            }`}
            onClick={() => router.push("/generate")}
          >
            Generator AI Tool
          </button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {children}
      </main>
    </div>
  );
}
