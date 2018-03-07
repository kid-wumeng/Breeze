const path = require('path')


console.log();


module.exports = {

   mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

   entry: './src/index.coffee',

   output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: 'breeze.js',
      library: 'Breeze',
      libraryTarget: 'window'
   },

   module: {
      rules: [{
         test: /\.coffee?$/,
         loader: "coffee-loader"
      }]
   },

   resolve: {
      extensions: [".js", ".coffee"]
   },

   devServer: {
      open: true,
      compress: true
   }
}