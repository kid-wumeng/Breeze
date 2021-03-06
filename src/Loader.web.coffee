util = require('./util')





module.exports = class Loader

   ########################################
   #|
   #|   new Loader()
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       loading the normal and common pages.
   #|
   #|    Adapted to the web environment ( browser-runtime )
   #|   -----------------------------------
   #|
   #|   loader.load( path, done, fail )
   #|
   ########################################





   constructor: ->

      @_cache = {}

      @load = @_load





   _load: ( path, done, fail ) =>

      ########################################
      #|
      #|   @params {string}   path
      #|   @params {function} done( text = common + normal )
      #|   @params {function} fail()
      #|
      ########################################

      normalPath  = @_formatNormalPath( path )
      commonPaths = @_formatCommonPaths( path )

      @_read normalPath, ( normal ) =>

         if normal?
            if Breeze.config('useCommon')
               @_findOrReadCommon commonPaths, ( common ) => done( common + normal )
            else
               done( normal )

         else fail()





   _findOrReadCommon: ( paths, done ) =>

      ########################################
      #|
      #|   @params {string[]} paths
      #|   @return {function} done( common )
      #|
      ########################################

      path = paths.pop()

      @_readCommon path, ( common ) =>

         if common?
            done( common )

         else
            if paths.length
               @_findOrReadCommon( paths, done )
            else
               done('')





   _readCommon: ( path, done ) =>

      ########################################
      #|
      #|   @params {string}   path
      #|   @return {function} done( common )
      #|
      ########################################

      common = @_cache[ path ]

      if common is undefined
         @_read path, ( common ) => done( @_cache[ path ] = common )

      else
         done( common )





   _formatNormalPath: ( path ) =>

      ########################################
      #|
      #|   @params {string} path
      #|   @return {string} path
      #|
      ########################################

      path = util.filePath( path )

      if path is ''
         path = 'README'

      if path[path.length - 1] is '/'
         path += 'README'

      return path + '.md'





   _formatCommonPaths: ( path )=>

      ########################################
      #|
      #|   @params {string}   path
      #|   @return {string[]} paths
      #|
      #|   basePath = '/docs'
      #|   path     = '/api/math'  =>  ['@.md', 'docs/@.md', 'docs/api/@.md']
      #|
      ########################################

      paths = []
      queue = []

      path  = util.filePath( path )  # path  = 'docs/api/math'
      parts = path.split('/')        # parts = ['docs', 'api', 'math']
      parts.pop()                    # parts = ['docs', 'api']

      while parts.length
         part = parts.shift()              # part  = 'docs'        | part  = 'api'
         queue.push( part )                # queue = ['docs']      | queue = ['docs', 'api']
         path = queue.join('/') + '/@.md'  # path  = 'docs/@.md'   | path  = 'docs/api/@.md'
         paths.push( path )                # paths = ['docs/@.md'] | paths = ['docs/@.md', 'docs/api/@.md']

      paths.unshift('@.md')                # paths = ['@.md', 'docs/@.md', 'docs/api/@.md']

      return paths





   _read: ( path, done ) =>

      ########################################
      #|
      #|   @params {string}   path
      #|   @params {function} done( text ) - text = null if not found,
      #|                                     when use, should check by << text? >> ( a coffeescript syntactic sugar )
      #|
      ########################################

      xhr = new XMLHttpRequest

      xhr.open( 'GET', path, true )
      xhr.send( null )

      xhr.onreadystatechange = =>
         if xhr.readyState is 4
            if xhr.status is 200
               done( xhr.responseText )
            else
               done( null )