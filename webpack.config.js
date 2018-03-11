const path = require('path')



module.exports = {

   mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

   entry: './src/index.coffee',

   output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: 'breeze-webpack.js',
      library: 'Breeze',
      libraryTarget: 'window'
   },

   module: {
      rules: [{
         test: /\.coffee?$/,
         loader: 'coffee-loader'
      }]
   },

   resolve: {
      extensions: ['.js', '.coffee', '.css']
   },

   devServer: {
      open: true,
      compress: true
   }
}