import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  },

  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
