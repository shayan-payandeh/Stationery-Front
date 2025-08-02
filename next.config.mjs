/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  // swcMinify: true,
  // productionBrowserSourceMaps: false
};

export default nextConfig;
