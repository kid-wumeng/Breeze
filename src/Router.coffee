util             = require('./util')
ObservableObject = require('./ObservableObject')



module.exports = class Router extends ObservableObject

   ########################################
   #/
   #/   Be responsible for
   #/      managing the singleton router.
   #/
   ########################################





   constructor: ( isJIT ) ->

      ########################################
      #/
      #/   @params {boolean} isJIT - is the Just In Time mode ?
      #/
      ########################################

      super()

      @isJIT = isJIT

      @fullPath = ''
      @path     = ''
      @query    = ''
      @filePath = ''

      @_parse()

      window.addEventListener 'popstate', =>
         @_parse()
         @emit('redirect')





   _parse: =>

      @fullPath = @_parseFullPath()
      @path     = @_parsePath()
      @query    = @_parseQuery()
      @filePath = @_parseFilePath() if @isJIT





   _parseFullPath: =>

      ########################################
      #/
      #/   @return {string} path
      #/
      #/   when JIT,
      #/      host:port                        ->  /
      #/      host:port/#/                     ->  /
      #/      host:port/#/?id=xxx              ->  /?id=xxx
      #/      host:port/#/path/subPath?id=xxx  ->  /path/subPath?id=xxx
      #/
      #/   when no-JIT,
      #/      host:port                        ->  /
      #/      host:port?id=xxx                 ->  /?id=xxx
      #/      host:port/path/subPath?id=xxx    ->  /path/subPath?id=xxx
      #/
      ########################################

      if @isJIT
         path = location.hash.slice(1)
      else
         path = location.pathname

      path = '/' + path
      path = path.replace(/\/+/g, '/')

      return path





   _parsePath: =>

      ########################################
      #/
      #/   @return {string} path
      #/
      #/   when JIT,
      #/      host:port                        ->  /
      #/      host:port/#/                     ->  /
      #/      host:port/#/path/subPath?id=xxx  ->  /path/subPath
      #/
      #/   when no-JIT,
      #/      host:port                        ->  /
      #/      host:port/path/subPath?id=xxx    ->  /path/subPath
      #/
      ########################################

      path = @_parseFullPath()
      path = path.replace(/\?.*$/, '')

      return path





   _parseQuery: =>

      ########################################
      #/
      #/   @return {object} query
      #/
      #/   when JIT,
      #/      host:port/#/path/subPath         ->  {}
      #/      host:port/#/path/subPath?id=xxx  ->  { id: 'abc' }
      #/
      #/   when no-JIT,
      #/      host:port/#/path/subPath?id=xxx  ->  {}
      #/      host:port/path/subPath?id=xxx    ->  { id: 'abc' }
      #/
      ########################################

      path  = @_parseFullPath()
      index = path.indexOf('?')
      query = {}

      if index > -1

         string = path.slice(index + 1)
         string = decodeURI(string)
         fields = string.split('&')

         for field in fields

             parts = field.split('=')
             name  = parts[0]
             value = parts[1] ? true

             query[name] = value

      return query





   _parseFilePath: =>

      ########################################
      #/
      #/   @return {string} path
      #/
      #/
      #/   when JIT (only),
      #/      host:port/                 ->  basePath/README.md
      #/      host:port/#/               ->  basePath/README.md
      #/      host:port/#/path/subPath   ->  basePath/path/subPath.md
      #/      host:port/#/path/subPath/  ->  basePath/path/subPath/README.md
      #/
      ########################################

      path = @_parsePath()
      path = util.filePath( path )

      if path is ''
         path = 'README'

      if path[path.length - 1] is '/'
         path += 'README'

      return path + '.md'





   go: ( href = '' ) =>

      ########################################
      #/
      #/   @params {string} href - 'path#id'
      #/
      ########################################

      { path, id } = @_parseHref( href )

      if id
         query = {id}
      else
         query = {}

      @_redirect( path, query )





   _parseHref: ( href = '' ) =>

      ########################################
      #/
      #/   @params {string} href - 'path#id'
      #/   @return {object}      - { path: 'path', id: 'id' }
      #/
      ########################################

      parts = href.split('#')

      switch parts.length
         when 1
            path = parts[0]
            id   = ''
         when 2
            path = parts[0]
            id   = parts[1]
         else
            path = ''
            id   = ''

      return { path, id }





   _redirect: ( path, query ) =>

      ########################################
      #/
      #/   @params {string} path
      #/   @params {object} query
      #/
      ########################################

      fullPath = @_formatFullPath( path, query )

      if @isJIT

         isSamePage = @_formatPath( path ) is @path

         if isSamePage
            @_replace( fullPath )
         else
            @_push( fullPath )

      else
         location.href = fullPath





   _replace: ( fullPath ) =>

      ########################################
      #/
      #/   @params {string} fullPath
      #/
      ########################################

      history.replaceState(null, null, fullPath)
      @_parse()





   _push: ( fullPath ) =>

      ########################################
      #/
      #/   @params {string} fullPath
      #/
      ########################################

      history.pushState(null, null, fullPath)
      @_parse()

      @emit('redirect')





   _formatFullPath: ( path, query ) =>

      ########################################
      #/
      #/   @params {string} path
      #/   @params {object} query
      #/   @return {string} fullPath
      #/
      ########################################

      fullPath = @_formatPath(path) + @_formatQuery(query)

      if @isJIT
         if path is '/'
            return        fullPath
         else
            return '/#' + fullPath

      return fullPath





   _formatPath: ( path = '' ) =>

      ########################################
      #/
      #/   @params {string} path
      #/   @return {string} path
      #/
      ########################################

      if !path
          path = @path

      path = '/' + path
      path = path.replace(/\/+/g, '/')

      return path





   _formatQuery: ( query = {} ) =>

      ########################################
      #/
      #/   @params {object} query
      #/   @return {string} querystring
      #/
      ########################################

      parts = []

      for name, value of query
         if value is true
            parts.push(name)
         else
            parts.push(name + '=' + value)

      if parts.length
         return '?' + parts.join('&')
      else
         return ''