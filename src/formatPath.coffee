module.exports = ( path = '' ) =>

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