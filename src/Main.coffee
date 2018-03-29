module.exports = class Main

   ########################################
   #/
   #/   window.Breeze = new Main
   #/
   ########################################





   constructor: ->

      @_config = {}

      @set('basePath', '')
      @set('article.heading.showOrder', 0)





   set: ( name, value ) =>

      ########################################
      #/
      #/   @params {string} name
      #/   @params {*}      value
      #/
      #/   @return {Main}   this
      #/
      ########################################

      @_config[name] = value

      return @





   get: ( name ) =>

      ########################################
      #/
      #/   @params {string} name
      #/   @return {string} value
      #/
      ########################################

      return @_config[name]