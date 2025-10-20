import type { Metadata } from "next";
import { PostHogProvider, QueryProvider } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "CashBoar",
  description: "View, redeem and manage your cashback rewards easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <PostHogProvider>{children}</PostHogProvider>
        </QueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
