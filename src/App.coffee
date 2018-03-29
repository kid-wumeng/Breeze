ObservableObject = require('./ObservableObject')
Router           = require('./Router')
Page             = require('./Page')
util             = require('./util')



module.exports = class App

   ########################################
   #/
   #/   Be responsible for
   #/      loading pages and save them to cache,
   #/      swapping them when route is changed.
   #/
   ########################################





   constructor: ( isJIT ) ->

      ########################################
      #/
      #/   @params {boolean} isJIT - is the Just In Time mode ?
      #/
      ########################################

      @isJIT     = isJIT
      @pageCache = {}

      @router = new Router( isJIT )
      @router.on('redirect', @_loadPage)

      @_run()





   _run: =>

      if @isJIT
         @_loadPage()
      else
         util.dom(document.querySelector('#page'))





   _loadPage: =>

      ########################################
      #/
      #/   Load current page.
      #/
      ########################################

      path = @router.filePath
      page = @pageCache[path]

      if page
         @_mount( page )
      else
         util.ajax( path, @_renderPage )





   _renderPage: ( text ) =>

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      path = @router.filePath

      page = new Page( text )
      page = page.render( @router )

      @pageCache[path] = page

      @_mount( page )





   _mount: ( page ) =>

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