marked     = require('marked')
jade       = require('./jade')
formatHash = require('./formatHash')





renderer = new marked.Renderer


renderer.heading = ( text, lv ) =>

   ########################################
   #|
   #|  Let the heading-renderer to use our hash format.
   #|
   #|  @params {string} text
   #|  @params {number} lv
   #|  @return {string} html
   #|
   ########################################

   id = formatHash(text).slice(1)

   return "<h#{lv} id=\"#{id}\">#{text}</h#{lv}>"





module.exports = ({ markdown }) =>

   ########################################
   #|
   #|  Compile article-markdown to html.
   #|
   #|  @params { markdown }
   #|  @return { html, headings, sections }
   #|
   ########################################

   markdown = parseJade(markdown)
   sections = parseSections(markdown)
   headings = parseHeadings(sections)

   trimFirst(sections)

   html = compile(sections)

   return { html, headings, sections }





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
      return jade( inner )





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





parseHeadings = ( sections ) =>

   ########################################
   #|
   #|  @params {string[]} sections
   #|  @return {object[]} { lv, text }
   #|
   ########################################

   headings = []

   for section in sections

      if result = section.match(/^(#{1,6})(.*)$/m)
         headings.push({
            lv:   result[1].length
            text: result[2].trim()
         })

   return headings





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





compile = ( sections ) =>

   ########################################
   #|
   #|  @params {string[]} sections
   #|  @return {string}   html
   #|
   ########################################

   html = ''

   for section in sections
      html += compileSection(section)

   return html





compileSection = ( section ) =>

   ########################################
   #|
   #|  @params {string} section
   #|  @return {string} html
   #|
   ########################################

   { content, example } = parseContentAndExample( section )

   content = marked(content, { renderer })
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