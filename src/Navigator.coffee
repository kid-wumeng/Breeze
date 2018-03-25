marked = require('marked')
util   = require('./util')



module.exports = class Navigator



   constructor: ( markdown ) ->

      @markdown = markdown





   exist: =>

      return !!@markdown





   compile: ( markdown ) =>

      return marked( markdown )





   render: =>

      $navigator = util.element('#navigator')

      $navigator.innerHTML = @compile(@markdown)

      return $navigator
