ObservableObject = require('./ObservableObject')
Markdown         = require('./Markdown')
Navigator        = require('./Navigator')
Cover            = require('./Cover')
Article          = require('./Article')
Summary          = require('./Summary')
Search           = require('./Search')
util             = require('./util')



module.exports = class Page extends ObservableObject



   constructor: ( navigator ) ->

      super()

      @isOverMain = false

      @$root = util.element('#root')
      @$side = util.element('#side')
      @$main = util.element('#main')

      @path     = @getPath()
      @query    = @getQuery()
      @filePath = @getFilePath()

      util.ajax @filePath, ( article ) =>

         text = article
         markdown = new Markdown(text)
         { nav, cover, summary, article } = markdown.parse()

         console.log nav
         console.log cover
         console.log summary
         console.log article

         # @navigator = new Navigator(navigator)
         # @article   = new Article(article)
         # @cover     = new Cover(@article.cover)
         # @summary   = new Summary(@article.summary)
         # @search    = new Search(@article.$sections)
         #
         # @article.on('scroll', ( id ) => if @isOverMain then @rehash( id ))
         # @article.on('scroll', ( id ) => if @isOverMain then @summary.scroll( id ))
         # @article.on('scroll', ( id ) => if @isOverMain then @summary.active( id ))
         #
         # @cover.on('select', @rehash)
         #
         # @summary.on('select', @rehash)
         # @summary.on('select', @summary.active)
         # @summary.on('select', @article.scroll)
         #
         # @search.on('select',  @rehash)
         # @search.on('select',  @article.scroll)
         #
         # @ready()
         # @render()
         #
         # if @query.id
         #    @article.scroll(@query.id)
         #    @summary.scroll(@query.id)
         #    @summary.active(@query.id)





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

      path = util.formatPath( path )

      if path is ''
         path = 'README'

      if path[path.length - 1] is '/'
         path += 'README'

      return path + '.md'





   ready: =>

      @$main.appendChild( @article.$dom )
      @$side.appendChild( @search.$dom )
      @$side.appendChild( @summary.$dom )

      @$root.appendChild(@navigator.render()) if @navigator.exist()
      @$root.appendChild( @cover.$dom ) if @cover.html and !@query.id
      @$root.appendChild( @$side )
      @$root.appendChild( @$main )

      @$main.addEventListener('mouseenter', => @isOverMain = true)
      @$main.addEventListener('mouseleave', => @isOverMain = false)

      @$main.style.minHeight = window.innerHeight + 'px'

      @bindLinkEvent(@$root)





   render: =>

      $rootCurrent = document.querySelector('body > #root')

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





   bindLinkEvent: ( $root ) =>

      $links = $root.querySelectorAll('a')

      for $link in $links

         href = $link.getAttribute('href')
         isUrl = /^(?:http)|(?:https)|(?:ftp):\/\//.test( href )

         if isUrl
            $link.addEventListener('click', @onClickUrl)

         else if href[0] is '#'
            $link.addEventListener('click', @onClickPageInner)

         else
            $link.addEventListener('click', @onClickPageOuter)





   onClickUrl: ( e ) =>

      window.open(e.target.getAttribute('href'))
      e.preventDefault()





   onClickPageInner: ( e ) =>

      id = e.target.getAttribute('href').slice(1)
      @rehash(id)
      e.preventDefault()





   onClickPageOuter: ( e ) =>

      @emit('reload', e.target.getAttribute('href'))
      e.preventDefault()