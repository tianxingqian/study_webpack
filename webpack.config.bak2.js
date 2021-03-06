let path = require('path')
let HtmlWebpackPluging = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let webpack = require('webpack')

// webpack 是node写出来的，用node语法

module.exports = {
    mode: 'development',          // 模式  production \ development
    entry: {  // 入口
        home: './src/index.js',
        other : './src/other.js',
    },

    output: {   // 出口
        filename: "[name].[hash:8].js", // 打包后的名称, 加hash 8位
        path: path.resolve(__dirname, 'dist'),     // 路径必须是绝对路径，需要用path解析
        // publicPath: "http://www.baidu.com"
    },

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

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPluging({
            template: './src/index.html',   // 引用文件的位置
            filename: 'home.html',     // 复制后的文件名
            minify: {
                removeAttributeQuotes: true,   // 删除属性引号
                // removeComments: true,           // 删除注释
                collapseWhitespace: true,       // 单行

            },
            chunks:['home'],
            hash: true,
        }),

        // 多入口，再new一个
        new HtmlWebpackPluging({
            template: './src/index.html',   // 引用文件的位置
            filename: 'other.html',     // 复制后的文件名
            minify: {
                removeAttributeQuotes: true,   // 删除属性引号
                // removeComments: true,           // 删除注释
                collapseWhitespace: true,       // 单行

            },
            chunks:['other'],
            hash: true,
        }),

        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],

    externals: {
        jquery: '$'
    },

    module: {
        rules: [

            {
                test: /\.html$/i,
                use: 'html-withimg-loader'
            },

            {
                test: /\.(png|jpg|gif)$/i,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1,
                        outputPath: '/img/',
                        publicPath: 'http://www.baidu.com'
                    }
                }
            },
            // {
            //   test:/\.(png|jpg|gif)$/i,
            //   use:{
            //       loader: "file-loader",
            //   }
            // },

            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },
            // {

            //js
            {
                test: /\.js$/i,
                use: {
                    loader: "babel-loader",
                    options: {  // 把 e6 转 e5
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            // '@babel/plugin-proposal-class-properties',  // 处理 js中的 class
                            ["@babel/plugin-proposal-decorators", {"legacy": true}],
                            ["@babel/plugin-proposal-class-properties", {"loose": true}],
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },

            // css-loader
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader"},
                    {loader: "postcss-loader"},
                ]
            },
            // less-loader
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader"},
                    {loader: "postcss-loader"},
                    {loader: "less-loader"},
                ]
            },
        ]
    },

    devServer: {
        port: 9000,
        progress: true,
        contentBase: './dist',
        compress: true,
    }

}
