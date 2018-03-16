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

      @path = @formatPath()

      @load ( markdown ) =>

         @markdown = markdown
         @article  = new Article(markdown)
         @summary  = new Summary(@article.summary)
         @search   = new Search(@article.$sections)

         @article.on('scroll', @rehash)
         @article.on('scroll', @summary.active)
         @article.on('scroll', ( id ) => if @isOverMain then @summary.scroll( id ))

         @summary.on('select', @rehash)
         @summary.on('select', @article.scroll)

         @search.on('select',  @rehash)
         @search.on('select',  @article.scroll)

         @ready()
         @render()





   formatPath: =>

      path = location.search

      if path
         path = path.slice(1)  # remove '?'

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

      xhr.open('GET', @path, true)
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
         history.replaceState(null, null, '#' + id)
      else
         history.replaceState(null, null, '/')