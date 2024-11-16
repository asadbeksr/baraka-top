const { withContentlayer } = require("next-contentlayer2");

import("./env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: 'https',
        hostname: "www.asadbek.tech"
      },
      {
        protocol: 'https',
        hostname: "www.gazeta.uz"
      },
      {
        protocol: 'https',
        hostname: 'metanchi.uz'
      },
      {
        protocol: 'https',
        hostname: 'www.metanchi.uz'
      }
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

module.exports = withContentlayer(nextConfig);
