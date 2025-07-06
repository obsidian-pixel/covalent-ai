import AccountPanel from "../../components/AccountPanel";

export default function AccountPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-carbon text-chalk">
      <h1 className="text-3xl font-bold mb-4">Account</h1>
      <AccountPanel />
    </main>
  );
}
