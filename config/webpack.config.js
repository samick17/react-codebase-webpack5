const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const paths = require('./paths');

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NAME: process.env.NAME,
  TITLE: process.env.TITLE,
  DESCRIPTION: process.env.DESCRIPTION,
  TYPE: process.env.TYPE,
  IMAGE_URL: process.env.IMAGE_URL,
  IMAGE_WIDTH: process.env.IMAGE_WIDTH,
  IMAGE_HEIGHT: process.env.IMAGE_HEIGHT,
  VERSION: process.env.VERSION
};

module.exports = {
  // Where files should be sent once they are bundled
 output: {
   path: paths.appBuild,
   filename: 'index.bundle.js'
 },
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
   port: 4200,
   // watchContentBase: true
   historyApiFallback: true,
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       include: paths.appSrc,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     },
     {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
       type: 'javascript/auto'
      },
   ]
 },
 plugins: [
  new HtmlWebpackPlugin({
    // inject: true,
    template: './src/templates/index.html'
  }),
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, env),
 ],
}
