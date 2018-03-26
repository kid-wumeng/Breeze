exports.isUrl = ( href ) =>

   return /^(?:http)|(?:https)|(?:ftp):\/\//.test( href )





exports.formatPath = ( path = '' ) =>

   if !exports.isUrl( path )

      if Breeze?.base
         path = Breeze.base + '/' + path

      if path
         path = path.replace(/\/{2,}/g, '/')

      if path[0] is '/'
         path = path.slice(1)

   return path





exports.ajax = ( path, done ) =>

   xhr = new XMLHttpRequest

   xhr.open('GET', path, true)
   xhr.send(null)

   xhr.onreadystatechange = =>
      if xhr.readyState is 4
         if xhr.status is 200
            done( xhr.responseText )





exports.element = ( name = 'div', innerHTML = '' ) =>

   hasID    = /#/.test(name)
   hasClass = /\./.test(name)

   tag       = 'div'
   id        = ''
   classname = ''

   parts = name.split(/#|\./)
   parts = parts.filter (part) => part

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


   $el = document.createElement(tag)

   if id
      $el.id = id

   if classname
      $el.classList.add(classname)

   if innerHTML
      $el.innerHTML = innerHTML

   return $el





exports.createElement = ( name = 'div', innerHTML = '' ) =>

   hasID    = /#/.test(name)
   hasClass = /\./.test(name)

   tag       = 'div'
   id        = ''
   classname = ''

   parts = name.split(/#|\./)
   parts = parts.filter (part) => part

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


   $el = document.createElement(tag)

   if id
      $el.id = id

   if classname
      $el.classList.add(classname)

   if innerHTML
      $el.innerHTML = innerHTML

   return $el




exports.parseSelector = ( sel = 'div' ) =>

   ########################################
   #/
   #/   @params {string} sel
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

   hasID    = /#/.test(sel)
   hasClass = /\./.test(sel)

   tag       = ''
   id        = ''
   classname = ''

   parts = sel.split(/#|\./)
   parts = parts.filter (part) => part

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





exports.dom = ( html ) =>

   ########################################
   #/
   #/   @params {string} html | selector
   #/   @return {DOM}    dom
   #/
   #/   Wrap a dom if argument is html.
   #/   Create a dom if argument is selector.
   #/
   ########################################

   if html[0] is '<'
      return new DOM( html )

   else
      { tag, id, classname } = exports.parseSelector( sel = html )

      dom = new DOM('<' + tag + '>')

      dom.attr('id', id)           if id
      dom.attr('class', classname) if classname

      return dom