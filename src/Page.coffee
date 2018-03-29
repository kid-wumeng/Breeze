ObservableObject = require('./ObservableObject')
Bus              = require('./Bus')
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
         # @search.on('select',  @rehash)
         # @search.on('select',  @article.scroll)
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

      { article, nav, cover, summary } = markdown.parse()

      article = new Article(article)
      cover   = new Cover(cover)

      if !summary
        summary = Summary.parse(sections = article.parse())
      summary = new Summary(summary)

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





   render: =>

      ########################################
      #/
      #/   @return {DOM} page
      #/
      ########################################

      { nav, cover, summary, article } = @parse()

      bus = new Bus

      page = util.dom('#page')
      side = util.dom('#side')
      main = util.dom('#main')

      page.append(cover.render( bus )) if cover.exist()
      side.append(summary.render( bus ))
      main.append(article.render( bus ))

      page.append(side)
      page.append(main)

      @_bindEvent( bus, page )

      return page





   _bindEvent: ( bus, page ) =>

      ########################################
      #/
      #/   @params {Bus}    bus
      #/   @params {DOM}    page
      #/
      ########################################

      links = page.findAll('a')

      for link in links
          link.on('click', @_onClickLink)

      bus.on('article.scroll', @_onArticleScroll)





   _onClickLink: ( link ) =>

      ########################################
      #/
      #/   @params {DOM} link
      #/   @params {MouseEvent} e
      #/
      ########################################

      if href = link.attr('href')
         router.go( href )





   _onArticleScroll: ( href ) =>

      ########################################
      #/
      #/   @params {string} href
      #/
      ########################################

      router.go( href )