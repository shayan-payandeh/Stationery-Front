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
    ],
  },

  // swcMinify: true,
  // productionBrowserSourceMaps: false
};

export default nextConfig;
