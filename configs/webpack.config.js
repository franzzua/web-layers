const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {TsConfigPathsPlugin }  = require('awesome-typescript-loader');
module.exports = env => ({
    entry: './entry/index.ts',
    output: {
        path: require('path').join(__dirname, '../dist')
    },
    mode: env.prod ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: './configs/tsconfig.json',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        mainFields: ['module', 'main'],
        alias: {
            'store-rxjs/dist': '../../../store-rxjs'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './entry/index.html'
        }),
        new TsConfigPathsPlugin({configFile: "./configs/tsconfig.json"})
        // new BundleAnalyzerPlugin()
    ]
});