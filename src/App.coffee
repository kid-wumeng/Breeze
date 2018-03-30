Bus  = require('./Bus')
Page = require('./Page')
util = require('./util')



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

      @isJIT = isJIT
      @cache = {}

      router.on('reload', @_loadPage)

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

      path = router.filePath
      page = @cache[path]

      if page
         @_mount( page )
      else
         loader.load( router.path, @_renderPage, @_render404 )






   _renderPage: ( text ) =>

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      page = new Page( text )
      page = page.render()

      @cache[router.filePath] = page

      @_mount( page )






   _render404: =>

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      console.log 'render 404'





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