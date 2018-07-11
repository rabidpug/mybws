/* eslint-disable */
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Critters = require('critters-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
require('dotenv').config()
const path = require('path')

const webpack = require('webpack')

module.exports = (env, argv = {}) => {
  const isProd = argv.mode === 'production'

  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      overlay: true,
      port: 9000,
      proxy: {
        '/v1': 'http://localhost:8090',
      },
      watchOptions: { poll: true },
    },
    entry: {
      index: ['babel-polyfill', path.join(__dirname, 'src', 'index.jsx')],
    },
    module: {
      rules: [
        {
          include: path.join(__dirname, 'src'),
          test: /\.(js|jsx)$/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            { loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: true,
                sourceMap: isProd,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                modules: true,
                sourceMap: !isProd,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            { loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader' },
            {
              loader: 'css-loader',
              options: { sourceMap: !isProd },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: !isProd },
            },
          ],
        },
        {
          test: [
            /\.bmp$/,
            /\.gif$/,
            /\.svg$/,
            /\.jpe?g$/,
            /\.png$/,
            /\.ttf$/,
            /\.woff$/,
            /\.woff2$/,
            /\.eot$/,
            /\.svg$/,
          ],
          use: {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 10000,
              name: isProd ? 'assets/[name].[hash:8].[ext]' : 'assets/[name].[ext]',
            },
          },
        },
      ],
    },
    optimization: {
      minimizer: isProd
        ? [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              uglifyOptions: {
                compress: true,
                ecma: 6,
                mangle: true,
                passes: 1,
              },
            }),
            new OptimizeCssAssetsPlugin({
              assetNameRegExp: /\.css$/g,
              canPrint: true,
              cssProcessor: require('cssnano'),
              cssProcessorOptions: { preset: 'advanced' },
            }),
          ]
        : [],
      splitChunks: {
        cacheGroups: {
          styles: {
            chunks: 'all',
            enforce: true,
            name: 'styles',
            test: /\.css$/,
          },
        },
        chunks: 'all',
      },
    },
    output: {
      filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
      path: path.resolve('dist'),
      publicPath: '/',
    },
    plugins: [
      new CompressionPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
      }),
      new HtmlWebPackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src', 'index.html'),
        title: 'myBWS',
      }),
      new MiniCssExtractPlugin({
        chunkFilename: isProd ? 'styles/[id].[hash].css' : 'styles/[id].css',
        filename: isProd ? 'styles/[name].[hash].css' : 'styles/[name].css',
      }),
      new ManifestPlugin({ fileName: 'asset-manifest.json' }),
      new SWPrecacheWebpackPlugin({
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        importScripts: ['swPush.js'],
        logger(message) {
          if (message.indexOf('Total precache size is') === 0) return

          console.log(message)
        },
        minify: true,
        navigateFallback: '/index.html',
        navigateFallbackWhitelist: [/^(?!.*v[1-9]{1,})/],
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }),
      new CopyWebpackPlugin([{ from: path.join(__dirname, 'src', 'static') }]),
      new Critters(),
      ...(isProd ? [] : [new webpack.HotModuleReplacementPlugin()]),
      // new BundleAnalyzerPlugin(),
    ],
    resolve: {
      alias: {
        Assets: path.resolve('src', 'assets'),
        Common: path.resolve('src', 'common'),
        Components: path.resolve('src', 'components'),
        Store: path.resolve('src', 'store'),
        '~': path.resolve('src'),
      },
      extensions: ['.js', '.jsx'],
    },
    target: 'web',
    watch: !isProd,
  }
}
