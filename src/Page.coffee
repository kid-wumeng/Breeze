Markdown         = require('./Markdown')
Head             = require('./Head')
Nav              = require('./Nav')
Cover            = require('./Cover')
Summary          = require('./Summary')
Article          = require('./Article')
Search           = require('./Search')
util             = require('./util')





module.exports = class Page

   ########################################
   #|
   #|   new Page( text )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="page">
   #|   -----------------------------------
   #|
   #|   page.compile() -> html
   #|   page.render()  -> dom
   #|
   #|   Page.layout( dom )
   #|
   ########################################





   constructor: ( text ) ->

      @text = text

      @compile = @_compile
      @render  = @_render





   _parse: =>

      ########################################
      #|
      #|   @return {object} - {Article} article
      #|                      {Nav}     nav
      #|                      {Cover}   cover
      #|                      {Search}  search
      #|                      {Summary} summary
      #|
      ########################################

      markdown = new Markdown(@text)

      { article, nav, cover, summary } = markdown.parse()

      article = new Article(article)
      nav     = new Nav(nav)
      cover   = new Cover(cover)
      search  = new Search()

      if !summary
        summary = Summary.parse(sections = article.parse())
      summary = new Summary(summary)

      return { article, nav, cover, search, summary }





   _compile: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      { article, nav, cover, search, summary } = @_parse()

      head = new Head(nav.compile())

      page = util.dom('#page')
      side = util.dom('#side')
      main = util.dom('#main')

      page.append(cover.compile())
      side.append(search.compile())
      side.append(util.dom('#h5-nav-placeholder'))
      side.append(summary.compile())
      main.append(article.compile())

      page.append(head.compile())
      page.append(side)
      page.append(main)

      return page.htmlSelf()





   _render: =>

      ########################################
      #|
      #|   @return {DOM} page
      #|
      ########################################

      return util.dom(@_compile())





Page.layout = ( page ) =>

   ########################################
   #|
   #|   @params {DOM} page
   #|
   ########################################

   if Breeze.isH5
      Page._replaceNav( page )

   Page._layoutHead( page )





Page._replaceNav = ( page ) =>

   ########################################
   #|
   #|   @params {DOM} page
   #|
   ########################################

   nav = page.find('#nav')
   ph  = page.find('#h5-nav-placeholder')
   ph.replace( nav )





Page._layoutHead = ( page ) =>

   ########################################
   #|
   #|   @params {DOM} page
   #|
   #|   Will set the Breeze.headHeight
   #|
   ########################################

   head = page.find('#head')
   side = page.find('#side')
   main = page.find('#main')

   Breeze.headHeight = head.height()

   side.css('paddingTop', Breeze.headHeight + 'px')
   main.css('paddingTop', Breeze.headHeight + 'px')