marked = require('marked')
Prism  = require('prismjs/components/prism-core')
util   = require('./util')



module.exports = class Article



   constructor: ( text = '' ) ->

      ########################################
      #|
      #|  @params {string}
      #|
      ########################################

      marked.setOptions({
         highlight: ( code ) => Prism.highlight( code, Prism.languages.javascript )
      })

      @text = text
      @html = ''

      @allHeadings = []  # [{ text, level, raw }]
      @allContents = []
      @allExamples = []  # {}

      @_contents = []
      @_examples = []

      @_renderer        = new marked.Renderer({ headerPrefix: '' })
      @_rendererDefault = new marked.Renderer({ headerPrefix: '' })

      @_parseExamples()

      @_wrapRenderer('code')
      @_wrapRenderer('blockquote')
      @_wrapRenderer('hr')
      @_wrapRenderer('list')
      @_wrapRenderer('paragraph')
      @_wrapRenderer('table')

      @_wrapRenderer_heading()
      @_wrapRenderer_html()

      @_compile()





   _parseExamples: =>

      ########################################
      #|
      #|  For example,
      #|
      #|  @text =
      #|     a paragraph.
      #|     <example>
      #|        hello, *world*
      #|        ```abc = 1```
      #|     <example>
      #|
      #|  =>
      #|
      #|  @text =
      #|     a paragraph.
      #|     <example>0<example>
      #|
      #|
      #|  @allExamples[0] =
      #|     hello, *world*
      #|     ```abc = 1```
      #|
      ########################################

      reg = /<example>\s*((?:.|\n)*?)\s*<\/example>/g

      @text = @text.replace reg, ( match, inner ) =>

         inner = marked(inner)

         @allExamples.push( inner )

         i = @allExamples.length - 1

         return '<example>' + i + '</example>'





   _wrapRenderer: ( name ) =>

      ########################################
      #|
      #|  @params {string} renderer's name
      #|
      ########################################

      @_renderer[name] = ( args... ) =>

         html = @_rendererDefault[name]( args... )

         @_contents.push( html )

         return ''





   _wrapRenderer_heading: =>

      @_renderer.heading = ( text, level, raw ) =>

         @_createSection()  # create last section.

         html = "<h#{level} id=\"#{util.hash(text)}\">#{text}</h#{level}>"

         @allHeadings.push({ text, level, raw })

         @_contents.push( html )

         return ''





   _wrapRenderer_html: =>

      @_renderer.html = ( html ) =>

         isExample = /^\s*<example>\d+<\/example>\s*$/.test( html )

         if isExample
            i = html.replace /(?:^\s*<example>)|(?:<\/example>\s*$)/g, ''
            @_examples.push( @allExamples[i] )

         else
            @_contents.push( html )

         return ''





   _compile: =>

      marked(@text, {
         renderer: @_renderer
      })

      @_createSection()





   _createSection: =>

      content = @_createContent()
      example = @_createExample()

      sectionClass = @_createSectionClass()

      section = """
         <section class=\"#{sectionClass}\">
            #{content}
            #{example}
         </section>
      """

      @html += section





   _createContent: =>

      if @_contents.length
        content = "<content>#{@_contents.join('')}</content>"
      else
        content = "<content></content>"

      @_contents = []

      return content





   _createExample: =>

      if @_examples.length
        example = "<example>#{@_examples.join('')}</example>"
      else
        example = "<example></example>"

      @_examples = []

      return example





   _createSectionClass: =>

      heading = @allHeadings[@allHeadings.length - 1]
      level   = heading?.level ? 0

      return 'h' + level + '-section'





   summary: =>

      ########################################
      #|
      #|  Create the article's summary by markdown format,
      #|  for example:
      #|
      #|    * [lv1](#lv1)
      #|      * [lv2](#lv2)
      #|    * [lv1](#lv1)
      #|      * [lv2](#lv2)
      #|        * [lv3](#lv3)
      #|      * [lv2](#lv2)
      #|
      #|  @return {string} summary
      #|
      ########################################

      summary = ''

      for heading in @allHeadings

         { level, text } = heading

         summary += @_summaryItem( level, text )

      return summary





   _summaryItem: ( lv, text ) =>

      ########################################
      #|
      #|  @params {number} heading's lv
      #|  @params {string} heading's text
      #|
      #|  @return {string} item
      #|
      ########################################

      count = lv
      space = ''

      while count > 1
         space += '  '
         count--

      return "#{space}* [#{text}](##{util.hash(text)})\n"