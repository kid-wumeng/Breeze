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
      },{
         test: /\.css?$/,
         use: [{
           loader: 'style-loader'
         },{
           loader: 'css-loader',
           options: {
              minimize: true
           }
         }]
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