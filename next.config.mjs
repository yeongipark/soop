/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 검사 비활성화
  },
  images: {
    unoptimized: true,
    // 허용할 외부 이미지 도메인을 remotePatterns로 설정
    remotePatterns: [
      {
        protocol: "https", // 이미지가 제공되는 프로토콜
        hostname: "soopfoto.s3.ap-northeast-2.amazonaws.com", // 호스트 이름
        port: "", // 포트가 없으면 빈 문자열로 남김
        pathname: "/**", // 경로 전체를 허용
      },
    ],
  },
};

export default nextConfig;
