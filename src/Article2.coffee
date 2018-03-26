marked           = require('marked')
Prism            = require('prismjs')
ObservableObject = require('./ObservableObject')
Jade             = require('./Jade')
Api              = require('./Api')



marked.setOptions({

   gfm:    true
   tables: true

   highlight: ( code, lang ) =>
      if lang = Prism.languages[lang]
         return Prism.highlight(code, lang)
      else
         return code
})



module.exports = class Article extends ObservableObject



   constructor: ( markdown ) ->

      super()

      @markdown  = markdown
      @html      = ''
      @lastOrder = '0'
      @sections  = []
      @$dom      = null
      @$sections = []
      @cover     = ''
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
      ########################################

      markdown = @markdown

      markdown            = @parseJade(markdown)
      { cover, markdown } = @parseCover(markdown)
      sections            = @parseSections(markdown)

      @trimFirst(sections)

      { html, sections } = @compileSections(sections)

      @html     = html
      @sections = sections
      @cover    = cover





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





   parseCover: ( markdown ) =>

      ########################################
      #|
      #|  @params {string} markdown
      #|  @return {string} cover
      #|
      #|  Parse cover html.
      #|
      ########################################

      coverReg = /<cover>((?:.|\n)*?)<\/cover>/g

      cover = ''

      markdown = markdown.replace coverReg, ( _, inner ) =>
         cover = inner
         return ''

      return { cover, markdown }





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
      inCode   = false

      for line in allLines

         isCode    = /^\s*```/.test(line)
         isHeading = /^\s*#{1,6}/.test(line)

         if isCode
            inCode = !inCode

         if isHeading and !inCode

            section = lines.join('\n')
            sections.push(section)
            lines = []

            line = @formatHeading( line )

         lines.push(line)

      section = lines.join('\n')
      sections.push(section)

      return sections





   formatHeading: ( heading ) =>

      heading = heading.trim()
      results = heading.match /^(#+)\s*(.*)$/

      lv   = results[1].length
      text = results[2]

      return "<h#{lv}>#{text}</h#{lv}>"





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

      html = html.trim()

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

      lv    = heading?.lv    ? ''
      order = heading?.order ? ''
      text  = heading?.text  ? ''

      id = @getID( order, text )

      section = """
         <section lv="#{lv}" id=\"#{id}\">
            <div class=\"content\">#{content}</div>
            <div class=\"example\">#{example}</div>
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
               example = example.replace(/(<example>)|(<\/example>)/g, '')
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

      if results = content.match /^<h([1-6])>(.*)<\/h[1-6]>$/m

         lv    = parseInt(results[1])
         order = @getOrder(lv)
         text  = results[2]

         return { lv, order, text }

      else
         return null





   getOrder: ( lv ) =>

      ########################################
      #|
      #|  @params {number} lv
      #|  @return {string} order
      #|
      ########################################

      parts = @lastOrder.split('.')
      i = lv - 1

      part = parts[i] ? '0'
      part = parseInt(part)
      part = part + 1

      parts[i] = part
      parts = parts.slice(0, i+1)

      for _, i in parts
         if !parts[i]
             parts[i] = '0'

      return @lastOrder = parts.join('.')





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

         { heading } = section

         if heading and heading.lv <= 3
            @summary += @createSummaryItem( heading )





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

      { lv, order, text } = heading

      count = lv
      space = ''

      while count > 1
         space += '  '
         count--

      return "#{space}* [#{text}](##{@getID(order, text)})\n"





   getID: ( order, text = '' ) =>

      ########################################
      #|
      #|  @params {string} order
      #|  @params {string} text
      #|  @return {string} id
      #|
      ########################################

      text = text.replace(/\s+/g, '-')

      if text
         return order + '-' + text
      else
         return order





   render: =>

      @$dom = document.createElement('article')
      @$dom.innerHTML = @html

      @wrapParams()
      @bindScrollEvent()





   wrapParams: =>

      $raws = @$dom.querySelectorAll('api')

      for $raw in $raws
         api = new Api( $raw )
         $api = api.render()
         $raw.parentNode.replaceChild( $api, $raw )





   bindScrollEvent: =>

      window.addEventListener 'scroll', =>

         isExisted = @$dom.innerHTML isnt ''
         isVisible = @$dom.getBoundingClientRect().width > 0

         if isExisted and isVisible

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