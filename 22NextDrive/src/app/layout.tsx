import { type Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Next Drive Clone",
  description: "Next Drive Clone",
  icons: [{ rel: "icon", url: "📁" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
