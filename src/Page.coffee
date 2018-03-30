ObservableObject = require('./ObservableObject')
Bus              = require('./Bus')
Markdown         = require('./Markdown')
Cover            = require('./Cover')
Summary          = require('./Summary')
Article          = require('./Article')
Search           = require('./Search')
util             = require('./util')



module.exports = class Page extends ObservableObject

   ########################################
   #/
   #/   new Page( text )
   #/
   #/   parse()    ->  { article, nav, cover, summary }
   #/   compile()  ->  page ( html-string )
   #/   render()   ->  page ( DOM )
   #/
   #/   Page.bindEvent( page )
   #/
   ########################################



   constructor: ( text ) ->

      super()

      @text = text

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

      return page





Page.bindEvent = ( page ) =>

   ########################################
   #/
   #/   @params {DOM} page
   #/
   ########################################

   links   = page.findAll('a')

   for link in links
       link.on('click', Page._event_linkClick)

   bus = new Bus()
   bus.on('article.scroll', Page._event_articleScroll)

   article = page.find('#article')
   Article.bindEvent( bus, article )

   window.addEventListener('scroll', Page._onWindowScroll)




Page._onWindowScroll = ( e ) =>

   ########################################
   #/
   #/   @params {Event} e
   #/
   ########################################

   console.log e




Page._event_linkClick = ( link ) =>

   ########################################
   #/
   #/   @params {DOM} link
   #/
   ########################################

   href = link.attr('href')
   Breeze.go( href )





Page._event_articleScroll = ( href ) =>

   ########################################
   #/
   #/   @params {string} href
   #/
   ########################################

   Breeze.go( href )