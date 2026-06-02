import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
    ],
  },
};

export default withPayload(nextConfig);
