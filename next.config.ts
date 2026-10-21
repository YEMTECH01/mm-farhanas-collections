import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // <-- Add this
  },
  // ... your other config (images, etc.)
};

export default nextConfig;
