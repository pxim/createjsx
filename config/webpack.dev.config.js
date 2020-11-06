/*
 * @Description:
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020-07-08 15:44
 * @LastEditors: pengxiang
 * @LastEditTime: 2020-07-08 15:44
 */

const path = require('path');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共配置

const devConfig = {
    mode: 'development', // 开发模式
    devtool: 'inline-source-map',
    // entry: path.join(__dirname, "../example/src/app.js"), // 项目入口，处理资源文件的依赖关系
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
        // path: path.join(__dirname, "../example/src/"),
        // filename: "bundle.js", // 使用webpack-dev-sevrer启动开发服务时，并不会实际在`src`目录下生成bundle.js，打包好的文件是在内存中的，但并不影响我们使用。
        path: path.join(__dirname, "../build/"),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader','css-loader?modules'],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '../example/src/'),
        compress: true,
        port: 3001, // 启动端口为 3001 的服务
        open: true // 自动打开浏览器
    },
};
module.exports = merge(devConfig, baseConfig); // 将baseConfig和devConfig合并为一个配置
