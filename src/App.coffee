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
      #|
      #|   @params {boolean} isJIT - is the 'Just In Time' mode ?
      #|
      ########################################

      @_isJIT  = isJIT
      @_cache  = {}
      @_loader = new Breeze.Loader()

      if @_isJIT
         @_runJIT()
      else
         @_runStatic()





   _runStatic: =>

      ########################################
      #|
      #|   when no-JIT,
      #|      layoutPage -> bindEvents
      #|
      ########################################

      page = document.querySelector('#page')
      page = util.dom( page )

      Page.layout( page )
      new PageEventBus( page )





   _runJIT: =>

      ########################################
      #|
      #|   when JIT,
      #|      loadPage -> renderPage -> mountPage -> layoutPage -> bindEvents
      #|
      ########################################

      @_loadPage()

      Breeze.on('reload', @_loadPage)





   _loadPage: =>

      ########################################
      #|
      #|   Load page from cache or local.
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
      #|
      #|   @params {string} text
      #|
      #|   1. create
      #|   2. bind events
      #|   3. save to cache
      #|   4. mount
      #|
      ########################################

      page = new Page( text )
      page = page.render()

      @_cache[ Breeze.getPath() ] = page
      @_mountPage( page )





   _render404: =>

      console.log 'TODO: render 404'





   _mountPage: ( page ) =>

      ########################################
      #|
      #|   @params {DOM} page
      #|
      ########################################

      $new = page.element()
      $old = document.querySelector('body > #page')

      if $old
         document.body.replaceChild( $new, $old )
      else
         document.body.appendChild( $new )

      Page.layout( page )
      new PageEventBus( page )