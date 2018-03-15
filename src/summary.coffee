marked = require('marked')
util   = require('./util')





exports.compile = ( markdown ) =>

   ########################################
   #|
   #|  Compile summary-markdown to html.
   #|
   #|  @params {string} markdown
   #|  @return {string} html
   #|
   ########################################

   html = marked( markdown )

   return html





exports.parse = ( sections ) =>

   ########################################
   #|
   #|  Create the article's summary by headings.
   #|
   #|  @params {object[]} sections
   #|  @return {string}   markdown
   #|
   ########################################

   markdown = ''

   headings = sections.map (section) => section.heading

   for heading in headings
      markdown += parseItem( heading )

   return markdown





parseItem = ( heading ) =>

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