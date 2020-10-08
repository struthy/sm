/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");
require("@babel/polyfill");

module.exports = {
  devtool: "source-map",
  mode: "development",

  entry: {
    app: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },

  resolve: {
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx"],
  },
  externals: {
    jquery: "jQuery",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/assets/dist/",
              context: path.resolve(__dirname, "src/"),
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },

          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: "./config/",
              },
            },
          },

          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new VueLoaderPlugin(),
    new SVGSpritemapPlugin("src/images/sprites/**/*.svg", {
      output: {
        svg4everybody: true,
      },
      sprite: {
        generate: {
          use: true,
        },
      },
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "src/img"),
        to: path.resolve(__dirname, "dist/img"),
        logLevel: "trace",
      },
    ]),
  ],
};
