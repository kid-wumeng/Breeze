ObservableObject = require('./ObservableObject')



module.exports = class Search extends ObservableObject



   constructor: ( $sections ) ->

      super()

      @sections = @parseSections( $sections )
      @$dom     = @render()

      @$search = @$dom
      @$input  = @$search.querySelector('input')
      @$clear  = @$search.querySelector('clear')
      @$ul     = @$search.querySelector('ul')





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

      id = $section.id

      heading = @parseHeading( $section )
      content = @parseContent( $section )

      return { id, heading, content }





   parseHeading: ( $section ) =>

      ########################################
      #|
      #|  @params {HTTPElement} $section
      #|  @params {string}      heading
      #|
      ########################################

      $heading = $section.querySelector('h1, h2, h3, h4, h5, h6')

      if $heading
         return $heading.innerText.trim()
      else
         return ''





   parseContent: ( $section ) =>

      ########################################
      #|
      #|  @params {HTTPElement} $section
      #|  @params {string}      content
      #|
      ########################################

      content = $section.querySelector('content').innerText.trim()

      if from = content.indexOf('\n') + 1
         content = content.slice(from)
      else
         content = ''

      return content.replace(/(?:\n+)|(?:\s+)/g, ' ')





   render: =>

      ########################################
      #|
      #|  @params {HTTPElement} $dom
      #|
      ########################################

      $dom = document.createElement('search')

      $dom.innerHTML = """
         <input-box>
            <input autofocus spellcheck="false"/>
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

      if key
         for section in @sections
            if result = @match(section, key)
               result.id = section.id
               results.push(result)

         @sortResults(results)
         @showResults(results)
         @showClear(results)

      else
         @hideResults()
         @hideClear()





   clear: ( e ) =>

      ########################################
      #|
      #|  @params {Event} e
      #|
      ########################################

      @$dom.querySelector('input').value = ''

      @hideResults()
      @hideClear()





   match: ( section, key ) =>

      ########################################
      #|
      #|  @params {object} section - { heading, content }
      #|  @params {string} key
      #|  @return {boolean}
      #|
      ########################################

      { heading, content } = section

      if text = @matchHeading( heading, key )
         return { heading: text }

      if text = @matchContent( content, key )
         return { heading, content: text }





   matchHeading: ( heading, key ) =>

      reg = new RegExp( key, 'i' )

      if reg.test( heading )

         heading = heading.replace /</g, '&lt;'
         heading = heading.replace />/g, '&gt;'

         return heading





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
      #|  @params {object[]} results - { id, heading, content }
      #|
      ########################################

      results.sort ( r1, r2 ) =>

         if !r1.content and r2.content
            return -1

         if !r2.content and r1.content
            return 1

         return 0





   showResults: ( results ) =>

      html = ''

      for result in results
          html += @createResult( result )

      $ul = document.querySelector('search > ul')
      $ul.innerHTML = html

      @bindResultEvent( $ul )

      $ul.style.display = 'block'





   createResult: ( result ) =>

      { id, heading, content } = result

      if content
         return """
            <li id=\"#{id}\" type="content">
               <heading>#{heading}</heading>
               <content>#{content}</content>
            </li>
         """
      else
         return """
            <li id=\"#{id}\">
               <heading>#{heading}</heading>
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





   showClear: =>

      @$clear.style.display = 'block'





   hideClear: =>

      @$clear.style.display = 'none'