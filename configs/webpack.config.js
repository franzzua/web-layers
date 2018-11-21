const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');
module.exports = env => ({
    entry: './entry/index.ts',
    output: {
        path: require('path').join(__dirname, '../dist')
    },
    mode: env.prod ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: './framework/html-loader',
                exclude: /index\.html/
            },
            {
                test: /\.less/,
                loader: ['./framework/style-loader', 'less-loader'],
            },
            {
                test: /\.jsonx$/,
                loader: 'json-loader',
                // test: /\.json$/,
                // loader: require('json-loader/index')
            },
            {
                test: /\.ts/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: './configs/tsconfig.json',
                }
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', '.json'],
        mainFields: ['main', 'module', 'main'],
        alias: {
            // 'store-rxjs': require('path').join(__dirname, '../../store-rxjs/dist/main.js')
            'reflect-metadata': 'core-js/es7/reflect.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './entry/index.html'
        }),
        new TsConfigPathsPlugin({configFile: "./configs/tsconfig.json"}),
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 9999
        // })
    ]
});