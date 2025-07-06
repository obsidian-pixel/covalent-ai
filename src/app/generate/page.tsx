import Workspace from "../../components/Workspace";

export default function GeneratePage() {
  // This is a placeholder for server-side auth check. In production, use middleware or client-side check.
  // If not authenticated, redirect to home.
  // For now, just render the workspace.
  return <Workspace />;
}
