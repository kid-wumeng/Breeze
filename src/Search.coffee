module.exports = class Search

   ########################################
   #|
   #|   new Search( html )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       handling the <div id="search">
   #|   -----------------------------------
   #|
   #|   search.compile() -> html
   #|
   #|   Search.find( key, datas )     -> items
   #|   Search.showItems( ul, items ) -> item-doms
   #|   Search.hideItems( ul )
   #|   Search.focus( input )
   #|   Search.clear( input )
   #|   Search.showClear( clear )
   #|   Search.hideClear( clear )
   #|
   ########################################





   constructor: ->

      @compile = @_compile





   _compile: =>

      ########################################
      #|
      #|   @return {string} html
      #|
      ########################################

      return """
         <div id="search">
            <div class="input-box">
               <input autofocus spellcheck="false"/>
               <div class="clear"></div>
            </div>
            <ul class="items"></ul>
         </div>
      """





Search.find = ( key, datas ) =>

   ########################################
   #|
   #|   @params {string}   key
   #|   @params {object[]} datas - [{ id, heading, content, example }]
   #|
   #|   @return {object[]} items - [{ id, heading, content, example }]
   #|
   ########################################

   key = key.replace('\\', '\\\\')
   key = key.replace(/(?:\s|\n)+/g, '')

   items = Search._match( key, datas )
   items = Search._sortItems( items )

   return items





Search._match = ( key, datas ) =>

   ########################################
   #|
   #|   @params {string}   key
   #|   @params {object[]} datas - [{ id, heading, content, example }]
   #|
   #|   @return {object[]} items - [{ id, heading, content, example }]
   #|
   ########################################

   items = []

   for data in datas

       item = Search._matchSection( key, data )

       if item
          items.push( item )

   return items





Search._matchSection = ( key, data ) =>

   ########################################
   #|
   #|   @params {string} key
   #|   @params {object} data - {string} id
   #|                           {string} heading
   #|                           {string} content
   #|                           {string} example
   #|
   #|   @return {object} item - {string} id
   #|                           {string} heading
   #|                           {string} content - is undefined if needless
   #|                           {string} example - is undefined if needless
   #|
   ########################################

   { id, heading, content, example } = data

   if heading
      if result = Search._matchHeading( key, heading )
         return { id, heading: result }

   if content
      if result = Search._matchContent( key, content )
         return { id, heading, content: result }

   if example
      if result = Search._matchExample( key, example )
         return { id, heading, example: result }

   return null





Search._matchHeading = ( key, heading ) =>

   ########################################
   #|
   #|   @params {string} key
   #|   @params {string} heading
   #|
   #|   @return {string} heading - return '' when not matched
   #|
   ########################################

   reg = new RegExp( key, 'i' )

   if reg.test( heading )

      heading = heading.replace /</g, '&lt;'
      heading = heading.replace />/g, '&gt;'

      return heading

   else
      return ''





Search._matchContent = ( key, content ) =>

   ########################################
   #|
   #|   @params {string} key
   #|   @params {string} content
   #|
   #|   @return {string} content - return '' when not matched
   #|
   ########################################

   reg = new RegExp( key, 'i' )

   if result = content.match( reg )

      index  = result.index
      start  = index - 20
      end    = index + key.length + 20

      if start < 0
         start = 0

      if end > content.length
         end = content.length

      content = content.slice( start, end )

      reg = new RegExp( key, 'ig' )

      content = content.replace /</g, '&lt;'
      content = content.replace />/g, '&gt;'
      content = content.replace reg, ( key ) => "<em>#{ key }</em>"

      return content

   else
      return ''





Search._matchExample = ( key, example ) =>

   ########################################
   #|
   #|   @params {string} key
   #|   @params {string} example
   #|
   #|   @return {string} example - return '' when not matched
   #|
   ########################################

   reg = new RegExp( key, 'i' )

   if result = example.match( reg )

      index  = result.index
      start  = index - 20
      end    = index + key.length + 20

      if start < 0
         start = 0

      if end > example.length
         end = example.length

      example = example.slice( start, end )

      reg = new RegExp( key, 'ig' )

      example = example.replace /</g, '&lt;'
      example = example.replace />/g, '&gt;'
      example = example.replace reg, ( key ) => "<em>#{ key }</em>"

      return example

   else
      return ''





Search._sortItems = ( items ) =>

   ########################################
   #|
   #|   @params {object[]} items - [{ id, heading, content, example }]
   #|   @return {object[]} items - [{ id, heading, content, example }]
   #|
   ########################################

   headingItems = []
   contentItems = []
   exampleItems = []

   for item in items
       switch
          when item.content then contentItems.push( item )
          when item.example then exampleItems.push( item )
          else                   headingItems.push( item )

   return headingItems.concat( contentItems ).concat( exampleItems )





Search.showItems = ( ul, items ) =>

   ########################################
   #|
   #|   @params {DOM}      ul
   #|   @params {object[]} items - [{ id, heading, content, example }]
   #|   @return {DOM[]}    items
   #|
   ########################################

   items = Search._compileItems( items )

   ul.html( items )
   ul.css('display', 'block')

   return ul.findAll('li')





Search.hideItems = ( ul ) =>

   ########################################
   #|
   #|   @params {DOM} ul-dom
   #|
   ########################################

   ul.html('')
   ul.css('display', 'none')





Search._compileItems = ( items ) =>

   ########################################
   #|
   #|   @params {object[]} items - [{ id, heading, content, example }]
   #|   @return {string}   html
   #|
   ########################################

   html = ''

   for item in items
       html += Search._compileItem( item )

   return html





Search._compileItem = ( item ) =>

   ########################################
   #|
   #|   @params {object} item - {string} id
   #|                           {string} heading
   #|                           {string} content
   #|                           {string} example
   #|   @return {string} html
   #|
   ########################################

   { id, heading, content, example } = item

   if heading
      heading = "<div class=\"heading\">#{ heading }</div>"

   if content
      content = "<div class=\"content\">#{ content }</div>"

   if example
      example = "<div class=\"example\">#{ example }</div>"

   id      ?= ''
   heading ?= ''
   content ?= ''
   example ?= ''

   html = """
      <li data-id="#{ id }">
         #{ heading }
         #{ content }
         #{ example }
      </li>
   """

   return html





Search.focus = ( input ) =>

   ########################################
   #|
   #|   @params {DOM} input
   #|
   ########################################

   input.element().focus()





Search.clear = ( input ) =>

   ########################################
   #|
   #|   @params {DOM} input
   #|
   ########################################

   input.val('')





Search.showClear = ( clear ) =>

   ########################################
   #|
   #|   @params {DOM} clear
   #|
   ########################################

   clear.css('display', 'block')





Search.hideClear = ( clear ) =>

   ########################################
   #|
   #|   @params {DOM} clear
   #|
   ########################################

   clear.css('display', 'none')