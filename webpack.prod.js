let {merge} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = merge(base, {
    mode: 'production',          // 模式  production \ development
    optimization: { // 优化项
        minimizer: [
            new OptimizeCssPlugin(),
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // 调试时用
            })
        ]
    },
    plugins:[

    ]
})
