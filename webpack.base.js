let path = require('path')
let HtmlWebpackPluging = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')

// webpack 是node写出来的，用node语法
module.exports = {

    entry: {  // 入口
        home: './src/index.js',
    },

    output: {   // 出口
        filename: "[name].[hash:8].js", // 打包后的名称, 加hash 8位
        path: path.resolve(__dirname, 'dist'),     // 路径必须是绝对路径，需要用path解析
        // publicPath: "http://www.baidu.com"
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),  // 'dev'这样写出错，会把dev作为变量使用 可以使用 "'dev'", 使用JSON.stringfy('dev')
            FLAG: 'true',  // 布尔值可以
            EXPRESSION: '1+1',  // 表达式
        }),
        new CopyWebpackPlugin([{
            from: './doc',
            to: 'doc'
        }]),
        new HtmlWebpackPluging({
            template: './src/index.html',   // 引用文件的位置
            filename: 'index.html',     // 复制后的文件名
            minify: {
                removeAttributeQuotes: true,   // 删除属性引号
                // removeComments: true,           // 删除注释
                collapseWhitespace: true,       // 单行
            },
            chunks: ['home'],
            hash: true,
        }),

        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.BannerPlugin({
            banner: '---------- ffwfe  ------------'
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
                        // limit: 100,
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

    resolve: {
        modules: [path.resolve('node_modules')],
        extensions: ['.js', '.css', '.json', '.vue']
    },

}
