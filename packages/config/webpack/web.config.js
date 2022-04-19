const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const { isDev } = require("./utils")

exports.sharedOptions = {
  target: "web",

  mode: process.env.NODE_ENV || "development",

  stats: "minimal",

  devtool: "source-map",

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],

    plugins: [new TsconfigPathsPlugin({})]
  },

  optimization: {
    usedExports: true
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader', exclude: /node_modules/
      },
      {
        test: /\.(js|ts|tsx|jsx)$/,
        loader: "swc-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }
    ]
  },

  plugins: [
    new SimpleProgressWebpackPlugin({ format: "minimal" }),
    new MiniCssExtractPlugin()
  ]
}
