marked = require('marked')
Jade   = require('./Jade')



module.exports = class Markdown

   ########################################
   #/
   #/   Be responsible for compiling text to markdown
   #/   and parsing some components, such as <nav>, <cover>, <summary> and so on.
   #/
   ########################################



   constructor: ( text ) ->

      ########################################
      #/
      #/   @params {string} text
      #/
      ########################################

      @text = text





   compile: =>

      ########################################
      #/
      #/   @return {string} markdown
      #/
      ########################################

      text = @_compileJadeByTag( @text )
      text = @_compileJadeByAttribute( text )

      return markdown = text





   parse: =>

      ########################################
      #/
      #/   @return {object} {string} nav     ( html )
      #/                    {string} cover   ( html )
      #/                    {string} summary ( html )
      #/                    {string} article ( markdown )
      #/
      ########################################

      markdown = @compile()

      { nav,     markdown } = @_parseNav( markdown )
      { cover,   markdown } = @_parseCover( markdown )
      { summary, markdown } = @_parseSummary( markdown )

      article = markdown.trim()

      return { nav, cover, summary, article }





   _compileJadeByTag: ( text ) =>

      ########################################
      #/
      #/   @params {string} text
      #/   @return {string} text
      #/
      #/   Compile and replace the <jade>...</jade> to html.
      #/
      ########################################

      reg = /<jade>((?:.|\n)*?)<\/jade>/g

      return text.replace reg, ( _, text ) =>

         jade = new Jade(text)
         html = jade.compile()

         return html





   _compileJadeByAttribute: ( text ) =>

      ########################################
      #/
      #/   @params {string} text
      #/   @return {string} text
      #/
      #/   Compile and replace the <tag jade>...</tag> to html.
      #/
      ########################################

      reg = /(<\s*(.+?)\s*.*\s+jade\s*.*>)((?:.|\n)*?)\s*(<\s*\/\2\s*>)/g

      text.replace reg, ( _, start, name, text, end ) =>

         jade = new Jade(text)
         html = jade.compile()

         return start + html + end





   _parseNav: ( markdown ) =>

      ########################################
      #/
      #/   @params {string} markdown
      #/   @return {object} {string} nav ( html )
      #/                    {string} markdown
      #/
      ########################################

      nav    = ''
      navReg = /<nav.*?>(?:.|\n)*?<\/nav>/g

      markdown = markdown.replace navReg, ( match ) =>
         nav = match
         return ''

      return { nav, markdown }





   _parseCover: ( markdown ) =>

      ########################################
      #/
      #/   @params {string} markdown
      #/   @return {object} {string} cover ( html )
      #/                    {string} markdown
      #/
      ########################################

      cover    = ''
      coverReg = /<cover.*?>(?:.|\n)*?<\/cover>/g

      markdown = markdown.replace coverReg, ( match ) =>
         cover = match
         return ''

      return { cover, markdown }





   _parseSummary: ( markdown ) =>

      ########################################
      #/
      #/   @params {string} markdown
      #/   @return {object} {string} summary ( html )
      #/                    {string} markdown
      #/
      ########################################

      summary    = ''
      summaryReg = /<summary.*?>(?:.|\n)*?<\/summary>/g

      markdown = markdown.replace summaryReg, ( match ) =>
         summary = match
         return ''

      return { summary, markdown }