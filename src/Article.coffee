marked = require('marked')



module.exports = class Article



   constructor: ( text = '' ) ->

      ########################################
      #|
      #|  @params {string}
      #|
      ########################################

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

         inner = marked(inner, {
            renderer: @_rendererDefault
         })

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

         html = @_rendererDefault.heading( text, level, raw )

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

      if content and example

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
        content = ""

      @_contents = []
      return content





   _createExample: =>

      if @_examples.length
        example = "<example>#{@_examples.join('')}</example>"
      else
        example = ""

      @_examples = []
      return example





   _createSectionClass: =>

      heading = @allHeadings[@allHeadings.length - 1]
      level   = heading?.level ? 0

      return 'h' + level + '-section'