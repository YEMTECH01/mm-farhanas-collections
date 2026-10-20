import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers"; // This now points to the file we just made
import FloatingSocials from "@/components/FloatingSocials";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MM LUXURY | Modest Elegance",
  description: "Timeless abayas crafted for the modern queen.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <FloatingSocials /> {/* <-- Add this line */}
        {children}
      </body>
    </html>
  );
}
