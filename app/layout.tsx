import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FAB } from "@/components/layout/FAB";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "XIAO PAI - Campus Marketplace",
  description: "Satu kampus, satu geng. Apa aja dibantuin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <FAB />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
