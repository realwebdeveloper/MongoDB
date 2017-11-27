const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'static-file'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                use: 'babel-loader',
                exclude: /node_mudules/
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 3000,
        open: true
    },
    plugins: [
        HtmlWebpackPluginConfig
    ]
}
