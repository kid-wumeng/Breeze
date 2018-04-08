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