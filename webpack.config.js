const webpack = require("webpack");
const process = require('process');
const path = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PUBLIC_PATH='/spellchecker/assets/';
const OUTPUT_DIRECTORY = __dirname + `/public/${PUBLIC_PATH}`;

const BABEL_PRESET = {
  loader: 'babel-loader',
  options: {
    presets: ["@babel/preset-env"]
  }
};

const config = process.env.NODE_ENV == 'production' ? {
    outputFileName: (suffix) => `[name]-[hash:20].${suffix}`,
    compressJSPlugins: [
      new UglifyJSPlugin()
    ],
    outputPublicPath: PUBLIC_PATH,
  } : {
    outputFileName: (suffix) => `[name].${suffix}`,
    compressJSPlugins: [
      new webpack.NamedModulesPlugin()
    ],
    outputPublicPath: PUBLIC_PATH,
  };

module.exports = {
    entry: {
      app: "./app.js",
    },
    output: {
        path: OUTPUT_DIRECTORY,
        filename: config.outputFileName("js"),
        publicPath: config.outputPublicPath,
    },
    module: {
      rules: [
        { test: /\.js?$/, exclude: /node_modules/, use: BABEL_PRESET },
        {
          test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
          loader: "file-loader",
          query: {
            context: './app/assets',
            name: config.outputFileName("[ext]")
          }
        }
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({ NODE_ENV: 'development'}),
      new ManifestPlugin({ fileName: '../../../asset-manifest.json', publicPath: PUBLIC_PATH, writeToFileEmit: true })
    ].concat(config.compressJSPlugins),
    target: "node",
    devServer: {
      headers: {"Access-Control-Allow-Origin": "*"}
    }
};