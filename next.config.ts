import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  turbopack: { root: process.cwd() },
  transpilePackages: [
    "@emotion/react",
    "@emotion/styled",
    "@emotion/cache",
    "@mui/material-nextjs",
  ],
  onDemandEntries: { maxInactiveAge: 600_000, pagesBufferLength: 10 },
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
