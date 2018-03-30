module.exports = class Breeze

   ########################################
   #/
   #/   window.Breeze = new Breeze()
   #/
   ########################################





   constructor: ->

      @_options = {}

      @config('basePath', '')
      @config('summary.showLevel', 3)
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