require('dotenv').config();
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// import Environment from './src/helpers/environment';
// const Enums = require('./src/enums');

// const Environment = require('@/helpers/environment');
// const file = await fs.readFileSync('./src/helpers/environment.ts', {
// });
// process.exit();

// const now = Date.now();

if (process.env.NODE_ENV === 'production') {
  const buildLogPath = path.resolve('logs', 'build.log');
  const buildLogString = `
    Nodejs Process version: ${process.version}
    Current directory: ${__dirname}
    APP ENV: ${process.env.APP_ENV}
    Node ENV: ${process.env.NODE_ENV}
    Build excute at: ${new Date()}
  `;
  if (!fs.existsSync('logs')) fs.mkdirSync('logs');
  if (!fs.existsSync(buildLogPath)) {
    return fs.writeFileSync(buildLogPath, buildLogString, {
      encoding: 'utf-8',
    });
  }
  fs.appendFileSync(buildLogPath, buildLogString);
}

module.exports = {
  mode: process.env.NODE_ENV,
  // Webpack의 출력물에서 디버깅을 하기위해 소스 맵을 허용합니다.
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src'),
  output: {
    filename: 'bundle-[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: ['ts-loader' /*,'babel-loader?cacheDirectory'*/],
        exclude: /node_modules/,
      },
      {
        test: /\.css/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[contenthash].[ext]',
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js(x?)$/,
        loader: 'source-map-loader',
      },
    ],
  },
  devServer: {
    disableHostCheck: true,
    writeToDisk: (filePath) => /\.(jpg|jpeg|svg|gif|png)$/.test(filePath),
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: process.env.port || 3000,
    open: false,
    host: process.env.APP_HOST,
    hot: true,
  },
  plugins: [
    /**
    new webpack.ProgressPlugin({
      handler: function (percentage, msg, ...args) {
        fs.appendFileSync(
          `logs/build.${now}.log`,
          `[${percentage * 100}%]\n${msg}\n\n`
        );
      },
    }),
     */
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      cache: true,
    }),
  ],
};
