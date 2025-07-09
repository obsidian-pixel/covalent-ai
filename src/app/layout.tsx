import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css"; // Corrected path
import "@/styles/animations.css"; // Corrected path
import { AuthProvider } from "@/context/AuthContext"; // Corrected path
import AuthModal from "@/components/auth/AuthModal"; // Import AuthModal

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raiduix", // Updated title
  description: "Enhanced by AI", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <AuthModal /> {/* Render AuthModal here */}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
