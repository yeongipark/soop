"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import RecoilWrapper from "@/components/recoilWrapper";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const pathname = usePathname(); // 현재 경로를 가져옴

  const backgroundColor = pathname === "/" ? "var(--background)" : "#ffffff";

  return (
    <html lang="en">
      <body
        style={{
          backgroundColor,
          maxWidth: "600px",
          margin: "auto",
          minHeight: "100vh",
        }}
      >
        <RecoilWrapper>{children}</RecoilWrapper>
        {modal}
      </body>
    </html>
  );
}
