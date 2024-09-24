import "./globals.css";
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
        <RecoilWrapper>{children}</RecoilWrapper>
        {modal}
      </body>
    </html>
  );
}
