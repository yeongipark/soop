import Nav from "@/components/nav/nav";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
