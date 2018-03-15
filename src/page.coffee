article = require('./article')
summary = require('./summary')
Prism   = require('prismjs')




pages = {}





exports.load = =>

   path = getPath()

   if page = pages[path]
      return page
   else
      ajax path, ( markdown ) =>
         create( markdown )





getPath = =>

   ########################################
   #|
   #|  @return {string} path
   #|
   ########################################

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





ajax = ( path, done ) =>

   ########################################
   #|
   #|  @params {string}   path
   #|  @params {function} done( markdown )
   #|
   ########################################

   xhr = new XMLHttpRequest

   xhr.open('GET', path, true)
   xhr.send(null)

   xhr.onreadystatechange = =>
      if xhr.readyState is 4
         if xhr.status is 200
            done( xhr.responseText )





create = ( markdown ) =>

   ########################################
   #|
   #|  @params {string} markdown
   #|
   ########################################

   { html, sections } = article.compile( markdown )

   html = summary.compile(summary.parse( sections ))

   console.log html