import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src', 'database'], 
  },
};

export default nextConfig;
