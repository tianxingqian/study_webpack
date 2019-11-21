let path = require('path')
let HtmlWebpackPluging = require('html-webpack-plugin')

// webpack 是node写出来的，用node语法

module.exports = {
    mode: 'development',          // 模式  production \ development
    entry: './src/index.js',    // 入口

    output: {   // 出口
        filename: "bundle.[hash:8].js", // 打包后的名称, 加hash 8位
        path: path.resolve(__dirname, 'dist')        // 路径必须是绝对路径，需要用path解析
    },

    plugins: [
        new HtmlWebpackPluging({
            template: './src/index.html',   // 引用文件的位置
            filename: 'index.html',     // 复制后的文件名
            minify: {
                removeAttributeQuotes: true,   // 删除属性引号
                removeComments: true,           // 删除注释
                collapseWhitespace: true,       // 单行

            },
            hash: true,
        })
    ],

    devServer: {
        port: 9000,
        progress: true,
        contentBase: './dist',
        compress: true,
    }

}
