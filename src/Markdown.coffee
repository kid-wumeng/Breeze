marked = require('marked')
Jade   = require('./Jade')





module.exports = class Markdown

   ########################################
   #|
   #|   new Markdown( text )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       compiling text to markdown and parsing some components,
   #|       such as <nav>, <cover>, <summary> and so on.
   #|   -----------------------------------
   #|
   #|   markdown.compile() -> markdown
   #|   markdown.parse()   -> { nav, cover, summary, article }
   #|
   ########################################





   constructor: ( text ) ->

      ########################################
      #|
      #|   @params {string} text
      #|
      ########################################

      @text = text

      @compile = @_compile
      @parse   = @_parse





   _compile: =>

      ########################################
      #|
      #|   @return {string} markdown
      #|
      ########################################

      text = @_compileJadeByTag( @text )
      text = @_compileJadeByAttribute( text )
      text = @_formatSelfClosingTag( text )

      return markdown = text





   _compileJadeByTag: ( text ) =>

      ########################################
      #|
      #|   @params {string} text
      #|   @return {string} text
      #|
      #|   Compile and replace the <jade>...</jade> to html.
      #|
      ########################################

      reg = /<jade>((?:.|\n)*?)<\/jade>/g

      return text.replace reg, ( _, text ) =>

         jade = new Jade(text)
         html = jade.compile()

         return html





   _compileJadeByAttribute: ( text ) =>

      ########################################
      #|
      #|   @params {string} text
      #|   @return {string} text
      #|
      #|   Compile and replace the <tag jade>...</tag> to html.
      #|
      ########################################

      reg = /(<\s*(.+?)\s*.*\s+jade\s*.*>)((?:.|\n)*?)\s*(<\s*\/\2\s*>)/g

      text.replace reg, ( _, start, name, text, end ) =>

         jade = new Jade(text)
         html = jade.compile()

         return start + html + end





   _formatSelfClosingTag: ( text ) =>

      ########################################
      #|
      #|   @params {string} text
      #|   @return {string} text
      #|
      #|   Format and replace <tag/> to <tag></tag>
      #|
      ########################################

      reg = /<([A-Za-z_-]+)((?:\s|\n)+(?:[^<]|\n)*?)?\/>/g

      return text.replace reg, ( _, tag, attr = '' ) =>
         return "<#{tag} #{attr}></#{tag}>"





   _parse: =>

      ########################################
      #|
      #|   @return {object} - {string} nav     ( html )
      #|                      {string} cover   ( html )
      #|                      {string} summary ( html )
      #|                      {string} article ( markdown )
      #|
      ########################################

      markdown = @_compile()

      { nav,     markdown } = @_parseNav( markdown )
      { cover,   markdown } = @_parseCover( markdown )
      { summary, markdown } = @_parseSummary( markdown )

      article = markdown.trim()

      return { nav, cover, summary, article }





   _parseNav: ( markdown ) =>

      ########################################
      #|
      #|   @params {string} markdown
      #|   @return {object} - {string} nav ( html )
      #|                      {string} markdown
      #|
      ########################################

      nav    = ''
      navReg = /^\s*<nav[^\\]*?>(?:.|\n)*?<\/nav>/gm

      markdown = markdown.replace navReg, ( match ) =>
         nav = match.trim()
         return ''

      return { nav, markdown }





   _parseCover: ( markdown ) =>

      ########################################
      #|
      #|   @params {string} markdown
      #|   @return {object} - {string} cover ( html )
      #|                      {string} markdown
      #|
      ########################################

      cover    = ''
      coverReg = /^\s*<cover[^\\]*?>(?:.|\n)*?<\/cover>/gm

      markdown = markdown.replace coverReg, ( match ) =>
         cover = match.trim()
         return ''

      return { cover, markdown }





   _parseSummary: ( markdown ) =>

      ########################################
      #|
      #|   @params {string} markdown
      #|   @return {object} - {string} summary ( html )
      #|                      {string} markdown
      #|
      ########################################

      summary    = ''
      summaryReg = /^\s*<summary[^\\]*?>(?:.|\n)*?<\/summary>/gm

      markdown = markdown.replace summaryReg, ( match ) =>
         summary = match.trim()
         return ''

      return { summary, markdown }