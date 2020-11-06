/*
 * @Description:
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020-07-08 15:44
 * @LastEditors: pengxiang
 * @LastEditTime: 2020-07-08 15:44
 */

module.exports = {
    module: {
        rules: [
            // {
            //     // 使用 babel-loader 来编译处理 js 和 jsx 文件
            //     test: /\.(js|jsx)$/,
            //     use: "babel-loader",
            //     exclude: /node_modules/
            // },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/, // /\.(js|mjs|jsx|ts|tsx)$/   /\.js?x$/
                exclude: /node_modules/, // 排除目录
                loader: 'babel-loader', // 编译js文件，使之支持es新的语法特性
                options: {
                    presets: [['@babel/preset-env', {
                        modules: false,
                        targets: {
                            ie: '9',
                        },
                    }], '@babel/preset-react'], // 支持按需加载，自动支持最新 ES 版本，转换 react 语法
                    plugins: [['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }], // 装饰器语法
                        '@babel/plugin-proposal-class-properties', // 类的私有属性语法
                        '@babel/plugin-transform-runtime'] // 保证 babel-polyfill 不会污染全局环境，供编译模块复用工具函数，减少打包体积， babel-runtime 生产环境使用
                }
            }
        ]
    },
};
