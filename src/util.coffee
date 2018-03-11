exports.formatPath = ( path = '' ) =>

   ########################################
   #|
   #|  @params {string} path
   #|  @return {string} path
   #|
   ########################################

   basePath = Breeze.basePath ? ''

   path = ( basePath + path ).replace( /\/{2,}/, '/' )

   if path is '' or path is '/'
      path = 'README'

   if path[0] is '/'
      path = path.slice(1)

   if path[path.length - 1] is '/'
      path += 'README'

   return path += '.md'





exports.read = ( path, done, fail ) =>

   xhr = new XMLHttpRequest

   xhr.onreadystatechange = ->

      if xhr.readyState is 4

         if xhr.status is 200
            done( xhr.responseText )

         else
            fail( xhr.status )


   xhr.open('GET', path, true)
   xhr.send(null)





exports.hash = ( text ) =>

   return text.replace(/\s+/g, '-')




exports.jade = ( text ) =>

   ########################################
   #|
   #|  @params {string} text
   #|  @params {string} html
   #|
   #|  Parse the jade-like text to html,
   #|  for example,
   #|
   #|  item        =>  <item>
   #|    name ...  =>    <name>...</name>
   #|    type ...  =>    <type>...</type>
   #|    desc ...  =>    <desc>...</desc>
   #|              =>  </item>
   #|
   ########################################

   lines = text.split(/\n+/)

   tags = []
   lastDeep = 0

   html = ''

   for line in lines

      deep = 0

      line = line.replace /^\s*/, (match) =>
         deep = match.length
         return ''

      line = line.replace(/\s*$/, '')
      line = line.replace(/\s+/, '|')

      parts = line.split('|')
      tag   = parts[0]
      text  = if parts[1]? then parts.slice(1).join('|') else ''

      html += "<#{tag}>"

      if deep > lastDeep
         tags.push(tag)
      else
         if tags.length
            tag = tags.pop()
            html += "</#{tag}>"

      lastDeep = deep

   console.log html







