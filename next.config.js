// const nextConfig = {
//   reactStrictMode: false,
//   trailingSlash: true,
//   assetPrefix: './',
//   images: {
//     domains: ['arweave.net', 'wikipedia.org'],
//   },
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false };
//     return config;
//   },
// }

// module.exports = nextConfig

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ["."],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: false,
});
