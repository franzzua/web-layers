const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');
const join = require('path').join;
const webpack = require('webpack');

module.exports = env => ({
    entry: {
        main: './entry/index.ts',
        worker: './worker/worker.ts',
        sw: './entry/service-worker.ts',
    },
    output: {
        path: join(__dirname, '../dist'),
        publicPath: "/wl"
    },
    devtool: env.prod ? false : 'source-map',
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
                loader: ['css-loader', 'less-loader'],
            },
            {
                test: /\.sass/,
                loader: ['css-loader', 'sass-loader'],
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
            // 'store-rxjs': require('path').join(__dirname, '../../store-rxjs/dist/main.js'),
            'rx': join(__dirname, '../rx.ts'),
            // '@so/di': 'A:/so/di',
            // '@so/ui': 'A:/so/ui',
            // '@so/utils': 'A:/so/utils/dist/main.js',
            // '@gm/isomorphic-domain': 'A:/web/isomorphic/domain/dist/main.js',
            // '@gm/isomorphic-core': 'A:/web/isomorphic/core'
        }
    },
    externals: [],
    plugins: [
        new HtmlWebpackPlugin({
            template: './entry/index.html',
            chunks: ['main'],
        }),
        new TsConfigPathsPlugin({configFile: "./configs/tsconfig.json"}),
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 9995
        // }),
        new CopyWebpackPlugin([
            'assets/'
        ]),
        new webpack.DefinePlugin({
            Env: {build: +new Date()}
        })
    ],
    devServer: env.prod ? {} : {
        contentBase: join(__dirname, '../dist'),
        port: 3000,
        historyApiFallback: true
    }
});