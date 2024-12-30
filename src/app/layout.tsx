"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import RecoilWrapper from "@/components/recoilWrapper";
import ReactQueryProvider from "@/util/reactQueryProvider";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const pathname = usePathname(); // 현재 경로를 가져옴

  const backgroundColor =
    pathname === "/" || pathname === "/login" ? "var(--background)" : "#ffffff";

  return (
    <html lang="en">
      <head>
        <title>re-bin</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0"
        />
        <meta
          name="description"
          content="소중한 추억을 사진으로 남겨드립니다:)"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        style={{
          backgroundColor,
          maxWidth: "600px",
          margin: "auto",
          minHeight: "100vh",
        }}
      >
        <ReactQueryProvider>
          <RecoilWrapper>{children}</RecoilWrapper>
        </ReactQueryProvider>
        {modal}
      </body>
    </html>
  );
}
