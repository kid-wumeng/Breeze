util = require('./util')





module.exports = class Router

   ########################################
   #|
   #|   new Router( isJIT )
   #|
   #|   -----------------------------------
   #|    Be responsible for
   #|       managing the singleton router.
   #|   -----------------------------------
   #|
   #|   router.getPath()             -> path
   #|   router.getQuery()            -> query
   #|   router.resolvePath( href )   -> path
   #|   router.resolveID( href )     -> id
   #|   router.isCurrentPath( href ) -> bool
   #|   router.isCurrentID( href )   -> bool
   #|   router.go( href )
   #|
   #|   @events('reload')
   #|
   ########################################





   constructor: ( isJIT = false ) ->

      ########################################
      #|
      #|   @params {boolean} isJIT - is the 'Just In Time' mode ?
      #|
      ########################################

      @_isJIT = isJIT

      @getPath       = @_getPath
      @getQuery      = @_getQuery
      @resolvePath   = @_resolvePath
      @resolveID     = @_resolveID
      @isCurrentPath = @_isCurrentPath
      @isCurrentID   = @_isCurrentID
      @go            = @_go

      window.addEventListener 'popstate', => Breeze.emit('reload')





   _getFullPath: =>

      ########################################
      #|
      #|   @return {string} fullPath
      #|
      #|   when JIT,
      #|      host:port                       ->  '/'
      #|      host:port/#/                    ->  '/'
      #|      host:port/#/?id=abc             ->  '/?id=abc'
      #|      host:port/#/path/subPath?id=abc ->  '/path/subPath?id=abc'
      #|
      #|   when no-JIT,
      #|      host:port                       ->  '/'
      #|      host:port?id=abc                ->  '/?id=abc'
      #|      host:port/path/subPath?id=abc   ->  '/path/subPath?id=abc'
      #|
      ########################################

      if @_isJIT
         path = location.hash.slice(1)
      else
         path = location.pathname

      if path[0] isnt '/'
         path = '/' + path

      return path





   _getPath: =>

      ########################################
      #|
      #|   @return {string} path
      #|
      #|   /path/subPath?id=abc  ->  '/path/subPath'
      #|
      ########################################

      path = @_getFullPath()
      path = path.replace(/\?.*$/, '')

      return decodeURI( path )





   _getQueryString: =>

      ########################################
      #|
      #|   @return {string} queryString
      #|
      #|   /path/subPath?id=abc  ->  'id=abc'
      #|
      ########################################

      path = @_getFullPath()

      if match = path.match(/\?.+$/)
         return decodeURI( match[0].slice(1) )
      else
         return ''





   _getQuery: =>

      ########################################
      #|
      #|   @return {object} query ?= {}
      #|
      #|   /path/subPath?id=abc       ->  { id: 'abc' }
      #|   /path/subPath?id=abc&flag  ->  { id: 'abc', flag: true }
      #|
      ########################################

      queryString = @_getQueryString()
      query       = {}

      fields = queryString.split('&')
      fields = fields.filter ( field ) => field

      for field in fields

          parts = field.split('=')
          name  = parts[0]
          value = parts[1] ? true

          query[name] = value

      return query





   _formatFullPath: ( path = '', query = {} ) =>

      ########################################
      #|
      #|   @params {string} path
      #|   @params {object} query
      #|
      #|   @return {string} fullPath
      #|
      #|   when JIT,
      #|      ''   ->  /#/...
      #|      '/'  ->  /...
      #|
      #|   when no-JIT,
      #|      ''   ->  /...
      #|      '/'  ->  /...
      #|
      ########################################

      path        = @_formatPath( path )
      queryString = @_formatQueryString( query )

      if @_isJIT and path isnt '/'
         return '#' + path + queryString
      else
         return       path + queryString





   _formatPath: ( path = '' ) =>

      ########################################
      #|
      #|   @params {string} path
      #|   @return {string} path
      #|
      #|   Assume current is at /path/subPath
      #|
      #|   ''        ->  '/path/subPath'
      #|   '/'       ->  '/'
      #|   'path'    ->  '/path'
      #|   '/path'   ->  '/path'
      #|   '/path/'  ->  '/path/'
      #|
      ########################################

      if path
         if path[0] isnt '/'
            path = '/' + path
      else
         path = @_getPath()

      return path





   _formatQueryString: ( query = {} ) =>

      ########################################
      #|
      #|   @params {object} qyery
      #|   @return {string} queryString
      #|
      #|   {}                         ->  ''
      #|   { id: 'abc', flag: true }  ->  '?id=abc&flag'
      #|
      ########################################

      fields = []

      for name, value of query
          if value is true
             fields.push(name)
          else
             fields.push(name + '=' + value)

      if fields.length
         return '?' + fields.join('&')
      else
         return ''





   _resolvePath: ( href = '' ) =>

      ########################################
      #|
      #|   @params {string} href
      #|   @return {string} path
      #|
      #|   'path/subPath#id'  ->  '/path/subPath'
      #|   'path#id'          ->  '/path'
      #|   'path'             ->  '/path'
      #|   '#id'              ->  ''
      #|   '/'                ->  '/'
      #|   ''                 ->  ''
      #|
      ########################################

      path = href.split('#')[0]

      if path and path[0] isnt '/'
         path = '/' + path

      return path





   _resolveID: ( href = '' ) =>

      ########################################
      #|
      #|   @params {string} href
      #|   @return {string} id
      #|
      #|   'path#id'  ->  'id'
      #|   '#id'      ->  'id'
      #|   '#'        ->  ''
      #|   'path'     ->  ''
      #|   '/'        ->  ''
      #|   ''         ->  ''
      #|
      ########################################

      parts = href.split('#')

      if parts.length is 2
         return parts[1]
      else
         return ''





   _isCurrentPath: ( href = '' ) =>

      ########################################
      #|
      #|   @params {string} href
      #|   @return {boolean}
      #|
      #|   Assume current is at /path/subPath?id=abc
      #|
      #|   _isCurrentPath('')           ->  true
      #|   _isCurrentPath('#')          ->  true
      #|   _isCurrentPath('#abc')       ->  true
      #|   _isCurrentPath('path')       ->  true
      #|   _isCurrentPath('path#abc')   ->  true
      #|   _isCurrentPath('path#abc2')  ->  true
      #|   _isCurrentPath('/')          ->  false
      #|   _isCurrentPath('path2#abc')  ->  false
      #|
      ########################################

      path = @_resolvePath( href )

      if !path or path is @_getPath()
         return true
      else
         return false





   _isCurrentID: ( href = '' ) =>

      ########################################
      #|
      #|   @params {string} href
      #|   @return {boolean}
      #|
      #|   Assume current is at /path/subPath?id=abc
      #|
      #|   _isCurrentID('#abc')       ->  true
      #|   _isCurrentID('path#abc')   ->  true
      #|   _isCurrentID('')           ->  false
      #|   _isCurrentID('#')          ->  false
      #|   _isCurrentID('path')       ->  false
      #|   _isCurrentID('path#abc2')  ->  false
      #|   _isCurrentID('/')          ->  false
      #|   _isCurrentID('path2#abc')  ->  false
      #|
      ########################################

      id        = @_resolveID( href )
      currentID = @_getQuery().id

      if !id and !currentID
         return true
      else if id is currentID
         return true
      else
         return false





   _go: ( href = '' ) =>

      ########################################
      #|
      #|   @params {string} href
      #|
      #|   when JIT,
      #|      _go('/path/subPath#abc')  ->  /#/path/subPath?id=abc
      #|
      #|   when no-JIT,
      #|      _go('/path/subPath#abc')  ->  /path/subPath?id=abc
      #|
      ########################################

      if util.isUrl( href )
            @_goUrl( href )
      else
         if href[0] is '#'
            if !@_isCurrentID( href )   then @_goID( href )
         else
            if !@_isCurrentPath( href ) then @_goPath( href )





   _goUrl: ( url ) =>

      ########################################
      #|
      #|   @params {string} url
      #|
      #|   _goUrl('http://google.com')  ->  http://google.com ( open in new tab )
      #|
      ########################################

      window.open( url, '_blank' )





   _goPath: ( href ) =>

      ########################################
      #|
      #|   @params {string} href
      #|
      #|   @events('reload') - only emit when JIT
      #|
      #|   Assume current is at '/path/subPath?id=abc&flag'
      #|
      #|      _goPath('subPath2')      ->  /path/subPath2?flag
      #|      _goPath('subPath2#def')  ->  /path/subPath2?id=def&flag
      #|      _goPath('/')             ->  /?flag
      #|      _goPath('/#def')         ->  /?id=def&flag
      #|
      ########################################

      path  = @_resolvePath( href )
      id    = @_resolveID( href )
      query = @_getQuery()

      if id
         query.id = id
      else
         delete query.id

      fullPath = @_formatFullPath( path, query )

      if @_isJIT

         history.pushState( null, null, fullPath )
         Breeze.emit('reload')

      else
         location.href = fullPath





   _goID: ( href ) =>

      ########################################
      #|
      #|   @params {string} href
      #|
      #|   Assume current is at '/path/subPath?id=abc&flag'
      #|
      #|      _goID('#')     ->  /path/subPath?flag
      #|      _goID('#def')  ->  /path/subPath?id=def&flag
      #|
      ########################################

      id    = @_resolveID( href )
      path  = @_getPath()
      query = @_getQuery()

      if id
         query.id = id
      else
         delete query.id

      fullPath = @_formatFullPath( path, query )

      console.log fullPath

      history.pushState( null, null, fullPath )