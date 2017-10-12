const webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map', //对于小到中型的项目，只应该开发阶段使用它，不要再生产阶段使用它

    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle-[hash].js'
    },
    /*使用webpack构建本地服务器
     * npm install --save-dev webpack-dev-server
     * name:devServer
    */
    devServer: {
        contentBase: './public', //本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true //实时刷新,当源文件发生改变是会自动刷新页面
        //port: xxxx //设置默认端口，如果省略，默认为“8080”
    },
    /*
     * 配置Loaders
     * 功能： loaders是在打包构建的过程中用来处理源文件（JSX,Scss,Lcss,ES6等等）的
     * @params: {
     *  test: 一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
     *  loader: loader的名称（必须）
     *  include/exclude: 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
     *  query: 为loaders提供额外的设置选项（可选）
     * }
     * 温馨提示：
     * 在配置loader前，弄清楚babel是什么？
     * 因为要将babel配置进loader内。
     * babel是一个编译javascript的平台,使你允许使用ES6以及JSX语法
     * postcss是一个编译css的平台，为css代码自动添加适应不同浏览器的css前缀
     */
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                    /*options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }*/ //将options的参数写入.babelrc文件内了
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader',
                     options:{
                        modules: true //把css看成是一个模块，帮助css按需加载
                     }
                    },{
                        loader: 'postcss-loader' //一个css的处理平台，为css代码自动添加适应不同浏览器的css前缀
                    }
                ]
            }
        ]
    },

    /*
    ** plugins
    */
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.optimize.UglifyJsPlugin()//压缩js文件插件（webpack内置插件，无需安装）
    ]
};