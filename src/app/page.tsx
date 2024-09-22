import Home from "@/components/home/home";
import { Metadata } from "next";

// 메타 데이터 설정
export const metadata: Metadata = {
  title: "soop",
  description: "당신의 소중한 순간을 사진으로 영원히 담아드립니다.",
  openGraph: {
    title: "soop",
    description: "당신의 소중한 순간을 사진으로 영원히 담아드립니다.",
    images: ["/색있는로고.png"],
  },
};

export default function HomePage() {
  return <Home />;
}
