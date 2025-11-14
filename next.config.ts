import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用 standalone 输出模式以优化 Docker 镜像大小
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
      {
        protocol: "https",
        hostname: "**.google.com",
        pathname: "/s2/favicons/**",
      },
      // 允许所有域名的 favicon
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
