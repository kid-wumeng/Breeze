Router = require('./Router')
Page   = require('./Page')
util   = require('./util')



module.exports = class App



   constructor: ( isJIT ) ->

      ########################################
      #/
      #/   @params {boolean} isJIT - is the Just In Time mode ?
      #/
      ########################################

      @isJIT     = isJIT
      @router    = new Router( isJIT )
      @pageStore = {}





   run: =>

      if @isJIT
         @_loadPage()
         @router.on('redirectPage', @_loadPage)

      else
         util.dom(document.querySelector('#page'))




   _loadPage: =>

      ########################################
      #/
      #/   Load current page.
      #/
      ########################################

      path = @router.filePath
      page = @pageStore[path]

      if page
         @_mount(page)
      else
         util.ajax(path, @_renderPage)





   _renderPage: ( text ) =>

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      page = new Page(text)
      page = page.render(@router)

      @pageStore[@router.filePath] = page

      @_mount(page)




   _bindRedirectEvent: ( page ) =>







   _mount: ( page ) =>

      ########################################
      #/
      #/   @params {DOM} page
      #/
      ########################################

      old = document.querySelector('body > page')

      if old
         document.body.replaceChild( page.$el, old )
      else
         document.body.appendChild( page.$el )