const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container } = require('webpack');
const { ModuleFederationPlugin } = container;

module.exports = (_, argv) => ({
    mode: argv.mode || 'development',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        publicPath: 'auto',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: { extensions: ['.ts', '.tsx', '.js'] },
    module: {
        rules: [
            { test: /\.[jt]sx?$/, exclude: /node_modules/, use: ['swc-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'mui7',
            filename: 'remoteEntry.js',
            exposes: {
                './V7Page': './src/V7Page',
            },
            shared: {
                react: { singleton: true, requiredVersion: false, strictVersion: false },
                'react-dom': { singleton: true, requiredVersion: false, strictVersion: false },
            },
        }),
        new HtmlWebpackPlugin({ template: 'public/index.html' }),
    ],
    devServer: {
        port: 4300,
        historyApiFallback: true,
        hot: true,
    },
});