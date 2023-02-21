const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
          "url-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/favicon.svg", to: "favicon.svg" },
        { from: "public/manifest.json", to: "manifest.json" },
      ],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    preferRelative: true,
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      constants: require.resolve("constants-browserify"),
      "crypto-browserify": require.resolve("crypto-browserify"),
      os: false,
    },
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      process: "process/browser",
      app: path.resolve(__dirname, "src/app/"),
      assets: path.resolve(__dirname, "src/assets/"),
      clients: path.resolve(__dirname, "src/clients/"),
      collections: path.resolve(__dirname, "src/collections/"),
      components: path.resolve(__dirname, "src/components/"),
      filters: path.resolve(__dirname, "src/filters/"),
      global: path.resolve(__dirname, "src/global/"),
      gql: path.resolve(__dirname, "src/gql/"),
      helpers: path.resolve(__dirname, "src/helpers/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      navigation: path.resolve(__dirname, "src/navigation/"),
      providers: path.resolve(__dirname, "src/providers/"),
      root: path.resolve(__dirname, "src/root/"),
      routes: path.resolve(__dirname, "src/routes/"),
      search: path.resolve(__dirname, "src/search/"),
      state: path.resolve(__dirname, "src/state/"),
      views: path.resolve(__dirname, "src/views/"),
      wallet: path.resolve(__dirname, "src/wallet/"),
      wrappers: path.resolve(__dirname, "src/wrappers/"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
