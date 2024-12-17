import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["drive.google.com"],
    dangerouslyAllowSVG: true, // Enable SVG support
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Add external domains (if needed)
  },

  webpack: (config) => {
    // Ignore HTML files from being bundled
    config.module?.rules.push({
      test: /\.html$/,
      use: 'ignore-loader', // This loader will skip processing HTML files
    });

    return config;
  },
};

export default nextConfig;
