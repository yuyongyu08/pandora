const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        tagcanvas: './src/lib/tagcanvas/tagcanvas.min',
        main: './src/index'
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[hash:8].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css']
    },
    devServer:{
        contentBase: './build'
    },
    module: {
        rules: [
            {
                test: /\.vue/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html")
        })
    ]
};