let {merge} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = merge(base, {
    mode: 'development',          // 模式  production \ development

    // devtool: "source-map", // 增加映射文件，方便调试源代码; source-map,单独生成 source-map文件，出差了会标识当前报错的列和行
    devtool: "eval-source-map", // 不会产生单独的文件，但是可以显示行和列
    // devtool: "cheap-module-source-map", // 不会产生列，是一个单独的文件，可以保存起来
    // devtool: "cheap-module-eval-source-map", // 不会产生文件，打包后集成到文件中，不会产生列

    watch: true,    // 实时编译，生成实体文件
    watchOptions: { // 监控的选项
        poll: 1000, //每秒问多少次
        aggregateTimeout: 500,  // 防抖,输入后的500毫米内打包一次
        ignored: /node_modules/  // 不监控的文件
    },
    devServer: {

        // before(app){
        //     app.get('/user', (req, res)=>{
        //         res.json('{name:"will before"}')
        //     })
        // },

        port: 9000,
        progress: true,
        contentBase: './dist',
        compress: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3000', // 配置代理
        //         pathRewrite : {'/api': ''}   // 将 /api 替换成 ''
        //     }
        // }
    }
})
