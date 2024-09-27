/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 빌드 시 ESLint 검사를 비활성화
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
