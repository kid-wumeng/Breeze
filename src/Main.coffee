util = require('./util')





module.exports = class Main

   ########################################
   #|
   #|   new Main( article )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="main">
   #|   -----------------------------------
   #|
   #|   main.compile() -> html
   #|
   ########################################





   constructor: ( article ) ->

      ########################################
      #|
      #|   @params {string} article-html
      #|
      ########################################

      @article = article
      @compile = @_compile





   _compile: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      main = util.dom('#main')

      main.append( @article )

      return main.htmlSelf()