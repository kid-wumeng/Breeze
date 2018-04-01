Markdown         = require('./Markdown')
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