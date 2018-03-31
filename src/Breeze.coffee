ObservableObject = require('./ObservableObject')



module.exports = class Breeze extends ObservableObject

   ########################################
   #|
   #|   window.Breeze = new Breeze()
   #|
   ########################################





   constructor: ->

      super()

      @_options = {}

      @config('basePath', '')
      @config('common.use', false)
      @config('common.map', {})
      @config('summary.showLevel', 3)
      @config('summary.showOrderLevel', 0)
      @config('article.showOrderLevel', 0)





   config: ( name, value ) =>

      ########################################
      #/
      #/   SET   @params {string} name
      #/         @params {*}      value
      #/         @return {Breeze} this
      #/
      #/   GET   @params {string} name
      #/         @return {*}      value
      #/
      ########################################

      if value
         @_options[name] = value
         return @

      else
         return @_options[name]