Page         = require('./Page')
PageEventBus = require('./PageEventBus')
util         = require('./util')





module.exports = class App

   ########################################
   #|
   #|   new App( isJIT )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       managing pages and swapping them when necessary.
   #|   -----------------------------------
   #|
   ########################################





   constructor: ( isJIT = false ) ->

      ########################################
      #/
      #/   @params {boolean} isJIT - is the 'Just In Time' mode ?
      #/
      ########################################

      @_isJIT  = isJIT
      @_cache  = {}
      @_loader = new Breeze.Loader()

      @_run()





   _run: =>

      ########################################
      #|
      #|   when JIT,
      #|      load -> render -> mount -> bindEvents
      #|
      #|   when no-JIT,
      #|      bindEvents
      #|
      ########################################

      if @_isJIT
         @_loadPage()


         Breeze.on('reload', @_loadPage)

      else
         util.dom(document.querySelector('#page'))





   _loadPage: =>

      ########################################
      #|
      #|   @params {function} done( page-dom )
      #|   @params {function} fail()
      #|
      ########################################

      path = Breeze.getPath()
      page = @_cache[ path ]

      if page
         @_mountPage( page )
      else
         @_loader.load( path, @_renderPage, @_render404 )




   _renderPage: ( text ) =>

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      page = new Page( text )
      page = page.render()

      new PageEventBus( page )

      @_cache[ Breeze.getPath() ] = page
      @_mountPage( page )





   _render404: =>

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      console.log 'TODO: render 404'





   _mountPage: ( page ) =>

      ########################################
      #/
      #/   @params {DOM} page
      #/
      ########################################

      old = document.querySelector('body > #page')

      if old
         document.body.replaceChild( page.$el, old )
      else
         document.body.appendChild( page.$el )