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