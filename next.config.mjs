/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "myapi.shayan-negaresh.shop",
        pathname: "/image/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "shayan-files.storage.c2.liara.space",
        pathname: "**",
      },
    ],
  },

  // swcMinify: true,
  // productionBrowserSourceMaps: false
};

export default nextConfig;
