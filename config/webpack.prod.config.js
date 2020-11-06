/*
 * @Description:
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020-07-08 15:45
 * @LastEditors: pengxiang
 * @LastEditTime: 2020-07-08 15:45
 */

const path = require('path');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共的配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 用于将组件的css打包成单独的文件输出到`lib`目录中

const prodConfig = {
    mode: 'production', // 开发模式
    // entry: path.join(__dirname, "../src/index.js"),
    entry:{
        'index'                                : path.join(__dirname, "../src/index.js"),
        'react/components/HoverTxt'            : path.join(__dirname, "../src/react/components/HoverTxt.jsx"),
        'react/components/IBaiDuTJ'            : path.join(__dirname, "../src/react/components/IBaiDuTJ.jsx"),
        'react/components/ICNZZ'               : path.join(__dirname, "../src/react/components/ICNZZ.jsx"),
        'react/components/ImgButton'           : path.join(__dirname, "../src/react/components/ImgButton.jsx"),
        'react/components/PageAutoSizeWrapper' : path.join(__dirname, "../src/react/components/PageAutoSizeWrapper.jsx"),
        'react/components/TitleCard'           : path.join(__dirname, "../src/react/components/TitleCard.jsx"),
        'react/components/TreeList'            : path.join(__dirname, "../src/react/components/TreeList.jsx"),

        // path.join(__dirname, "../src/index.js"),
        // path.join(__dirname, "../src/components/react/HoverTxt.js"),
        // path.join(__dirname, "../src/components/react/IBaiDuTJ.js"),
        // path.join(__dirname, "../src/components/react/ICNZZ.js"),
        // path.join(__dirname, "../src/components/react/ImgButton.js"),
        // // path.join(__dirname, "../src/components/react/PageAutoSizeWrapper.js"),
        // path.join(__dirname, "../src/components/react/TitleCard.jsx"),
        // path.join(__dirname, "../src/components/react/TreeList.js"),
    },
    output: {
        // path: path.join(__dirname, "../lib/"),
        path: path.join(__dirname, "../build/"),
        // filename: "index.js",
        filename: '[name].js',
        libraryTarget: 'umd', // 采用通用模块定义
        libraryExport: 'default', // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader,'css-loader?modules'],
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         { loader: 'style-loader' },
            //         { loader: 'css-loader' },
            //         { loader: 'less-loader' }
            //     ]
            // },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: "main.min.css" // 提取后的css的文件名
            filename: "[name].min.css" // 提取后的css的文件名
        })
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // }),
    ],
    externals: { // 定义外部依赖，避免把react和react-dom打包进去
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    },
};

module.exports = merge(prodConfig, baseConfig); // 将baseConfig和prodConfig合并为一个配置
