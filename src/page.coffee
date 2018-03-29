ObservableObject = require('./ObservableObject')
Markdown         = require('./Markdown')
Navigator        = require('./Navigator')
Cover            = require('./Cover')
Summary          = require('./Summary')
Article          = require('./Article')
Search           = require('./Search')
util             = require('./util')



module.exports = class Page extends ObservableObject



   constructor: ( text, common = '' ) ->

      super()

      @text = text + common

      # super()
      #
      # @isOverMain = false
      #
      # @$root = util.element('#root')
      # @$side = util.element('#side')
      # @$main = util.element('#main')




         # @navigator = new Navigator(navigator)
         # @article   = new Article(article)
         # @summary   = new Summary(@article.summary)
         # @search    = new Search(@article.$sections)
         #
         # @article.on('scroll', ( id ) => if @isOverMain then @rehash( id ))
         # @article.on('scroll', ( id ) => if @isOverMain then @summary.scroll( id ))
         # @article.on('scroll', ( id ) => if @isOverMain then @summary.active( id ))
         #
         # @cover.on('select', @rehash)
         #
         # @summary.on('select', @rehash)
         # @summary.on('select', @summary.active)
         # @summary.on('select', @article.scroll)
         #
         # @search.on('select',  @rehash)
         # @search.on('select',  @article.scroll)
         #
         # @ready()
         # @render()
         #
         # if @query.id
         #    @article.scroll(@query.id)
         #    @summary.scroll(@query.id)
         #    @summary.active(@query.id)





   parse: =>

      ########################################
      #/
      #/   @return {object} - {Nav}     nav
      #/                      {Cover}   cover
      #/                      {Summary} summary
      #/                      {Article} article
      #/
      ########################################

      markdown = new Markdown(@text)

      { nav, cover, summary, article } = markdown.parse()

      cover   = new Cover(cover)
      summary = new Summary(summary)
      article = new Article(article)

      return { nav, cover, summary, article }





   compile: =>

      { nav, cover, summary, article } = @parse()

      page = util.dom('#page')
      side = util.dom('#side')
      main = util.dom('#main')

      page.append(cover.compile()) if cover.exist()
      side.append(summary.compile())
      main.append(article.compile())

      page.append(side)
      page.append(main)

      return page.htmlSelf()





   render: ( router ) =>

      ########################################
      #/
      #/   @params {Router} router
      #/
      ########################################

      { nav, cover, summary, article } = @parse()

      bus = new ObservableObject

      page = util.dom('#page')
      side = util.dom('#side')
      main = util.dom('#main')

      page.append(cover.render( bus )) if cover.exist()
      side.append(summary.render( bus ))
      main.append(article.render( bus ))

      page.append(side)
      page.append(main)

      @_bindLinkEvent( router, page )

      return page





   _bindLinkEvent: ( router, page ) =>

      ########################################
      #/
      #/   @params {Router} router
      #/   @params {DOM}    page
      #/
      ########################################

      links = page.findAll('a')

      for link in links
          link.on('click', @_redirect.bind(@, router))





   _redirect: ( router, link ) =>

      ########################################
      #/
      #/   @params {Router}     router
      #/   @params {DOM}        link
      #/   @params {MouseEvent} e
      #/
      ########################################

      href = link.attr('href')

      if util.isUrl( href )
         window.open( href, '_blank' )
      else
         router.go( href )