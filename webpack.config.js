/**
 * This Webpack config is used for bundling files for the demo.
 */

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

console.info('process.env.NODE_ENV', JSON.stringify(process.env.NODE_ENV));

const extractSass = new ExtractTextPlugin({
    filename    : "../css/[name].css",
    disable     : process.env.NODE_ENV === "development"
});

module.exports = {
    devtool: "source-map",
    entry: {
        main: [
            "./demo/src/main.tsx?"
        ]
    },
    output: {
        path       : path.join(__dirname, '/demo/src'),
        filename   : '[name].js',
        publicPath : './demo/src'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        extractSass,
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ],
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by a TypeScript loader
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: './demo/tsconfig.json'
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                          sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    }
};