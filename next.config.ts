import MDX from "@next/mdx";
import type { NextConfig } from "next/types";

const withMDX = MDX();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: process.env.DOCKER ? "standalone" : undefined,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-blob-store.public.blob.vercel-storage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ytnv6xxemstkzalq.public.blob.vercel-storage.com",
        port: "",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["next-mdx-remote", "commerce-kit"],
  experimental: {
    esmExternals: true,
    scrollRestoration: true,
    cpus: 1,
    reactOwnerStack: true,
    reactCompiler: true,
    mdxRs: true,
    inlineCss: true,
  },
  webpack: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensionAlias: {
          ".js": [".js", ".ts"],
          ".jsx": [".jsx", ".tsx"],
        },
      },
    };
  },
  rewrites: async () => [
    {
      source: "/stats/:match*",
      destination: "https://eu.umami.is/:match*",
    },
  ],
};

export default withMDX(nextConfig);
