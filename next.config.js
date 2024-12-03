// @ts-check
const { withContentlayer } = require("next-contentlayer2");
const withNextIntl = require('next-intl/plugin')('./i18n/i18n.ts');

import("./env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports =  withNextIntl(withContentlayer(nextConfig));

