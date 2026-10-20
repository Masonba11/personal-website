import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  async redirects() {
    return [
      {
        source: "/business/digital-marketing",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/education",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/test",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
