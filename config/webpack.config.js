const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require("dotenv-webpack");
const paths = require('./paths');

const StaticFolder = 'res';

const env = {
  NAME: process.env.NAME,
  TITLE: process.env.TITLE,
  DESCRIPTION: process.env.DESCRIPTION,
  TYPE: process.env.TYPE,
  IMAGE_URL: process.env.IMAGE_URL,
  IMAGE_WIDTH: process.env.IMAGE_WIDTH,
  IMAGE_HEIGHT: process.env.IMAGE_HEIGHT,
  VERSION: process.env.VERSION,
};

module.exports = {
  // Where files should be sent once they are bundled
 output: {
   path: paths.appBuild,
   filename: `${StaticFolder}/js/[name].[chunkhash:8].js`,
   chunkFilename: `${StaticFolder}/js/[name].[chunkhash:8].chunk.js`,
   publicPath: paths.servedPath,
 },
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
  port: 4200,
  // watchContentBase: true
  historyApiFallback: true,
  static: {
    directory: paths.publicPath,
  },
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       loader: 'esbuild-loader',
       include: paths.appSrc,
       exclude: /nodeModules/,
       options: {
         loader: 'jsx',
         target: 'es2015',
       },
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     },
     {
        test: /\.(png|jpg|gif|svg|json)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: `${StaticFolder}/media/[name].[hash:8].[ext]`,
            }
          },
        ],
       type: 'javascript/auto'
      },
   ]
 },
 plugins: [
  new HtmlWebpackPlugin({
    template: './src/templates/index.html'
  }),
  new InterpolateHtmlPlugin(env),
  new Dotenv({
    systemvars: true,
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
  new CompressionPlugin(),
 ],
}
