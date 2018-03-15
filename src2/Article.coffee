marked = require('marked')
Page   = require('./Page')
Jade   = require('./Jade')
Router = require('./Router')
Helper = require('./Helper')



########################################
#|
#|  @public compile( markdown )
#|  @public dom( html )
#|  @public getTops( $article )
#|
########################################



renderer = new marked.Renderer

renderer.heading = ( text, lv ) =>

   ########################################
   #|
   #|  @params {string} text
   #|  @params {number} lv
   #|  @return {string} html
   #|
   ########################################

   return "<h#{lv} id=\"#{Helper.id(text)}\">#{text}</h#{lv}>"





exports.compile = ( markdown ) =>

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

   markdown = parseJade(markdown)
   sections = parseSections(markdown)

   trimFirst(sections)

   { article, sections } = compileSections(sections)

   return { article, sections }





parseJade = ( markdown ) =>

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
      return Jade.compile( inner )





parseSections = ( markdown ) =>

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





trimFirst = ( sections ) =>

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





compileSections = ( sections ) =>

   ########################################
   #|
   #|  @params {string[]} sections
   #|  @return {object} - { article, sections }
   #|
   ########################################

   article = ''

   sections = sections.map (section) =>

      { section, heading, content, example } = compileSection(section)

      article += section

      return { heading, content, example }

   return { article, sections }





compileSection = ( section ) =>

   #######################################
   #|
   #|  @params {string} section-markdown
   #|
   #|  @return {object} - {string} section-html
   #|                     {string} content-html
   #|                     {string} example-html
   #|
   ########################################

   { content, example } = parseContentAndExample( section )

   heading = parseHeading(content)
   content = marked(content, { renderer })
   example = marked(example)

   section = """
      <section>
         <content>#{content}</content>
         <example>#{example}</example>
      </section>
   """

   return { section, heading, content, example }





parseContentAndExample = ( section ) =>

   ########################################
   #|
   #|  @params {string} section-markdown
   #|
   #|  @return {string} content-markdown
   #|          {string} example-markdown
   #|
   ########################################

   { examples, indexes } = parseExamples(section)

   content = delExamples(section, indexes)
   example = examples.join('')

   return { content, example }





parseExamples = ( section ) =>

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





delExamples = ( section, indexes = [] ) =>

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





parseHeading = ( content ) =>

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





exports.dom = ( html ) =>

   ########################################
   #|
   #|  @params {string} html
   #|
   ########################################

   $article = document.createElement('article')
   $article.innerHTML = html

   wrapParams( $article )
   bindScrollEvent( $article )

   return $article





wrapParams = ( $article ) =>

   ########################################
   #|
   #|  @params {HTMLElement} $article
   #|
   ########################################

   $items = $article.querySelectorAll('params > item')

   for $item in $items

        $left  = document.createElement('left')
        $right = document.createElement('right')

        $left.appendChild($child)  for $child in $item.querySelectorAll('item > :not(desc)')
        $right.appendChild($child) for $child in $item.querySelectorAll('item > desc')

        $item.appendChild($left)
        $item.appendChild($right)





bindScrollEvent = ( $article ) =>

   ########################################
   #|
   #|  @params {HTMLElement} $article
   #|
   ########################################

   lastID = ''

   window.addEventListener 'scroll', ->

      stats = getSectionStats( $article )

      for stat, i in stats
         if stat.top > 0
            break

      stat = stats[i-1]

      if lastID isnt stat.id
         lastID = stat.id
         Router.redirect('#' + stat.id)
         Page.active('#' + stat.id)





getSectionStats = ( $article ) =>

   ########################################
   #|
   #|  @params {HTMLElement} $article
   #|  @params {object[]} sectionStats
   #|
   ########################################

   $sections = $article.querySelectorAll('section')
   stats     = []

   for $section in $sections

      if $heading = $section.querySelector('h1, h2, h3')
         id = Helper.id( $heading.innerText )
      else
         id = ''

      top = $section.getBoundingClientRect().top

      stats.push({ id, top })

   return stats