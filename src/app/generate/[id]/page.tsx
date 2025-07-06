import SessionView from "../../../components/SessionView";
// import { redirect } from "next/navigation";
// import { auth } from "../../../lib/firebase";

interface PageProps {
  params: { id: string };
}

export default function SessionPage({ params }: PageProps) {
  // Placeholder for server-side auth check. In production, use middleware or client-side check.
  // If not authenticated, redirect to home.
  // For now, just render the session view.
  return <SessionView sessionId={params.id} />;
}
