Markdown         = require('./Markdown')
Head             = require('./Head')
Side             = require('./Side')
Main             = require('./Main')
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

      { nav, cover, summary, article } = markdown.parse()

      cover   = new Cover(cover)
      nav     = new Nav(nav)
      search  = new Search()
      article = new Article(article)

      if !summary
        summary = Summary.parse(sections = article.parse())
      summary = new Summary(summary)

      return { cover, nav, search, summary, article }





   _compile: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      { cover, nav, search, summary, article } = @_parse()

      cover   = cover.compile()
      nav     = nav.compile()
      search  = search.compile()
      summary = summary.compile()
      article = article.compile()

      head = new Head( nav )
      side = new Side( search, summary )
      main = new Main( article )

      head = head.compile()
      side = side.compile()
      main = main.compile()

      page = util.dom('#page')

      page.append( cover )
      page.append( head )
      page.append( side )
      page.append( main )

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

   head = page.find('#head')
   side = page.find('#side')
   main = page.find('#main')

   if Breeze.isH5
      Page._moveNav( page )
   else
      Head.hideWhenNothing( head )

   Breeze.headHeight = head.height()

   if Breeze.isH5
      Main.setTop( main )
   else
      Side.setTop( side )
      Main.setTop( main )





Page._moveNav = ( page ) =>

   ########################################
   #|
   #|   @params {DOM} page
   #|
   ########################################

   nav = page.find('#nav')

   if nav
      ph = page.find('#h5-nav-placeholder')
      ph.replace( nav )