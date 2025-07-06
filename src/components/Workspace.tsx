"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import HistoryPanel from "./HistoryPanel";
import GenerationPanel from "./GenerationPanel";

export default function Workspace() {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Loading...</div>;
  if (!user)
    return (
      <div className="text-chalk">Please sign in to use the workspace.</div>
    );
  return (
    <div className="flex flex-col md:flex-row h-[80vh] w-full max-w-6xl mx-auto gap-4 p-4">
      <div className="flex-1 bg-graphite rounded p-4 overflow-auto">
        <HistoryPanel />
      </div>
      <div className="flex-[2] bg-carbon rounded p-4 overflow-auto">
        <GenerationPanel user={user} />
      </div>
      <div className="flex-1 bg-graphite rounded p-4 overflow-auto hidden md:block">
        {/* Reserved for future: AI debug panel */}
      </div>
    </div>
  );
}
