formatHash = require('./formatHash')
redirect   = require('./redirect')
scrollMain = require('./scrollMain')



module.exports = ( $search, sections )  =>

   ########################################
   #|
   #|  Render $search.
   #|
   #|  @params {HTTPElement} $search
   #|
   ########################################

   $search.innerHTML = """
      <input-box>
         <input spellcheck="false"/>
      </input-box>
      <ul></ul>
   """

   bindSections( $search, sections )
   bindEvent( $search, sections )

   $search.querySelector('input').focus()





bindSections = ( $search, sections ) =>

   ########################################
   #|
   #|  @params {HTMLElement} $search
   #|  @params {object[]}    sections = [{ heading, content }, ...]
   #|
   ########################################

   sections = sections.map (section) =>

      if /^\s*#{1,6}/.test(section)

         lines   = section.split('\n')

         heading = lines[0].replace /(^\s*#{1,6}\s*)|(\s+$)/g, ''
         content = lines.slice(1).join('\n')

         return { heading, content }

      else
         return { heading: '', content: section }

   $search.sections = sections





bindEvent = ( $search ) =>

   ########################################
   #|
   #|  @params {HTMLElement} $search
   #|
   ########################################

   $input = $search.querySelector('input')

   $input.addEventListener('input', input.bind( null, $search.sections ))





input = ( sections, event ) =>

   ########################################
   #|
   #|  @params sections = [{ heading, content }, ...]
   #|  @params {Event}    event
   #|
   ########################################

   key = event.target.value.trim()
   key = key.replace('\\', '\\\\')

   if key.length >= 2

      results = []

      for section in sections
         if result = match(section, key)
            results.push(result)

      if results.length
         results = sortResults(results)
         showResults(results, key)
      else
         hideResults()

   else
      hideResults()





match = ( section, key ) =>

   ########################################
   #|
   #|  @params {object} section = { heading, content }
   #|  @params {string} key
   #|  @return {object} results = { type, heading, content }
   #|
   ########################################

   { heading, content } = section

   if matchHeading( heading, key )
      return { type: 'heading', heading, content }

   else if content = matchContent( content, key )
      return { type: 'content', heading, content }





matchHeading = ( heading, key ) =>

   ########################################
   #|
   #|  @params {string} heading
   #|  @params {string} key
   #|
   ########################################

   reg = new RegExp(key, 'i')

   return reg.test( heading )





matchContent = ( content, key ) =>

   ########################################
   #|
   #|  @params {string} content
   #|  @params {string} key
   #|  @return {string} content-fragment
   #|
   ########################################

   reg = new RegExp(key, 'i')

   if result = content.match(reg)

      index = result.index
      start = index - 20
      end   = index + key.length + 20

      if start < 0
         start = 0

      if end > content.length
         end = content.length

      content = content.slice(start, end)
      content = content.replace /(?:\s+)|(?:\n+)/g, ''

      return content

   else
      return ''





showResults = ( results, key ) =>

   ########################################
   #|
   #|  @params {object[]} results - { type, heading, content }
   #|  @params {string}   key
   #|
   ########################################

   html = ''

   for result in results
      html += createResult( result, key )

   $ul = document.querySelector('search > ul')
   $ul.innerHTML = html

   bindResultEvent( $ul )

   $ul.style.display = 'block'





sortResults = ( results ) =>

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





createResult = ( result, key ) =>

   ########################################
   #|
   #|  @params {object} result - { type, heading, content }
   #|  @params {string} key
   #|
   ########################################

   keyReg = new RegExp(key, 'ig')

   { type, heading, content } = result

   if type is 'heading'

      hash    = formatHash( heading )

      heading = heading.replace('<', '&lt;')
      heading = heading.replace('>', '&gt;')

      heading = heading.replace keyReg, ( match ) => "<em>#{match}</em>"

      return """
         <li type="heading" hash=\"#{hash}\">
            <heading>#{ heading }</heading>
         </li>
      """

   else

      hash    = formatHash( heading )

      content = content.replace(/(\s+)|(\n+)/g, '')
      content = content.replace(/</g, '&lt;')
      content = content.replace(/>/g, '&gt;')

      content = content.replace keyReg, ( match ) => "<em>#{match}</em>"

      return """
         <li hash=\"#{hash}\">
            <heading>#{ heading }</heading>
            <content>#{ content }</content>
         </li>
      """





hideResults = =>

   $ul = document.querySelector('search > ul')

   if $ul
      $ul.style.display = 'none'





bindResultEvent = ( $ul ) =>

   $lis = $ul.querySelectorAll('ul > li')

   for $li in $lis
      do ($li) =>
         $li.addEventListener 'click', (e) =>
            hash = $li.getAttribute('hash')
            scrollMain( hash )