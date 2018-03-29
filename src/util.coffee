exports.isUrl = ( href ) =>

   ########################################
   #/
   #/   @params {string} href
   #/   @return {boolean}
   #/
   ########################################

   return /^(?:http)|(?:https)|(?:ftp):\/\//.test( href )





exports.filePath = ( href = '' ) =>

   ########################################
   #/
   #/   @params {string} href
   #/   @return {string} path
   #/
   #/   href  ->  basePath/href  ( won't format when href is url )
   #/
   ########################################

   if exports.isUrl( href )
      return href
   else
      path = href

   if basePath = Breeze.get('basePath')
      path = basePath + '/' + path

   if path
      path = path.replace(/\/{2,}/g, '/')

   if path[0] is '/'
      path = path.slice(1)

   return path





exports.ajax = ( path, done ) =>

   ########################################
   #/
   #/   @params {string}   path
   #/   @params {function} done(text)
   #/
   ########################################

   xhr = new XMLHttpRequest

   xhr.open('GET', path, true)
   xhr.send(null)

   xhr.onreadystatechange = =>
      if xhr.readyState is 4
         if xhr.status is 200
            done( xhr.responseText )





exports.dom = ( html ) =>

   ########################################
   #/
   #/   @params {string|HTMLElement} html|selector|$el
   #/   @return {DOM}
   #/
   #/   <html>  ->  DOM
   #/   sel#id  ->  DOM
   #/   $el#id  ->  DOM
   #/
   ########################################

   if typeof( html ) is 'string'
      if html[0] is '<'
         return new DOM( html )
      else
         return _domBySelector( selector = html )

   else
      return new DOM( $el = html )





_domBySelector = ( selector ) =>

   { tag, id, classname } = parseSelector( selector )

   dom = new DOM('<'+tag+'>')

   dom.attr('id', id)           if id
   dom.attr('class', classname) if classname

   return dom





exports.element = ( html ) =>

   ########################################
   #/
   #/   @params {string}      html|selector
   #/   @return {HTMLElement}
   #/
   #/   <html>  ->  $html
   #/   div#id  ->  $div#id
   #/
   ########################################

   if html[0] is '<'
      return _elementByHTML( html )
   else
      return _elementBySelector( selector = html )





_elementByHTML = ( html ) =>

   fragment = document.createElement('fragment')
   fragment.innerHTML = html

   return fragment.childNodes[0]





_elementBySelector = ( selector ) =>

   { tag, id, classname } = parseSelector( selector )

   $el = document.createElement(tag)

   $el.setAttribute('id', id)   if id
   $el.classList.add(classname) if classname

   return $el





parseSelector = ( selector = 'div' ) =>

   ########################################
   #/
   #/   @params {string} selector
   #/   @return {object} - {string} tag
   #/                      {string} id
   #/                      {string} classname
   #/
   #/
   #/   'tag'            -> { tag: 'tag' }
   #/   '#id'            -> { tag: 'div', id: 'id' }
   #/   '.classname'     -> { tag: 'div', classname: 'classname' }
   #/   'tag#id'         -> { tag: 'tag', id: 'id' }
   #/   'tag.classname'  -> { tag: 'tag', classname: 'classname' }
   #/
   #/
   #/   This selector can't includes id and classname at the same time.
   #/   This selector can't includes classname more than two.
   #/
   ########################################

   hasID    = /#/.test( selector )
   hasClass = /\./.test( selector )

   tag       = 'div'
   id        = ''
   classname = ''

   parts = selector.split(/#|\./)
   parts = parts.filter ( part ) => part

   switch parts.length

      when 1
         switch
            when hasID    then id        = parts[0]
            when hasClass then classname = parts[0]
            else               tag       = parts[0]

      when 2
         switch
            when hasID    then ( tag = parts[0] ) and ( id        = parts[1] )
            when hasClass then ( tag = parts[0] ) and ( classname = parts[1] )

   return { tag, id, classname }