Markdown         = require('./Markdown')
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

      page = util.dom('#page')
      side = util.dom('#side')
      main = util.dom('#main')

      page.append(nav.compile())
      page.append(cover.compile())
      side.append(search.compile())
      side.append(summary.compile())
      main.append(article.compile())

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

   Page._layoutNav( page )





Page._layoutNav = ( page ) =>

   nav  = page.find('#nav')
   side = page.find('#side')
   main = page.find('#main')

   if nav and nav.hasClass('fixed')
      Breeze.navHeight = nav.height()

      side.css('paddingTop', Breeze.navHeight + 'px')
      main.css('paddingTop', Breeze.navHeight + 'px')

   else
      Breeze.navHeight = 0