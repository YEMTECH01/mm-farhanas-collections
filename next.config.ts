import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // This tells Next.js to allow local images from the public folder
    unoptimized: true,
  },
};

export default nextConfig;
