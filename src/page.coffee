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
      #
      # @path     = @getPath()
      # @query    = @getQuery()
      # @filePath = @getFilePath()
      #
      # util.ajax @filePath, ( text ) =>
      #
      #    markdown = new Markdown( text )
      #
      #    { nav, cover, summary, article } = markdown.parse()
      #
      #    cover   = new Cover( cover )
      #    article = new Article( article )
      #
      #    article.parse()
      #
      #    @_render(cover)



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





   compile: =>

      markdown = new Markdown( @text )

      { nav, cover, summary, article } = markdown.parse()

      cover   = new Cover( cover )
      article = new Article( article )


      page = util.dom('#page')
      page.append(cover.render())

      return page.htmlSelf()





   render: ( router ) =>

      html = @compile()
      page = util.dom( html )

      @_bindLinkEvent( router, page )

      return page





   _bindLinkEvent: ( router, page ) =>

      ########################################
      #/
      #/   @params {DOM} page
      #/
      ########################################

      links = page.findAll('a')

      for link in links
          link.on('click', @_redirect.bind(null, router))





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