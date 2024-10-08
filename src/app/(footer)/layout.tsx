import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
