Bus          = require('./Bus')
Page         = require('./Page')
PageEventBus = require('./PageEventBus')
util         = require('./util')



module.exports = class App

   ########################################
   #/
   #/   Be responsible for
   #/      loading pages and save them to _pageCache,
   #/      swapping them when route is changed.
   #/
   ########################################





   constructor: ( isJIT ) ->

      ########################################
      #/
      #/   @params {boolean} isJIT - is the 'Just In Time' mode ?
      #/
      ########################################

      @isJIT = isJIT

      @_pageCache = {}

      @_run()





   _run: =>

      if @isJIT

         @_loadPage()

         Breeze.on('reload', @_loadPage)

      else
         util.dom(document.querySelector('#page'))





   _loadPage: =>

      page = @_pageCache[ Breeze.getPath() ]

      if page
         @_mountPage( page )
      else
         loader.load( Breeze.getPath(), @_renderPage, @_render404 )






   _renderPage: ( text ) =>

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      page = new Page( text )
      page = page.render()

      @_pageCache[ Breeze.getPath() ] = page

      @_mountPage( page )





   _render404: =>

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      console.log 'render 404'





   _mountPage: ( page ) =>

      ########################################
      #/
      #/   @params {DOM} page
      #/
      ########################################

      new PageEventBus( page )

      old = document.querySelector('body > #page')

      if old
         document.body.replaceChild( page.$el, old )
      else
         document.body.appendChild( page.$el )