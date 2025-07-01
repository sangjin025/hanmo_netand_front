import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 빌드 중에 ESLint 오류가 나도 무시하고 계속 빌드합니다
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
