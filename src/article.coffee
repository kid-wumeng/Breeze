marked           = require('marked')
ObservableObject = require('./ObservableObject')
Jade             = require('./Jade')
util             = require('./util')



module.exports = class Article extends ObservableObject



   constructor: ( markdown ) ->

      super()

      @markdown  = markdown
      @html      = ''
      @sections  = []
      @$dom      = null
      @$sections = []
      @summary   = ''
      @lastID    = ''

      @compile()
      @render()

      @$sections = @$dom.querySelectorAll('article > section')

      @createSummary(@sections)





   compile: =>

      ########################################
      #|
      #|  Compile article-markdown to html.
      #|
      #|  @params {string}   markdown
      #|  @return {object}   result
      #|          {string}   result.article
      #|          {object[]} result.sections - [{
      #|                                          heading: { lv, text }
      #|                                          content: { html }
      #|                                          example: { html }
      #|                                       }, ...]
      #|
      ########################################

      markdown = @parseJade(@markdown)
      sections = @parseSections(markdown)

      @trimFirst(sections)

      { html, sections } = @compileSections(sections)

      @html     = html
      @sections = sections





   parseJade: ( markdown ) =>

      ########################################
      #|
      #|  @params {string} markdown
      #|  @return {string} markdown
      #|
      #|  Parse and replace the jade-block to html.
      #|
      ########################################

      jadeReg = /<jade>((?:.|\n)*?)<\/jade>/g

      return markdown.replace jadeReg, ( _, inner ) =>
         jade = new Jade( inner )
         return jade.html





   parseSections: ( markdown ) =>

      ########################################
      #|
      #|  @params {string}   markdown
      #|  @return {string[]} sections
      #|
      #|  Split each section from article.
      #|
      ########################################

      sections = []

      allLines = markdown.split('\n')
      lines    = []

      for line in allLines

         isHeading = /^\s*#{1,6}/.test(line)

         if isHeading
            section = lines.join('\n')
            sections.push(section)
            lines = []

         lines.push(line)

      section = lines.join('\n')
      sections.push(section)

      return sections





   trimFirst: ( sections ) =>

      ########################################
      #|
      #|  @params {string[]} sections
      #|
      #|  Delete the first section if empty.
      #|
      ########################################

      if sections[0]?
         if sections[0].match /^(?:\s|\n)*$/
            sections.shift()





   compileSections: ( sections ) =>

      ########################################
      #|
      #|  @params {string[]} sections
      #|  @return {object} - { article, sections }
      #|
      ########################################

      html = ''

      sections = sections.map (section) =>

         { section, heading, content, example } = @compileSection(section)

         html += section

         return { heading, content, example }

      return { html, sections }





   compileSection: ( section ) =>

      #######################################
      #|
      #|  @params {string} section-markdown
      #|
      #|  @return {object} - {string} section-html
      #|                     {string} content-html
      #|                     {string} example-html
      #|
      ########################################

      { content, example } = @parseContentAndExample( section )

      heading = @parseHeading(content)
      content = marked(content)
      example = marked(example)

      id = util.id( heading?.text )

      section = """
         <section id=\"#{id}\">
            <content>#{content}</content>
            <example>#{example}</example>
         </section>
      """

      return { section, heading, content, example }





   parseContentAndExample: ( section ) =>

      ########################################
      #|
      #|  @params {string} section-markdown
      #|
      #|  @return {string} content-markdown
      #|          {string} example-markdown
      #|
      ########################################

      { examples, indexes } = @parseExamples(section)

      content = @delExamples(section, indexes)
      example = examples.join('')

      return { content, example }





   parseExamples: ( section ) =>

      ########################################
      #|
      #|  @params {string} section
      #|  @return {object} { examples, indexes }
      #|
      ########################################

      stack    = []
      indexes  = []
      examples = []

      reg = /(<example>)|(<\/example>)/g

      while result = reg.exec(section)

         index     = result.index
         isOpenTag = result[0] is '<example>'

         if isOpenTag
            stack.push(index)

         else
            start = stack.pop()
            end   = index + '</example>'.length

            if stack.length is 0

               example = section.slice(start, end)
               example = example.replace(/(^<example>)|(<\/example>$)/g, '')
               examples.push(example)

               indexes.push(start)
               indexes.push(end)

      return { examples, indexes }





   delExamples: ( section, indexes = [] ) =>

      ########################################
      #|
      #|  @params {string}   section
      #|  @params {number[]} indexes
      #|  @return {string}   section (rest)
      #|
      #|  Delete all examples from section.
      #|
      #|  123<example>456</example>789 => 123789
      #|
      ########################################

      rest = ''

      indexes.unshift(-1)

      while indexes.length > 1
         start = indexes.shift()
         end   = indexes.shift()
         rest += section.slice(start+1, end)

      start = indexes.shift()
      rest += section.slice(start+1)

      return rest





   parseHeading: ( content ) =>

      ########################################
      #|
      #|  @params {string} content
      #|  @return {object} heading - { lv, text }
      #|
      ########################################

      if result = content.match(/^(#{1,6})(.*)$/m)
         return
            lv:   result[1].length
            text: result[2].trim()
      else
         return null





   createSummary: ( sections ) =>

      ########################################
      #|
      #|  Create the article's summary by headings.
      #|
      #|  @params {object[]} sections
      #|  @return {string}   summary-markdown
      #|
      ########################################

      for section in sections
         if section.heading
            @summary += @createSummaryItem( section.heading )





   createSummaryItem: ( heading ) =>

      ########################################
      #|
      #|  @params {object} heading - { lv, text }
      #|  @return {string} markdown-item
      #|
      #|  { lv:2, text: 'Quick Start' }
      #|
      #|  => '  * [Quick Start](#Quick-Start)'
      #|
      ########################################

      { lv, text } = heading

      count = lv
      space = ''

      while count > 1
         space += '  '
         count--

      return "#{space}* [#{text}](##{util.id(text)})\n"





   render: =>

      @$dom = document.createElement('article')
      @$dom.innerHTML = @html

      @wrapParams()
      @bindScrollEvent()





   wrapParams: =>

      $items = @$dom.querySelectorAll('params > item')

      for $item in $items

           $left  = document.createElement('left')
           $right = document.createElement('right')

           $left.appendChild($child)  for $child in $item.querySelectorAll('item > :not(desc)')
           $right.appendChild($child) for $child in $item.querySelectorAll('item > desc')

           $item.appendChild($left)
           $item.appendChild($right)





   bindScrollEvent: =>

      window.addEventListener 'scroll', =>

         stats = @getSectionStats()

         for stat, i in stats
            if stat.top > 0
               break

         id = stats[i-1].id

         if @lastID isnt id
            @lastID = id
            @emit('scroll', id)





   getSectionStats: =>

      ########################################
      #|
      #|  @params {object[]} sectionStats
      #|
      ########################################

      stats = []

      for $section in @$sections

         id  = $section.getAttribute('id')
         top = $section.getBoundingClientRect().top

         stats.push({ id, top })

      return stats





   scroll: ( id ) =>

      $section = @$dom.querySelector("section[id=\"#{id}\"]")

      if $section
         top = $section.getBoundingClientRect().top
         window.scrollBy(0, top)
      else
         window.scrollTo(0, 0)