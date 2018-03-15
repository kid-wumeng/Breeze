ObservableObject = require('./ObservableObject')
Article          = require('./Article')
Summary          = require('./Summary')



module.exports = class Page extends ObservableObject



   constructor: ->

      super()

      @path = @formatPath()

      @load ( markdown ) =>

         @markdown = markdown

         @article  = new Article( markdown )
         
         @summary  = new Summary( @article.summary )

         console.log @summary.html





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