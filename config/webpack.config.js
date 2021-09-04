const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

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
     }
   ]
 },
 plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}
