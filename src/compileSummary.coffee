marked     = require('marked')
formatHash = require('./formatHash')



module.exports = ({ headings }) =>

   ########################################
   #|
   #|  Compile summary-markdown to html.
   #|
   #|  @params { headings }
   #|  @return { html }
   #|
   ########################################

   markdown = createList( headings )
   html     = marked( markdown )

   return { html }





createList = ( headings ) =>

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
   #|  @params {object[]} headings
   #|  @return {string}   summary
   #|
   ########################################

   list = ''

   for heading in headings

      { lv, text } = heading

      list += createItem( lv, text )

   return list





createItem = ( lv, text ) =>

   ########################################
   #|
   #|  @params {number} heading's lv
   #|  @params {string} heading's text
   #|
   #|  @return {string} markdown-item
   #|
   ########################################

   count = lv
   space = ''

   while count > 1
      space += '  '
      count--

   return "#{space}* [#{text}](#{formatHash(text)})\n"