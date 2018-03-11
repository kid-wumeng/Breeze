exports.formatPath = ( path = '' ) =>

   ########################################
   #|
   #|  @params {string} path
   #|  @return {string} path
   #|
   #|  'abc'  => 'abc.md'
   #|  'abc/' => 'abc/README.md'
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

   ########################################
   #|
   #|  @params {string}   path
   #|  @params {function} done(text)
   #|  @params {function} fail(status)
   #|
   ########################################

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

   ########################################
   #|
   #|  @params {string} text
   #|  @params {string} hash
   #|
   #|  'Quick Start' => 'Quick-Start'
   #|
   ########################################

   return text.replace(/\s+/g, '-')