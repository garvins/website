// webpack.config.dev.js

const data = require('../data');
const paths = require('../paths');
const getClientEnvironment = require('../env');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
    mode: 'development',

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
                enforce: 'pre',
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('source-map-loader'),
                include: paths.appSrc,
            },
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
                            MiniCssExtractPlugin.loader, //'isomorphic-style-loader',
                            {loader: 'css-loader'},
                        ]
                    },
                    {
                        test: /\.less$/,
                        include: paths.appSrc,
                        use: [
                            MiniCssExtractPlugin.loader, //'isomorphic-style-loader',
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

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin(env.stringified),
        new webpack.HotModuleReplacementPlugin({}),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
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