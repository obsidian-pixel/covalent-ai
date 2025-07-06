import { User } from "firebase/auth";
import { useState } from "react";
import { saveGeneration } from "../lib/firestoreGeneration";

export default function GenerationPanel({ user }: { user: User }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const output = data.result || data.error || "[No response]";
      setResult(output);
      // Save to Firestore if successful
      if (data.result) {
        await saveGeneration({ userId: user.uid, prompt, result: output });
      }
    } catch (err) {
      setResult("[Error contacting API]");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">New Generation</h2>
      <textarea
        className="w-full p-2 rounded bg-graphite text-chalk mb-2"
        rows={4}
        placeholder="Describe what you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-electron text-carbon px-4 py-2 rounded font-bold"
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      {result && (
        <pre className="mt-4 bg-carbon text-chalk rounded p-4 overflow-x-auto">
          {result}
        </pre>
      )}
    </div>
  );
}
