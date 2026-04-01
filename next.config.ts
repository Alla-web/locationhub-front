import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "ftp.goit.study",
      },
    ],
  },
};

export default nextConfig;
