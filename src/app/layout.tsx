import Nav from "@/components/nav/nav";
import "./globals.css";
import Footer from "@/components/footer/footer";
import RecoilWrapper from "@/components/recoilWrapper";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RecoilWrapper>
          <Nav />
          {children}
          <Footer />
        </RecoilWrapper>
      </body>
    </html>
  );
}
