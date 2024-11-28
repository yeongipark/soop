import BackNav from "@/components/nav/backNav";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <BackNav />
      {children}
    </div>
  );
}
