########################################
#|
#|  Be responsible for compile and create article.
#|
#|  @public
#|     compile( markdown )
#|     dom( html )
#|
########################################

marked = require('marked')
jade   = require('./jade')
util   = require('./util')



exports.compile = ( markdown ) =>

   ########################################
   #|
   #|  @params {string} markdown
   #|  @return {string} html
   #|
   ########################################

   markdown = parseJade(markdown)
   sections = parseSections(markdown)

   trimFirst(sections)

   html = ''

   for section in sections
      html += compileSection(section)

   return html





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
      return jade.compile( inner )





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

      isHeading = /^#{1,6}/.test(line)

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
   #|  Delete the first section if hasn't actual words.
   #|
   ########################################

   if sections[0]?
      if sections[0].match /^(?:\s|\n)*$/
         sections.shift()





compileSection = ( section ) =>

   ########################################
   #|
   #|  @params {string} section
   #|  @return {string} html
   #|
   ########################################

   { content, example } = parseContentAndExample( section )

   content = marked(content)
   example = marked(example)

   return """
      <section>
         <content>#{content}</content>
         <example>#{example}</example>
      </section>
   """





parseContentAndExample = ( section ) =>

   ########################################
   #|
   #|  @params {string} section
   #|  @return {object} { content, example }
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





exports.dom = ( html ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {string}      html
   #|  @return {HTMLElement} $article
   #|
   ########################################

   $article = document.createElement('article')
   $article.innerHTML = html

   return $article





getHeadings = ( $article ) =>

   ########################################
   #|
   #|  @web-only
   #|  @params {HTMLElement} $article
   #|  @return {object[]}    headings { text, hash, top }
   #|
   #|  Redirect to a new page or hash.
   #|
   ########################################

   $headings = $article.querySelectorAll('h1, h2, h3')

   return $headings.map ( $heading ) =>

      text = $heading.innerText
      top  = $heading.offsetTop
      
      hash = util.hash( text )

      return { text, hash, top }