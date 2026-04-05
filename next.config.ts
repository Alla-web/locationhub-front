import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "notehub-api.goit.study",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ac.goit.global",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
