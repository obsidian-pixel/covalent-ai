"use client";
import { useEffect, useState } from "react";

export default function SessionView({ sessionId }: { sessionId: string }) {
  // TODO: Fetch session data from Firestore
  const [session, setSession] = useState<{
    id: string;
    prompt: string;
    code: string;
  } | null>(null);
  useEffect(() => {
    // Fetch session by ID
    setSession({
      id: sessionId,
      prompt: "Example prompt",
      code: "// Example generated code",
    });
  }, [sessionId]);
  if (!session) return <div>Loading...</div>;
  return (
    <div className="max-w-3xl mx-auto p-4 bg-graphite rounded">
      <h2 className="text-xl font-bold mb-2">Session: {session.id}</h2>
      <div className="mb-2 text-chalk/80">Prompt: {session.prompt}</div>
      <pre className="bg-carbon text-chalk rounded p-4 overflow-x-auto">
        {session.code}
      </pre>
    </div>
  );
}
