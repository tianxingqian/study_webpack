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
    mode: 'development',          // 模式  production \ development
    entry: {  // 入口
        home: './src/index.js',
    },

    watch: true,    // 实时编译，生成实体文件
    watchOptions: { // 监控的选项
        poll: 1000, //每秒问多少次
        aggregateTimeout: 500,  // 防抖,输入后的500毫米内打包一次
        ignored: /node_modules/  // 不监控的文件
    },
    // devtool: "source-map", // 增加映射文件，方便调试源代码; source-map,单独生成 source-map文件，出差了会标识当前报错的列和行
    devtool: "eval-source-map", // 不会产生单独的文件，但是可以显示行和列
    // devtool: "cheap-module-source-map", // 不会产生列，是一个单独的文件，可以保存起来
    // devtool: "cheap-module-eval-source-map", // 不会产生文件，打包后集成到文件中，不会产生列


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
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),  // 'dev'这样写出错，会把dev作为变量使用 可以使用 "'dev'", 使用JSON.stringfy('dev')
            FLAG: 'true',  // 布尔值可以
            EXPRESSION : '1+1',  // 表达式
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

}
