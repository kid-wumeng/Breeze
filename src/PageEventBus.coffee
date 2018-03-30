ObservableObject = require('./ObservableObject')
Article          = require('./Article')



module.exports = class PageEventBus extends ObservableObject



   constructor: ( page ) ->

      ########################################
      #/
      #/   < EventBus >
      #/
      #/   This is an event bus for dom-tree.
      #/   One page need one bus.
      #/
      #/   @params {DOM} page
      #/
      ########################################

      super()

      @_page = page

      @_main    = page.find('#main')
      @_side    = page.find('#side')
      @_nav     = page.find('#nav')
      @_cover   = page.find('#cover')
      @_summary = page.find('#summary')
      @_article = page.find('#article')

      @_links   = page.findAll('a')

      @_overSide = false
      @_overMain = false

      @_bindWindowEvents()
      @_bindSideEvents()
      @_bindMainEvents()
      @_bindArticleEvents()
      @_bindLinkEvents()





   _bindWindowEvents: =>

      window.addEventListener 'scroll', =>
         @emit('window.scroll') if @_page.isVisible()





   _bindSideEvents: =>

      @_side.on('mouseenter', => @_overSide = true)
      @_side.on('mouseleave', => @_overSide = false)





   _bindMainEvents: =>

      @_main.on('mouseenter', => @_overMain = true)
      @_main.on('mouseleave', => @_overMain = false)





   _bindArticleEvents: =>

      @on 'window.scroll', =>

         id = Article.locateID( @_article )





   _bindLinkEvents: =>

      for link in @_links
          link.on 'click', ( link ) =>
             href = link.attr('href')
             Breeze.go( href )