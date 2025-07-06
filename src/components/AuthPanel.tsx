"use client";
import { useEffect } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function AuthPanel() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  const handleGoogleSignIn = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    await signInWithEmailAndPassword(auth, email, password);
  };

  if (loading) return <div>Loading...</div>;
  if (user)
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-chalk">Signed in as {user.email}</span>
        <button
          className="bg-electron text-carbon px-4 py-2 rounded"
          onClick={() => signOut(auth)}
        >
          Sign Out
        </button>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 p-4 bg-graphite rounded shadow">
      <button
        className="bg-electron text-carbon px-4 py-2 rounded"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>
      <form className="flex flex-col gap-2" onSubmit={handleEmailSignIn}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-carbon text-chalk"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-carbon text-chalk"
          required
        />
        <button
          className="bg-electron text-carbon px-4 py-2 rounded"
          type="submit"
        >
          Sign in with Email
        </button>
      </form>
    </div>
  );
}
