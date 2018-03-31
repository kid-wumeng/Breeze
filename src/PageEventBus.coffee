ObservableObject = require('./ObservableObject')
Article          = require('./Article')





module.exports = class PageEventBus extends ObservableObject

   ########################################
   #|
   #|   new PageEventBus( page-dom )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       binding and handling all events in this page.
   #|   -----------------------------------
   #|
   ########################################





   constructor: ( page ) ->

      ########################################
      #|
      #|   @params {DOM} page
      #|
      ########################################

      super()

      @_page    = page
      @_main    = page.find('#main')
      @_side    = page.find('#side')
      @_nav     = page.find('#nav')
      @_cover   = page.find('#cover')
      @_summary = page.find('#summary')
      @_article = page.find('#article')
      @_links   = page.findAll('a')

      @_summaryLinks = @_summary.findAll('a')

      @_overSide = false
      @_overMain = false

      @_bindEvents()





   _bindEvents: =>

      ########################################
      #|
      #|   To bind all events of dom-tree.
      #|
      ########################################

      window.addEventListener('scroll', @_onScrollArticle)

      @_side.on('mouseenter', => @_overSide = true)
      @_main.on('mouseenter', => @_overMain = true)
      @_side.on('mouseleave', => @_overSide = false)
      @_main.on('mouseleave', => @_overMain = false)

      for link in @_links
          link.on('click', @_onClickLink)

      for link in @_summaryLinks
          link.on('click', @_onClickSummaryLink)





   _onScrollArticle: =>

      ########################################
      #|
      #|   When scroll the article,
      #|      1. redirect #id
      #|
      ########################################

      if @_article.isVisible()

         id = Article.locateID( @_article )
         href = '#' + id

         Breeze.go( href )





   _onClickLink: ( link ) =>

      ########################################
      #|
      #|   When click any link,
      #|      1. redirect path#id | open url
      #|
      ########################################

      if href = link.attr('href')
         Breeze.go( href )





   _onClickSummaryLink: ( link )=>

      ########################################
      #|
      #|   When click the summary's link,
      #|      1. scroll the article
      #|
      ########################################

      href = link.attr('href')

      if href and Breeze.isCurrentPath( href )

         id = Breeze.resolveID( href )

         Article.scrollTo( @_article, id )