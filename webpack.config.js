const webpack = require('webpack');
const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    mode: "development",
    entry: {
        index: ["babel-polyfill","./examples/spa/src/index.js"],
    },
    output: {
        path: path.resolve(__dirname, './examples/spa/dist'),
        filename: 'index.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                ]
            },
            //图片 loader
            {
                test: /\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use: [{
                    loader: 'url-loader', //是指定使用的loader和loader的配置参数
                    options: {
                        limit: 500  //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }]
            },
            //babel 配置
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // new uglify(),//压缩js
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuetes: true,
            },
            // hash: true,
            template: "./examples/spa/index.html"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        host: 'localhost',
        compress: true,
        inline: true,
        port: 3002
    }
};