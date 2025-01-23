import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@workspace/ui/components/toaster";
import "@workspace/ui/styles/globals.css";
import { NuqsAdapter } from "nuqs/adapters/react";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  title: "Reviewnow",
  description: "The fastest way to create reviews and beta previewing.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground ">
        <NuqsAdapter>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
