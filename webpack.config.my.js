let path = require('path')

// webpack 是node写出来的，用node语法

module.exports = {
    mode: 'development',          // 模式  production \ development
    entry: './src/index.js',    // 入口

    output: {   // 出口
        filename: "bundle.js", // 打包后的名称
        path: path.resolve(__dirname, 'dist')        // 路径必须是绝对路径，需要用path解析
    }
}
