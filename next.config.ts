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
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        pathname: "/wiki/Special:FilePath/**",
      },
    ],
  },
};

export default nextConfig;
