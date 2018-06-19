## webpack.config.js  


~~~
const webpack = require('webpack');
module.exports = {	
	devtool: 'eval-source-map', //编译生成映射，便于调试
    entry: { //入口   ps单个文件 './main.js',
        bundle1: './main1.js',
        bundle2: './main2.js'，
        bundle3: __dirname+"/app/main.js" 
    },
    output: { //出口
    	path: __dirname+"/public", //打包后的文件存放位置
        filename: '[name].js' //打包后输出文件的文件名
    },
    module: {
        rules: [
            {//Babel-loader
                test: /\.jsx?$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            }, 
            {//CSS-loader
                test: /\.css$/,
              //use: ['style-loader', 'css-loader'],
                use: [
                    {
                    	loader: 'style-loader'
                    },
                    {
                    	loader: 'css-loader',
                        options: {
                            modules: true, //指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' //指定css的类名格式，不用担心样式类名冲突
                        }
                    }, 
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所载的目录
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname+'app/index.tmpl.html' //new一个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ]
}
~~~

> ## Babel-loader
>
> 加载器是预处理器，它可以在Webpack的构建过程之前转换你的应用程序的资源文件(更多信息)。
>
> 例如,Babel-loader可以JSX / ES6文件转换成标准JS文件,之后Webpack将开始构建这些JS文件。Webpack的官方文档有一个完整的加载器列表。
>
> Babel的预设插件Babel-preset-es2015和Babel-preset-react转换编译es2015和react.

> ## CSS-loader
>
> Webpack允许你在js文件中包含CSS,然后用CSS-loader来预处理CSS文件
>
> 注意，您必须使用两个加载器来转换CSS文件。首先是CSS-loader来读取CSS文件，另一个是样式加载器将<style>标签插入HTML中。 

>**注**：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。 

>## 生成Source Maps (使调试更容易)
>
>开发总是离不开调试，方便的调试能极大的提高开发效率，不过有时候通过打包后的文件，你是不容易找到出错了的地方，对应的你写的代码的位置的，`Source Maps`就是来帮我们解决这个问题的。
>
>通过简单的配置，`webpack`就可以在打包时为我们生成的`source maps`，这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。
>
>在`webpack`的配置文件中配置`source maps`，需要配置`devtool`，它有以下四种不同的配置选项，各具优缺点，描述如下：
>
> 
>
>| devtool选项                    | 配置结果                                                     |
>| ------------------------------ | ------------------------------------------------------------ |
>| `source-map`                   | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的`source map`，但是它会减慢打包速度； |
>| `cheap-module-source-map`      | 在一个单独的文件中生成一个不带列映射的`map`，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便； |
>| `eval-source-map`              | 使用`eval`打包源文件模块，在同一个文件中生成干净的完整的`source map`。这个选项可以在不影响构建速度的前提下生成完整的`sourcemap`，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项； |
>| `cheap-module-eval-source-map` | 这是在打包文件时最快的生成`source map`的方法，生成的`Source Map` 会和打包后的`JavaScript`文件同行显示，没有列映射，和`eval-source-map`选项具有相似的缺点； |
>
>正如上表所述，上述选项由上到下打包速度越来越快，不过同时也具有越来越多的负面作用，较快的打包速度的后果就是对打包后的文件的的执行有一定影响。
>
>对小到中型的项目中，`eval-source-map`是一个很好的选项，再次强调你只应该开发阶段使用它，我们继续对上文新建的`webpack.config.js`

>## 使用webpack构建本地服务器
>
>想不想让你的浏览器监听你的代码的修改，并自动刷新显示修改后的结果，其实`Webpack`提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖
>
>```
>npm install --save-dev webpack-dev-server
>```
>
>devserver作为webpack配置选项中的一项，以下是它的一些配置选项，更多配置可参考[这里](https://link.jianshu.com?t=https://webpack.js.org/configuration/dev-server/)
>
>| devserver的配置选项 | 功能描述                                                     |
>| ------------------- | ------------------------------------------------------------ |
>| contentBase         | 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录） |
>| port                | 设置默认监听端口，如果省略，默认为”8080“                     |
>| inline              | 设置为`true`，当源文件改变时会自动刷新页面                   |
>| historyApiFallback  | 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为`true`，所有的跳转将指向index.html |
>
>把这些命令加到webpack的配置文件中，现在的配置文件`webpack.config.js`

> ## CSS
>
> webpack提供两个工具处理样式表，`css-loader` 和 `style-loader`，二者处理的任务不同，`css-loader`使你能够使用类似`@import` 和 `url(...)`的方法实现 `require()`的功能,`style-loader`将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

> ## CSS预处理器
>
> `Sass` 和 `Less` 之类的预处理器是对原生CSS的拓展，它们允许你使用类似于`variables`, `nesting`, `mixins`, `inheritance`等不存在于CSS中的特性来写CSS，CSS预处理器可以这些特殊类型的语句转化为浏览器可识别的CSS语句，
>
> 你现在可能都已经熟悉了，在webpack里使用相关loaders进行配置就可以使用了，以下是常用的CSS 处理`loaders`:
>
> - `Less Loader`
> - `Sass Loader`
> - `Stylus Loader`
>
> 不过其实也存在一个CSS的处理平台`-PostCSS`，它可以帮助你的CSS实现更多的功能，在其[官方文档](https://link.jianshu.com?t=https://github.com/postcss/postcss)可了解更多相关知识。
>
> 举例来说如何使用PostCSS，我们使用PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀。
>
> 首先安装`postcss-loader` 和 `autoprefixer`（自动添加前缀的插件）
>
> ```
> npm install --save-dev postcss-loader autoprefixer
> ```
>
> 接下来，在webpack配置文件中添加`postcss-loader`，在根目录新建`postcss.config.js`,并添加如下代码之后，重新使用`npm start`打包时，你写的css会自动根据Can i use里的数据添加不同前缀了。
>
> ```
> // postcss.config.js
> module.exports = {
>     plugins: [
>         require('autoprefixer')
>     ]
> }
> ```
