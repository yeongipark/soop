import Nav from "@/components/nav/nav";
import "./globals.css";
import Footer from "@/components/footer/footer";
import RecoilWrapper from "@/components/recoilWrapper";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RecoilWrapper>
          <Nav />
          {children}
          <Footer />
        </RecoilWrapper>
        {modal}
      </body>
    </html>
  );
}
