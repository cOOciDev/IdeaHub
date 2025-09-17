// client/webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    publicPath: "/",
    clean: true,
  },

  resolve: { extensions: [".ts", ".tsx", ".js"] },

  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: true,
              importLoaders: 1,
              modules: { auto: /\.module\.(scss|css)$/i },
            },
          },
          {
            loader: "sass-loader",
            options: { implementation: require("sass-embedded") },
          },
        ],
      },
      { test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/i, type: "asset" },
    ],
  },

  devServer: {
    static: path.join(__dirname, "public"),
    historyApiFallback: true,
    port: 3000,
    client: { overlay: { warnings: false, errors: true } },
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new Dotenv({ systemvars: true }),
  ],
};
