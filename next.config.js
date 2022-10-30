

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  assetPrefix: './',
  images: {
    domains: ['arweave.net', 'wikipedia.org'],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
}

module.exports = nextConfig
