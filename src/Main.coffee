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
   #|   Main.setTop( main )
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





Main.setTop = ( main ) =>

   ########################################
   #|
   #|   @params {DOM} main
   #|
   ########################################

   main.css('paddingTop', Breeze.headHeight + 'px')