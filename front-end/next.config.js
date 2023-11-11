/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `net` module
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback, // In case there are existing fallbacks
          net: false
        };
      }
  
      return config;
    }
  };
  