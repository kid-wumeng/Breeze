marked = require('marked')
util   = require('./util')



module.exports = class Summary



   constructor: ( summary ) ->

      @html = marked( summary )