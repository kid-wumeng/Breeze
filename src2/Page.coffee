Article = require('./Article')
Summary = require('./Summary')
Prism   = require('prismjs')





$app     = null
$side    = null
$main    = null
$search  = null
$summary = null
$article = null




exports.active = (href) =>
   console.log 'active: ' + href





exports.init = =>

   read ( article ) =>

      { article, summary, sections } = compile( article )

      { $root, $main, $side, $article, $summary } = dom( article, summary )

      render( $root )





read = ( done ) =>

   ########################################
   #|
   #|  @params {string}   path
   #|  @params {function} done( markdown )
   #|
   ########################################

   xhr = new XMLHttpRequest

   xhr.open('GET', path(), true)
   xhr.send(null)

   xhr.onreadystatechange = =>
      if xhr.readyState is 4
         if xhr.status is 200
            done( xhr.responseText )





path = =>

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





compile = ( article ) =>

   ########################################
   #|
   #|  @params {string} article
   #|  @return {object} { article, summary, sections }
   #|
   ########################################

   { article, sections } = Article.compile(article)

   summary = Summary.parse(sections)
   summary = Summary.compile(summary)

   return { article, summary, sections }





dom = ( article, summary ) =>

   ########################################
   #|
   #|  @params {string} article
   #|  @params {string} summary
   #|  @return {object} { $root, $main, $side, $article, $summary }
   #|
   ########################################

   $root = document.createElement('root')
   $main = document.createElement('main')
   $side = document.createElement('side')

   $article = Article.dom( article )
   $summary = Summary.dom( summary )

   $main.appendChild( $article )
   $side.appendChild( $summary )

   $root.appendChild( $side )
   $root.appendChild( $main )

   $main.style.minHeight = window.innerHeight + 'px'

   return { $root, $main, $side, $article, $summary }





render = ( $root ) =>

   $rootCurrent = document.querySelector('body > root')

   if $rootCurrent
      document.body.replaceChild( $root, $rootCurrent )
   else
      document.body.appendChild( $root )