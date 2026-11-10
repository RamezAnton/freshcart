import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-categories/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-brands/**",
      },
    ],
  },
};

export default nextConfig;
