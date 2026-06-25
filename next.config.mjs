/** @type {import('next').Next} */
const nextConfig = {
  output: "standalone",
  // transpilePackages: ["@heroui/react", "@heroui/theme"],
  experimental: {
    serverComponentsExternalPackages: ["@better-auth/kysely-adapter", "kysely"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
