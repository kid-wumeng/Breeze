ObservableObject = require('./ObservableObject')
util             = require('./util')



module.exports = class Search extends ObservableObject



   constructor: ( $sections ) ->

      super()

      @sections = @parseSections( $sections )
      @$dom     = @render()





   parseSections: ( $sections ) =>

      ########################################
      #|
      #|  @params {NodeList} $sections
      #|
      ########################################

      sections = []

      for $section in $sections
          section = @parseSection($section)
          sections.push(section)

      return sections





   parseSection: ( $section ) =>

      ########################################
      #|
      #|  @params {HTTPElement} $section
      #|
      ########################################

      $heading = $section.querySelector('h1, h2, h3')

      if $heading

         heading = $heading.innerText
         content = $section.innerText.trim()

         if from = content.indexOf('\n') + 1
            content = content.slice(from)
         else
            content = ''

      else
         heading = ''
         content = $section.innerText

      content = content.trim()
      content = content.replace(/(?:\n+)|(?:\s+)/g, ' ')

      return { heading, content }





   render: =>

      ########################################
      #|
      #|  @params {HTTPElement} $dom
      #|
      ########################################

      $dom = document.createElement('search')

      $dom.innerHTML = """
         <input-box>
            <input spellcheck="false"/>
            <clear/>
         </input-box>
         <ul></ul>
      """

      @bindEvent( $dom )

      return $dom





   bindEvent: ( $dom ) =>

      ########################################
      #|
      #|  @params {HTMLElement} $search
      #|
      ########################################

      $input = $dom.querySelector('input')
      $clear = $dom.querySelector('clear')

      $input.addEventListener('input', @input)
      $clear.addEventListener('click', @clear)





   input: ( e ) =>

      ########################################
      #|
      #|  @params {Event} e
      #|
      ########################################

      key     = e.target.value.trim().replace('\\', '\\\\')
      results = []

      if key.length >= 2

         for section in @sections
            if result = @match( section, key )
               results.push( result )

      @sortResults(results)
      @showResults(results)





   clear: ( e ) =>

      ########################################
      #|
      #|  @params {Event} e
      #|
      ########################################

      @$dom.querySelector('input').value = ''
      
      @hideResults()





   match: ( section, key ) =>

      ########################################
      #|
      #|  @params {object} section - { heading, content }
      #|  @params {string} key
      #|  @return {boolean}
      #|
      ########################################

      { heading, content } = section

      if @matchHeading( heading, key )
         return { heading }

      if content = @matchContent( content, key )
         return { heading, content }





   matchHeading: ( heading, key ) =>

      reg = new RegExp( key, 'i' )

      return reg.test( heading )





   matchContent: ( content, key ) =>

      reg = new RegExp( key, 'i' )

      if result = content.match( reg )

         index = result.index
         start = index - 20
         end   = index + key.length + 20

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





   sortResults: ( results ) =>

      ########################################
      #|
      #|  @params {object[]} results - { type, heading, content }
      #|  @return {object[]} results - { type, heading, content }
      #|
      ########################################

      headingResults = []
      contentResults = []

      for result in results
         if result.type is 'heading'
            headingResults.push(result)
         else
            contentResults.push(result)

      return headingResults.concat(contentResults)





   showResults: ( results ) =>

      html = ''

      for result in results
          html += @createResult( result )

      $ul = document.querySelector('search > ul')
      $ul.innerHTML = html

      @bindResultEvent( $ul )

      $ul.style.display = 'block'





   createResult: ( result ) =>

      { heading, content } = result

      id = util.id( heading )

      if content
         return """
            <li id=\"#{ id }\" type="content">
               <heading>#{ heading }</heading>
               <content>#{ content }</content>
            </li>
         """
      else
         return """
            <li id=\"#{ id }\" type="heading">
               <heading>#{ heading }</heading>
            </li>
         """





   hideResults: =>

      $ul               = document.querySelector('search > ul')
      $ul.innerHTML     = ''
      $ul.style.display = 'none'





   bindResultEvent: ( $ul ) =>

      $items = $ul.querySelectorAll('ul > li')

      for $item in $items
          $item.addEventListener('click', @select.bind(@, $item))





   select: ( $item ) =>

      id = $item.getAttribute('id')
      @emit('select', id)