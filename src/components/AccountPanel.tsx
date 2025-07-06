"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "../lib/firebase";
import { deleteUser, reauthenticateWithPopup } from "firebase/auth";
import { deleteUserFromFirestore } from "../lib/firestoreUser";
import { useState } from "react";

export default function AccountPanel() {
  const [user, loading] = useAuthState(auth);
  const [deleting, setDeleting] = useState(false);
  if (loading) return <div>Loading...</div>;
  if (!user)
    return (
      <div className="text-chalk">Please sign in to manage your account.</div>
    );

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return;
    setDeleting(true);
    try {
      // Remove user from Firestore first
      await deleteUserFromFirestore(user.uid);
      await deleteUser(user);
    } catch (e: unknown) {
      if (typeof e === "object" && e && "code" in e && (e as { code?: string }).code === "auth/requires-recent-login") {
        // Prompt re-authentication
        try {
          await reauthenticateWithPopup(user, googleProvider);
          await deleteUserFromFirestore(user.uid);
          await deleteUser(user);
        } catch (reauthErr) {
          alert("Re-authentication failed: " + (reauthErr as Error).message);
        }
      } else {
        const msg = typeof e === "object" && e && "message" in e ? (e as { message?: string }).message : String(e);
        alert("Error deleting account: " + msg);
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center bg-graphite p-6 rounded">
      <div className="text-chalk text-lg font-bold">{user.email}</div>
      <button
        className="bg-red-600 text-chalk px-4 py-2 rounded font-bold"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
}
