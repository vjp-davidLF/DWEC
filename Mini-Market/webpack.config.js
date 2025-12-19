const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/pages/index.js',
    electronica: './src/js/pages/electronica.js',
    muebles: './src/js/pages/muebles.js',
    decoracion: './src/js/pages/decoracion.js',
    cesta: './src/js/pages/cesta.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,  
  },
  module: {
    rules: [
      {
        test: /\.css$/i,  
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[path][name][ext]'
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/electronica.html',
      filename: 'electronica.html',
      chunks: ['electronica'],
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/muebles.html',
      filename: 'muebles.html',
      chunks: ['muebles'],
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/decoracion.html',
      filename: 'decoracion.html',
      chunks: ['decoracion'],
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/cesta.html',
      filename: 'cesta.html',
      chunks: ['cesta'],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
      {
        directory: path.join(__dirname, 'src'),
        publicPath: '/'
      }
    ],
    port: 8080,
    hot: true,  
    open: true, 
  },
};