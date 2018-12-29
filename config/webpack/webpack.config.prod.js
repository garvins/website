// webpack.config.prod.js

const data = require('../data');
const paths = require('../paths');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const getClientEnvironment = require('../env');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
    mode: 'production',

    entry: paths.appIndex,

    output: {
        filename: '[name].js',
        path: paths.appBuild,
        libraryTarget: 'umd',
        globalObject: "this"
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(ts|tsx)$/,
                        include: paths.appSrc,
                        use: [
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    configFileName: paths.appTsConfig,
                                    useBabel: true,
                                    babelOptions: {
                                        babelrc: false, /* Important line */
                                        presets: [
                                            ["@babel/preset-env", {
                                                "targets": "last 2 versions, ie 11",
                                                "modules": false
                                            }]
                                        ]
                                    },
                                    babelCore: "@babel/core"
                                },

                            }
                        ]
                    },
                    {
                        test: /\.css$/,
                        include: paths.appSrc,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {loader: 'css-loader'},
                        ]
                    },
                    {
                        test: /\.less$/,
                        include: paths.appSrc,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1
                                }
                            },
                            {loader: "less-loader"}
                        ]
                    },
                    {
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ]
            }
        ]
    },

    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },

    plugins: [
        /*
        new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'dist'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 375,
            height: 565,
            penthouse: {
                blockJSRequests: false,
            }
        }),*/
        new webpack.DefinePlugin(env.stringified),
        new MiniCssExtractPlugin({filename: "[name].css"}),
        new StaticSiteGeneratorPlugin(data),
    ],

    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};