Side    = require('./Side')
Article = require('./Article')
Cover   = require('./Cover')
Search  = require('./Search')
Summary = require('./Summary')





module.exports = class PageEventBus

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

      @_page = page

      @_head = @_page.find('#head')
      @_side = @_page.find('#side')
      @_main = @_page.find('#main')
      @_nav  = @_page.find('#nav')

      @_cover        = @_page.find('#cover')
      @_coverButtons = @_cover.findAll('.buttons a')

      @_hamburger = @_head.find('.hamburger')

      @_search      = @_page.find('#search')
      @_searchInput = @_search.find('input')
      @_searchClear = @_search.find('.clear')
      @_searchItems = @_search.find('.items')

      @_summary      = @_page.find('#summary')
      @_summaryLinks = @_summary.findAll('a')

      @_article = @_page.find('#article')

      @_links = @_page.findAll('a')

      @_isOverSide = false
      @_isOverMain = false

      @_sectionDatas = Article.getSectionDatas( @_article )

      @_bindEvents()





   _bindEvents: =>

      ########################################
      #|
      #|   To bind all events of dom-tree.
      #|
      ########################################

      @_onLoadPage()

      window.addEventListener('scroll', @_onScrollArticle)

      @_side.on('mouseenter', => @_isOverSide = true)
      @_main.on('mouseenter', => @_isOverMain = true)
      @_side.on('mouseleave', => @_isOverSide = false)
      @_main.on('mouseleave', => @_isOverMain = false)

      @_main.on('click', @_onClickMain)
      @_hamburger.on('click', @_onClickHamburger)

      for button in @_coverButtons
          button.on('click', @_onClickCoverButton)

      for link in @_summaryLinks
          link.on('click', @_onClickSummaryLink)

      for link in @_links
          link.on('click', @_onClickLink)

      @_searchInput.on('input', @_onInputSearchInput)
      @_searchClear.on('click', @_onClickSearchClear)





   _onLoadPage: =>

      ########################################
      #|
      #|   When load the page,
      #|
      #|      1. active the summary
      #|      2. scroll the summary
      #|      3. scroll the article
      #|
      ########################################

      id = Breeze.getQuery().id

      if id
         Summary.activeTo( @_summary, id )
         Summary.scrollTo( @_summary, id )
         Article.scrollTo( @_article, id )





   _onScrollArticle: =>

      ########################################
      #|
      #|   When scroll the article,
      #|
      #|      1. redirect #id
      #|      2. active the summary
      #|      3. scroll the summary
      #|
      ########################################

      if @_article.isVisible() and @_isOverMain

         id   = Article.locateID( @_article )
         href = '#' + id

         Breeze.go( href )

         Summary.activeTo( @_summary, id )
         Summary.scrollTo( @_summary, id )





   _onClickMain: ( main ) =>

      ########################################
      #|
      #|   @params {DOM} main
      #|
      #|   When click the main ( when H5 ),
      #|      1. close side
      #|
      ########################################

      if Breeze.isH5
         Side.close( @_side )





   _onClickHamburger: ( hamburger ) =>

      ########################################
      #|
      #|   @params {DOM} hamburger
      #|
      #|   When click the head's hamburger ( when H5 ),
      #|      1. open side
      #|
      ########################################

      if Breeze.isH5
         Side.open( @_side )





   _onClickCoverButton: ( button ) =>

      ########################################
      #|
      #|   @params {DOM} button
      #|
      #|   When click the cover's button,
      #|      1. if href is current page, hide the cover
      #|
      ########################################

      href = button.attr('href')

      if href and Breeze.isCurrentPath( href )

         Cover.hide( @_cover )





   _onClickSummaryLink: ( link ) =>

      ########################################
      #|
      #|   @params {DOM} link
      #|
      #|   When click the summary's link,
      #|      1. active the summary
      #|      2. scroll the article
      #|
      ########################################

      href = link.attr('href')

      if href and Breeze.isCurrentPath( href )

         id = Breeze.resolveID( href )

         Summary.activeTo( @_summary, id )
         Article.scrollTo( @_article, id )





   _onClickLink: ( link ) =>

      ########################################
      #|
      #|   @params {DOM} link
      #|
      #|   When click any link,
      #|      1. redirect path#id | open url
      #|
      ########################################

      if href = link.attr('href')
         Breeze.go( href )





   _onInputSearchInput: ( input ) =>

      ########################################
      #|
      #|   @params {DOM} input
      #|
      #|   When input search-key,
      #|
      #|      1. find items from section-datas
      #|      2. show or hide clear
      #|      3. show or hide items
      #|      4. bind click-event of items
      #|
      ########################################

      if key = input.val().trim()

         items = Search.find( key, @_sectionDatas )
         items = Search.showItems( @_searchItems, items )

         for item in items
             item.on('click', @_onClickSearchItem.bind( @, item ))

         Search.showClear( @_searchClear )

      else
         Search.hideClear( @_searchClear )
         Search.hideItems( @_searchItems )





   _onClickSearchClear: ( clear ) =>

      ########################################
      #|
      #|   @params {DOM} clear
      #|
      #|   When click search clear-button,
      #|
      #|      1. clear input's key
      #|      2. hide items
      #|      3. hide clear
      #|
      ########################################

      Search.clear( @_searchInput )
      Search.focus( @_searchInput )
      Search.hideClear( @_searchClear )
      Search.hideItems( @_searchItems )





   _onClickSearchItem: ( item ) =>

      ########################################
      #|
      #|   @params {DOM} item
      #|
      #|   When click search item,
      #|      1. scroll the article
      #|
      ########################################

      id   = item.attr('data-id')
      href = '#' + id

      Breeze.go( href )

      Search.focus( @_searchInput )
      Article.scrollTo( @_article, id )