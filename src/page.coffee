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





   compile: =>

      markdown = new Markdown( @text )

      { nav, cover, summary, article } = markdown.parse()

      cover   = new Cover(cover)
      article = new Article(article)

      page = util.dom('#page')
      page.append(cover.render())

      return page.htmlSelf()





   render: =>

      html = @compile()
      page = util.dom( html )

      Page.bindEvent( page, bus = new ObservableObject )

      return page





Page.bindEvent = ( page, bus ) =>

   ########################################
   #/
   #/   @params {DOM}              page
   #/   @params {ObservableObject} bus
   #/
   ########################################

   cover = page.find('#cover')

   Cover.bindEvent( cover, bus ) if cover
   Page._bindLinkEvent( page )





Page._bindLinkEvent = ( page ) =>

   ########################################
   #/
   #/   @params {DOM} link
   #/
   ########################################

   links = page.findAll('a')

   for link in links
       link.on('click', Page._redirect)





Page._redirect = ( link ) =>

   ########################################
   #/
   #/   @params {DOM} link
   #/
   ########################################

   href = link.attr('href')

   if util.isUrl( href )
      window.open( href, '_blank' )
   else
      window.router.go( href )