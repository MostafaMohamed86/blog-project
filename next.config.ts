import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "pastel-toad-746.convex.cloud",
        protocol: "https",
        port: "",
      },
      {
        hostname: "exuberant-caiman-398.convex.cloud",
        protocol: "https",
        port: "",
      },
      {
        hostname: "assets.aceternity.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
