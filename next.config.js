const { withContentlayer } = require("next-contentlayer2");

import("./env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    json: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json'
    });
    return config;
  },
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
};

module.exports = withContentlayer(nextConfig);
