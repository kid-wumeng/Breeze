ObservableObject = require('./ObservableObject')
Article          = require('./Article')
Summary          = require('./Summary')
Search           = require('./Search')



module.exports = class Page extends ObservableObject



   constructor: ->

      super()

      @isOverMain = false

      @$root = document.createElement('root')
      @$side = document.createElement('side')
      @$main = document.createElement('main')

      @path     = @getPath()
      @query    = @getQuery()
      @filePath = @getFilePath()

      @load ( markdown ) =>

         @markdown = markdown
         @article  = new Article(markdown)
         @summary  = new Summary(@article.summary)
         @search   = new Search(@article.$sections)

         @article.on('scroll', ( id ) => if @isOverMain then @rehash( id ))
         @article.on('scroll', ( id ) => if @isOverMain then @summary.scroll( id ))
         @article.on('scroll', ( id ) => if @isOverMain then @summary.active( id ))

         @summary.on('select', @rehash)
         @summary.on('select', @summary.active)
         @summary.on('select', @article.scroll)

         @search.on('select',  @rehash)
         @search.on('select',  @article.scroll)

         @ready()
         @render()

         if @query.id
            @article.scroll(@query.id)
            @summary.scroll(@query.id)
            @summary.active(@query.id)





   getPath: =>

      ########################################
      #|
      #|  @return {string} path
      #|
      #|  localhost:8080/#/api?id=abc  =>  /api
      #|
      ########################################

      hash = location.hash

      if hash
         path = hash.slice(1)
         path = path.replace(/\?.*$/, '')
      else
         path = '/'

      return path





   getQuery: =>

      ########################################
      #|
      #|  @return {string} path
      #|
      #|  localhost:8080/#/api?id=abc  =>  { id: 'abc' }
      #|
      ########################################

      query = {}
      hash  = decodeURI( location.hash )
      index = hash.indexOf('?')

      if index > -1

         string = hash.slice(index + 1)
         array  = string.split('&')

         for item in array
             item  = item.split('=')
             name  = item[0]
             value = item[1] ? true

             query[name] = value

      return query





   getFilePath: =>

      ########################################
      #|
      #|  @return {string} path
      #|
      #|  localhost:8080/#/api?id=abc   =>  api.md
      #|  localhost:8080/#/api/?id=abc  =>  api/README.md
      #|
      ########################################

      path = @getPath()

      if path
         path = path.slice(1)  # remove '#'

      if Breeze.basePath
         path = Breeze.basePath + '/' + path

      if path
         path = path.replace(/\/{2,}/g, '/')

      if path[0] is '/'
         path = path.slice(1)

      if path is ''
         path = 'README'

      if path[path.length - 1] is '/'
         path += 'README'

      return path + '.md'





   load: ( done ) =>

      ########################################
      #|
      #|  @params {function} done
      #|
      ########################################

      xhr = new XMLHttpRequest

      xhr.open('GET', @filePath, true)
      xhr.send(null)

      xhr.onreadystatechange = =>
         if xhr.readyState is 4
            if xhr.status is 200
               done( xhr.responseText )





   ready: =>

      @$main.appendChild( @article.$dom )
      @$side.appendChild( @search.$dom )
      @$side.appendChild( @summary.$dom )

      @$root.appendChild( @$side )
      @$root.appendChild( @$main )

      @$main.addEventListener('mouseenter', => @isOverMain = true)
      @$main.addEventListener('mouseleave', => @isOverMain = false)

      @$main.style.minHeight = window.innerHeight + 'px'





   render: =>

      $rootCurrent = document.querySelector('body > root')

      if $rootCurrent
         document.body.replaceChild( @$root, $rootCurrent )
      else
         document.body.appendChild( @$root )





   rehash: ( id ) =>

      ########################################
      #|
      #|  @params {string} id
      #|
      ########################################

      if id
         history.replaceState(null, null, @formatPath({ id }))
      else
         history.replaceState(null, null, @formatPath())





   formatPath: ( newQuery = {} ) =>

      ########################################
      #|
      #|  @params {object} newQuery
      #|  @return {string} path
      #|
      ########################################

      query = Object.assign({}, query, newQuery)
      array = []

      for name, value of query
         if value
            array.push(name + '=' + value)
         else
            array.push(name)

      if array.length
         path = @path + '?' + array.join('&')
      else
         path = @path

      if location.hash
         path = '/#' + path

      return path