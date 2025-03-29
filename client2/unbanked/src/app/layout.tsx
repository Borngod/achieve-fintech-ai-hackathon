import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserratFont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unbanked",
  description: "Unbanked is a web3 wallet for the unbanked.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserratFont.className}>
        {children}
      </body>
    </html>
  );
}