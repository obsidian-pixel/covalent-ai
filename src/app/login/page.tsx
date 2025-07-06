"use client";
import AuthPanel from "../../components/AuthPanel";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.replace("/account");
    }
  }, [user, loading, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-carbon text-chalk">
      <h1 className="text-3xl font-bold mb-4">Sign In / Sign Up</h1>
      <div className="w-full max-w-md">
        <AuthPanel />
      </div>
    </main>
  );
}
