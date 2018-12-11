// webpack.config.prod.js

const data = require('../data');
const paths = require('../paths');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const getClientEnvironment = require('../env');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
    mode: 'production',

    entry: paths.appIndexJs,

    output: {
        filename: 'bundle.js',
        path: __dirname,
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
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
                                    ["@babel/preset-env", {"targets": "last 2 versions, ie 11", "modules": false}]
                                ]
                            },
                            babelCore: "@babel/core"
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },

    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },

    plugins: [
        new InterpolateHtmlPlugin(env.raw),
        new StaticSiteGeneratorPlugin(data),
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
        }),
        new webpack.DefinePlugin(env.stringified),
    ]
};