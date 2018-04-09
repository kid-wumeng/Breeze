ObservableObject = require('./ObservableObject')





module.exports = class Breeze extends ObservableObject

   ########################################
   #|
   #|   window.Breeze = new Breeze()
   #|
   #|   -----------------------------------
   #|    The main module be exported,
   #|        will bind some methods in index.coffee,
   #|
   #|    Set the default options in here.
   #|   -----------------------------------
   #|
   #|   Breeze.config( name, value ) -> this
   #|   Breeze.config( name )        -> value
   #|
   ########################################





   constructor: ->

      super()

      @_options = {}

      @_config('basePath', '')
      @_config('useCommon', false)
      @_config('summary.showLevel', 3)
      @_config('summary.showOrderLevel', 0)
      @_config('article.showOrderLevel', 0)

      @config = @_config





   _config: ( name, value ) =>

      ########################################
      #|
      #|   SET   @params {string} name
      #|         @params {*}      value
      #|         @return {Breeze} this
      #|
      #|   GET   @params {string} name
      #|         @return {*}      value
      #|
      ########################################

      if value
         @_options[name] = value
         return @

      else
         return @_options[name]