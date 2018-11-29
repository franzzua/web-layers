module.exports = env => ({
  entry: {
    worker: './worker.ts'
  },
  target: 'webworker',
  devtool: env === 'prod' ? 'none' : 'source-map',
  mode: env === 'prod' ? 'production' : 'development',
  output: {
    path: require('path').resolve(__dirname, '../build'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
});
