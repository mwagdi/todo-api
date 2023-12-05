import Dotenv from 'dotenv-webpack';
import path from 'path';
import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import nodeExternals from 'webpack-node-externals';

const config: Configuration = {
  name: 'server',
  entry: {
    server: './src/index.ts',
  },
  mode: (process.env.NODE_ENV as 'production' | 'development' | undefined) ?? 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    // alias: {
    //     '@client': path.resolve(__dirname, '../client'),
    //     '@queries': path.resolve(__dirname, '../queries'),
    //     '@contexts': path.resolve(__dirname, '../contexts'),
    //     '@projectTypes': path.resolve(__dirname, '../types'),
    //     '@utils': path.resolve(__dirname, '../utils'),
    // },
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'json',
      statsFilename: '../bundle.json',
      generateStatsFile: true,
    }),
  ],
};

export default config;
